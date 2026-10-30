// Bring Curling Home - site scripts

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });
}

/* Bring Curling Home — Pledge Tank */
(() => {
    // UPDATE THIS FIGURE as new pledges are received.
    const currentPledges = 35450;
    const pledgeTarget = 150000;

    const water = document.getElementById("pledge-water");
    const amount = document.getElementById("pledge-amount");
    const percentage = document.getElementById("pledge-percentage");
    const tank = document.querySelector(".pledge-tank");
const target = document.getElementById("pledge-target");
    // Do nothing on pages without the pledge tank.
    if (!water || !amount || !percentage || !tank) return;

    const progress = pledgeTarget > 0
        ? Math.min(100, Math.max(0, currentPledges / pledgeTarget * 100))
        : 0;

    const formatPounds = value =>
        new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            maximumFractionDigits: 0
        }).format(value);

    amount.textContent = formatPounds(currentPledges);
    percentage.textContent = `${progress.toFixed(1)}% of our target`;
if (target) target.textContent = formatPounds(pledgeTarget);
    tank.setAttribute(
        "aria-label",
        `${formatPounds(currentPledges)} pledged towards a target of ${formatPounds(pledgeTarget)}`
    );

     // Start the animation when the tank becomes visible.
  water.style.height = "0%";

  let animationStarted = false;

  const startPledgeAnimation = () => {
      if (animationStarted) return;
      animationStarted = true;

      requestAnimationFrame(() => {
          requestAnimationFrame(() => {
              water.style.height = `${progress}%`;
          });
      });
  };

  if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  startPledgeAnimation();
                  observer.disconnect();
              }
          });
      }, {
          threshold: 0.35
      });

      observer.observe(tank);
  } else {
      startPledgeAnimation();
  }
})();