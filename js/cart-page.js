// ================================
// Manish Crackers - Cart Page
// ================================

let currentPriceType = 'retail';

document.addEventListener('DOMContentLoaded', function() {
    loadCartPage();

    // Clear cart button
    document.getElementById('clearCart')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            loadCartPage();
        }
    });

    // Price type toggle
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPriceType = this.dataset.type;
            updateTotals();
        });
    });

    // Send WhatsApp order
    document.getElementById('sendWhatsApp')?.addEventListener('click', function() {
        const message = generateWhatsAppMessage(currentPriceType);
        if (message) {
            const whatsappNumber = getWhatsAppNumber();
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        }
    });
});

// Load cart page content
function loadCartPage() {
    const cart = getCart();
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    const cartList = document.getElementById('cartList');

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';

    // Render cart items
    cartList.innerHTML = cart.map(item => {
        const product = getProductById(item.productId);
        if (!product) return '';

        return `
            <div class="cart-item" data-id="${product.id}">
                <div class="cart-item-image">
                    ${product.image ?
                        `<img src="${product.image}" alt="${product.name}">` :
                        `<i class="fas fa-fire-alt"></i>`
                    }
                </div>
                <div class="cart-item-info">
                    <h4>${product.name}</h4>
                    <p class="pack">${product.pack}</p>
                    <div class="prices">
                        <span class="retail-price">Retail: ₹${product.retailPrice}</span>
                        <span class="wholesale-price">Wholesale: ₹${product.wholesalePrice}</span>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn minus" data-id="${product.id}">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <span class="remove-item" data-id="${product.id}">
                        <i class="fas fa-trash"></i> Remove
                    </span>
                </div>
            </div>
        `;
    }).join('');

    // Add event listeners for quantity controls
    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const cart = getCart();
            const item = cart.find(i => i.productId === id);
            if (item && item.quantity > 1) {
                updateCartItemQuantity(id, item.quantity - 1);
                loadCartPage();
            }
        });
    });

    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const cart = getCart();
            const item = cart.find(i => i.productId === id);
            if (item) {
                updateCartItemQuantity(id, item.quantity + 1);
                loadCartPage();
            }
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            removeFromCart(id);
            loadCartPage();
            showNotification('Item removed from cart');
        });
    });

    updateTotals();
}

// Update totals display
function updateTotals() {
    const totals = calculateCartTotals();

    document.getElementById('totalItems').textContent = totals.items;
    document.getElementById('subtotalRetail').textContent = `₹${totals.retail}`;
    document.getElementById('subtotalWholesale').textContent = `₹${totals.wholesale}`;

    const grandTotal = currentPriceType === 'retail' ? totals.retail : totals.wholesale;
    document.getElementById('grandTotal').textContent = `₹${grandTotal}`;
}
