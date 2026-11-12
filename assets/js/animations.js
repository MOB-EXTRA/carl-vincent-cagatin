// Reveal lower sections as they enter view and add a restrained portrait zoom.
(() => {
  const portraitColumn = document.querySelector(".portrait-column");
  const portrait = portraitColumn?.querySelector(".seated-portrait");
  const header = document.querySelector(".site-header");

  const revealItems = document.querySelectorAll(
    ".content-section .section-container, .experience-panel",
  );
  const revealMotion = window.matchMedia("(prefers-reduced-motion: no-preference)");

  if (revealItems.length && revealMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");
    revealItems.forEach((item) => item.setAttribute("data-reveal", ""));
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  if (!portraitColumn || !portrait || !header) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let framePending = false;

  function updateZoom() {
    framePending = false;

    if (reducedMotion.matches) {
      portrait.style.setProperty("--hero-portrait-zoom", "1");
      return;
    }

    const bounds = portraitColumn.getBoundingClientRect();
    const headerHeight = header.getBoundingClientRect().height;
    const progress = Math.max(
      0,
      Math.min(1, (headerHeight - bounds.top) / Math.max(bounds.height, 1)),
    );
    const eased = progress * progress * (3 - 2 * progress);

    portrait.style.setProperty(
      "--hero-portrait-zoom",
      String(1 + eased * 0.1),
    );
  }

  function requestUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateZoom);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  reducedMotion.addEventListener("change", requestUpdate);
  requestUpdate();
})();
