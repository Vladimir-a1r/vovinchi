 const backToTop = document.getElementById("backToTop");

 window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        backToTop.classList.add("show");
     } else {
        backToTop.classList.remove("show");
     }
 });

 backToTop.addEventListener("click", () => {
     window.scrollTo({
        top: 0,
        behavior: "smooth"
     });
 });
 const cursorGlow = document.getElementById("cursorGlow");

 document.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";
 });
 const aboutButton = document.getElementById("aboutButton");
const aboutPanel = document.getElementById("aboutPanel");
const closeAbout = document.getElementById("closeAbout");

aboutButton.addEventListener("click", () => {
    aboutPanel.classList.add("active");
});

closeAbout.addEventListener("click", () => {
    aboutPanel.classList.remove("active");
});
document.addEventListener("click", (event) => {
    if (
        aboutPanel.classList.contains("active") &&
        !aboutPanel.contains(event.target) &&
        !aboutButton.contains(event.target)
    ) {
        aboutPanel.classList.remove("active");
    }
});
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            } else {

                entry.target.classList.remove("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
const shootingStars = document.getElementById("shootingStars");

function createShootingStar() {

    const star = document.createElement("div");

    star.classList.add("shooting-star");

    star.style.left = Math.random() * 100 + "%";

    star.style.animationDuration =
        (1 + Math.random() * 1.5) + "s";

    shootingStars.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 3000);
}

setInterval(() => {

    if (Math.random() > 0.35) {
        createShootingStar();
    }

}, 2500);
js
const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});
const projectStar = document.querySelector(".project-star");

projectStar.addEventListener("click", (event) => {
    event.preventDefault();

    const targetPage = projectStar.href;

    projectStar.classList.add("redirecting");

    setTimeout(() => {
        window.location.href = targetPage;
    }, 1500);
});
window.addEventListener("pageshow", () => {
    const projectStar = document.querySelector(".project-star");

    if (projectStar) {
        projectStar.classList.remove("redirecting");
    }
});

window.addEventListener("pagehide", () => {
    const projectStar = document.querySelector(".project-star");

    if (projectStar) {
        projectStar.classList.remove("redirecting");
    }
});