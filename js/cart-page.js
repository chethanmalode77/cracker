// ================================
// Madhu Crackers - Cart Page
// ================================

document.addEventListener('DOMContentLoaded', function() {
    loadCartPage();

    // Clear cart button
    document.getElementById('clearCart')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            loadCartPage();
        }
    });

    // Send WhatsApp order
    document.getElementById('sendWhatsApp')?.addEventListener('click', function() {
        const message = generateWhatsAppMessage();
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

    // Render cart items with compact design
    cartList.innerHTML = cart.map(item => {
        let product, itemTotal, packInfo, productId;

        if (item.isGiftBox) {
            product = {
                id: item.productId,
                name: item.name,
                retailPrice: item.retailPrice,
                image: item.image,
                pack: item.pack || '1 Gift Box'
            };
            productId = item.productId;
            itemTotal = item.retailPrice * item.quantity;
            packInfo = item.pack || '1 Gift Box';
        } else {
            product = getProductById(item.productId);
            if (!product) return '';
            productId = product.id;
            itemTotal = product.retailPrice * item.quantity;
            packInfo = product.pack || product.quantity || '';
        }

        return `
            <div class="cart-item" data-id="${productId}" data-giftbox="${item.isGiftBox || false}">
                <div class="cart-item-thumb">
                    <img src="${product.image || 'images/logo.png'}" alt="${product.name}" onerror="this.src='images/logo.png'">
                </div>
                <div class="cart-item-details">
                    <h4 class="item-name">${product.name}${item.isGiftBox ? ' <i class="fas fa-gift" style="color:#ff6b35;font-size:12px;"></i>' : ''}</h4>
                    <span class="item-pack">${packInfo}</span>
                    <span class="item-price">Rs.${product.retailPrice}</span>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn minus" data-id="${productId}" data-giftbox="${item.isGiftBox || false}">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn plus" data-id="${productId}" data-giftbox="${item.isGiftBox || false}">+</button>
                </div>
                <div class="cart-item-total">
                    <span class="total-label">Total</span>
                    <span class="total-amount">Rs.${itemTotal}</span>
                </div>
                <button class="cart-item-remove" data-id="${productId}" data-giftbox="${item.isGiftBox || false}" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }).join('');

    // Add event listeners for quantity controls
    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = String(this.dataset.id);
            const isGiftBox = this.dataset.giftbox === 'true';
            const cart = getCart();
            const item = cart.find(i => String(i.productId) === id && (!!i.isGiftBox === isGiftBox));
            if (item && item.quantity > 1) {
                updateCartItemQuantity(id, item.quantity - 1, isGiftBox);
                loadCartPage();
            }
        });
    });

    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = String(this.dataset.id);
            const isGiftBox = this.dataset.giftbox === 'true';
            const cart = getCart();
            const item = cart.find(i => String(i.productId) === id && (!!i.isGiftBox === isGiftBox));
            if (item) {
                updateCartItemQuantity(id, item.quantity + 1, isGiftBox);
                loadCartPage();
            }
        });
    });

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = String(this.dataset.id);
            const isGiftBox = this.dataset.giftbox === 'true';
            removeFromCart(id, isGiftBox);
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
    document.getElementById('grandTotal').textContent = `₹${totals.total}`;
}
