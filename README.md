# Sockbuster Video & Socks

Prototipo web de la tienda **Sockbuster Video & Socks** — Evaluación Sumativa 03, asignatura *Modelamiento de soluciones informáticas* (TI3025), Ingeniería en Informática, sede Punta Arenas.

**Desarrollado por:** Luis Hernández Andrade

## 🌐 Sitio publicado

👉 **https://website-from-diagrams.netlify.app**

## Páginas

| Página | Contenido |
| --- | --- |
| [`index.html`](index.html) | Presentación de la marca, banner principal y nombre del estudiante. |
| [`catalogo.html`](catalogo.html) | Catálogo interactivo: filtros por categoría, talla, precio y stock; ficha de producto con reseñas (1 a 5 estrellas); carrito y checkout simulado con identificador único de pedido. |
| [`diagramas.html`](diagramas.html) | Documentación técnica organizada según el modelo 4+1: Vista Lógica, Vista de Desarrollo, Vista de Procesos, Vista Física y Escenarios, con matriz de trazabilidad. |

## Diagramas

- Fuentes originales (Mermaid / PlantUML): [`docs/diagramas/`](docs/diagramas)
- Imágenes originales: [`assets/diagramas/`](assets/diagramas)
- Versión renderizada en vivo con estilo unificado: [`js/diagramas.js`](js/diagramas.js)

| Vista 4+1 | Diagrama |
| --- | --- |
| Lógica | Diagrama de clases |
| Desarrollo | Diagrama de componentes |
| Procesos | Actividades (filtrado y checkout) |
| Física | Diagrama de despliegue |
| Escenarios | Diagrama de casos de uso + historias de usuario |

## Tecnologías

HTML5, CSS3 y JavaScript sin frameworks; [Mermaid](https://mermaid.js.org) para el renderizado de diagramas. Publicado en Netlify (HTTPS + CDN global).

> Prototipo académico: el pago es simulado y el carrito, las reseñas y el stock se guardan en el navegador (`localStorage`).

## Ejecutar localmente

Basta con servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```
