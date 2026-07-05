const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const formMessage = document.querySelector("[data-form-message]");

if (year) year.textContent = new Date().getFullYear();

const updateHeader = () => {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
};
updateHeader();
window.addEventListener("scroll", updateHeader);

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (nav) {
  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      header.classList.remove("is-open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = formData.get("email");
    if (!email) {
      formMessage.textContent = "Please enter your email address.";
      return;
    }
    formMessage.textContent = "Thank you for signing up. Newsletter delivery will be connected soon.";
    newsletterForm.reset();
  });
}

// Language toggle
function applyLanguage(lang) {
  if (typeof translations === "undefined") return;
  const t = translations[lang] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  localStorage.setItem("yemc-lang", lang);
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

const savedLang = localStorage.getItem("yemc-lang") || "en";
applyLanguage(savedLang);
