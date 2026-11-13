<<<<<<< HEAD
/* Interacciones simuladas de la maqueta. Nada se envía ni se guarda en un servidor. */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const dinero = (n) =>
    "$" + n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ---------- Contador del carrito (por pestaña, con valor inicial de ejemplo) ---------- */
  const CLAVE = "farfaglia-demo-carrito";
  function leerCarrito() {
    try {
      const v = sessionStorage.getItem(CLAVE);
      return v === null ? 2 : parseInt(v, 10) || 0;
    } catch (e) { return 2; }
  }
  function guardarCarrito(n) {
    try { sessionStorage.setItem(CLAVE, String(n)); } catch (e) { /* sin almacenamiento */ }
  }
  function pintarCarrito() {
    const n = leerCarrito();
    $$("[data-cart-count]").forEach((el) => { el.textContent = n; el.hidden = n <= 0; });
  }
  pintarCarrito();

  /* ---------- Aviso breve ---------- */
  let toastEl, toastTimer;
  function aviso(texto) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = texto;
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("visible"), 2600);
  }

  /* ---------- Menú móvil ---------- */
  const toggle = $(".menu-toggle");
  const nav = $("#nav-principal");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const abierto = nav.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", String(abierto));
    });
  }

  /* ---------- Carrusel del hero ---------- */
  const hero = $(".hero");
  if (hero) {
    const slides = $$(".slide", hero);
    const dots = $$(".hero-dots button", hero);
    let actual = 0, timer;
    const ir = (i) => {
      actual = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === actual));
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === actual)));
    };
    $(".hero-flecha.prev", hero).addEventListener("click", () => { ir(actual - 1); reiniciar(); });
    $(".hero-flecha.next", hero).addEventListener("click", () => { ir(actual + 1); reiniciar(); });
    dots.forEach((d, k) => d.addEventListener("click", () => { ir(k); reiniciar(); }));
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function reiniciar() {
      clearInterval(timer);
      if (!reducido) timer = setInterval(() => ir(actual + 1), 6500);
    }
    hero.addEventListener("mouseenter", () => clearInterval(timer));
    hero.addEventListener("mouseleave", reiniciar);
    hero.addEventListener("focusin", () => clearInterval(timer));
    ir(0);
    reiniciar();
  }

  /* ---------- Botones "Comprar" de las tarjetas ---------- */
  $$("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      guardarCarrito(leerCarrito() + 1);
      pintarCarrito();
      aviso("Agregado al carrito (maqueta)");
    });
  });

  /* ---------- FAQ: una abierta a la vez ---------- */
  $$(".faq").forEach((faq) => {
    $$("details", faq).forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) $$("details", faq).forEach((o) => { if (o !== d) o.open = false; });
      });
    });
  });

  /* ---------- Selectores de talle / color / miniaturas ---------- */
  $$("[data-grupo]").forEach((grupo) => {
    const botones = $$("button", grupo);
    const etiqueta = $("[data-valor-de='" + grupo.dataset.grupo + "']");
    botones.forEach((b) => {
      b.addEventListener("click", () => {
        botones.forEach((o) => {
          o.setAttribute(grupo.dataset.atributo || "aria-pressed", "false");
        });
        b.setAttribute(grupo.dataset.atributo || "aria-pressed", "true");
        if (etiqueta) etiqueta.textContent = b.dataset.valor || b.textContent.trim();
      });
    });
  });

  /* ---------- Tabs de la ficha ---------- */
  $$("[role='tablist']").forEach((lista) => {
    const tabs = $$("[role='tab']", lista);
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          const activo = t === tab;
          t.setAttribute("aria-selected", String(activo));
          const panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !activo;
        });
      });
    });
  });

  /* ---------- Cantidades (ficha y carrito) ---------- */
  function limitar(input) {
    let v = parseInt(input.value, 10);
    if (isNaN(v) || v < 1) v = 1;
    if (v > 99) v = 99;
    input.value = v;
    return v;
  }
  $$(".cantidad").forEach((c) => {
    const input = $("input", c);
    $$("button", c).forEach((b) => {
      b.addEventListener("click", () => {
        input.value = (parseInt(input.value, 10) || 1) + (b.dataset.paso === "mas" ? 1 : -1);
        limitar(input);
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });
    input.addEventListener("change", () => limitar(input));
  });

  /* ---------- Agregar desde la ficha ---------- */
  const agregarFicha = $("[data-add-ficha]");
  if (agregarFicha) {
    agregarFicha.addEventListener("click", () => {
      const cant = limitar($("#cantidad-ficha"));
      guardarCarrito(leerCarrito() + cant);
      pintarCarrito();
      const talle = $("[data-valor-de='talle']");
      const color = $("[data-valor-de='color']");
      aviso("Agregado: talle " + (talle ? talle.textContent : "") + ", " + (color ? color.textContent.toLowerCase() : ""));
    });
  }

  /* ---------- Calculadora de envío simulada ---------- */
  const calc = $("[data-calc-envio]");
  if (calc) {
    calc.addEventListener("submit", (e) => {
      e.preventDefault();
      const cp = $("input", calc).value.trim();
      const out = $("[data-calc-resultado]");
      out.textContent = /^\d{4}$/.test(cp)
        ? "Envío estimado a CP " + cp + ": entre 2 y 5 días hábiles (dato de ejemplo)."
        : "Ingresá un código postal de 4 dígitos.";
    });
  }

  /* ---------- Carrito: totales ---------- */
  const filas = $$("[data-item]");
  if (filas.length) {
    const UMBRAL_ENVIO = 100000;
    const DESC_TRANSF = 0.10;
    const recalcular = () => {
      let subtotal = 0, cantidad = 0;
      $$("[data-item]").forEach((f) => {
        const precio = parseFloat(f.dataset.precio);
        const cant = limitar($("input", f));
        const sub = precio * cant;
        $("[data-subtotal]", f).textContent = dinero(sub);
        subtotal += sub;
        cantidad += cant;
      });
      const hay = cantidad > 0;
      $("[data-vacio]").hidden = hay;
      $$("[data-con-items]").forEach((el) => { el.hidden = !hay; });
      $("[data-resumen-subtotal]").textContent = dinero(subtotal);
      $("[data-resumen-envio]").textContent = subtotal >= UMBRAL_ENVIO ? "Gratis" : "Se calcula al finalizar";
      $("[data-resumen-total]").textContent = dinero(subtotal);
      $("[data-resumen-transf]").textContent = dinero(subtotal * (1 - DESC_TRANSF));
      const falta = Math.max(0, UMBRAL_ENVIO - subtotal);
      $("[data-progreso-texto]").textContent = falta > 0
        ? "Te faltan " + dinero(falta) + " para el envío gratis"
        : "¡Tenés envío gratis!";
      $("[data-progreso-barra]").style.width = Math.min(100, (subtotal / UMBRAL_ENVIO) * 100) + "%";
      guardarCarrito(cantidad);
      pintarCarrito();
    };
    filas.forEach((f) => {
      $("input", f).addEventListener("change", recalcular);
      $(".quitar", f).addEventListener("click", () => { f.remove(); recalcular(); });
    });
    recalcular();
  }

  /* ---------- Formularios simulados ---------- */
  const dlg = $("#dlg-demo");
  $$("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (dlg) {
        $("[data-dlg-titulo]", dlg).textContent = form.dataset.demoTitulo || "Esto es una maqueta";
        $("[data-dlg-texto]", dlg).textContent =
          form.dataset.demoTexto || "El formulario no envía datos: en el sitio final acá se procesaría tu solicitud.";
        dlg.showModal();
      } else {
        aviso("Maqueta: el formulario no envía datos");
      }
    });
  });
  if (dlg) {
    $("[data-dlg-cerrar]", dlg).addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  }
=======
// Interacciones simuladas de la maqueta (no envían datos).
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) {
    return "$" + n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // ---- Menú móvil
  var toggle = $(".menu-toggle"), nav = $("#nav-principal");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var abierto = nav.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", abierto);
    });
  }

  // ---- Diálogo de aviso de maqueta
  var dlg = $("#dlg-demo");
  function avisar(titulo, texto) {
    if (!dlg || !dlg.showModal) { alert((titulo || "Maqueta") + "\n" + (texto || "")); return; }
    if (titulo) $("[data-dlg-titulo]", dlg).textContent = titulo;
    if (texto) $("[data-dlg-texto]", dlg).textContent = texto;
    dlg.showModal();
  }
  if (dlg) {
    $("[data-dlg-cerrar]", dlg).addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }
  $$("[data-demo-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      avisar(f.getAttribute("data-demo-titulo"), f.getAttribute("data-demo-texto"));
    });
  });

  // ---- Contador del carrito (persistido en la sesión del navegador)
  var badges = $$("[data-cart-count]");
  function leerCuenta() {
    try { var v = sessionStorage.getItem("farfaglia-carrito"); if (v !== null) return parseInt(v, 10) || 0; } catch (e) {}
    return 2;
  }
  function guardarCuenta(n) {
    try { sessionStorage.setItem("farfaglia-carrito", String(n)); } catch (e) {}
    badges.forEach(function (b) { b.textContent = n; });
  }
  var cuenta = leerCuenta();
  guardarCuenta(cuenta);

  $$("[data-add]").forEach(function (b) {
    b.addEventListener("click", function () {
      cuenta += 1; guardarCuenta(cuenta);
      var t = b.textContent; b.textContent = "¡Agregado!";
      setTimeout(function () { b.textContent = t; }, 1200);
    });
  });
  var addFicha = $("[data-add-ficha]");
  if (addFicha) {
    addFicha.addEventListener("click", function () {
      var q = parseInt($("#cantidad-ficha").value, 10) || 1;
      cuenta += q; guardarCuenta(cuenta);
      avisar("Agregado al carrito", "Se agregó el producto (maqueta: el carrito es de ejemplo).");
    });
  }

  // ---- Selectores de color / talle / chips
  $$(".swatches, .tallas").forEach(function (g) {
    var nombre = g.getAttribute("data-grupo");
    $$("button", g).forEach(function (b) {
      b.addEventListener("click", function () {
        $$("button", g).forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
        var salida = $('[data-valor-de="' + nombre + '"]');
        if (salida) salida.textContent = b.getAttribute("data-valor");
      });
    });
  });
  $$(".chips .chip").forEach(function (c) {
    c.addEventListener("click", function () {
      c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") !== "true");
    });
  });

  // ---- Galería de fotos
  $$(".galeria .miniaturas").forEach(function (g) {
    $$("button", g).forEach(function (b) {
      b.addEventListener("click", function () {
        $$("button", g).forEach(function (o) { o.setAttribute("aria-current", o === b); });
      });
    });
  });

  // ---- Pestañas
  $$(".tablist").forEach(function (lista) {
    var tabs = $$("[role=tab]", lista);
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (o) {
          var activa = o === t;
          o.setAttribute("aria-selected", activa);
          var p = document.getElementById(o.getAttribute("aria-controls"));
          if (p) p.hidden = !activa;
        });
      });
    });
  });

  // ---- Calculadora de envío (ejemplo)
  var calc = $("[data-calc-envio]");
  if (calc) {
    calc.addEventListener("submit", function (e) {
      e.preventDefault();
      var cp = $("input", calc).value.trim();
      var out = $("[data-calc-resultado]");
      out.textContent = /^\d{4}$/.test(cp)
        ? "Envío estimado: $4.500,00 · llega en 3 a 5 días (valor de ejemplo)."
        : "Ingresá un código postal de 4 números.";
    });
  }

  // ---- Cantidad (+ / −)
  $$(".cantidad").forEach(function (c) {
    var input = $("input", c);
    $$("[data-paso]", c).forEach(function (b) {
      b.addEventListener("click", function () {
        var v = (parseInt(input.value, 10) || 1) + (b.getAttribute("data-paso") === "mas" ? 1 : -1);
        input.value = Math.min(99, Math.max(1, v));
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });
    });
  });

  // ---- Carrito: totales
  var items = $$("[data-item]");
  if (items.length || $("[data-vacio]")) {
    var UMBRAL = 100000, ENVIO = 4500;
    var recalcular = function () {
      var vivos = $$("[data-item]");
      var sub = 0;
      vivos.forEach(function (it) {
        var q = parseInt($("input", it).value, 10) || 1;
        var s = q * parseInt(it.getAttribute("data-precio"), 10);
        $("[data-subtotal]", it).textContent = fmt(s);
        sub += s;
      });
      var vacio = vivos.length === 0;
      $$("[data-con-items]").forEach(function (e) { e.hidden = vacio; });
      var v = $("[data-vacio]"); if (v) v.hidden = !vacio;
      var envio = sub >= UMBRAL || vacio ? 0 : ENVIO;
      var set = function (s, t) { var e = $(s); if (e) e.textContent = t; };
      set("[data-resumen-subtotal]", fmt(sub));
      set("[data-resumen-envio]", envio ? fmt(envio) : "Gratis");
      set("[data-resumen-total]", fmt(sub + envio));
      set("[data-resumen-transf]", fmt((sub + envio) * 0.9));
      var falta = UMBRAL - sub;
      set("[data-progreso-texto]", falta > 0
        ? "Te faltan " + fmt(falta) + " para el envío gratis"
        : "¡Tenés envío gratis!");
      var barra = $("[data-progreso-barra]");
      if (barra) barra.style.width = Math.min(100, (sub / UMBRAL) * 100) + "%";
      guardarCuenta(vivos.reduce(function (a, it) { return a + (parseInt($("input", it).value, 10) || 1); }, 0));
      cuenta = leerCuenta();
    };
    items.forEach(function (it) {
      $("input", it).addEventListener("input", recalcular);
      $(".quitar", it).addEventListener("click", function () { it.remove(); recalcular(); });
    });
    recalcular();
  }
>>>>>>> 4b84fa0c2787c0286a2bc477582a1668a4353291
})();
