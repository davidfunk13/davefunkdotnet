function getElementY(el) {
    var bodyRect = document.body.getBoundingClientRect();
    var elemRect = el.getBoundingClientRect();
    return elemRect.top - bodyRect.top;
}

function drawSvg(t, a, b, c, d) {
    return c + ((d - c) / (b - a)) * (t - a);
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset || window.scrollY;
    const change = target - start;
    let currentTime = 0;
    const increment = 20;

    function animateScroll() {
        currentTime += increment;
        const val = easeInOutCubic(currentTime, start, change, duration);
        window.scrollTo(0, val);
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    }
    animateScroll();
}

function changeBackgroundColor() {
    const currentY = window.pageYOffset || window.scrollY;
    const triggerY = currentY + (window.innerHeight * 0.6);

    sectionCollection.forEach((section, index) => {
        const hasEntered = triggerY >= section.sectionStart;
        const hasLeft = currentY > section.sectionEnd;
        const isActive = (triggerY >= section.sectionStart) && (currentY < section.sectionEnd);

        if (section.rect) section.rect.style.strokeDashoffset = isActive ? 0 : 2500;
        if (section.text) section.text.style.strokeDashoffset = isActive ? 0 : 2500;

        if (currentY <= section.sectionEnd) {
            if (currentY >= section.sectionTrigger) {
                return document.body.style.backgroundColor = section.sectionTransitionScale(currentY);
            }

            if (currentY >= section.sectionStart && currentY < section.sectionTrigger) {
                return document.body.style.backgroundColor = section.sectionColor;
            }
        }
    });
}

function initSwipeNavigation(onSwipeUp, onSwipeDown) {
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        const swipeDistance = touchStartY - touchEndY;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                onSwipeUp();
            } else {
                onSwipeDown();
            }
        }
    }, { passive: true });
}