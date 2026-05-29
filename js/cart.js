// ================================
// Madhu Fireworks - Cart Functions
// ================================

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('mc_cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('mc_cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = getProductById(productId);

    if (!product) {
        console.log('Product not found:', productId);
        return;
    }

    // Normalize ID to string for comparison
    const normalizedId = String(productId);
    const existingItem = cart.find(item => String(item.productId) === normalizedId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: normalizedId,
            quantity: quantity
        });
    }

    saveCart(cart);
    showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId, isGiftBox = false) {
    let cart = getCart();
    const normalizedId = String(productId);
    cart = cart.filter(item => !(String(item.productId) === normalizedId && (!!item.isGiftBox === isGiftBox)));
    saveCart(cart);
}

// Update item quantity
function updateCartItemQuantity(productId, quantity, isGiftBox = false) {
    const cart = getCart();
    const normalizedId = String(productId);
    const item = cart.find(item => String(item.productId) === normalizedId && (!!item.isGiftBox === isGiftBox));

    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(cart);
    }
}

// Clear cart
function clearCart() {
    localStorage.removeItem('mc_cart');
    updateCartCount();
}

// Get cart count
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update cart count display
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count, #cartCount, #cartFloatCount, .cart-float-count');
    const count = getCartCount();

    countElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Calculate cart totals
function calculateCartTotals() {
    const cart = getCart();
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        if (item.isGiftBox) {
            total += item.retailPrice * item.quantity;
            itemCount += item.quantity;
        } else {
            const product = getProductById(item.productId);
            if (product) {
                total += product.retailPrice * item.quantity;
                itemCount += item.quantity;
            }
        }
    });

    return {
        total: total,
        items: itemCount
    };
}

// Generate WhatsApp order message
function generateWhatsAppMessage() {
    const cart = getCart();
    const customerName = document.getElementById('customerName')?.value || '';
    const customerPhone = document.getElementById('customerPhone')?.value || '';
    const customerAddress = document.getElementById('customerAddress')?.value || '';

    if (!customerName || !customerPhone) {
        showNotification('Please enter your name and phone number', 'error');
        return null;
    }

    let message = `*New Order from Madhu Fireworks Website*\n\n`;
    message += `*Order Items:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;

    let total = 0;
    let itemNum = 1;

    cart.forEach(item => {
        let name, price, pack;

        if (item.isGiftBox) {
            name = item.name;
            price = item.retailPrice;
            pack = item.pack || '1 Gift Box';
        } else {
            const product = getProductById(item.productId);
            if (!product) return;
            name = product.name;
            price = product.retailPrice;
            pack = product.pack || product.quantity || '';
        }

        const itemTotal = price * item.quantity;
        total += itemTotal;

        message += `${itemNum}. ${name}${item.isGiftBox ? ' (Gift Box)' : ''}\n`;
        message += `   ${pack} x ${item.quantity} = Rs.${itemTotal}\n`;
        itemNum++;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Total Amount:* Rs.${total}\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${customerName}\n`;
    message += `Phone: ${customerPhone}\n`;
    if (customerAddress) {
        message += `Address: ${customerAddress}\n`;
    }
    message += `\nPlease confirm availability and delivery. Thank you!`;

    return encodeURIComponent(message);
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#25d366' : '#ff4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

    // Add animation keyframes if not exists
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
