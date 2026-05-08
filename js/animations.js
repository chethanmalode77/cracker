// ================================
// Madhu Crackers - Animations & Effects
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initCountdown();
    initFireworks();
    initScrollAnimations();
    initBackToTop();
});

// ================================
// Deepawali Countdown Timer
// ================================
function initCountdown() {
    // Try to get offer settings from Firebase settings (via localStorage cache)
    let targetDate;
    let offerTitle = null;

    try {
        // Check both possible localStorage keys for settings
        const cachedSettings = localStorage.getItem('shopSettings') || localStorage.getItem('firebaseSettings');
        if (cachedSettings) {
            const settings = JSON.parse(cachedSettings);

            // Get offer title if available
            if (settings.offerTitle) {
                offerTitle = settings.offerTitle;
                const offerTitleEl = document.getElementById('offerTitle');
                if (offerTitleEl) {
                    offerTitleEl.textContent = offerTitle;
                }
            }

            if (settings.offerEndDate) {
                // Parse date in YYYY-MM-DD format
                const dateParts = settings.offerEndDate.split('-');
                if (dateParts.length === 3) {
                    targetDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 23, 59, 59).getTime();
                } else {
                    targetDate = new Date(settings.offerEndDate + 'T23:59:59').getTime();
                }
                console.log('Offer end date from settings:', settings.offerEndDate, 'Target:', new Date(targetDate));
            }
        }
    } catch (e) {
        console.log('Using default Deepawali date:', e);
    }

    // Default to Deepawali 2025 (October 20, 2025) if no setting found
    if (!targetDate || isNaN(targetDate)) {
        targetDate = new Date(2025, 9, 20, 23, 59, 59).getTime(); // October is month 9 (0-indexed)
        console.log('Using default Deepawali 2025 date');
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // If date has passed, show zeros
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ================================
// Fireworks Animation
// ================================
function initFireworks() {
    const container = document.getElementById('fireworksContainer');
    if (!container) return;

    // Create random fireworks periodically
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 50 + '%';
        firework.style.setProperty('--color', getRandomColor());

        container.appendChild(firework);

        // Create particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--angle', (i * 30) + 'deg');
            firework.appendChild(particle);
        }

        // Remove after animation
        setTimeout(() => {
            firework.remove();
        }, 1500);
    }

    function getRandomColor() {
        const colors = ['#ff6b35', '#ffd700', '#ff4444', '#9c27b0', '#4caf50', '#2196f3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Create fireworks at random intervals
    setInterval(() => {
        if (Math.random() > 0.5) {
            createFirework();
        }
    }, 2000);

    // Add fireworks CSS
    const style = document.createElement('style');
    style.textContent = `
        .fireworks-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }

        .firework {
            position: absolute;
            width: 10px;
            height: 10px;
        }

        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--color);
            border-radius: 50%;
            animation: explode 1.5s ease-out forwards;
            box-shadow: 0 0 10px var(--color);
        }

        @keyframes explode {
            0% {
                transform: rotate(var(--angle)) translateY(0);
                opacity: 1;
            }
            100% {
                transform: rotate(var(--angle)) translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ================================
// Scroll Animations
// ================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.category-card, .product-card, .feature-card, .gift-box-card, .step-card, .safety-item'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.5s ease ${index * 0.05}s`;
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ================================
// Back to Top Button
// ================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// Sparkle Effect on Hover
// ================================
function createSparkle(x, y, parent) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-effect';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    parent.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle effect styles
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    .sparkle-effect {
        position: absolute;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #ffd700 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleEffect 1s ease-out forwards;
    }

    @keyframes sparkleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ================================
// Confetti Effect
// ================================
function createConfetti() {
    const colors = ['#ff6b35', '#ffd700', '#ff4444', '#4caf50', '#9c27b0'];
    const container = document.body;

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti styles
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    .confetti {
        position: fixed;
        top: -10px;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        animation: confettiFall 4s ease-out forwards;
        z-index: 9999;
        pointer-events: none;
    }

    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Trigger confetti on add to cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
        createConfetti();
    }
});

// ================================
// Parallax Effect
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');

    if (hero && heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ================================
// Typing Effect for Hero Title
// ================================
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}
