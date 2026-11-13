/* =========================================================
   Sockbuster — datos del catálogo (prototipo) + utilidades
   ========================================================= */
window.SB = window.SB || {};

SB.CATEGORIAS = [
  { id: "scifi",  nombre: "Ciencia Ficción",  color: "#1d2f78", acento: "#2ec4b6", desc: "Naves, androides y viajes en el tiempo para tus pies." },
  { id: "terror", nombre: "Terror 80s",        color: "#3b0d1a", acento: "#ef3b3b", desc: "Sustos de videoclub, máscaras y noches de VHS." },
  { id: "drama",  nombre: "Series de Drama",   color: "#2a2141", acento: "#ffc81e", desc: "Para maratones intensas y finales de temporada." },
  { id: "anim",   nombre: "Animación",         color: "#0e6b63", acento: "#ffe28a", desc: "Dibujos de sábado por la mañana, en algodón." }
];

SB.TALLAS = ["S", "M", "L", "XL"];

/* Obras: títulos ficticios inspirados en géneros clásicos */
SB.PRODUCTOS = [
  { id: 1,  nombre: "Calcetín Odisea Nebular",      categoria: "scifi",  coleccion: "Galaxia VHS",        obra: "Odisea Nebular (película, 1979)",        precio: 8990,  stock: 24, tallas: ["S","M","L","XL"], patron: "stars",   c1: "#13215a", c2: "#ffc81e", c3: "#2ec4b6", motivo: "planet", desc: "Algodón peinado con estrellas tejidas y un planeta anillado en el tobillo. Ideal para viajes interestelares (o al trabajo)." },
  { id: 2,  nombre: "Androide de Neón",             categoria: "scifi",  coleccion: "Galaxia VHS",        obra: "Ciudad Neón 2049 (película, 1982)",     precio: 9490,  stock: 6,  tallas: ["M","L"],         patron: "grid",    c1: "#0b1640", c2: "#ff4fd8", c3: "#2ec4b6", motivo: "bolt",   desc: "Cuadrícula retrofuturista con brillo neón. Puño reforzado y talón acolchado." },
  { id: 3,  nombre: "Regreso al Ayer 88 mph",       categoria: "scifi",  coleccion: "Viajes en el tiempo", obra: "Regreso al Ayer (película, 1985)",      precio: 10990, stock: 15, tallas: ["S","M","L","XL"], patron: "zigzag",  c1: "#2b2f3a", c2: "#ff7a1a", c3: "#ffe28a", motivo: "bolt",   desc: "Rayos de 1,21 gigavatios en tejido térmico. Edición numerada para coleccionistas." },
  { id: 4,  nombre: "Medianoche en el Campamento",  categoria: "terror", coleccion: "Noches de VHS",      obra: "Campamento Lago Gris (película, 1980)", precio: 8490,  stock: 0,  tallas: ["M","L","XL"],    patron: "stripes", c1: "#3b0d1a", c2: "#ef3b3b", c3: "#f5f5f5", motivo: "skull",  desc: "Rayas sangre y hueso para fogatas con historias de miedo. Agotado temporalmente." },
  { id: 5,  nombre: "La Casa del Pasillo Largo",    categoria: "terror", coleccion: "Noches de VHS",      obra: "El Pasillo (película, 1980)",           precio: 9990,  stock: 11, tallas: ["S","M","L"],     patron: "hex",     c1: "#7a1220", c2: "#f59e0b", c3: "#1c1c1c", motivo: "eye",    desc: "Patrón de alfombra hexagonal de hotel embrujado. Tejido grueso para pasillos fríos." },
  { id: 6,  nombre: "Pesadilla Calle Olmos",        categoria: "terror", coleccion: "Noches de VHS",      obra: "Pesadilla en Calle Olmos (película, 1984)", precio: 8990, stock: 3, tallas: ["M","L"],        patron: "stripes", c1: "#7d1d1d", c2: "#2f5d34", c3: "#e7d8b0", motivo: "moon",   desc: "Rayas verde y burdeos de suéter clásico. Para no dormirse… o sí." },
  { id: 7,  nombre: "Química Azul",                 categoria: "drama",  coleccion: "Maratón de Temporada", obra: "Química Azul (serie, 2008)",          precio: 9490,  stock: 18, tallas: ["S","M","L","XL"], patron: "hex",     c1: "#0f3d2e", c2: "#7dd3fc", c3: "#fef3c7", motivo: "flask",  desc: "Estructura molecular en azul cristal. Fórmula secreta: 80% algodón, 20% drama." },
  { id: 8,  nombre: "Trono de Invierno",            categoria: "drama",  coleccion: "Maratón de Temporada", obra: "Reinos de Hielo (serie, 2011)",       precio: 11490, stock: 9,  tallas: ["M","L","XL"],    patron: "zigzag",  c1: "#1e2433", c2: "#cbd5e1", c3: "#b91c1c", motivo: "crown",  desc: "Lana merino para cuando llega el invierno. Puño con corona bordada." },
  { id: 9,  nombre: "Los Hermanos Corleón",         categoria: "drama",  coleccion: "Clásicos de Oro",    obra: "La Familia (película, 1972)",           precio: 12990, stock: 4,  tallas: ["L","XL"],        patron: "dots",    c1: "#111111", c2: "#d4af37", c3: "#7f1d1d", motivo: "rose",   desc: "Una oferta que tus pies no podrán rechazar. Negro elegante con lunares dorados." },
  { id: 10, nombre: "Ratón de Sábado",              categoria: "anim",   coleccion: "Mañanas de Cartoon", obra: "El Show del Ratón (animación, 1990)",   precio: 7490,  stock: 30, tallas: ["S","M","L"],     patron: "dots",    c1: "#ef3b3b", c2: "#111111", c3: "#ffe28a", motivo: "star",   desc: "Lunares clásicos de dibujo animado. Perfectos para desayunar frente a la TV." },
  { id: 11, nombre: "Robot Gigante Shin",           categoria: "anim",   coleccion: "Mañanas de Cartoon", obra: "Robot Gigante (anime, 1995)",           precio: 9990,  stock: 13, tallas: ["S","M","L","XL"], patron: "grid",    c1: "#6d28d9", c2: "#22c55e", c3: "#fef08a", motivo: "bolt",   desc: "Morado y verde de unidad de combate. Talón reforzado para pilotos." },
  { id: 12, nombre: "Familia Amarilla",             categoria: "anim",   coleccion: "Clásicos de Oro",    obra: "Springvale (animación, 1989)",          precio: 8490,  stock: 2,  tallas: ["M","L"],         patron: "stars",   c1: "#ffd60a", c2: "#1d4ed8", c3: "#ffffff", motivo: "donut",  desc: "Amarillo icónico con donas glaseadas. ¡Mmm… calcetines!" }
];

SB.RESENAS_SEED = {
  1: [{ autor: "Camila R.", puntuacion: 5, comentario: "El planeta del tobillo es precioso. Muy suaves.", fecha: "2026-10-02" },
      { autor: "Diego M.", puntuacion: 4, comentario: "Buena calidad, la talla M me quedó perfecta.", fecha: "2026-10-18" }],
  3: [{ autor: "Javiera P.", puntuacion: 5, comentario: "Los regalé y fueron un éxito total.", fecha: "2026-09-21" }],
  5: [{ autor: "Tomás V.", puntuacion: 5, comentario: "El patrón es idéntico a la alfombra, me encanta.", fecha: "2026-10-30" },
      { autor: "Fernanda S.", puntuacion: 3, comentario: "Diseño top, pero algo gruesos para verano.", fecha: "2026-11-02" }],
  7: [{ autor: "Matías L.", puntuacion: 4, comentario: "Color muy fiel a la foto.", fecha: "2026-08-12" }],
  9: [{ autor: "Ignacio B.", puntuacion: 5, comentario: "Elegantes, los uso con traje.", fecha: "2026-10-05" }],
  10: [{ autor: "Sofía A.", puntuacion: 5, comentario: "Mis favoritos para el domingo.", fecha: "2026-11-08" }],
  12: [{ autor: "Benjamín C.", puntuacion: 4, comentario: "Las donas se ven increíbles.", fecha: "2026-11-01" }]
};

SB.fmt = (n) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);
SB.cat = (id) => SB.CATEGORIAS.find((c) => c.id === id);
SB.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Generador de ilustración SVG de calcetín ---------- */
SB.sockSVG = function (p, uid) {
  const id = "s" + p.id + "-" + (uid || Math.random().toString(36).slice(2, 7));
  const { c1, c2, c3 } = p;
  const patterns = {
    stripes: `<pattern id="pt${id}" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="${c1}"/><rect y="12" width="20" height="8" fill="${c2}"/></pattern>`,
    dots:    `<pattern id="pt${id}" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="${c1}"/><circle cx="5" cy="5" r="3.2" fill="${c2}"/><circle cx="14" cy="14" r="3.2" fill="${c2}"/></pattern>`,
    stars:   `<pattern id="pt${id}" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="${c1}"/><path d="M6 2l1.3 3 3.2.3-2.4 2.1.7 3.1L6 8.9 3.2 10.5l.7-3.1L1.5 5.3l3.2-.3z" fill="${c2}"/><circle cx="18" cy="17" r="1.4" fill="${c3}"/></pattern>`,
    zigzag:  `<pattern id="pt${id}" width="20" height="14" patternUnits="userSpaceOnUse"><rect width="20" height="14" fill="${c1}"/><path d="M0 10 L5 4 L10 10 L15 4 L20 10" stroke="${c2}" stroke-width="3" fill="none"/></pattern>`,
    grid:    `<pattern id="pt${id}" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="${c1}"/><path d="M16 0H0V16" stroke="${c2}" stroke-width="1.6" fill="none" opacity=".85"/></pattern>`,
    hex:     `<pattern id="pt${id}" width="24" height="21" patternUnits="userSpaceOnUse"><rect width="24" height="21" fill="${c1}"/><path d="M6 0l6 0 3 5.2-3 5.2H6L3 5.2z M18 10.5h6l3 5.2-3 5.2h-6l-3-5.2z" fill="none" stroke="${c2}" stroke-width="1.8"/></pattern>`
  };
  const motifs = {
    planet: `<circle cx="57" cy="62" r="11" fill="${c2}"/><ellipse cx="57" cy="62" rx="19" ry="5" fill="none" stroke="${c3}" stroke-width="3" transform="rotate(-18 57 62)"/>`,
    bolt:   `<path d="M60 46 L48 66 H57 L52 82 L67 58 H58 Z" fill="${c3}" stroke="${c1}" stroke-width="1.5"/>`,
    skull:  `<circle cx="57" cy="60" r="12" fill="${c3}"/><rect x="51" y="66" width="12" height="9" rx="2" fill="${c3}"/><circle cx="52.5" cy="59" r="3.2" fill="${c1}"/><circle cx="61.5" cy="59" r="3.2" fill="${c1}"/>`,
    eye:    `<ellipse cx="57" cy="62" rx="15" ry="9" fill="${c3}" stroke="${c2}" stroke-width="2.5"/><circle cx="57" cy="62" r="5" fill="${c2}"/>`,
    moon:   `<path d="M63 48 a14 14 0 1 0 0 28 a11 11 0 1 1 0 -28z" fill="${c3}"/>`,
    flask:  `<path d="M53 46 h8 v10 l8 16 a4 4 0 0 1 -4 6 h-16 a4 4 0 0 1 -4 -6 l8 -16z" fill="${c3}" stroke="${c1}" stroke-width="1.5"/><path d="M48 70 h18 l3 5 a3 3 0 0 1-3 3 H48 a3 3 0 0 1-3-3z" fill="${c2}"/>`,
    crown:  `<path d="M44 72 L46 54 L52 62 L57 50 L62 62 L68 54 L70 72 Z" fill="${c3}" stroke="${c1}" stroke-width="1.5"/>`,
    rose:   `<circle cx="57" cy="60" r="10" fill="${c3}"/><path d="M57 70 v12 M57 76 q-7 -2 -9 -7" stroke="#2f5d34" stroke-width="3" fill="none"/><circle cx="57" cy="60" r="4" fill="${c1}" opacity=".4"/>`,
    star:   `<path d="M57 46l4 9 9.8.9-7.4 6.5 2.2 9.6L57 67l-8.6 5 2.2-9.6-7.4-6.5 9.8-.9z" fill="${c3}" stroke="${c1}" stroke-width="1.5"/>`,
    donut:  `<circle cx="57" cy="62" r="13" fill="#e9a96b"/><circle cx="57" cy="62" r="11" fill="#ff6fb5"/><circle cx="57" cy="62" r="4.5" fill="${c1}"/><path d="M50 56l2 1 M61 55l1 2 M64 64l2 0 M51 67l1 2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`
  };
  const sock = "M34 22 H80 V98 Q80 110 90 116 L106 124 Q122 132 116 148 Q109 162 90 157 L50 145 Q30 139 33 116 Z";
  return `<svg viewBox="0 0 140 170" role="img" aria-label="Ilustración: ${SB.esc(p.nombre)}">
    <defs>${patterns[p.patron] || patterns.stripes}<clipPath id="cl${id}"><path d="${sock}"/></clipPath></defs>
    <g clip-path="url(#cl${id})">
      <rect width="140" height="170" fill="url(#pt${id})"/>
      <ellipse cx="114" cy="146" rx="20" ry="18" fill="${c3}"/>
      <path d="M33 104 Q30 140 52 146 L60 148 Q44 132 52 106 Z" fill="${c3}"/>
      <rect x="30" y="20" width="54" height="16" fill="${c3}"/>
      <rect x="30" y="36" width="54" height="5" fill="${c2}"/>
      ${motifs[p.motivo] || ""}
    </g>
    <path d="${sock}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="2.5"/>
    <path d="M38 24 V36 M46 24 V36 M54 24 V36 M62 24 V36 M70 24 V36 M78 24 V36" stroke="rgba(0,0,0,.12)" stroke-width="2"/>
  </svg>`;
};

/* ---------- Carrito (estado del cliente) ---------- */
SB.cart = {
  key: "sb-cart",
  get() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch { return []; } },
  set(items) { localStorage.setItem(this.key, JSON.stringify(items)); document.dispatchEvent(new CustomEvent("cart:change")); },
  count() { return this.get().reduce((a, i) => a + i.cantidad, 0); }
};

/* ---------- Header común ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  const updateCount = () => document.querySelectorAll(".cart-count").forEach((el) => (el.textContent = SB.cart.count()));
  updateCount();
  document.addEventListener("cart:change", updateCount);

  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

SB.toast = function (msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(SB._tt);
  SB._tt = setTimeout(() => t.classList.remove("show"), 2400);
};
