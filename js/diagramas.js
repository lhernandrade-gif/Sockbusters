/* =========================================================
   Sockbuster — Página de Arquitectura UML (modelo 4+1)
   Renderiza los diagramas con Mermaid y un tema unificado.
   ========================================================= */
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
import elkLayouts from "https://cdn.jsdelivr.net/npm/@mermaid-js/layout-elk@0/dist/mermaid-layout-elk.esm.min.mjs";

mermaid.registerLayoutLoaders(elkLayouts);

const C = {
  navy: "#13215a", navy2: "#1d2f78", yellow: "#ffc81e", red: "#ef3b3b",
  teal: "#0e8a7e", purple: "#6a3fb5", orange: "#c2410c", ink: "#0b1640"
};

/* Paleta común de clases para flowcharts */
const FLOW_CLASSES = `
  classDef user fill:#ffffff,stroke:${C.navy},stroke-width:2px,color:${C.ink}
  classDef sys fill:${C.navy},stroke:${C.navy},color:#ffffff
  classDef ok fill:#dcf7f3,stroke:${C.teal},stroke-width:2px,color:#0b4f48
  classDef warn fill:#ffe1e1,stroke:${C.red},stroke-width:2px,color:#7f1d1d
  classDef dec fill:${C.yellow},stroke:#a07800,stroke-width:2px,color:${C.ink}
  classDef term fill:${C.red},stroke:${C.red},color:#ffffff,font-weight:bold
  classDef note fill:#fffbe6,stroke:#d9b44a,stroke-dasharray:4 3,color:#5a4500,font-size:12px
`;

export const DIAGRAMS = {
  /* ---------------- VISTA LÓGICA ---------------- */
  clases: `classDiagram
direction TB
namespace Usuarios_y_Autenticacion {
  class Usuario {
    +int id
    +string nombre
    +string email
    +string passwordHash
    +string rol
    +registrarse()
    +iniciarSesion()
    +cerrarSesion()
  }
  class Administrador {
    +registrarProducto()
    +actualizarProducto()
    +actualizarStock()
    +modificarPrecio()
    +gestionarColeccion()
  }
  class TokenJWT {
    +string token
    +datetime fechaEmision
    +datetime fechaExpiracion
    +boolean valido
    +validar()
    +expirar()
  }
}
namespace Catalogo {
  class Producto {
    +int id
    +string nombre
    +string descripcion
    +decimal precio
    +string imagen
    +boolean activo
    +consultarDetalle()
    +actualizarPrecio()
    +actualizarStock()
  }
  class Categoria {
    +int id
    +string nombre
    +string descripcion
    +filtrarProductos()
  }
  class ColeccionTematica {
    +int id
    +string nombre
    +string descripcion
    +string imagen
    +agregarProducto()
    +eliminarProducto()
  }
  class Obra {
    +int id
    +string titulo
    +string tipo
    +string descripcion
  }
  class Talla {
    +int id
    +string nombre
  }
  class Stock {
    +int id
    +int cantidadDisponible
    +int stockMinimo
    +consultarDisponibilidad()
    +aumentarStock()
    +disminuirStock()
  }
}
namespace Carrito_y_Pedidos {
  class Carrito {
    +int id
    +datetime fechaCreacion
    +calcularTotal()
    +agregarProducto()
    +modificarCantidad()
    +eliminarProducto()
    +vaciar()
  }
  class ItemCarrito {
    +int cantidad
    +decimal precioUnitario
    +calcularSubtotal()
  }
  class Pedido {
    +int id
    +string identificador
    +datetime fecha
    +string estado
    +decimal total
    +generarResumen()
    +calcularTotal()
    +actualizarEstado()
  }
  class ItemPedido {
    +int cantidad
    +decimal precioUnitario
    +calcularSubtotal()
  }
  class Checkout {
    +int id
    +decimal total
    +string estado
    +iniciar()
    +procesarPago()
    +confirmarPedido()
  }
  class Pago {
    +int id
    +decimal monto
    +datetime fecha
    +string estado
    +string metodo
    +procesar()
    +confirmar()
  }
}
namespace Resenas {
  class Resena {
    +int id
    +int puntuacion
    +string comentario
    +datetime fecha
    +publicar()
    +editar()
    +eliminar()
    +validarPuntuacion()
  }
}
Usuario <|-- Administrador
Usuario "1" --> "0..*" TokenJWT : obtiene
Producto "0..*" --> "1" Categoria : pertenece a
Producto "0..*" --> "1" ColeccionTematica : pertenece a
Producto "0..*" --> "0..1" Obra : inspirado en
Producto "1" --> "1..*" Talla : disponible en
Producto "1" --> "1" Stock : controla
Usuario "1" --> "0..1" Carrito : posee
Carrito "1" *-- "1..*" ItemCarrito : contiene
ItemCarrito "*" --> "1" Producto : referencia
ItemCarrito "*" --> "1" Talla : selecciona
Usuario "1" --> "0..*" Pedido : realiza
Pedido "1" *-- "1..*" ItemPedido : contiene
ItemPedido "*" --> "1" Producto : corresponde a
ItemPedido "*" --> "1" Talla : selecciona
Carrito "1" --> "0..1" Pedido : genera
Pedido "1" --> "1" Checkout : procesa mediante
Checkout "1" --> "1" Pago : genera
Usuario "1" --> "0..*" Resena : publica
Producto "1" --> "0..*" Resena : recibe
Administrador "1" --> "0..*" Producto : administra
Administrador "1" --> "0..*" Categoria : gestiona
Administrador "1" --> "0..*" ColeccionTematica : gestiona
Administrador "1" --> "0..*" Obra : administra
Administrador "1" --> "0..*" Stock : actualiza`,

  /* ---------------- VISTA DE DESARROLLO ---------------- */
  componentes: `flowchart TB
subgraph PRES["📦 Presentación"]
  direction LR
  UI["«component»<br/><b>Interfaz web Sockbuster</b>"]
  UICat["«component»<br/>Módulo de catálogo"]
  UICar["«component»<br/>Módulo de carrito y Checkout"]
  UIRes["«component»<br/>Módulo de reseñas"]
  UIAdm["«component»<br/>Módulo de administración"]
  UI --> UICat & UICar & UIRes & UIAdm
end
subgraph COM["📦 Comunicación"]
  direction LR
  CAPI["«component»<br/><b>Cliente API HTTP / HTTPS</b>"]
  N1["La comunicación entre la interfaz<br/>y los servicios utiliza HTTPS"]:::note
end
subgraph APP["📦 Servicios de aplicación"]
  direction LR
  API["«component»<br/><b>API de aplicación</b>"]
  AUTH["«component»<br/>Autenticación JWT"]
  SCAT["«component»<br/>Servicio de catálogo"]
  SPED["«component»<br/>Servicio de pedidos y Checkout"]
  SINV["«component»<br/>Servicio de inventario y administración"]
  SRES["«component»<br/>Servicio de reseñas"]
  PAGO["«component»<br/>Simulador de verificación de pago"]
  API --> AUTH & SCAT & SPED & SINV & SRES
  SPED --> PAGO
  N2["JWT autentica las<br/>funciones administrativas"]:::note
  N3["Verificación de pago simulada:<br/>no hay pasarela externa"]:::note
  AUTH -.- N2
  PAGO -.- N3
end
subgraph DOM["📦 Dominio del negocio"]
  direction LR
  DPROD["«component»<br/>Gestión de productos"]
  DCLAS["«component»<br/>Clasificación y colecciones temáticas"]
  DUSR["«component»<br/>Gestión de usuarios"]
  DPED["«component»<br/>Gestión de carrito y pedidos"]
  DSTK["«component»<br/>Gestión de inventario"]
  DRES["«component»<br/>Gestión de reseñas"]
end
subgraph PER["📦 Persistencia"]
  direction LR
  REPO["«component»<br/>Repositorios de datos"]
  BD[("Base de datos")]
  REPO --> BD
end
UI ==> CAPI
CAPI ==>|HTTPS| API
APP -. "«use» utiliza" .-> DOM
DOM -. "consulta y almacena" .-> PER
${FLOW_CLASSES}
classDef comp fill:#ffffff,stroke:${C.purple},stroke-width:2px,color:${C.ink}
classDef key fill:${C.purple},stroke:${C.purple},color:#ffffff
classDef db fill:#efe7ff,stroke:${C.purple},stroke-width:2px,color:${C.ink}
class UICat,UICar,UIRes,UIAdm,AUTH,SCAT,SPED,SINV,SRES,PAGO,DPROD,DCLAS,DUSR,DPED,DSTK,DRES,REPO comp
class UI,CAPI,API key
class BD db
style PRES fill:#f6f1ff,stroke:${C.purple},stroke-width:1.5px
style COM fill:#f6f1ff,stroke:${C.purple},stroke-width:1.5px
style APP fill:#f6f1ff,stroke:${C.purple},stroke-width:1.5px
style DOM fill:#f6f1ff,stroke:${C.purple},stroke-width:1.5px
style PER fill:#f6f1ff,stroke:${C.purple},stroke-width:1.5px`,

  /* ---------------- VISTA DE PROCESOS ---------------- */
  checkout: `flowchart TD
INICIO((" ")):::term
A["👤 Usuario revisa el carrito"]:::user
B{"¿El carrito contiene<br/>productos?"}:::dec
C["⚙️ Sistema informa que<br/>el carrito está vacío"]:::warn
D["👤 Usuario agrega productos<br/>al carrito"]:::user
E["👤 Usuario inicia Checkout"]:::user
F["⚙️ Sistema calcula el total<br/>del carrito"]:::sys
G["⚙️ Sistema genera resumen<br/>del pedido"]:::sys
H["👤 Usuario verifica los datos<br/>del pedido"]:::user
I{"¿Confirma el<br/>pedido?"}:::dec
J["👤 Usuario cancela<br/>el Checkout"]:::user
K["⚙️ Sistema simula la<br/>verificación del pago"]:::sys
L{"¿Pago<br/>aprobado?"}:::dec
M["⚙️ Sistema informa que el<br/>pago no fue aprobado"]:::warn
N["👤 Usuario intenta<br/>nuevamente el pago"]:::user
O["⚙️ Sistema genera el pedido"]:::sys
P["⚙️ Sistema asigna<br/>identificador único"]:::sys
Q["⚙️ Sistema confirma el<br/>pedido al usuario"]:::ok
FIN(((" "))):::term
INICIO --> A --> B
B -- No --> C --> D --> A
B -- Sí --> E --> F --> G --> H --> I
I -- No --> J --> FIN
I -- Sí --> K --> L
L -- No --> M --> N --> K
L -- Sí --> O --> P --> Q --> FIN
${FLOW_CLASSES}`,

  filtrado: `flowchart TD
INICIO((" ")):::term
A["👤 Usuario accede al catálogo"]:::user
B["⚙️ Sistema muestra productos<br/>disponibles"]:::sys
C["👤 Usuario selecciona<br/>una categoría"]:::user
D["⚙️ Sistema recibe criterio<br/>de filtrado"]:::sys
E["⚙️ Sistema consulta productos<br/>asociados a la categoría"]:::sys
F{"¿Existen<br/>productos?"}:::dec
G["⚙️ Sistema muestra<br/>productos filtrados"]:::ok
H["⚙️ Sistema informa que no existen<br/>productos para el criterio"]:::warn
I["👤 Usuario modifica o<br/>elimina el filtro"]:::user
J["⚙️ Sistema actualiza<br/>el catálogo"]:::sys
FIN(((" "))):::term
INICIO --> A --> B --> C --> D --> E --> F
F -- Sí --> G --> FIN
F -- No --> H --> I --> J --> FIN
${FLOW_CLASSES}`,

  /* ---------------- VISTA FÍSICA ---------------- */
  despliegue: `flowchart TB
subgraph CLIENTE["🖥️ «device» Dispositivo del usuario"]
  BROWSER["🌐 Navegador Web"]
end
subgraph INTERNET["☁️ «network» Internet"]
  CDN["⚡ CDN<br/><small>Contenido estático y caché</small>"]
end
subgraph WEB["🗄️ «node» Servidor / Infraestructura Web"]
  WEB_SERVER["Web Server<br/><small>Entrega de la aplicación web</small>"]
end
subgraph APPS["⚙️ «node» Servidor de Aplicaciones"]
  API["API / Backend<br/><small>Servicios de la aplicación</small>"]
  AUTH["🔐 Servicio de autenticación<br/><small>JWT</small>"]
  CATALOG["Servicio de catálogo<br/><small>Productos y categorías</small>"]
  ORDER["Servicio de pedidos<br/><small>Carrito y Checkout</small>"]
  INVENTORY["Servicio de inventario<br/><small>Stock y administración</small>"]
  REVIEW["Servicio de reseñas<br/><small>Valoraciones y comentarios</small>"]
end
subgraph DATA["💾 «node» Capa de Persistencia"]
  DB[("Base de Datos")]
end
BROWSER == "HTTPS / TLS" ==> CDN
BROWSER == "HTTPS / TLS" ==> WEB_SERVER
CDN -- "Contenido estático" --> WEB_SERVER
WEB_SERVER == "HTTPS / API" ==> API
API --> AUTH & CATALOG & ORDER & INVENTORY & REVIEW
AUTH & CATALOG & ORDER & INVENTORY & REVIEW --> DB
classDef n fill:#ffffff,stroke:${C.orange},stroke-width:2px,color:${C.ink}
classDef k fill:${C.orange},stroke:${C.orange},color:#ffffff
classDef d fill:#fff1e8,stroke:${C.orange},stroke-width:2px,color:${C.ink}
class BROWSER,WEB_SERVER,AUTH,CATALOG,ORDER,INVENTORY,REVIEW n
class CDN,API k
class DB d
style CLIENTE fill:#fff7f0,stroke:${C.orange},stroke-width:1.5px
style INTERNET fill:#fff7f0,stroke:${C.orange},stroke-width:1.5px,stroke-dasharray:6 4
style WEB fill:#fff7f0,stroke:${C.orange},stroke-width:1.5px
style APPS fill:#fff7f0,stroke:${C.orange},stroke-width:1.5px
style DATA fill:#fff7f0,stroke:${C.orange},stroke-width:1.5px
linkStyle 0,1,3 stroke:${C.orange},stroke-width:3px`,

  /* ---------------- ESCENARIOS ---------------- */
  casos: `flowchart LR
CLI(["🧑 Cliente"]):::actor
USR(["👤 Usuario<br/>Registrado"]):::actor
USR -- "«generalización»" --> CLI
subgraph SYS["Sistema Sockbuster Video & Socks"]
  direction LR
  subgraph PCAT["Catálogo"]
    UC01(["Explorar catálogo"])
    UC02(["Filtrar productos"])
    UC03(["Consultar detalle<br/>de producto"])
  end
  subgraph PCOM["Compra"]
    UC04(["Comprar productos"])
    UC05(["Gestionar carrito"])
    UC06(["Agregar producto"])
    UC07(["Modificar cantidad"])
    UC08(["Realizar Checkout"])
    UC09(["Verificar datos<br/>del pedido"])
    UC10(["Simular verificación<br/>de pago"])
    UC11(["Generar pedido"])
    UC12(["Generar identificador<br/>único"])
  end
  subgraph PRES["Reseñas"]
    UC13(["Publicar reseña"])
    UC14(["Registrar valoración"])
    UC15(["Agregar comentario"])
  end
  subgraph PADM["Administración"]
    UC16(["Gestionar productos"])
    UC17(["Registrar modelo<br/>de calcetín"])
    UC18(["Asociar película<br/>o serie"])
    UC19(["Modificar precio"])
    UC20(["Gestionar inventario"])
    UC21(["Actualizar stock"])
    UC22(["Gestionar categorías"])
    UC23(["Gestionar colecciones<br/>temáticas"])
  end
end
ADM(["🛠️ Administrador"]):::actor
CLI --- UC01
CLI --- UC04
USR --- UC13
UC01 ~~~ UC02 ~~~ UC03
UC04 -. "«include»" .-> UC05
UC05 -. "«include»" .-> UC06
UC05 -. "«include»" .-> UC07
UC04 -. "«include»" .-> UC08
UC08 -. "«include»" .-> UC09
UC08 -. "«include»" .-> UC10
UC08 -. "«include»" .-> UC11
UC11 -. "«include»" .-> UC12
UC13 -. "«include»" .-> UC14
UC13 -. "«include»" .-> UC15
UC16 -. "«include»" .-> UC17
UC17 -. "«include»" .-> UC18
UC16 -. "«include»" .-> UC19
UC20 -. "«include»" .-> UC21
ADM --- UC16
ADM --- UC20
ADM --- UC22
ADM --- UC23
classDef actor fill:${C.red},stroke:${C.red},color:#ffffff,font-weight:bold
classDef uc fill:#ffffff,stroke:${C.navy},stroke-width:1.8px,color:${C.ink}
class UC01,UC02,UC03,UC04,UC05,UC06,UC07,UC08,UC09,UC10,UC11,UC12,UC13,UC14,UC15,UC16,UC17,UC18,UC19,UC20,UC21,UC22,UC23 uc
style SYS fill:#fffaf0,stroke:${C.ink},stroke-width:2px
style PCAT fill:#eef1ff,stroke:#9aa6d9
style PCOM fill:#eef1ff,stroke:#9aa6d9
style PRES fill:#eef1ff,stroke:#9aa6d9
style PADM fill:#eef1ff,stroke:#9aa6d9`
};

/* ---------------- Render ---------------- */
mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  layout: "elk",
  elk: { mergeEdges: false, nodePlacementStrategy: "NETWORK_SIMPLEX" },
  fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
  themeVariables: {
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
    fontSize: "15px",
    primaryColor: "#ffffff",
    primaryBorderColor: C.navy,
    primaryTextColor: C.ink,
    secondaryColor: "#fff3c4",
    tertiaryColor: "#f4f6ff",
    lineColor: "#5a6385",
    clusterBkg: "#f4f6ff",
    clusterBorder: "#b9c2ea",
    edgeLabelBackground: "#ffffff",
    classText: C.ink
  },
  flowchart: { curve: "linear", padding: 14, nodeSpacing: 34, rankSpacing: 48, htmlLabels: true },
  class: { padding: 10 }
});

async function renderAll() {
  if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch {} }
  const cards = document.querySelectorAll(".diagram-card[data-diagram]");
  let n = 0;
  for (const card of cards) {
    const key = card.dataset.diagram;
    const code = DIAGRAMS[key];
    const canvas = card.querySelector(".diagram-canvas");
    const src = card.querySelector(".diagram-source");
    if (src) src.textContent = code;
    try {
      const toRender = (key === "filtrado" || key === "checkout") ? "---\nconfig:\n  layout: dagre\n---\n" + code : code;
      const { svg } = await mermaid.render("mmd-" + key + "-" + n++, toRender);
      canvas.innerHTML = `<div class="mermaid">${svg}</div>`;
    } catch (err) {
      console.error(key, err);
      const orig = card.dataset.original;
      canvas.innerHTML = orig ? `<img class="original" src="${orig}" alt="Diagrama ${key}" loading="lazy">` : `<p>No fue posible renderizar el diagrama.</p>`;
    }
  }
}

/* ---------------- Herramientas de cada tarjeta ---------------- */
const lb = document.getElementById("lightbox");
const lbBody = lb.querySelector(".lb-body");
let zoom = 1;
const applyZoom = () => { const el = lbBody.firstElementChild; if (el) el.style.width = zoom * 100 + "%"; };

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (btn) {
    const card = btn.closest(".diagram-card");
    const act = btn.dataset.action;
    if (act === "source") {
      const on = card.classList.toggle("show-source");
      btn.setAttribute("aria-pressed", on);
    }
    if (act === "expand") {
      const svg = card.querySelector(".diagram-canvas svg, .diagram-canvas img");
      if (!svg) return;
      const clone = svg.cloneNode(true);
      clone.removeAttribute("style");
      clone.style.maxWidth = "none";
      clone.style.height = "auto";
      lbBody.innerHTML = "";
      lbBody.appendChild(clone);
      zoom = 1; applyZoom();
      lb.querySelector(".lb-title").textContent = card.querySelector("h3").textContent;
      lb.showModal();
    }
    if (act === "original") {
      lbBody.innerHTML = `<img src="${card.dataset.original}" alt="Imagen original del diagrama" style="max-height:none;width:100%">`;
      zoom = 1; applyZoom();
      lb.querySelector(".lb-title").textContent = card.querySelector("h3").textContent + " — imagen original";
      lb.showModal();
    }
    return;
  }
  const z = e.target.closest("[data-zoom]");
  if (z) { zoom = Math.min(4, Math.max(0.5, zoom + +z.dataset.zoom)); applyZoom(); return; }
  if (e.target.closest("[data-lb-close]") || e.target === lb) lb.close();
});

/* ---------------- Navegación activa por vista ---------------- */
const links = [...document.querySelectorAll(".view-nav a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));
}

renderAll();
