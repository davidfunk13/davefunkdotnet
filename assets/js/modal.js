let currentSlide = 0;
let currentProject = null;
let modalIsOpen = false;

let modalOverlay, modalCard, modalImage, modalTitle, modalDescription, modalTechStack, carouselDots, modalRepoLink;

function initModal() {
    modalOverlay = document.getElementById('modal-overlay');
    modalCard = document.getElementById('modal-card');
    modalImage = document.getElementById('modal-image');
    modalTitle = document.getElementById('modal-title');
    modalDescription = document.getElementById('modal-description');
    modalTechStack = document.getElementById('modal-tech-stack');
    modalRepoLink = document.getElementById('modal-repo-link');
    carouselDots = document.getElementById('carousel-dots');

    document.querySelectorAll('.project-card[data-project-id]').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    document.getElementById('modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.getElementById('carousel-prev').addEventListener('click', prevSlide);
    document.getElementById('carousel-next').addEventListener('click', nextSlide);

    document.addEventListener('keydown', handleKeyboard);
}

function openModal(projectId) {
    currentProject = portfolioProjects[projectId];
    if (!currentProject) return;

    currentSlide = 0;
    modalIsOpen = true;

    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    modalCard.style.backgroundColor = bgColor;

    modalTechStack.innerHTML = currentProject.techStack
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');

    if (currentProject.repoUrl) {
        modalRepoLink.href = currentProject.repoUrl;
        modalRepoLink.style.display = 'inline-flex';
    } else {
        modalRepoLink.style.display = 'none';
    }

    carouselDots.innerHTML = currentProject.slides
        .map((_, i) => `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}"></button>`)
        .join('');

    carouselDots.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.getAttribute('data-index')));
        });
    });

    updateCarousel();

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalIsOpen = false;
    document.body.style.overflow = '';
}

function prevSlide() {
    if (!currentProject) return;
    currentSlide = (currentSlide - 1 + currentProject.slides.length) % currentProject.slides.length;
    updateCarousel();
}

function nextSlide() {
    if (!currentProject) return;
    currentSlide = (currentSlide + 1) % currentProject.slides.length;
    updateCarousel();
}

function goToSlide(index) {
    if (!currentProject || index < 0 || index >= currentProject.slides.length) return;
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    if (!currentProject) return;

    const slide = currentProject.slides[currentSlide];

    modalTitle.textContent = slide.title;
    modalDescription.textContent = slide.description;

    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.src = slide.image;
        modalImage.style.opacity = '1';
    }, 150);

    carouselDots.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function handleKeyboard(e) {
    if (!modalIsOpen) return;

    switch (e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            break;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModal);
} else {
    initModal();
}
