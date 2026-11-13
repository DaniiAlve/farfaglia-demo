# Uniformes Farfaglia – Maqueta

Maqueta **no funcional** del nuevo sitio de Uniformes Farfaglia, para mostrar y aprobar el proyecto. Es HTML, CSS y JavaScript puro, sin dependencias ni compilación, pensada para publicarse en GitHub Pages.

> Los precios, productos y textos son de ejemplo. Carrito, búsqueda y formularios están simulados.

## Estructura

```
farfaglia-demo/
<<<<<<< HEAD
├── index.html                Inicio (basado en Figma "Desktop - 3")
├── salud-gastronomia.html    Listado
├── empresa-seguridad.html    Listado
├── escolar.html              Listado
├── producto.html             Ficha de producto
├── carrito.html              Carrito (totales y envío gratis simulados)
├── finalizar-compra.html     Checkout simulado
├── mi-cuenta.html            Ingreso y registro simulados
├── personalizados.html       Servicio + formulario de cotización
├── corporativo.html          Empresas + formulario de cotización
├── contacto.html             Datos y formulario
├── politicas.html            Políticas, botón de arrepentimiento, Defensa del Consumidor
├── 404.html                  Página de error
├── css/
│   ├── tokens.css            Colores, tipografías, medidas
│   ├── base.css              Reset y estilos generales
│   └── style.css             Estilos de todas las secciones
├── js/main.js                Interacciones simuladas
├── assets/img/               Imágenes (por ahora vacío: la maqueta no usa imágenes)
└── .nojekyll
```

Por ahora los espacios de foto son bloques grises. Cuando haya fotos reales, se reemplazan los `<div class="ph">`.

Las tipografías (Montserrat e Inter) se cargan desde Google Fonts. Para no depender de internet se pueden descargar a `assets/fonts/`.

## Ver en tu computadora

- **Windows:** doble clic en `ver-maqueta.bat`. Abre el navegador en http://localhost:8000. Si no tenés Python, abre `index.html` directamente.
- **Mac:** doble clic en `ver-maqueta.command` (la primera vez: clic derecho → Abrir).
- **Linux:** `./ver-maqueta.sh`.
- **Sin nada de eso:** doble clic en `index.html`. Funciona, pero la vista con el servidor local es más fiel a GitHub Pages.

Abajo a la izquierda de cada página se lee **"Maqueta v2"**. Si no lo ves, estás mirando una versión vieja.
=======
├── index.html        Inicio
├── 404.html          Página de error
├── css/
│   ├── tokens.css    Colores, tipografía y espaciados
│   ├── base.css      Reset y estilos generales
│   └── style.css     Estilos de las secciones
├── js/
│   └── main.js       Interacciones simuladas
├── assets/
│   ├── img/          Imágenes
│   └── fonts/        Tipografías
└── .nojekyll         Evita el procesamiento de Jekyll en GitHub Pages
```

## Ver en tu computadora

Abrí `index.html` en el navegador. O, para simular mejor la publicación, desde la carpeta:

```bash
python3 -m http.server 8000
```

y entrá a http://localhost:8000.
>>>>>>> 4b84fa0c2787c0286a2bc477582a1668a4353291

## Subir a GitHub y publicar

1. Creá un repositorio vacío en GitHub (por ejemplo `farfaglia-demo`).
2. En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Estructura inicial de la maqueta"
git branch -M main
<<<<<<< HEAD
git remote add origin https://github.com/DaniiAlve/farfaglia-demo.git
=======
git remote add origin https://github.com/TU_USUARIO/farfaglia-demo.git
>>>>>>> 4b84fa0c2787c0286a2bc477582a1668a4353291
git push -u origin main
```

3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
<<<<<<< HEAD
4. Tras uno o dos minutos, el sitio queda en `https://daniialve.github.io/farfaglia-demo/`.
=======
4. Tras uno o dos minutos, el sitio queda en `https://TU_USUARIO.github.io/farfaglia-demo/`.
>>>>>>> 4b84fa0c2787c0286a2bc477582a1668a4353291

## Reglas del proyecto

- Usar **rutas relativas** (`./css/style.css`), nunca `/css/style.css`, o los archivos no cargan en GitHub Pages.
- Todo lo que use la maqueta (imágenes, tipografías) va dentro del repo.
- Las páginas llevan `noindex` para que Google no indexe la maqueta.
# farfaglia-demo
