const phonePreview = document.querySelector("#phonePreview");
const phonePreviewTitle = document.querySelector("#phonePreviewTitle");
const phoneCaption = document.querySelector("#phoneCaption");
const toggleButtons = document.querySelectorAll(".phone-toggle-button");

const views = {
  bad: {
    src: "mobile-bad.html",
    title: "Unoptimized phone layout",
    caption:
      "<strong>Unoptimized:</strong> The desktop layout is being forced into a phone-sized screen, making text, navigation, and buttons harder to use.",
  },
  good: {
    src: "mobile-good.html",
    title: "Optimized phone layout",
    caption:
      "<strong>Optimized:</strong> The same content is reorganized for phone users with readable sections, larger buttons, and clearer contact options.",
  },
};

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedView = button.dataset.phoneView;
    const view = views[selectedView];

    if (!view || !phonePreview || !phonePreviewTitle || !phoneCaption) {
      return;
    }

    phonePreview.src = view.src;
    phonePreviewTitle.textContent = view.title;
    phoneCaption.innerHTML = view.caption;

    toggleButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  });
});