// Photos live in ./fotos — add a file name here to show it in the gallery
const PHOTOS = ["image_1.jpg", "image_2.jpg", "image_3.jpg"];
const FOLDER = "fotos/";

// English copy (Spanish is read from the page itself)
const EN = {
  "a11y.skip": "Skip to content",
  "a11y.nav": "Sections",
  "a11y.lang": "Language",
  "a11y.theme": "Switch between light and dark theme",
  "brand.role": "Full Stack Developer",
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.contact": "Contact",
  "gallery.kicker": "Project · Gallery",
  "gallery.title": "Gallery",
  "gallery.intro": "A collection of photos. Tap any of them to see it full size and use the arrows to browse.",
  "viewer.label": "Photo viewer",
  "viewer.prev": "Previous photo",
  "viewer.next": "Next photo",
  "viewer.close": "Close",
  "photo": "Photo",
  "footer.home": "Back to home",
};
const ES = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { ES[el.dataset.i18n] = el.textContent; });
document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
  const [attr, key] = el.dataset.i18nAttr.split(":");
  ES[key] = el.getAttribute(attr);
});
ES.photo = "Foto";

const root = document.documentElement;
const t = (key) => (root.dataset.lang === "en" ? EN : ES)[key] ?? ES[key];
const pad = (n) => String(n).padStart(2, "0");

// ---------- Gallery ----------
const list = document.getElementById("gallery");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const viewerCount = document.getElementById("viewerCount");
const viewerName = document.getElementById("viewerName");
let current = 0;

function render() {
  list.innerHTML = "";
  PHOTOS.forEach((file, i) => {
    const li = document.createElement("li");
    li.className = "plate";
    li.innerHTML = `
      <button type="button" data-index="${i}">
        <figure>
          <div class="plate-img"><img src="${FOLDER}${file}" alt="${t("photo")} ${i + 1}" loading="lazy" decoding="async" /></div>
          <figcaption><span class="num">${pad(i + 1)}</span><span class="label">${t("photo")}</span><span class="name">${file}</span></figcaption>
        </figure>
      </button>`;
    list.appendChild(li);
  });
}

function show(index) {
  current = (index + PHOTOS.length) % PHOTOS.length;
  const file = PHOTOS[current];
  viewerImg.src = FOLDER + file;
  viewerImg.alt = `${t("photo")} ${current + 1}`;
  viewerCount.textContent = `${pad(current + 1)} / ${pad(PHOTOS.length)}`;
  viewerName.textContent = file;
}

list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;
  show(Number(btn.dataset.index));
  viewer.showModal();
});
document.getElementById("prevBtn").addEventListener("click", () => show(current - 1));
document.getElementById("nextBtn").addEventListener("click", () => show(current + 1));
document.getElementById("closeBtn").addEventListener("click", () => viewer.close());
// Click on the backdrop closes; Escape is handled natively by <dialog>
viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });
viewer.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

// ---------- Language ----------
function applyLang(lang) {
  root.dataset.lang = lang;
  root.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const [attr, key] = el.dataset.i18nAttr.split(":");
    el.setAttribute(attr, t(key));
  });
  document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  document.title = lang === "en" ? "Gallery — Garcia Jhon Lucas" : "Galería — Garcia Jhon Lucas";
  render();
}
document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
  const next = b.dataset.lang;
  try { localStorage.setItem("lang", next); } catch (e) {}
  applyLang(next);
}));

// ---------- Theme (shared with the main site via localStorage) ----------
document.getElementById("themeBtn").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

document.getElementById("year").textContent = new Date().getFullYear();
applyLang(root.dataset.lang || "es");
