/* ==========================================
   AWS Portfolio Website — app.js
   Alan K Portfolio
========================================== */

/* ---------- Smooth Navigation Highlight ---------- */

const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* ---------- Contact Form ---------- */

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const submitButton = document.getElementById("submitBtn");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    statusText.textContent = "";
    statusText.style.color = "#38BDF8";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    /* ---------- Validation ---------- */

    if (!name || !email || !message) {
        statusText.style.color = "#EF4444";
        statusText.textContent = "Please fill in all fields.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        statusText.style.color = "#EF4444";
        statusText.textContent = "Please enter a valid email address.";
        return;
    }

    /* ---------- Loading State ---------- */

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                message
            })

        });

        const data = await response.json();

        if (response.ok) {

            statusText.style.color = "#22C55E";
            statusText.textContent =
                "✅ Message sent successfully! I'll get back to you soon.";

            form.reset();

        } else {

            statusText.style.color = "#EF4444";

            statusText.textContent =
                data.message || "Something went wrong.";

        }

    } catch (error) {

        console.error(error);

        statusText.style.color = "#EF4444";

        statusText.textContent =
            "Unable to reach the server. Please try again later.";

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Message";

    }

});

/* ---------- Console Message ---------- */

console.log("Alan K AWS Portfolio Loaded Successfully.");