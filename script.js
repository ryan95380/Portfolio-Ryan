// ======================
// MARQUEE (défilement logos)
// ======================
function Marquee(selector, speed) {
  const surface = document.querySelector(selector);
  if (!surface) return;

  const content = surface.innerHTML;
  const firstElement = surface.children[0];
  if (!firstElement) return;

  // Duplique le contenu pour un défilement continu
  surface.insertAdjacentHTML("beforeend", content);
  surface.insertAdjacentHTML("beforeend", content);

  let i = 0;

  setInterval(() => {
    firstElement.style.marginLeft = `-${i}px`;
    if (i > firstElement.clientWidth) {
      i = 0;
    }
    i = i + speed;
  }, 16); // ~60 fps
}

window.addEventListener("load", () => {
  Marquee("#marquee", 0.30);
});

// ======================
// MENU MOBILE (hamburger)
// ======================
(() => {
  const header = document.querySelector("header");
  const nav = header?.querySelector("nav");
  if (!header || !nav) return;

  // Crée le bouton dynamiquement (pas besoin de toucher au HTML)
  const btn = document.createElement("button");
  btn.className = "menu-toggle";
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Ouvrir le menu");
  btn.innerHTML = "<span></span><span></span><span></span>";
  header.appendChild(btn);

  const toggle = () => {
    const open = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", String(open));
  };

  btn.addEventListener("click", toggle);

  // Ferme le menu quand on clique un lien
  nav.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.tagName === "A" && nav.classList.contains("is-open")) {
      toggle();
    }
  });

  // Ferme si on repasse en desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700 && nav.classList.contains("is-open")) {
      toggle();
    }
  });
})();
