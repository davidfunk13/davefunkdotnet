let currentSectionIndex = 0;
let isScrolling = false;

generateSections();

const initialY = window.pageYOffset || window.scrollY;
sectionCollection.forEach((section, index) => {
    if (initialY >= section.sectionStart - 50) {
        currentSectionIndex = index;
    }
});

changeBackgroundColor();

function handleScroll(direction) {
    if (isScrolling) return;

    if (direction === 'down') {
        if (currentSectionIndex < sectionCollection.length - 1) {
            currentSectionIndex++;
            scrollToSection(currentSectionIndex);
        }
    } else if (direction === 'up') {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
        }
    }
}

function scrollToSection(index) {
    isScrolling = true;
    const targetY = sectionCollection[index].sectionStart;

    smoothScrollTo(targetY, 600);

    setTimeout(() => {
        isScrolling = false;
    }, 300);
}

window.addEventListener('scroll', function () {
    changeBackgroundColor();
});

window.addEventListener('resize', function () {
    generateSections();
    changeBackgroundColor();
    if (sectionCollection[currentSectionIndex]) {
        window.scrollTo(0, sectionCollection[currentSectionIndex].sectionStart);
    }
});

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (Math.abs(e.deltaY) > 5) {
        if (e.deltaY > 0) {
            handleScroll('down');
        } else {
            handleScroll('up');
        }
    }
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleScroll('down');
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handleScroll('up');
    }
});

initSwipeNavigation(
    () => handleScroll('down'),
    () => handleScroll('up')
);

// Portfolio Carousel Navigation
(function initPortfolioCarousel() {
    const prevBtn = document.querySelector('.portfolio-nav-prev');
    const nextBtn = document.querySelector('.portfolio-nav-next');
    const grid = document.querySelector('.portfolio-grid');
    const cards = document.querySelectorAll('.portfolio-grid .project-card');
    const dotsContainer = document.querySelector('.portfolio-dots');

    if (!prevBtn || !nextBtn || !grid || cards.length === 0) return;

    const MIN_CARD_WIDTH = 280;
    const GAP = 24;
    let startIndex = 0;
    let slideDirection = 'next';
    let visibleCount = 1;

    function updateLayout() {
        // Use grid width directly as it's the container
        // IMPORTANT: Subtract padding to get actual available content width
        const computedStyle = window.getComputedStyle(grid);
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
        const containerWidth = grid.clientWidth - paddingLeft - paddingRight;

        // Calculate how many cards fit: (W + gap) / (minWidth + gap)
        visibleCount = Math.floor((containerWidth + GAP) / (MIN_CARD_WIDTH + GAP));
        visibleCount = Math.max(1, visibleCount);

        // Calculate new exact width for cards to fill space
        // Width = (ContainerW - (count-1)*Gap) / count
        // Use floor and subtract small buffer to prevent subpixel rounding overflow
        const newCardWidth = Math.floor((containerWidth - (visibleCount - 1) * GAP) / visibleCount) - 1;

        grid.style.setProperty('--card-width', `${newCardWidth}px`);

        // Re-generate dots whenever layout changes (width changes might change page count)
        generateDots();

        return visibleCount;
    }

    function generateDots() {
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        const pageCount = Math.ceil(cards.length / visibleCount);

        // Don't show dots if only 1 page
        if (pageCount <= 1) {
            dotsContainer.style.display = 'none';
            return;
        }
        dotsContainer.style.display = 'flex';

        for (let i = 0; i < pageCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot'); // Reuse modal dot styles
            if (i === Math.floor(startIndex / visibleCount)) {
                dot.classList.add('active');
            }
            dot.setAttribute('aria-label', `Go to page ${i + 1}`);
            dot.addEventListener('click', () => {
                const targetStart = i * visibleCount;
                if (targetStart !== startIndex) {
                    slideDirection = targetStart > startIndex ? 'next' : 'prev';
                    startIndex = targetStart;
                    // Clamp
                    startIndex = Math.min(startIndex, Math.max(0, cards.length - visibleCount));
                    updateVisibleCards(true);
                }
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsContainer) return;
        const currentDotIndex = Math.floor(startIndex / visibleCount);
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentDotIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function updateVisibleCards(animate = true) {
        cards.forEach((card, index) => {
            const isVisible = index >= startIndex && index < startIndex + visibleCount;

            if (isVisible) {
                card.style.display = 'flex';
                if (animate) {
                    // Reset animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = slideDirection === 'next'
                        ? 'slideFromRight 0.4s ease-out'
                        : 'slideFromLeft 0.4s ease-out';
                }
            } else {
                card.style.display = 'none';
            }
        });
        updateDots();
    }

    function navigate(direction) {
        const oldStart = startIndex;
        slideDirection = direction;

        if (direction === 'next') {
            // If we are at the end (or close to it where no more complete pages exist)
            // Infinite loop: go back to 0
            if (startIndex + visibleCount >= cards.length) {
                startIndex = 0;
            } else {
                // Move by one PAGE (visibleCount) instead of 1 card? 
                // User said "shows what page it's on" and "infinite loop".
                // Page-based means jumping by visibleCount.
                startIndex = startIndex + visibleCount;
            }
        } else {
            // Prev
            if (startIndex === 0) {
                // Infinite loop: go to last page start
                // Last page start is: floor((total-1)/visible) * visible
                const lastPageStart = Math.floor((cards.length - 1) / visibleCount) * visibleCount;
                startIndex = lastPageStart;
            } else {
                startIndex = Math.max(0, startIndex - visibleCount);
            }
        }

        // Ensure index is valid
        if (startIndex >= cards.length) startIndex = 0;

        // Animate always for navigation
        updateVisibleCards(true);
    }

    prevBtn.addEventListener('click', () => navigate('prev'));
    nextBtn.addEventListener('click', () => navigate('next'));

    // Initial setup
    requestAnimationFrame(() => {
        updateLayout();
        updateVisibleCards(false);
    });

    // Recalculate on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateLayout();
            const maxStart = Math.max(0, cards.length - visibleCount);
            startIndex = Math.min(startIndex, maxStart);
            updateVisibleCards(false);
        }, 100);
    });
})();