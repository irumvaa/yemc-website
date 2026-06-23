const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const formMessage = document.querySelector("[data-form-message]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

year.textContent = new Date().getFullYear();
updateHeader();

window.addEventListener("scroll", updateHeader);

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

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
