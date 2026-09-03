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


// Открыть панель
if (aboutButton && aboutPanel) {
    aboutButton.addEventListener("click", () => {
        aboutPanel.classList.add("active");
    });
}


// Закрыть по кнопке X
if (closeAbout && aboutPanel) {
    closeAbout.addEventListener("click", () => {
        aboutPanel.classList.remove("active");
    });
}


// Закрыть по клику вне панели
document.addEventListener("click", (event) => {
    if (!aboutPanel || !aboutButton) return;

    if (
        aboutPanel.classList.contains("active") &&
        !aboutPanel.contains(event.target) &&
        !aboutButton.contains(event.target)
    ) {
        aboutPanel.classList.remove("active");
    }
});


// ==============================
// SWIPE LEFT TO CLOSE ABOUT ME
// ==============================

if (aboutPanel) {

    let touchStartX = 0;
    let touchStartY = 0;

    aboutPanel.addEventListener(
        "touchstart",
        (event) => {

            // Берём начальную позицию пальца
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;

        },
        { passive: true }
    );


    aboutPanel.addEventListener(
        "touchend",
        (event) => {

            const touchEndX = event.changedTouches[0].clientX;
            const touchEndY = event.changedTouches[0].clientY;

            const distanceX = touchEndX - touchStartX;
            const distanceY = touchEndY - touchStartY;


            // Проверяем, что движение именно горизонтальное
            const isHorizontalSwipe =
                Math.abs(distanceX) > Math.abs(distanceY);


            // Свайп влево минимум 60px
            const isSwipeLeft = distanceX < -60;


            if (isHorizontalSwipe && isSwipeLeft) {
                aboutPanel.classList.remove("active");
            }

        },
        { passive: true }
    );
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

// Карточка открывается,
// но больше НИКОГДА не закрывается по повторному нажатию.

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