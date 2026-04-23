/**
 * EVANS LOGISTICS - MAIN JAVASCRIPT
 * Optimized for performance and SEO
 */

// ========== GLOBAL UTILITIES ==========
window.openModal = (e, modalId) => {
    if (e) e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

window.closeModalOutside = (e, modalId) => {
    if (e.target.id === modalId) window.closeModal(modalId);
};

window.switchTab = (tabId) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const tab = document.getElementById('tab-' + tabId);
    const panel = document.getElementById('panel-' + tabId);
    if (tab && panel) {
        tab.classList.add('active');
        panel.classList.add('active');
    }
};

window.toggleAccordion = (id) => {
    const item = document.getElementById(id);
    if (!item) return;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
};

window.scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // --- Navbar & Scroll Top combined ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        if (navbar) navbar.classList.toggle('scrolled', scrolled);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    // --- Mobile Menu ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Mobile Dropdowns ---
    document.querySelectorAll('.dropdown').forEach(drop => {
        const toggle = drop.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    drop.classList.toggle('open');
                }
            });
        }
    });

    // --- Hero Carousel ---
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let carouselInterval;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const resetCarousel = () => {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        };

        // Touch support
        const heroCarousel = document.getElementById('heroCarousel');
        if (heroCarousel) {
            let startX = 0;
            heroCarousel.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
            heroCarousel.addEventListener('touchend', e => {
                const diff = startX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                    showSlide(currentSlide + (diff > 0 ? 1 : -1));
                    resetCarousel();
                }
            }, { passive: true });
        }

        carouselInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        
        // Expose to window for inline dots/arrows if any
        window.changeSlide = (dir) => { showSlide(currentSlide + dir); resetCarousel(); };
        window.goToSlide = (idx) => { showSlide(idx); resetCarousel(); };
    }

    // --- Info Carousel ---
    const infoTrack = document.getElementById('infoTrack');
    const infoWrapper = document.querySelector('.info-carousel-wrapper');
    if (infoTrack && infoWrapper) {
        let infoPos = 0;
        const moveInfo = (dir) => {
            const cards = infoTrack.querySelectorAll('.info-card');
            if (cards.length === 0) return;
            const cardWidth = cards[0].offsetWidth + 30;
            const maxScroll = -(cards.length * cardWidth - infoWrapper.offsetWidth);
            infoPos = Math.max(maxScroll, Math.min(0, infoPos + dir * -cardWidth));
            infoTrack.style.transform = `translateX(${infoPos}px)`;
        };

        window.moveInfoCarousel = moveInfo;

        let startX = 0;
        infoWrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
        infoWrapper.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) moveInfo(diff > 0 ? 1 : -1);
        }, { passive: true });
    }

    // --- Counter Animation ---
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();
        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target).toLocaleString() + '+';
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };

    // --- Intersection Observer (Scroll Animations) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                const counter = entry.target.querySelector('.stat-number');
                if (counter && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
                observer.unobserve(entry.target); // Optimize: stop observing once animated
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const offset = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
            }
        });
    });

    // --- WhatsApp Floating Button ---
    if (!document.querySelector('.whatsapp-float')) {
        const waBtn = document.createElement("a");
        waBtn.href = "https://wa.me/50767502610";
        waBtn.className = "whatsapp-float";
        waBtn.target = "_blank";
        waBtn.rel = "noopener noreferrer";
        waBtn.title = "Contáctanos por WhatsApp";
        waBtn.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='24' height='24'><path fill='currentColor' d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'/></svg>`;
        document.body.appendChild(waBtn);
    }


});
