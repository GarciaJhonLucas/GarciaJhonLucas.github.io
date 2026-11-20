// Thin site bar for the experiment pages.
// Usage: <script src="../shared/bar.js" data-title="Carta" data-title-en="Letter" defer></script>
// It lives in a shadow root so the page's own CSS can't touch it (and it can't touch the page).
(function () {
  var script = document.currentScript;
  if (!script) return;

  var projects = new URL("../", script.src).href;
  var home = new URL("../../", script.src).href;
  var lang = "es";
  var theme = "light";
  try {
    var l = localStorage.getItem("lang");
    lang = l === "en" || l === "es" ? l : ((navigator.language || "es").toLowerCase().indexOf("es") === 0 ? "es" : "en");
    var t = localStorage.getItem("theme");
    theme = t === "light" || t === "dark" ? t : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch (e) {}

  var text = lang === "en"
    ? { back: "Experiments", title: script.dataset.titleEn || script.dataset.title || "", nav: "Site" }
    : { back: "Experimentos", title: script.dataset.title || "", nav: "Sitio" };

  // Fonts must be loaded by the document; @font-face inside a shadow root is ignored
  if (!document.querySelector('link[data-site-fonts]')) {
    var fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.dataset.siteFonts = "";
    fonts.href = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Martian+Mono:wdth,wght@75..112.5,400..600&display=swap";
    document.head.appendChild(fonts);
  }

  var host = document.createElement("div");
  host.setAttribute("data-site-bar", "");
  host.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:2147483647;";
  var shadow = host.attachShadow({ mode: "open" });

  shadow.innerHTML =
    '<style>' +
    ':host { all: initial; }' +
    '.bar { --film:#eef0f2; --film-2:#e4e7eb; --ink:#15171a; --ink-2:#4a5059; --mark:#e6f22a; --on-mark:#15171a;' +
    '  display:flex; align-items:center; gap:16px; height:44px; padding:0 16px;' +
    '  background:var(--film); color:var(--ink); border-bottom:1px solid var(--ink);' +
    '  font-family:"Archivo","Helvetica Neue",Arial,sans-serif; font-size:15px; line-height:1.2; -webkit-font-smoothing:antialiased; }' +
    '.bar.dark { --film:#101215; --film-2:#171a1f; --ink:#e8ebee; --ink-2:#a7afb9; }' +
    'a { color:inherit; text-decoration:none; display:inline-flex; align-items:center; gap:6px; min-height:44px; }' +
    'a:hover { text-decoration:underline; text-underline-offset:.22em; }' +
    'a:focus-visible { outline:2px solid var(--ink); outline-offset:-4px; }' +
    '.brand { font-stretch:112%; font-variation-settings:"wdth" 112; font-weight:800; letter-spacing:-.01em; margin-right:auto; white-space:nowrap; }' +
    '.label { font-stretch:75%; font-variation-settings:"wdth" 75; font-weight:600; font-size:12px; letter-spacing:.08em; text-transform:uppercase; }' +
    '.title { color:var(--ink-2); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }' +
    '.sep { width:1px; height:20px; background:var(--ink); }' +
    'svg { width:16px; height:16px; display:block; }' +
    '@media (max-width:480px) { .title, .sep { display:none; } }' +
    '</style>' +
    '<nav class="bar" aria-label="' + text.nav + '">' +
    '  <a class="brand" href="' + home + '">Garcia Jhon Lucas</a>' +
    '  <span class="label title"></span>' +
    '  <span class="sep" aria-hidden="true"></span>' +
    '  <a class="label" href="' + projects + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>' + text.back + '</a>' +
    '</nav>';

  var bar = shadow.querySelector(".bar");
  if (theme === "dark") bar.classList.add("dark");
  shadow.querySelector(".title").textContent = text.title;
  if (!text.title) shadow.querySelector(".sep").remove();

  function mount() { document.body.appendChild(host); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);
})();
