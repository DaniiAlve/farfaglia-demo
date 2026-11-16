/* Panel administrador de la maqueta. Todo se guarda en este navegador (localStorage). */
(function () {
  "use strict";

  const KEY = "farfaglia-admin-v1";
  const BASE = [
 {
  "nombre": "Ambo Spandex",
  "categoria": "Ambos",
  "seccion": "Salud y Gastronomía",
  "precio": 78900.0
 },
 {
  "nombre": "Guardapolvo Docente Azul Marino Abrochable al Costado",
  "categoria": "Julieta",
  "seccion": "Salud y Gastronomía",
  "precio": 66100.0
 },
 {
  "nombre": "Chaqueta Bachero",
  "categoria": "Chaquetas",
  "seccion": "Salud y Gastronomía",
  "precio": 48900.0
 },
 {
  "nombre": "Delantal Pvc",
  "categoria": "Delantales",
  "seccion": "Salud y Gastronomía",
  "precio": 21500.0
 },
 {
  "nombre": "Gorro Hongo",
  "categoria": "Gorros",
  "seccion": "Salud y Gastronomía",
  "precio": 8700.0
 },
 {
  "nombre": "Bandana",
  "categoria": "Gorros",
  "seccion": "Salud y Gastronomía",
  "precio": 6900.0
 },
 {
  "nombre": "Pantalón Pied de Poule",
  "categoria": "Pantalones",
  "seccion": "Salud y Gastronomía",
  "precio": 41200.0
 },
 {
  "nombre": "Pantalón Náutico",
  "categoria": "Pantalones",
  "seccion": "Salud y Gastronomía",
  "precio": 40500.0
 },
 {
  "nombre": "Pantalón Vestir",
  "categoria": "Pantalones",
  "seccion": "Salud y Gastronomía",
  "precio": 39800.0
 },
 {
  "nombre": "Servilletas de Tela",
  "categoria": "Mantelería",
  "seccion": "Salud y Gastronomía",
  "precio": 9800.0
 },
 {
  "nombre": "Manteles",
  "categoria": "Mantelería",
  "seccion": "Salud y Gastronomía",
  "precio": 24500.0
 },
 {
  "nombre": "Guardapolvo Médico",
  "categoria": "Guardapolvos",
  "seccion": "Salud y Gastronomía",
  "precio": 59900.0
 },
 {
  "nombre": "Guardapolvo Escolar Blanco",
  "categoria": "Escolar",
  "seccion": "Escolar",
  "precio": 31900.0
 },
 {
  "nombre": "Guardapolvo Escolar Cuadrillé",
  "categoria": "Escolar",
  "seccion": "Escolar",
  "precio": 33500.0
 },
 {
  "nombre": "Delantal Escolar",
  "categoria": "Escolar",
  "seccion": "Escolar",
  "precio": 22900.0
 },
 {
  "nombre": "Pantalón Escolar",
  "categoria": "Escolar",
  "seccion": "Escolar",
  "precio": 28900.0
 },
 {
  "nombre": "Buzo Escolar",
  "categoria": "Escolar",
  "seccion": "Escolar",
  "precio": 36900.0
 },
 {
  "nombre": "Campera Escolar",
  "categoria": "Escolar",
  "seccion": "Escolar",
  "precio": 54900.0
 },
 {
  "nombre": "Remera Escolar",
  "categoria": "Escolar",
  "seccion": "Escolar",
  "precio": 13900.0
 },
 {
  "nombre": "Jumper Escolar",
  "categoria": "Escolar",
  "seccion": "Escolar",
  "precio": 30900.0
 },
 {
  "nombre": "Mameluco de Trabajo",
  "categoria": "Gabardina",
  "seccion": "Empresa y Seguridad",
  "precio": 58900.0
 },
 {
  "nombre": "Bermuda Cargo",
  "categoria": "Ropa de trabajo",
  "seccion": "Empresa y Seguridad",
  "precio": 32500.0
 },
 {
  "nombre": "Pantalón Cargo",
  "categoria": "Ropa de trabajo",
  "seccion": "Empresa y Seguridad",
  "precio": 41900.0
 },
 {
  "nombre": "Pantalón Bombacha",
  "categoria": "Ropa de trabajo",
  "seccion": "Empresa y Seguridad",
  "precio": 44500.0
 },
 {
  "nombre": "Pantalón de Trabajo",
  "categoria": "Ropa de trabajo",
  "seccion": "Empresa y Seguridad",
  "precio": 38700.0
 },
 {
  "nombre": "Camisa de Trabajo",
  "categoria": "Ropa de trabajo",
  "seccion": "Empresa y Seguridad",
  "precio": 29800.0
 },
 {
  "nombre": "Campera Trucker",
  "categoria": "Buzos y camperas",
  "seccion": "Empresa y Seguridad",
  "precio": 69900.0
 },
 {
  "nombre": "Cardigan",
  "categoria": "Buzos y camperas",
  "seccion": "Empresa y Seguridad",
  "precio": 52300.0
 },
 {
  "nombre": "Chomba Combi Cuello",
  "categoria": "Remeras y chombas",
  "seccion": "Empresa y Seguridad",
  "precio": 27900.0
 },
 {
  "nombre": "Remera Manga Corta",
  "categoria": "Remeras y chombas",
  "seccion": "Empresa y Seguridad",
  "precio": 14900.0
 },
 {
  "nombre": "Zapato de Seguridad",
  "categoria": "Calzado",
  "seccion": "Empresa y Seguridad",
  "precio": 64900.0
 },
 {
  "nombre": "Chaleco Refractivo",
  "categoria": "Seguridad",
  "seccion": "Empresa y Seguridad",
  "precio": 12900.0
 }
];
  const SECCIONES = ["Salud y Gastronomía", "Escolar", "Empresa y Seguridad", "Personalizados"];
  const HERO = [
    "Diapositiva 1 · Uniformes para Salud y Gastronomía",
    "Diapositiva 2 · Ropa de trabajo para tu empresa",
    "Diapositiva 3 · Tu marca en tu equipo",
  ];
  const PANELES = ["Hombre", "Mujer", "Escolar", "Uniformes personalizados"];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const precioTexto = (n) =>
    "$" + Number(n).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ---------- Almacenamiento ---------- */
  function vacio() { return { productos: [], imagenes: { hero: [], paneles: {} } }; }
  function leer() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY));
      return Object.assign(vacio(), d || {});
    } catch (e) { return vacio(); }
  }
  let estado = leer();
  function guardar() {
    try {
      localStorage.setItem(KEY, JSON.stringify(estado));
      return true;
    } catch (e) {
      aviso("No hay espacio en el navegador. Quitá alguna imagen o descargá el catálogo.");
      return false;
    }
  }

  /* ---------- Aviso ---------- */
  let avisoTimer;
  function aviso(texto) {
    const el = $("#aviso");
    el.textContent = texto;
    el.classList.add("visible");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => el.classList.remove("visible"), 2800);
  }

  /* ---------- Navegación lateral ---------- */
  function mostrar(id) {
    $$(".panel").forEach((p) => { p.hidden = p.id !== id; });
    $$("[data-panel]").forEach((b) => {
      b.setAttribute("aria-current", b.dataset.panel === id ? "page" : "false");
    });
  }
  $$("[data-panel]").forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.panel)));

  /* ---------- Imágenes: se reducen para ahorrar espacio ---------- */
  function leerImagen(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve("");
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 1200 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("No se pudo leer la imagen")); };
      img.src = url;
    });
  }

  /* ---------- Resumen ---------- */
  function renderResumen() {
    $("#cnt-productos").textContent = BASE.length + estado.productos.length;
    $("#cnt-nuevos").textContent = estado.productos.length;
    renderCatalogo();
  }

  /* Catálogo completo agrupado por sección, con imagen cuando existe */
  function renderCatalogo() {
    const cont = $("#resumen-catalogo");
    const todos = [
      ...BASE.map((p) => ({ ...p, origen: "Sitio" })),
      ...estado.productos.map((p) => ({ ...p, origen: "Nuevo" })),
    ];
    cont.replaceChildren();
    SECCIONES.forEach((sec) => {
      const items = todos.filter((p) => p.seccion === sec);
      if (!items.length) return;
      const h = document.createElement("h3");
      h.textContent = sec + " (" + items.length + ")";
      const grid = document.createElement("div");
      grid.className = "catalogo-grid";
      items.forEach((p) => {
        const card = document.createElement("article");
        card.className = "prod-card";
        const vista = document.createElement("div");
        vista.className = "prod-vista";
        if (p.imagen) {
          const img = document.createElement("img");
          img.src = p.imagen;
          img.alt = p.nombre;
          vista.appendChild(img);
        } else {
          vista.textContent = "Sin imagen";
        }
        const nombre = document.createElement("p");
        nombre.className = "prod-nombre";
        nombre.textContent = p.nombre;
        const cat = document.createElement("p");
        cat.className = "prod-cat";
        cat.textContent = p.categoria + " · " + p.origen;
        const precio = document.createElement("p");
        precio.className = "prod-precio";
        precio.textContent = precioTexto(p.precio);
        card.append(vista, nombre, cat, precio);
        grid.appendChild(card);
      });
      cont.append(h, grid);
    });
  }

  /* ---------- Cargar producto ---------- */
  const selSeccion = $("#f-seccion");
  SECCIONES.forEach((s) => selSeccion.add(new Option(s, s)));
  $("#form-producto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;
    const precio = Number(f.precio.value);
    if (!(precio >= 0)) return aviso("El precio no es válido.");
    let imagen = "";
    try { imagen = await leerImagen(f.imagen.files[0]); } catch (err) { return aviso(err.message); }
    estado.productos.push({
      id: Date.now().toString(36),
      nombre: f.nombre.value.trim(),
      categoria: f.categoria.value.trim(),
      seccion: f.seccion.value,
      precio,
      descripcion: f.descripcion.value.trim(),
      imagen,
    });
    if (!guardar()) { estado.productos.pop(); return; }
    f.reset();
    renderProductos();
    renderResumen();
    aviso("Producto cargado.");
  });

  /* ---------- Productos ---------- */
  function renderProductos() {
    const q = $("#buscar-admin").value.trim().toLowerCase();
    const filas = [
      ...BASE.map((p) => ({ ...p, origen: "Sitio", id: null })),
      ...estado.productos.map((p) => ({ ...p, origen: "Nuevo" })),
    ].filter((p) => !q || (p.nombre + " " + p.categoria + " " + p.seccion).toLowerCase().includes(q));
    $("#titulo-productos").textContent = "Productos (" + filas.length + ")";
    const cuerpo = $("#cuerpo-productos");
    cuerpo.replaceChildren();
    filas.forEach((p) => {
      const tr = document.createElement("tr");
      const celdas = [p.nombre, p.categoria, p.seccion, precioTexto(p.precio), p.origen];
      celdas.forEach((t, i) => {
        const td = document.createElement("td");
        td.textContent = t;
        if (i === 3) td.className = "num";
        tr.appendChild(td);
      });
      const acc = document.createElement("td");
      if (p.id) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "admin-btn";
        b.textContent = "Eliminar";
        b.addEventListener("click", () => {
          estado.productos = estado.productos.filter((x) => x.id !== p.id);
          if (guardar()) { renderProductos(); renderResumen(); aviso("Producto eliminado."); }
        });
        acc.appendChild(b);
      }
      tr.appendChild(acc);
      cuerpo.appendChild(tr);
    });
  }
  $("#buscar-admin").addEventListener("input", renderProductos);

  /* ---------- Imágenes: hero y paneles ---------- */
  function slot(titulo, src, onCambio, onQuitar) {
    const card = document.createElement("div");
    card.className = "slot";
    const h = document.createElement("p");
    h.className = "slot-titulo";
    h.textContent = titulo;
    const vista = document.createElement("div");
    vista.className = "slot-vista";
    if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = titulo;
      vista.appendChild(img);
    } else {
      vista.textContent = "Sin imagen";
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", async () => {
      if (!input.files[0]) return;
      try { onCambio(await leerImagen(input.files[0])); } catch (err) { aviso(err.message); }
    });
    card.append(h, vista, input);
    if (src) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "admin-btn";
      b.textContent = "Quitar imagen";
      b.addEventListener("click", onQuitar);
      card.appendChild(b);
    }
    return card;
  }
  function renderImagenes() {
    const hero = $("#slots-hero");
    hero.replaceChildren(...HERO.map((t, i) => slot(t, estado.imagenes.hero[i] || "",
      (data) => { estado.imagenes.hero[i] = data; if (guardar()) renderImagenes(); },
      () => { estado.imagenes.hero[i] = ""; if (guardar()) renderImagenes(); })));
    const pan = $("#slots-paneles");
    pan.replaceChildren(...PANELES.map((t) => slot("Panel · " + t, estado.imagenes.paneles[t] || "",
      (data) => { estado.imagenes.paneles[t] = data; if (guardar()) renderImagenes(); },
      () => { delete estado.imagenes.paneles[t]; if (guardar()) renderImagenes(); })));
  }

  /* ---------- Exportar ---------- */
  $("#exportar").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "catalogo.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  /* ---------- Inicio ---------- */
  renderResumen();
  renderProductos();
  renderImagenes();
})();
