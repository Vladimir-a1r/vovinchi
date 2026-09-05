/* ========================================
   BACK TO TOP
======================================== */

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


/* ========================================
   CURSOR GLOW
======================================== */

const cursorGlow = document.getElementById("cursorGlow");

if (cursorGlow) {

    document.addEventListener("mousemove", (event) => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    });

}


/* ========================================
   ABOUT PANEL
======================================== */

const aboutButton =
    document.getElementById("aboutButton");

const aboutPanel =
    document.getElementById("aboutPanel");

const closeAbout =
    document.getElementById("closeAbout");


if (aboutButton && aboutPanel) {

    aboutButton.addEventListener("click", () => {

        aboutPanel.classList.add("active");

    });

}


if (closeAbout && aboutPanel) {

    closeAbout.addEventListener("click", () => {

        aboutPanel.classList.remove("active");

    });

}


document.addEventListener("click", (event) => {

    if (
        aboutPanel &&
        aboutButton &&
        aboutPanel.classList.contains("active") &&
        !aboutPanel.contains(event.target) &&
        !aboutButton.contains(event.target)
    ) {

        aboutPanel.classList.remove("active");

    }

});


/* ========================================
   ABOUT PHOTO GALLERY
======================================== */

const gallery =
    document.getElementById("aboutGallery");

const photos =
    document.querySelectorAll(".about-photo");

const dots =
    document.querySelectorAll(".about-dot");


let currentPhoto = 0;

let galleryInterval;


/* SHOW PHOTO */

function showPhoto(index) {

    if (!photos.length) return;

    if (index >= photos.length) {
        currentPhoto = 0;
    }

    else if (index < 0) {
        currentPhoto = photos.length - 1;
    }

    else {
        currentPhoto = index;
    }


    photos.forEach((photo, i) => {

        photo.classList.toggle(
            "active",
            i === currentPhoto
        );

    });


    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentPhoto
        );

    });

}


/* NEXT PHOTO */

function nextPhoto() {

    showPhoto(currentPhoto + 1);

}


/* PREVIOUS PHOTO */

function previousPhoto() {

    showPhoto(currentPhoto - 1);

}


/* AUTO SLIDER */

function startGallery() {

    if (photos.length <= 1) return;

    galleryInterval = setInterval(() => {

        nextPhoto();

    }, 4000);

}


function restartGallery() {

    clearInterval(galleryInterval);

    startGallery();

}


/* DOT CLICK */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showPhoto(index);

        restartGallery();

    });

});


/* ========================================
   MOBILE SWIPE
======================================== */

let touchStartX = 0;

let touchEndX = 0;


if (gallery) {

    gallery.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    gallery.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            const swipeDistance =
                touchEndX - touchStartX;


            /* SWIPE LEFT */

            if (swipeDistance < -50) {

                nextPhoto();

                restartGallery();

            }


            /* SWIPE RIGHT */

            if (swipeDistance > 50) {

                previousPhoto();

                restartGallery();

            }

        },
        { passive: true }
    );

}


/* START */

showPhoto(0);

startGallery();


/* ========================================
   REVEAL ANIMATION
======================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    } else {

                        entry.target.classList.remove(
                            "visible"
                        );

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


/* ========================================
   SHOOTING STARS
======================================== */

const shootingStars =
    document.getElementById("shootingStars");


function createShootingStar() {

    if (!shootingStars) return;


    const star =
        document.createElement("div");


    star.classList.add(
        "shooting-star"
    );


    star.style.left =
        Math.random() * 100 + "%";


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


/* ========================================
   SERVICES
======================================== */

const serviceCards =
    document.querySelectorAll(".service-card");


serviceCards.forEach((card) => {

    card.addEventListener("click", () => {

        card.classList.toggle("active");

    });

});


/* ========================================
   PROJECT STAR
======================================== */

const projectStar =
    document.querySelector(".project-star");


if (projectStar) {

    projectStar.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            const targetPage =
                projectStar.href;


            if (aboutPanel) {

                aboutPanel.classList.remove(
                    "active"
                );

            }


            projectStar.classList.add(
                "redirecting"
            );


            setTimeout(() => {

                window.location.href =
                    targetPage;

            }, 1500);

        }
    );


    /* FIX AFTER BACK BUTTON */

    window.addEventListener("pageshow", () => {

        projectStar.classList.remove(
            "redirecting"
        );

    });

}