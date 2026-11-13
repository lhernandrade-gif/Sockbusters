/* =========================================================
   Sockbuster — Catálogo interactivo (RF01, RF02, RF04)
   ========================================================= */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = SB.esc;

  /* ---------- Estado persistido en el navegador (prototipo) ---------- */
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
  };
  const stockOf = (p) => { const s = store.get("sb-stock", {}); return s[p.id] ?? p.stock; };
  const setStock = (id, n) => { const s = store.get("sb-stock", {}); s[id] = n; store.set("sb-stock", s); };
  const reviewsOf = (id) => [...(SB.RESENAS_SEED[id] || []), ...(store.get("sb-reviews", {})[id] || [])];
  const rating = (id) => { const r = reviewsOf(id); return r.length ? r.reduce((a, x) => a + x.puntuacion, 0) / r.length : 0; };
  const starStr = (v) => { const n = Math.round(v); return "★".repeat(n) + `<span class="muted">${"★".repeat(5 - n)}</span>`; };
  const session = () => store.get("sb-user", null);

  /* ---------- Filtros ---------- */
  const params = new URLSearchParams(location.search);
  const state = {
    q: "", cat: SB.CATEGORIAS.some((c) => c.id === params.get("categoria")) ? params.get("categoria") : "all",
    size: "all", max: 13000, instock: false, sort: "rel"
  };

  const catChips = $("#cat-chips");
  catChips.innerHTML = [{ id: "all", nombre: "Todas" }, ...SB.CATEGORIAS]
    .map((c) => `<button type="button" class="chip-btn" data-cat="${c.id}">${c.nombre}</button>`).join("");
  const sizeChips = $("#size-chips");
  sizeChips.innerHTML = ["all", ...SB.TALLAS]
    .map((t) => `<button type="button" class="chip-btn" data-size="${t}">${t === "all" ? "Todas" : t}</button>`).join("");

  catChips.addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) { state.cat = b.dataset.cat; render(); } });
  sizeChips.addEventListener("click", (e) => { const b = e.target.closest("[data-size]"); if (b) { state.size = b.dataset.size; render(); } });
  $("#q").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); render(); });
  $("#price").addEventListener("input", (e) => { state.max = +e.target.value; render(); });
  $("#instock").addEventListener("change", (e) => { state.instock = e.target.checked; render(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  $("#reset").addEventListener("click", resetFilters);
  $("#filters-toggle").addEventListener("click", () => $("#filters").classList.toggle("open"));

  function resetFilters() {
    Object.assign(state, { q: "", cat: "all", size: "all", max: 13000, instock: false });
    $("#q").value = ""; $("#price").value = 13000; $("#instock").checked = false;
    render();
  }

  function filtered() {
    let list = SB.PRODUCTOS.filter((p) =>
      (state.cat === "all" || p.categoria === state.cat) &&
      (state.size === "all" || p.tallas.includes(state.size)) &&
      p.precio <= state.max &&
      (!state.instock || stockOf(p) > 0) &&
      (!state.q || (p.nombre + " " + p.obra + " " + p.coleccion).toLowerCase().includes(state.q))
    );
    if (state.sort === "asc") list.sort((a, b) => a.precio - b.precio);
    if (state.sort === "desc") list.sort((a, b) => b.precio - a.precio);
    if (state.sort === "rating") list.sort((a, b) => rating(b.id) - rating(a.id));
    return list;
  }

  function stockBadge(p) {
    const s = stockOf(p);
    if (s <= 0) return `<span class="stock-badge out">Agotado</span>`;
    if (s <= 5) return `<span class="stock-badge low">¡Últimas ${s}!</span>`;
    return `<span class="stock-badge">Stock: ${s}</span>`;
  }

  function render() {
    catChips.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === state.cat));
    sizeChips.querySelectorAll("[data-size]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.size === state.size));
    $("#price-out").textContent = SB.fmt(state.max);

    const list = filtered();
    $("#count").textContent = `${list.length} de ${SB.PRODUCTOS.length} modelos`;

    const act = [];
    if (state.cat !== "all") act.push(SB.cat(state.cat).nombre);
    if (state.size !== "all") act.push("Talla " + state.size);
    if (state.max < 13000) act.push("≤ " + SB.fmt(state.max));
    if (state.instock) act.push("Con stock");
    if (state.q) act.push(`“${esc(state.q)}”`);
    $("#active").innerHTML = act.map((a) => `<span class="chip">${a}</span>`).join("");

    const grid = $("#grid");
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state">
        <p class="display">Sin resultados en cartelera</p>
        <p>No existen productos para el criterio seleccionado. Modifica o elimina los filtros.</p>
        <button class="btn btn-primary" type="button" id="empty-reset">Limpiar filtros</button></div>`;
      $("#empty-reset").addEventListener("click", resetFilters);
      return;
    }
    grid.innerHTML = list.map((p, i) => {
      const c = SB.cat(p.categoria);
      const r = reviewsOf(p.id);
      const out = stockOf(p) <= 0;
      return `<article class="product-card" style="animation-delay:${i * 40}ms">
        <button class="product-media" data-open="${p.id}" aria-label="Ver detalle de ${esc(p.nombre)}"
          style="background: radial-gradient(circle at 50% 40%, ${c.acento}55, ${c.color})">
          <span class="tag">${c.nombre}</span>${stockBadge(p)}${SB.sockSVG(p, "g")}
        </button>
        <div class="product-body">
          <h3>${esc(p.nombre)}</h3>
          <span class="product-obra">🎞 ${esc(p.obra)}</span>
          <span class="stars" aria-label="Valoración ${rating(p.id).toFixed(1)} de 5">${starStr(rating(p.id))} <small style="color:var(--muted)">(${r.length})</small></span>
          <div class="sizes">${SB.TALLAS.map((t) => `<span class="size-pill" style="${p.tallas.includes(t) ? "" : "opacity:.3;text-decoration:line-through"}">${t}</span>`).join("")}</div>
          <div class="product-meta"><span class="price">${SB.fmt(p.precio)}</span></div>
          <div class="card-actions">
            <button class="btn btn-dark btn-sm" data-open="${p.id}">Detalles</button>
            <button class="btn btn-primary btn-sm" data-quick="${p.id}" ${out ? "disabled" : ""}>${out ? "Agotado" : "+ Carrito"}</button>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  $("#grid").addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) return openDetail(+o.dataset.open);
    const q = e.target.closest("[data-quick]");
    if (q) { const p = SB.PRODUCTOS.find((x) => x.id === +q.dataset.quick); addToCart(p, p.tallas[0], 1); }
  });

  /* ---------- Ficha de producto + reseñas (RF04) ---------- */
  const detail = $("#detail");
  let current = null;

  function openDetail(id) {
    const p = SB.PRODUCTOS.find((x) => x.id === id);
    current = { p, talla: p.tallas[0], qty: 1 };
    drawDetail();
    detail.showModal();
  }

  function drawDetail() {
    const { p, talla, qty } = current;
    const c = SB.cat(p.categoria);
    const s = stockOf(p);
    const r = reviewsOf(p.id).slice().sort((a, b) => b.fecha.localeCompare(a.fecha));
    const u = session();
    $("#detail-content").innerHTML = `
      <div class="detail-media" style="background: radial-gradient(circle at 50% 40%, ${c.acento}66, ${c.color})">${SB.sockSVG(p, "d")}</div>
      <div class="detail-info">
        <p class="eyebrow">${c.nombre} · ${esc(p.coleccion)}</p>
        <h2 id="detail-title">${esc(p.nombre)}</h2>
        <span class="stars">${starStr(rating(p.id))}</span> <small>${rating(p.id).toFixed(1)} · ${r.length} reseña(s)</small>
        <p class="price" style="margin:.6rem 0">${SB.fmt(p.precio)}</p>
        <p>${esc(p.desc)}</p>
        <dl class="spec-list">
          <dt>Inspirado en</dt><dd>${esc(p.obra)}</dd>
          <dt>Colección</dt><dd>${esc(p.coleccion)}</dd>
          <dt>Stock</dt><dd>${s > 0 ? s + " unidades" : "Agotado"}</dd>
          <dt>SKU</dt><dd>SB-${String(p.id).padStart(4, "0")}</dd>
        </dl>
        <strong>Talla</strong>
        <div class="size-select" role="group" aria-label="Seleccionar talla">
          ${p.tallas.map((t) => `<button type="button" data-talla="${t}" aria-pressed="${t === talla}">${t}</button>`).join("")}
        </div>
        <div class="buy-row">
          <div class="qty" aria-label="Cantidad">
            <button type="button" data-dq="-1" aria-label="Disminuir">−</button><output>${qty}</output><button type="button" data-dq="1" aria-label="Aumentar">+</button>
          </div>
          <button class="btn btn-primary" id="add-detail" ${s <= 0 ? "disabled" : ""}>${s <= 0 ? "Agotado" : "Agregar al carrito · " + SB.fmt(p.precio * qty)}</button>
        </div>

        <section class="reviews" aria-labelledby="rv-title">
          <h3 id="rv-title">Reseñas de fanáticos</h3>
          ${r.length ? r.map((x) => `<div class="review">
              <div class="review-head"><strong>${esc(x.autor)}</strong><span class="stars">${starStr(x.puntuacion)}</span></div>
              <small style="color:var(--muted)">${new Date(x.fecha + "T12:00").toLocaleDateString("es-CL")}</small>
              <p>${esc(x.comentario)}</p></div>`).join("") : `<p class="login-note">Aún no hay reseñas. ¡Sé el primero!</p>`}
          ${u ? `
          <form class="review-form" id="review-form">
            <span class="login-note">Publicando como <strong>${esc(u.nombre)}</strong> · <button type="button" class="link-btn" id="logout">Cerrar sesión</button></span>
            <div>
              <strong style="font-size:.85rem">Tu valoración</strong>
              <div class="star-input">
                ${[5, 4, 3, 2, 1].map((n) => `<input type="radio" name="puntuacion" id="st${n}" value="${n}" ${n === 5 ? "required" : ""}><label for="st${n}" title="${n} estrella(s)">★</label>`).join("")}
              </div>
            </div>
            <textarea class="search" name="comentario" maxlength="400" required placeholder="¿Qué te pareció el diseño y la calidad?"></textarea>
            <button class="btn btn-dark btn-sm" type="submit">Publicar reseña</button>
          </form>` : `
          <form class="review-form" id="login-form">
            <span class="login-note">Solo usuarios registrados pueden publicar reseñas. Inicia sesión (demo):</span>
            <input class="search" name="nombre" required maxlength="40" placeholder="Tu nombre" autocomplete="name">
            <input class="search" name="email" type="email" required placeholder="tu@email.cl" autocomplete="email">
            <button class="btn btn-dark btn-sm" type="submit">Iniciar sesión</button>
          </form>`}
        </section>
      </div>`;
  }

  detail.addEventListener("click", (e) => {
    if (e.target === detail || e.target.closest("[data-close]")) return detail.close();
    const t = e.target.closest("[data-talla]");
    if (t) { current.talla = t.dataset.talla; return drawDetail(); }
    const d = e.target.closest("[data-dq]");
    if (d) {
      const max = Math.max(1, stockOf(current.p));
      current.qty = Math.min(max, Math.max(1, current.qty + +d.dataset.dq));
      return drawDetail();
    }
    if (e.target.id === "add-detail") { addToCart(current.p, current.talla, current.qty); return; }
    if (e.target.id === "logout") { localStorage.removeItem("sb-user"); drawDetail(); }
  });

  detail.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    if (e.target.id === "login-form") {
      store.set("sb-user", { nombre: f.get("nombre").trim(), email: f.get("email").trim() });
      SB.toast("Sesión iniciada ✔");
      return drawDetail();
    }
    if (e.target.id === "review-form") {
      const puntuacion = +f.get("puntuacion");
      if (!(puntuacion >= 1 && puntuacion <= 5)) return SB.toast("Selecciona entre 1 y 5 estrellas");
      const all = store.get("sb-reviews", {});
      (all[current.p.id] = all[current.p.id] || []).push({
        autor: session().nombre, puntuacion, comentario: f.get("comentario").trim(), fecha: new Date().toISOString().slice(0, 10)
      });
      store.set("sb-reviews", all);
      SB.toast("¡Gracias por tu reseña! ⭐");
      drawDetail(); render();
    }
  });

  /* ---------- Carrito (RF02) ---------- */
  const cartDlg = $("#cart");

  function addToCart(p, talla, cantidad) {
    const items = SB.cart.get();
    const it = items.find((i) => i.id === p.id && i.talla === talla);
    const inCart = items.filter((i) => i.id === p.id).reduce((a, i) => a + i.cantidad, 0);
    if (inCart + cantidad > stockOf(p)) return SB.toast("No hay stock suficiente para esa cantidad");
    if (it) it.cantidad += cantidad; else items.push({ id: p.id, talla, cantidad });
    SB.cart.set(items);
    SB.toast(`Agregado: ${p.nombre} (${talla}) ×${cantidad}`);
  }

  const lines = () => SB.cart.get().map((i) => ({ ...i, p: SB.PRODUCTOS.find((x) => x.id === i.id) })).filter((l) => l.p);
  const total = () => lines().reduce((a, l) => a + l.p.precio * l.cantidad, 0);

  function drawCart() {
    const ls = lines();
    if (!ls.length) {
      $("#cart-body").innerHTML = `<div class="empty-state" style="margin-top:1rem"><p class="display">Carrito vacío</p><p>Tu carrito no contiene productos. ¡Agrega algunos calcetines de película!</p></div>`;
      $("#cart-foot").innerHTML = `<button class="btn btn-primary" data-close style="width:100%">Seguir explorando</button>`;
      return;
    }
    $("#cart-body").innerHTML = ls.map((l, idx) => {
      const c = SB.cat(l.p.categoria);
      return `<div class="cart-item">
        <div class="cart-thumb" style="background:${c.color}">${SB.sockSVG(l.p, "c" + idx)}</div>
        <div><h4>${esc(l.p.nombre)}</h4><small>Talla ${l.talla} · ${SB.fmt(l.p.precio)} c/u</small><br>
          <button class="link-btn" data-rm="${idx}">Eliminar</button></div>
        <div style="text-align:right">
          <div class="qty"><button data-cq="${idx}" data-d="-1" aria-label="Disminuir">−</button><span>${l.cantidad}</span><button data-cq="${idx}" data-d="1" aria-label="Aumentar">+</button></div>
          <div style="font-weight:700;margin-top:.3rem">${SB.fmt(l.p.precio * l.cantidad)}</div>
        </div></div>`;
    }).join("");
    $("#cart-foot").innerHTML = `
      <div class="total-row"><span>Subtotal</span><span>${SB.fmt(total())}</span></div>
      <div class="total-row"><span>Envío</span><span>${total() >= 20000 ? "Gratis" : SB.fmt(2990)}</span></div>
      <div class="total-row big"><span>Total</span><span>${SB.fmt(total() + (total() >= 20000 ? 0 : 2990))}</span></div>
      <button class="btn btn-primary" id="go-checkout" style="width:100%;margin-top:.6rem">Iniciar checkout →</button>
      <button class="link-btn" id="clear-cart" style="margin-top:.7rem">Vaciar carrito</button>`;
  }

  function openCart() { drawCart(); cartDlg.showModal(); }
  $("#open-cart").addEventListener("click", openCart);
  if (location.hash === "#carrito") setTimeout(openCart, 50);
  document.addEventListener("cart:change", () => { if (cartDlg.open) drawCart(); });

  cartDlg.addEventListener("click", (e) => {
    if (e.target === cartDlg || e.target.closest("[data-close]")) return cartDlg.close();
    const items = SB.cart.get();
    const q = e.target.closest("[data-cq]");
    if (q) {
      const it = items[+q.dataset.cq];
      const p = SB.PRODUCTOS.find((x) => x.id === it.id);
      const other = items.filter((i) => i !== it && i.id === it.id).reduce((a, i) => a + i.cantidad, 0);
      const next = it.cantidad + +q.dataset.d;
      if (next + other > stockOf(p)) return SB.toast("Stock máximo alcanzado");
      if (next <= 0) items.splice(+q.dataset.cq, 1); else it.cantidad = next;
      return SB.cart.set(items);
    }
    const rm = e.target.closest("[data-rm]");
    if (rm) { items.splice(+rm.dataset.rm, 1); return SB.cart.set(items); }
    if (e.target.id === "clear-cart") return SB.cart.set([]);
    if (e.target.id === "go-checkout") { cartDlg.close(); startCheckout(); }
  });

  /* ---------- Checkout simulado (según diagrama de actividades) ---------- */
  const co = $("#checkout");
  const coBody = $("#checkout-body");
  let order = null;

  const steps = (n) => `<div class="steps" aria-hidden="true">${[1, 2, 3].map((i) => `<span class="${i <= n ? "on" : ""}"></span>`).join("")}</div>`;

  function startCheckout() {
    const ls = lines();
    if (!ls.length) return openCart();
    const sub = total(); const envio = sub >= 20000 ? 0 : 2990;
    const u = session() || {};
    order = { items: ls, sub, envio, total: sub + envio };
    coBody.innerHTML = `${steps(1)}
      <p class="eyebrow">Paso 1 · Resumen del pedido</p>
      <h2 id="checkout-title" class="display" style="font-weight:400">Verifica tu pedido</h2>
      <table class="summary-table">
        <thead><tr><th>Producto</th><th>Cant.</th><th>Subtotal</th></tr></thead>
        <tbody>${ls.map((l) => `<tr><td>${esc(l.p.nombre)} <small>(${l.talla})</small></td><td>${l.cantidad}</td><td>${SB.fmt(l.p.precio * l.cantidad)}</td></tr>`).join("")}</tbody>
        <tfoot>
          <tr><td colspan="2">Envío</td><td>${envio ? SB.fmt(envio) : "Gratis"}</td></tr>
          <tr><th colspan="2">Total</th><th>${SB.fmt(order.total)}</th></tr>
        </tfoot>
      </table>
      <form id="co-form" class="form-grid" style="margin-top:1.2rem">
        <label>Nombre completo<input class="search" name="nombre" required value="${esc(u.nombre || "")}" autocomplete="name"></label>
        <label>Email<input class="search" name="email" type="email" required value="${esc(u.email || "")}" autocomplete="email"></label>
        <label>Dirección de envío<input class="search" name="direccion" required placeholder="Av. Siempre Viva 742, Punta Arenas" autocomplete="street-address"></label>
        <label>Tarjeta (simulada)<input class="search" name="tarjeta" required inputmode="numeric" pattern="[0-9 ]{12,19}" placeholder="4111 1111 1111 1111"></label>
        <div class="buy-row" style="justify-content:space-between;margin-top:.4rem">
          <button type="button" class="btn btn-ghost btn-sm" id="co-cancel">Cancelar</button>
          <button type="submit" class="btn btn-primary">Confirmar y pagar ${SB.fmt(order.total)}</button>
        </div>
      </form>`;
    if (!co.open) co.showModal();
  }

  function simulatePayment() {
    coBody.innerHTML = `${steps(2)}
      <p class="eyebrow">Paso 2 · Verificación de pago</p>
      <h2 class="display" style="font-weight:400">Procesando pago…</h2>
      <div class="spinner" role="progressbar" aria-label="Procesando"></div>
      <p style="text-align:center;color:var(--muted)">Simulando la verificación con el sistema de pagos. No se realizan cobros reales.</p>`;
    setTimeout(() => {
      if (!co.open) return;
      const approved = Math.random() < 0.8;
      if (!approved) {
        coBody.innerHTML = `${steps(2)}
          <p class="eyebrow">Paso 2 · Verificación de pago</p>
          <h2 class="display" style="font-weight:400">Pago no aprobado</h2>
          <div class="notice error">El pago no fue aprobado por el simulador. Puedes intentarlo nuevamente.</div>
          <div class="buy-row" style="justify-content:space-between">
            <button class="btn btn-ghost btn-sm" id="co-cancel">Cancelar</button>
            <button class="btn btn-primary" id="co-retry">Intentar nuevamente</button>
          </div>`;
        return;
      }
      confirmOrder();
    }, 1600);
  }

  function uniqueId() {
    const d = new Date();
    const ymd = d.toISOString().slice(2, 10).replace(/-/g, "");
    const rnd = (crypto.getRandomValues ? Array.from(crypto.getRandomValues(new Uint8Array(3))).map((b) => b.toString(16).padStart(2, "0")).join("") : Math.random().toString(16).slice(2, 8)).toUpperCase();
    return `SB-${ymd}-${rnd}`;
  }

  function confirmOrder() {
    const id = uniqueId();
    order.items.forEach((l) => setStock(l.p.id, Math.max(0, stockOf(l.p) - l.cantidad)));
    const hist = store.get("sb-orders", []);
    hist.push({ id, fecha: new Date().toISOString(), total: order.total, cliente: order.cliente, items: order.items.map((l) => ({ id: l.p.id, talla: l.talla, cantidad: l.cantidad })) });
    store.set("sb-orders", hist);
    SB.cart.set([]);
    render();
    coBody.innerHTML = `${steps(3)}
      <p class="eyebrow">Paso 3 · Pedido confirmado</p>
      <h2 class="display" style="font-weight:400">¡Gracias, ${esc(order.cliente.nombre.split(" ")[0])}! 🎬</h2>
      <div class="notice ok">Pago aprobado. Tu pedido fue generado correctamente.</div>
      <div class="ticket">
        <small class="eyebrow">Identificador único del pedido</small>
        <div class="order-id">${id}</div>
        <table class="summary-table">
          <tbody>${order.items.map((l) => `<tr><td>${esc(l.p.nombre)} (${l.talla}) ×${l.cantidad}</td><td>${SB.fmt(l.p.precio * l.cantidad)}</td></tr>`).join("")}</tbody>
          <tfoot><tr><td>Envío</td><td>${order.envio ? SB.fmt(order.envio) : "Gratis"}</td></tr><tr><th>Total pagado</th><th>${SB.fmt(order.total)}</th></tr></tfoot>
        </table>
        <p style="font-size:.85rem;color:var(--muted);margin:.8rem 0 0">Envío a: ${esc(order.cliente.direccion)} · Confirmación a ${esc(order.cliente.email)}</p>
      </div>
      <button class="btn btn-primary" data-close style="width:100%;margin-top:1.2rem">Volver al catálogo</button>`;
  }

  co.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    order.cliente = { nombre: f.get("nombre").trim(), email: f.get("email").trim(), direccion: f.get("direccion").trim() };
    simulatePayment();
  });
  co.addEventListener("click", (e) => {
    if (e.target === co || e.target.closest("[data-close]")) return co.close();
    if (e.target.id === "co-cancel") { co.close(); SB.toast("Checkout cancelado"); }
    if (e.target.id === "co-retry") simulatePayment();
  });

  render();
})();
