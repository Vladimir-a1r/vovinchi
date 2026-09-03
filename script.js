 /* =========================
   BACK TO TOP
========================= */

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


/* =========================
   CURSOR GLOW
========================= */

const cursorGlow = document.getElementById("cursorGlow");

if (cursorGlow) {

    document.addEventListener("mousemove", (event) => {

        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";

    });

}


/* =========================
   ABOUT PANEL
========================= */

const aboutButton = document.getElementById("aboutButton");
const aboutPanel = document.getElementById("aboutPanel");
const closeAbout = document.getElementById("closeAbout");


if (aboutButton && aboutPanel && closeAbout) {

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

}


/* =========================
   SCROLL REVEAL
========================= */

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


/* =========================
   SHOOTING STARS
========================= */

const shootingStars = document.getElementById("shootingStars");


function createShootingStar() {

    if (!shootingStars) {
        return;
    }


    const star = document.createElement("div");

    star.classList.add("shooting-star");

    star.style.left =
        Math.random() * 100 + "%";


    star.style.animationDuration =
        (1 + Math.random() * 1.5) + "s";


    shootingStars.appendChild(star);


    setTimeout(() => {

        star.remove();

    }, 3000);

}


if (shootingStars) {

    setInterval(() => {

        if (Math.random() > 0.35) {

            createShootingStar();

        }

    }, 2500);

}


/* =========================
   SERVICES
========================= */

/*
   IMPORTANT:

   Every card works independently.

   Opening one card does NOT close
   any other card.

   Clicking the same card again
   closes only that card.
*/

const serviceCards =
    document.querySelectorAll(".service-card");


serviceCards.forEach((card) => {

    card.addEventListener("click", () => {

        card.classList.toggle("active");

    });

});


/* =========================
   PROJECT STAR REDIRECT
========================= */

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