// ================================
// Madhu Crackers - Main JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();

    // Load Featured Products on Home Page
    loadFeaturedProducts();

    // Initialize Add to Cart functionality
    initAddToCart();

    // Update cart count
    updateCartCount();

    // Initialize scroll effects
    initScrollEffects();
});

// ================================
// Navigation
// ================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        });
    }
}

// ================================
// Load Featured Products
// ================================
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = getFeaturedProducts();
    if (featured.length > 0) {
        container.innerHTML = featured.map(product => createProductCard(product)).join('');
    }
}

// ================================
// Add to Cart Functionality
// ================================
function initAddToCart() {
    document.addEventListener('click', function(e) {
        const addBtn = e.target.closest('.add-to-cart');
        if (addBtn) {
            e.preventDefault();
            const productId = addBtn.dataset.id;

            if (productId) {
                addToCart(productId);

                // Button animation
                const originalHtml = addBtn.innerHTML;
                addBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
                addBtn.disabled = true;
                addBtn.style.background = '#4caf50';

                setTimeout(() => {
                    addBtn.innerHTML = originalHtml;
                    addBtn.disabled = false;
                    addBtn.style.background = '';
                }, 2000);
            }
        }
    });
}

// ================================
// Scroll Effects
// ================================
function initScrollEffects() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Navbar shadow on scroll
        if (navbar) {
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
            } else {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
            }
        }

        lastScroll = currentScroll;
    });
}

// ================================
// Smooth Scroll for Anchor Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ================================
// Image Lazy Loading
// ================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// Form Validation Helper
// ================================
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            input.style.borderColor = '#ff4444';
        } else {
            input.classList.remove('error');
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// ================================
// Number Formatting
// ================================
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// ================================
// Debounce Function
// ================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================================
// Mobile Detection
// ================================
function isMobile() {
    return window.innerWidth <= 768;
}

// ================================
// URL Parameters Helper
// ================================
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ================================
// Console Welcome Message
// ================================
console.log('%c🎆 Madhu Crackers', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
console.log('%cWelcome to Madhu Crackers! Light up your celebrations!', 'font-size: 14px; color: #666;');
