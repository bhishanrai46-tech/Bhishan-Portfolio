/* ============ SITE SETTINGS: edit this part ============ */
var SITE = {
  name: "Bhishan Rai",
  location: "Sydney, Australia",
  // To add a page to the menu, add a line here. href = the file name.
  pages: [
    { label: "Home",        href: "index.html" },
    { label: "Engineering", href: "index.html#engineering" },
    { label: "Thoughts",    href: "thoughts.html" },
    { label: "Gallery",     href: "gallery.html" },
    { label: "Contact",     href: "index.html#contact" }
  ]
};
/* ======================================================== */

(function () {
  var here = location.pathname.split("/").pop() || "index.html";

  var nav = document.getElementById("site-nav");
  if (nav) {
    var links = SITE.pages.map(function (p) {
      var file = p.href.split("#")[0];
      var active = (file === here && p.href.indexOf("#") === -1) ? ' class="active"' : "";
      return '<a href="' + p.href + '"' + active + '>' + p.label + '</a>';
    }).join("");
    nav.innerHTML = '<div class="wrap"><a class="brand" href="index.html">' + SITE.name +
      '</a><nav class="links" aria-label="Primary">' + links +
      '<button class="theme" id="theme" aria-label="Toggle colour theme">Theme</button></nav></div>';
  }

  var foot = document.getElementById("site-footer");
  if (foot) {
    foot.innerHTML = '<div class="wrap"><span>&copy; ' + new Date().getFullYear() + ' ' +
      SITE.name + '</span><span>' + SITE.location + '</span></div>';
  }

  // theme toggle
  var root = document.documentElement, btn = document.getElementById("theme");
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  if (btn) btn.addEventListener("click", function () {
    var cur = root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // scroll reveal
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: .08 });
  els.forEach(function (e) { io.observe(e); });
})();
