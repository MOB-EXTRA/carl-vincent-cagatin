// ==========================================
// DYNAMIC TIME-BASED GREETING
// Uses the website visitor's local time zone
// ==========================================

function updateGreeting() {
  const greetingElement = document.querySelector(".greeting-tag");

  if (!greetingElement) return;

  const currentHour = new Date().getHours();

  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning.";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon.";
  } else {
    greeting = "Good evening.";
  }

  greetingElement.textContent = greeting;
}

// Run immediately when the page loads
updateGreeting();

// Refresh every minute
setInterval(updateGreeting, 60000);

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuButton = document.querySelector(".menu-toggle");
const navRight = document.querySelector(".nav-right");

if (menuButton && navRight) {
  menuButton.addEventListener("click", () => {
    const isOpen = navRight.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      navRight.classList.remove("is-open");

      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}
