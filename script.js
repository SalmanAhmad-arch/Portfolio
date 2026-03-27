
    const cardList = document.querySelector(".cardlist");
    const leftBtn = document.querySelector(".leftbtn");
    const rightBtn = document.querySelector(".rightbtn");
    function getCardWidth() {
      const card = document.querySelector(".carditems");
      return card ? card.offsetWidth + 24 : 464;
    }
    function updateButtons() {
      const { scrollLeft, scrollWidth, clientWidth } = cardList;
      leftBtn.classList.toggle("hidden", scrollLeft <= 5);
      rightBtn.classList.toggle("hidden", scrollLeft >= scrollWidth - clientWidth - 5);
    }
    rightBtn.addEventListener("click", () => {
      cardList.scrollBy({ left: getCardWidth(), behavior: "smooth" });
      setTimeout(updateButtons, 400);
    });
    leftBtn.addEventListener("click", () => {
      cardList.scrollBy({ left: -getCardWidth(), behavior: "smooth" });
      setTimeout(updateButtons, 400);
    });
    cardList.addEventListener("scroll", updateButtons);
    updateButtons();



const navItems = document.querySelectorAll(".navmenu ul li");
const sections = document.querySelectorAll("section, div[id]");

/* ✅ CLICK ACTIVE (tumhari existing) */
navItems.forEach(item => {
    item.addEventListener("click", () => {

        navItems.forEach(li => li.classList.remove("active"));
        item.classList.add("active");
    });
});

/* ✅ SCROLL ACTIVE */
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(li => {
        li.classList.remove("active");

        if (li.getAttribute("data-section") === current) {
            li.classList.add("active");
        }
    });
});



const words = ["Frontend Developer", "Shopify Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    let currentWord = words[wordIndex];
    let text = currentWord.substring(0, charIndex);

    document.getElementById("typing").textContent = text;

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200); // pause after full word
            return;
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 300); // small gap before next word
            return;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.style.transition = "transform 0.6s ease, opacity 0.6s ease";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
        } else {
            entry.target.style.transform = "translateY(50px)";
            entry.target.style.opacity = "0";
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".aboutme, .col, .row").forEach(el => observer.observe(el));


navItems.forEach(item => {
    item.addEventListener("click", () => {

        // remove active
        navItems.forEach(li => li.classList.remove("active"));
        item.classList.add("active");

        // scroll to section
        const target = item.getAttribute("data-section");
        const section = document.getElementById(target);

        section.scrollIntoView({
            behavior: "smooth"
        });
    });
});

const footerItems = document.querySelectorAll(".footermenu");

footerItems.forEach(item => {
    item.addEventListener("click", () => {

        // remove active from all
        footerItems.forEach(li => li.classList.remove("active"));

        // add active to clicked
        item.classList.add("active");

        // scroll to section
        const target = item.getAttribute("data-section");
        const section = document.getElementById(target);

        if (section) {
            const yOffset = -80; // header height adjust
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        }
    });
});const hamburger = document.getElementById("hamburg");
const navWrapper = document.getElementById("navWrapper");
const hamburgerIcon = document.getElementById("hamburgerIcon");
// const navItems = document.querySelectorAll(".navitem");

// Toggle menu
hamburger.addEventListener("click", (e) => {
    e.stopPropagation();  // prevent outside click
    navWrapper.classList.toggle("active");

    // Change icon: bars <-> cross
    if(navWrapper.classList.contains("active")) {
        hamburgerIcon.classList.remove("fa-bars");
        hamburgerIcon.classList.add("fa-xmark");
    } else {
        hamburgerIcon.classList.remove("fa-xmark");
        hamburgerIcon.classList.add("fa-bars");
    }
});

// Close menu on clicking a nav item
navItems.forEach(item => {
    item.addEventListener("click", () => {
        if (navWrapper.classList.contains("active")) {
            navWrapper.classList.remove("active");
            hamburgerIcon.classList.remove("fa-xmark");
            hamburgerIcon.classList.add("fa-bars");
        }
    });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!navWrapper.contains(e.target) && !hamburger.contains(e.target)) {
        if(navWrapper.classList.contains("active")) {
            navWrapper.classList.remove("active");
            hamburgerIcon.classList.remove("fa-xmark");
            hamburgerIcon.classList.add("fa-bars");
        }
    }
});