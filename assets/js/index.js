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

    smoothScrollTo(targetY, 1500);

    setTimeout(() => {
        isScrolling = false;
    }, 600);
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