/* ==========================================
   Alan K Portfolio — architecture.js
   AWS Architecture Page
========================================== */

/* ---------- Fade-in Animation ---------- */

const animatedCards = document.querySelectorAll(
    ".service-card, .service-info, .security-card"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

animatedCards.forEach((card) => {
    card.classList.add("hidden");
    observer.observe(card);
});

/* ---------- Floating Hover Effect ---------- */

animatedCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -6;
        const rotateY = ((x / rect.width) - 0.5) * 6;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

/* ---------- Smooth Scroll (Future-proof) ---------- */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

/* ---------- Console ---------- */

console.log("Alan K AWS Architecture Page Loaded.");