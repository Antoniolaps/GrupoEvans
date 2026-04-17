// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Mobile dropdown toggle
document.querySelectorAll('.dropdown').forEach(drop => {
    const toggle = drop.querySelector('.dropdown-toggle');
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            drop.classList.toggle('open');
        }
    });
});

// ========== HERO CAROUSEL ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let carouselInterval;

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots.length > 0) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    if (slides.length === 0) return;
    showSlide(currentSlide + direction);
    resetCarouselInterval();
}

function goToSlide(index) {
    if (slides.length === 0) return;
    showSlide(index);
    resetCarouselInterval();
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    if (slides.length > 0) {
        carouselInterval = setInterval(() => changeSlide(1), 5000);
    }
}

if (slides.length > 0) {
    carouselInterval = setInterval(() => changeSlide(1), 5000);
}

// ========== INFO CAROUSEL ==========
let infoPosition = 0;
const infoTrack = document.getElementById('infoTrack');

function moveInfoCarousel(direction) {
    const cards = document.querySelectorAll('.info-card');
    const cardWidth = cards[0].offsetWidth + 30;
    const containerWidth = infoTrack.parentElement.offsetWidth;
    const maxScroll = -(cards.length * cardWidth - containerWidth);

    infoPosition += direction * -cardWidth;
    infoPosition = Math.max(maxScroll, Math.min(0, infoPosition));
    infoTrack.style.transform = `translateX(${infoPosition}px)`;
}

// ========== SCROLL TO TOP ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            counter.textContent = current.toLocaleString() + (target >= 100 ? '+' : '+');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-card')) {
                const counter = entry.target.querySelector('.stat-number');
                if (counter && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounters();
                }
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ========== TOUCH SUPPORT FOR CAROUSELS ==========
let touchStartX = 0;
let touchEndX = 0;

const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
    heroCarousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroCarousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            changeSlide(diff > 0 ? 1 : -1);
        }
    }, { passive: true });
}

const infoWrapper = document.querySelector('.info-carousel-wrapper');
if (infoWrapper) {
    infoWrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    infoWrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            moveInfoCarousel(diff > 0 ? 1 : -1);
        }
    }, { passive: true });
}
// ========== WHATSAPP BUTTON INJECTION ==========
document.addEventListener("DOMContentLoaded", function () {
    const waBtn = document.createElement("a");
    waBtn.href = "https://web.whatsapp.com/"; // The phone number from the footer
    waBtn.className = "whatsapp-float";
    waBtn.target = "_blank";
    waBtn.title = "Contactanos por WhatsApp";
    waBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'/></svg>";
    document.body.appendChild(waBtn);
});

// ========== TRACKING SYSTEM ==========
const trackingForm = document.getElementById('trackingForm');
if (trackingForm) {
    trackingForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const trackingInput = document.getElementById('trackingInput').value.trim();
        const resultsContainer = document.getElementById('trackingResultsContainer');
        const trackingTable = document.getElementById('trackingTable');
        const trackingBody = document.getElementById('trackingBody');
        const errorDiv = document.getElementById('trackingError');
        const submitBtn = document.getElementById('trackingSubmitBtn');

        if (!trackingInput) return;

        // Reset view
        resultsContainer.style.display = 'block';
        trackingTable.style.display = 'none';
        errorDiv.style.display = 'none';
        trackingBody.innerHTML = '';

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="display:inline-block;width:1rem;height:1rem;border:2px solid #fff;border-radius:50%;border-top-color:transparent;animation:spin 1s linear infinite;margin-right:5px;vertical-align:middle;"></span> Buscando...';

        if (!document.getElementById('spinStyle')) {
            const style = document.createElement('style');
            style.id = 'spinStyle';
            style.innerHTML = '@keyframes spin { to { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }

        try {
            // Utilizamos el backend local para proteger la API Key y evitar problemas de CORS
            const response = await fetch(`/api/track?tracking_number=${encodeURIComponent(trackingInput)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}. Este error suele suceder si pruebas en local sin un entorno de Vercel.`);
            }

            const data = await response.json();

            if (data.meta && data.meta.code === 200 && data.data && data.data.length > 0) {
                const trackData = data.data[0];

                // Parse status
                const statuses = {
                    'pending': 'Pendiente', 'notfound': 'No encontrado', 'transit': 'En tránsito',
                    'pickup': 'Listo para recoger', 'delivered': 'Entregado', 'undelivered': 'Intento fallido',
                    'exception': 'Excepción', 'expired': 'Expirado'
                };
                const statusLabel = statuses[trackData.delivery_status] || trackData.delivery_status;
                const statusColors = {
                    'notfound': '#6c757d', 'transit': '#007bff', 'pickup': '#17a2b8',
                    'delivered': '#28a745', 'exception': '#dc3545'
                };
                const color = statusColors[trackData.delivery_status] || '#6c757d';

                // Formulate route
                const origin = trackData.origin_country || '-';
                const dest = trackData.destination_country || '-';
                const latestEvent = trackData.latest_event ? trackData.latest_event : null;
                const latestTime = latestEvent ? new Date(latestEvent.time).toLocaleString() : (trackData.updated_at ? new Date(trackData.updated_at).toLocaleString() : '-');

                let detailsHtml = '';
                if (latestEvent) {
                    detailsHtml = `<div style="font-size: 0.85em; color: #555; margin-top: 5px;">${latestEvent.description}</div>`;
                }

                trackingBody.innerHTML = `
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 15px;">
                            <strong>${trackData.courier_code || 'Carrier'}</strong><br>
                            <span style="font-size: 0.9em; color: #666;">${trackData.tracking_number}</span>
                        </td>
                        <td style="padding: 15px;">
                            <span style="background-color: ${color}20; color: ${color}; padding: 4px 8px; border-radius: 4px; font-size: 0.85em; font-weight: bold;">
                                • ${statusLabel}
                            </span>
                        </td>
                        <td style="padding: 15px;">
                            ${origin} &rarr; ${dest}
                        </td>
                        <td style="padding: 15px;">
                            ${latestTime}
                            ${detailsHtml}
                        </td>
                    </tr>
                `;

                trackingTable.style.display = 'table';
            } else {
                // If API returns success but no tracking, or general not found
                errorDiv.innerHTML = `No se encontró información para el número: <strong>${trackingInput}</strong>.`;
                errorDiv.style.display = 'block';
            }

        } catch (error) {
            console.error('Error fetching tracking:', error);
            errorDiv.innerHTML = `
                Error de conexión. <br>
                <span style="font-size: 0.85em; font-weight: normal;">(Nota técnica: La API de TrackingMore puede bloquear peticiones directas desde el navegador por seguridad CORS. En producción se requiere un servidor intermediario).</span>
            `;
            errorDiv.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Rastrear';
        }
    });
}


