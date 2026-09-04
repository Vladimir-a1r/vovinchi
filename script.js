const backToTop = document.getElementById("backToTop");

if (backToTop) {

    function updateBackToTop() {

        if (window.scrollY > 1) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }
    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    updateBackToTop();
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


// OPEN ABOUT
function openAbout() {

    if (!aboutPanel) return;

    aboutScrollPosition = window.scrollY;

    document.body.classList.add("about-open");

    aboutPanel.classList.add("active");

}


// CLOSE ABOUT
function closeAboutPanel() {

    if (!aboutPanel) return;

    aboutPanel.classList.remove("active");

    document.body.classList.remove("about-open");

    window.scrollTo({
        top: aboutScrollPosition,
        left: 0,
        behavior: "instant"
    });

}


// ABOUT BUTTON
if (aboutButton) {

    aboutButton.addEventListener("click", (event) => {

        event.stopPropagation();

        openAbout();

    });

}


// CLOSE BUTTON
if (closeAbout) {

    closeAbout.addEventListener("click", (event) => {

        event.stopPropagation();

        closeAboutPanel();

    });

}


// CLICK OUTSIDE
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
// ABOUT ME SWIPE LEFT
// ==============================

let swipeStartX = 0;
let swipeStartY = 0;

if (aboutPanel) {

    aboutPanel.addEventListener("touchstart", (event) => {

        const touch = event.changedTouches[0];

        swipeStartX = touch.clientX;
        swipeStartY = touch.clientY;

    }, {
        passive: true
    });


    aboutPanel.addEventListener("touchend", (event) => {

        const touch = event.changedTouches[0];

        const swipeEndX = touch.clientX;
        const swipeEndY = touch.clientY;

        const distanceX = swipeEndX - swipeStartX;
        const distanceY = swipeEndY - swipeStartY;

        const horizontalSwipe =
            Math.abs(distanceX) > Math.abs(distanceY);

        const swipeLeft =
            distanceX < -50;


        if (
            horizontalSwipe &&
            swipeLeft
        ) {

            closeAboutPanel();

        }

    }, {
        passive: true
    });

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

const shootingStars =
    document.getElementById("shootingStars");


function createShootingStar() {

    if (!shootingStars) return;

    const star = document.createElement("div");

    star.classList.add("shooting-star");

    star.style.left =
        Math.random() * 100 + "%";

    star.style.animationDuration =
        (1 + Math.random() * 1) + "s";

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

    card.addEventListener("click", function () {
        this.classList.toggle("active");
    });

});

// ==============================
// PROJECT STAR
// ==============================

const projectStar =
    document.querySelector(".project-star");


if (projectStar) {

    projectStar.addEventListener("click", (event) => {

        event.preventDefault();

        const targetPage =
            projectStar.href;

        projectStar.classList.add("redirecting");


        setTimeout(() => {

            window.location.href =
                targetPage;

        }, 1500);

    });

    window.addEventListener("pageshow", () => {

        projectStar.classList.remove("redirecting");

    });


    window.addEventListener("pagehide", () => {

        projectStar.classList.remove("redirecting");

    });

}