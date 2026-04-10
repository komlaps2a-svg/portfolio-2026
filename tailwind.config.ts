@tailwind base;
@tailwind components;
@tailwind utilities;

/* WHY: Lenis membutuhkan ini agar scroll default browser tidak bentrok dengan kalkulasi JS */
html.lenis {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

body {
  background-color: #000;
  color: #fff;
  overflow-x: hidden;
}
