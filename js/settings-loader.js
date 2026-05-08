// ================================
// Madhu Fireworks - Settings Loader
// Loads settings from Firebase and applies to page
// ================================

import { getSettings } from './firebase-products.js';

// Load and apply settings
export async function loadAndApplySettings() {
    try {
        const settings = await getSettings();
        if (!settings) return settings;

        // Save to localStorage for other scripts (countdown, etc.)
        localStorage.setItem('shopSettings', JSON.stringify(settings));

        // Apply offer banner visibility
        const offerBanner = document.querySelector('.offer-banner');
        if (offerBanner) {
            if (settings.offerActive === false) {
                offerBanner.style.display = 'none';
            } else {
                offerBanner.style.display = 'block';
            }
        }

        // Apply offer title
        const offerTitleEl = document.getElementById('offerTitle');
        if (offerTitleEl && settings.offerTitle) {
            offerTitleEl.textContent = settings.offerTitle;
        }

        // Apply WhatsApp number to all WhatsApp links
        if (settings.whatsappNumber) {
            document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
                const currentHref = link.getAttribute('href');
                const textMatch = currentHref.match(/\?text=(.*)$/);
                const textParam = textMatch ? textMatch[0] : '';
                link.setAttribute('href', `https://wa.me/${settings.whatsappNumber}${textParam}`);
            });

            // Update WhatsApp float button
            const whatsappFloat = document.querySelector('.whatsapp-float');
            if (whatsappFloat) {
                const currentHref = whatsappFloat.getAttribute('href');
                const textMatch = currentHref.match(/\?text=(.*)$/);
                const textParam = textMatch ? textMatch[0] : '';
                whatsappFloat.setAttribute('href', `https://wa.me/${settings.whatsappNumber}${textParam}`);
            }
        }

        // Apply phone number
        if (settings.phoneNumber) {
            document.querySelectorAll('a[href^="tel:"]').forEach(link => {
                link.setAttribute('href', `tel:${settings.phoneNumber.replace(/\s/g, '')}`);
            });

            // Update footer phone display
            document.querySelectorAll('.contact-info p, .footer-col p').forEach(p => {
                if (p.innerHTML.includes('fa-phone') && !p.innerHTML.includes('fa-whatsapp')) {
                    const phoneClean = settings.phoneNumber.replace(/\s/g, '');
                    p.innerHTML = `<i class="fas fa-phone"></i> <a href="tel:${phoneClean}">${settings.phoneNumber}</a>`;
                }
            });
        }

        // Apply WhatsApp display number
        if (settings.whatsappNumber) {
            document.querySelectorAll('.contact-info p, .footer-col p').forEach(p => {
                if (p.innerHTML.includes('fa-whatsapp')) {
                    // Format WhatsApp number for display (add +91 if starts with 91)
                    let displayNum = settings.whatsappNumber;
                    if (displayNum.startsWith('91') && displayNum.length > 10) {
                        displayNum = '+' + displayNum.slice(0, 2) + ' ' + displayNum.slice(2);
                    }
                    p.innerHTML = `<i class="fab fa-whatsapp"></i> <a href="https://wa.me/${settings.whatsappNumber}">${displayNum}</a>`;
                }
            });
        }

        // Apply address
        if (settings.shopAddress) {
            document.querySelectorAll('.contact-info p, .footer-col p').forEach(p => {
                if (p.innerHTML.includes('fa-map-marker-alt')) {
                    p.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${settings.shopAddress}`;
                }
            });
        }

        // Apply working hours
        if (settings.workingHours) {
            document.querySelectorAll('.contact-info p, .footer-col p').forEach(p => {
                if (p.innerHTML.includes('fa-clock')) {
                    p.innerHTML = `<i class="fas fa-clock"></i> ${settings.workingHours}`;
                }
            });
        }

        // Apply shop name if needed
        if (settings.shopName) {
            document.querySelectorAll('.brand-name').forEach(el => {
                el.textContent = settings.shopName;
            });
        }

        console.log('Settings applied from Firebase');
        return settings;
    } catch (error) {
        console.error('Error loading settings:', error);
        return null;
    }
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAndApplySettings);
} else {
    loadAndApplySettings();
}
