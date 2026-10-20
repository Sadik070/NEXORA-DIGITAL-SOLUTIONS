const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

function setMenuState(isOpen) {
    navigation.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", function () {
    setMenuState(!navigation.classList.contains("active"));
});

const navigationLinks = document.querySelectorAll(".navigation a");

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        setMenuState(false);
    });
});

const header = document.getElementById("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 20);
});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = "form-status " + type;
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !company || !service || !message) {
        showFormStatus("Please complete all required fields before submitting.", "error");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormStatus("Please enter a valid work email address.", "error");
        return;
    }

    showFormStatus(
        "Thank you, " + name + ". Your enquiry has been received and our team will be in touch.",
        "success"
    );

    contactForm.reset();
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".service-card, .industry-card, .project-card, .benefit"
);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}


/* =========================
   ACTIVE NAVIGATION
========================= */

const pageSections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", function () {
    let currentSection = "";

    pageSections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach(function (link) {
        link.classList.remove("active");
        const target = link.getAttribute("href");

        if (target === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});


/* =========================
   CURRENT YEAR
========================= */

const yearEl = document.getElementById("year");

if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}
