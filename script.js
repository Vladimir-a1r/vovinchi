 const backToTop = document.getElementById("backToTop");

if (backToTop) {
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
}


// ==============================
// CURSOR GLOW
// ==============================

const cursorGlow = document.getElementById("cursorGlow");

if (cursorGlow) {
    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}


// ==============================
// ABOUT ME PANEL
// ==============================

const aboutButton = document.getElementById("aboutButton");
const aboutPanel = document.getElementById("aboutPanel");
const closeAbout = document.getElementById("closeAbout");

let aboutScrollPosition = 0;


function openAbout() {
    if (!aboutPanel) return;

    aboutScrollPosition = window.scrollY;

    document.body.classList.add("about-open");

    aboutPanel.classList.add("active");

    window.scrollTo(0, aboutScrollPosition);
}



function closeAboutPanel() {
    if (!aboutPanel) return;


    aboutPanel.classList.remove("active");


    document.body.classList.remove("about-open");


    window.scrollTo(0, aboutScrollPosition);
}


if (aboutButton) {
    aboutButton.addEventListener("click", (event) => {
        event.stopPropagation();
        openAbout();
    });
}

if (closeAbout) {
    closeAbout.addEventListener("click", (event) => {
        event.stopPropagation();
        closeAboutPanel();
    });
}


document.addEventListener("click", (event) => {

    if (!aboutPanel || !aboutButton) return;

    if (
        aboutPanel.classList.contains("active") &&
        !aboutPanel.contains(event.target) &&
        !aboutButton.contains(event.target)
    ) {
        closeAboutPanel();
    }
});


// ==============================
// SWIPE LEFT TO CLOSE ABOUT ME
// ==============================

let swipeStartX = 0;
let swipeStartY = 0;
let swipeCurrentX = 0;

if (aboutPanel) {

    aboutPanel.addEventListener("touchstart", (e) => {

        const touch = e.touches[0];

        swipeStartX = touch.clientX;
        swipeStartY = touch.clientY;
        swipeCurrentX = touch.clientX;

    }, { passive: true });


    aboutPanel.addEventListener("touchmove", (e) => {

        const touch = e.touches[0];

        swipeCurrentX = touch.clientX;

    }, { passive: true });


    aboutPanel.addEventListener("touchend", () => {

        const moveX = swipeCurrentX - swipeStartX;
        const moveY = Math.abs(
            swipeStartY -
            event.changedTouches[0].clientY
        );

        if (
            moveX < -50 &&
            Math.abs(moveX) > moveY
        ) {
            closeAboutPanel();
        }

    }, { passive: true });

}
// ==============================
// REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {

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
}


// ==============================
// SHOOTING STARS
// ==============================

const shootingStars = document.getElementById("shootingStars");

function createShootingStar() {

    if (!shootingStars) return;

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


// ==============================
// SERVICE CARDS
// ==============================


const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {

    card.addEventListener("click", () => {

        card.classList.add("active");

    });

});


// ==============================
// PROJECT STAR
// ==============================

const projectStar = document.querySelector(".project-star");

if (projectStar) {

    projectStar.addEventListener("click", (event) => {

        event.preventDefault();

        const targetPage = projectStar.href;

        projectStar.classList.add("redirecting");


        setTimeout(() => {
            window.location.href = targetPage;
        }, 1500);

    });


    window.addEventListener("pageshow", () => {
        projectStar.classList.remove("redirecting");
    });


    window.addEventListener("pagehide", () => {
        projectStar.classList.remove("redirecting");
    });

}