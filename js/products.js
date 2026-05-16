// ================================
// Madhu Fireworks - Products Data
// Loads from Firebase with localStorage fallback
// ================================

// LOCAL Cracker Images - stored in images folder
const CRACKER_IMAGES = {
    chakkar: 'images/chakkar.png',
    chakkars: 'images/chakkar.png',
    rocket: 'images/rocket.png',
    rockets: 'images/rocket.png',
    flowerpot: 'images/flowerpot.png',
    flowerpots: 'images/flowerpot.png',
    sparkler: 'images/sparkler.png',
    sparklers: 'images/sparkler.png',
    aerial: 'images/aerial.png',
    bomb: 'images/bomb.png',
    bombs: 'images/bomb.png',
    fancy: 'images/fancy.png',
    giftbox: 'images/giftbox.png',
    giftboxes: 'images/giftbox.png',
    green: 'images/green-crackers.png',
    fountain: 'images/flowerpot.png',
    snake: 'images/fancy.png',
    smoke: 'images/fancy.png'
};

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5OqEPIhmMD5iHagDHE7LFdQKPaZAUKmE",
    authDomain: "manish-crackers.firebaseapp.com",
    projectId: "manish-crackers",
    storageBucket: "manish-crackers.firebasestorage.app",
    messagingSenderId: "694474710227",
    appId: "1:694474710227:web:3cf988f5ca44eee8910826"
};

// Global variables for products and categories
let products = [];
let categories = [];
let firebaseInitialized = false;

// Default Categories (fallback)
const defaultCategories = [
    { id: 'chakkars', name: 'Ground Chakkars', slug: 'chakkars', icon: 'fas fa-circle-notch', image: 'images/chakkar.png' },
    { id: 'rockets', name: 'Rockets', slug: 'rockets', icon: 'fas fa-rocket', image: 'images/rocket.png' },
    { id: 'flowerpots', name: 'Flowerpots', slug: 'flowerpots', icon: 'fas fa-seedling', image: 'images/flowerpot.png' },
    { id: 'sparklers', name: 'Sparklers', slug: 'sparklers', icon: 'fas fa-magic', image: 'images/sparkler.png' },
    { id: 'aerial', name: 'Aerial Shots', slug: 'aerial', icon: 'fas fa-star', image: 'images/aerial.png' },
    { id: 'bombs', name: 'Sound Crackers', slug: 'bombs', icon: 'fas fa-bomb', image: 'images/bomb.png' },
    { id: 'fancy', name: 'Fancy Items', slug: 'fancy', icon: 'fas fa-wand-magic-sparkles', image: 'images/fancy.png' },
    { id: 'giftboxes', name: 'Gift Boxes', slug: 'giftboxes', icon: 'fas fa-gift', image: 'images/giftbox.png' }
];

// Default Products (fallback if Firebase fails)
const defaultProducts = [
    { id: 1, name: 'Ground Chakkar Regular', category: 'chakkars', description: 'Classic ground spinner', pack: '10 pcs', retailPrice: 50, image: CRACKER_IMAGES.chakkar, featured: true, inStock: true, isBestSeller: true },
    { id: 2, name: 'Deluxe Ground Chakkar', category: 'chakkars', description: 'Premium chakkar', pack: '10 pcs', retailPrice: 60, image: CRACKER_IMAGES.chakkar, featured: true, inStock: true },
    { id: 3, name: 'Small Rocket', category: 'rockets', description: 'Whistling rocket', pack: '10 pcs', retailPrice: 100, image: CRACKER_IMAGES.rocket, featured: true, inStock: true, isBestSeller: true },
    { id: 4, name: 'Whistling Rocket', category: 'rockets', description: 'Loud whistling rocket', pack: '10 pcs', retailPrice: 200, image: CRACKER_IMAGES.rocket, featured: true, inStock: true },
    { id: 5, name: 'Multicolor Flowerpot', category: 'flowerpots', description: 'Beautiful fountain', pack: '5 pcs', retailPrice: 100, image: CRACKER_IMAGES.flowerpot, featured: true, inStock: true, isBestSeller: true },
    { id: 6, name: 'Color Sparklers', category: 'sparklers', description: 'Hand sparklers', pack: '10 pcs', retailPrice: 30, image: CRACKER_IMAGES.sparkler, featured: true, inStock: true, isBestSeller: true },
    { id: 7, name: 'Silver Sparklers', category: 'sparklers', description: 'Premium sparklers', pack: '10 pcs', retailPrice: 40, image: CRACKER_IMAGES.sparkler, featured: true, inStock: true },
    { id: 8, name: '7 Shot Aerial', category: 'aerial', description: 'Multicolor aerial', pack: '1 pc', retailPrice: 350, image: CRACKER_IMAGES.aerial, featured: true, inStock: true, isBestSeller: true },
    { id: 9, name: 'Atom Bomb', category: 'bombs', description: 'Loud sound cracker', pack: '10 pcs', retailPrice: 150, image: CRACKER_IMAGES.bomb, featured: false, inStock: true },
    { id: 10, name: 'Magic Pencil', category: 'fancy', description: 'Color changing pencil', pack: '10 pcs', retailPrice: 80, image: CRACKER_IMAGES.fancy, featured: true, inStock: true },
    { id: 11, name: 'Family Pack', category: 'giftboxes', description: 'Complete celebration pack', pack: '1 box', retailPrice: 500, originalPrice: 700, image: CRACKER_IMAGES.giftbox, featured: true, inStock: true, isBestSeller: true },
    { id: 12, name: 'Deluxe Gift Box', category: 'giftboxes', description: 'Premium assorted box', pack: '1 box', retailPrice: 1000, originalPrice: 1400, image: CRACKER_IMAGES.giftbox, featured: true, inStock: true }
];

// Initialize Firebase and load products
async function initializeFirebaseProducts() {
    try {
        // Dynamically import Firebase
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getFirestore, collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        firebaseInitialized = true;

        // Load products from Firebase
        const productsSnapshot = await getDocs(collection(db, 'products'));
        if (!productsSnapshot.empty) {
            products = [];
            productsSnapshot.forEach(doc => {
                const data = doc.data();
                products.push({
                    id: doc.id,
                    ...data,
                    // Map Firebase fields to expected fields
                    pack: data.quantity || data.pack,
                    featured: data.isBestSeller || data.featured,
                    image: data.image || CRACKER_IMAGES[data.category] || 'images/logo.png'
                });
            });
            // Cache to localStorage
            localStorage.setItem('firebaseProducts', JSON.stringify(products));
            localStorage.setItem('firebaseProductsTime', Date.now().toString());
            console.log('Products loaded from Firebase:', products.length);
        }

        // Load categories from Firebase
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        if (!categoriesSnapshot.empty) {
            categories = [];
            categoriesSnapshot.forEach(doc => {
                categories.push({ id: doc.id, ...doc.data() });
            });
            localStorage.setItem('firebaseCategories', JSON.stringify(categories));
            console.log('Categories loaded from Firebase:', categories.length);
        }

        // Load settings from Firebase (for offer banner)
        try {
            const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const settingsDoc = await getDoc(doc(db, 'settings', 'shop'));
            if (settingsDoc.exists()) {
                const settings = settingsDoc.data();
                localStorage.setItem('shopSettings', JSON.stringify(settings));
                console.log('Settings loaded from Firebase');
            }
        } catch (e) {
            console.log('Could not load settings:', e);
        }

        return true;
    } catch (error) {
        console.log('Firebase not available, using local data:', error.message);
        return false;
    }
}

// Load products (always try Firebase first, cache only as fallback)
async function loadProducts() {
    // Always try to fetch fresh from Firebase first
    try {
        const success = await initializeFirebaseProducts();
        if (success && products.length > 0) {
            console.log('Products loaded fresh from Firebase:', products.length);
            return products;
        }
    } catch (e) {
        console.log('Firebase fetch failed, checking cache:', e.message);
    }

    // Fallback to localStorage cache if Firebase fails
    const cachedProducts = localStorage.getItem('firebaseProducts');
    if (cachedProducts) {
        products = JSON.parse(cachedProducts);
        console.log('Products loaded from cache:', products.length);
    }

    // If still no products, use defaults
    if (products.length === 0) {
        products = defaultProducts;
        console.log('Using default products');
    }

    // Load categories
    const cachedCategories = localStorage.getItem('firebaseCategories');
    if (cachedCategories) {
        categories = JSON.parse(cachedCategories);
    }
    if (categories.length === 0) {
        categories = defaultCategories;
    }

    return products;
}

// Get all products
function getProducts() {
    // If products already loaded in memory, return them
    if (products.length > 0) {
        return products;
    }

    // Try cache as fallback
    const cached = localStorage.getItem('firebaseProducts');
    if (cached) {
        products = JSON.parse(cached);
        return products;
    }

    // Last resort: defaults
    return defaultProducts;
}

// Get all categories
function getCategories() {
    if (categories.length === 0) {
        const cached = localStorage.getItem('firebaseCategories');
        if (cached) {
            categories = JSON.parse(cached);
        } else {
            categories = defaultCategories;
        }
    }
    return categories;
}

// Get featured products
function getFeaturedProducts() {
    const allProducts = getProducts();
    return allProducts.filter(p => p.featured || p.isBestSeller).slice(0, 8);
}

// Get products by category
function getProductsByCategory(category) {
    const allProducts = getProducts();
    if (!category || category === 'all') return allProducts;
    return allProducts.filter(p => p.category === category || p.category === category.toLowerCase());
}

// Get single product by ID
function getProductById(id) {
    const allProducts = getProducts();
    return allProducts.find(p => p.id === id || p.id === String(id));
}

// Search products
function searchProducts(query) {
    const allProducts = getProducts();
    const searchTerm = query.toLowerCase();
    return allProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        (p.description && p.description.toLowerCase().includes(searchTerm)) ||
        p.category.toLowerCase().includes(searchTerm)
    );
}


// Get gift boxes
function getGiftBoxes() {
    const allProducts = getProducts();
    return allProducts.filter(p => p.category === 'giftboxes' || p.category === 'gift-boxes');
}

// Create product card HTML
function createProductCard(product) {
    const isBestSeller = product.isBestSeller || product.featured;
    const hasDiscount = product.originalPrice && product.originalPrice > product.retailPrice;

    let badges = '';
    if (isBestSeller) badges += '<span class="badge badge-popular">Best Seller</span>';

    const priceHtml = hasDiscount
        ? `<span class="original-price">₹${product.originalPrice}</span> <span class="current-price">₹${product.retailPrice}</span>`
        : `<span class="current-price">₹${product.retailPrice}</span>`;

    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-badges">${badges}</div>
            <div class="product-image">
                <img src="${product.image || CRACKER_IMAGES[product.category] || 'images/logo.png'}"
                     alt="${product.name}"
                     loading="lazy"
                     onerror="this.src='images/logo.png'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-pack">${product.pack || product.quantity || ''}</p>
                <div class="product-price">
                    ${priceHtml}
                </div>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Create category card HTML
function createCategoryCard(category, productCount) {
    const iconMap = {
        'chakkars': 'fa-circle-notch',
        'rockets': 'fa-rocket',
        'flowerpots': 'fa-seedling',
        'sparklers': 'fa-magic',
        'aerial': 'fa-star',
        'bombs': 'fa-bomb',
        'fancy': 'fa-wand-magic-sparkles',
        'giftboxes': 'fa-gift',
        'green': 'fa-leaf'
    };

    const imageMap = {
        'chakkars': 'images/chakkar.png',
        'rockets': 'images/rocket.png',
        'flowerpots': 'images/flowerpot.png',
        'sparklers': 'images/sparkler.png',
        'aerial': 'images/aerial.png',
        'bombs': 'images/bomb.png',
        'fancy': 'images/fancy.png',
        'giftboxes': 'images/giftbox.png',
        'green': 'images/green-crackers.png'
    };

    const catId = category.id || category.slug;
    const icon = category.icon || iconMap[catId] || 'fa-box';
    const image = category.image || imageMap[catId] || 'images/logo.png';
    const link = catId === 'giftboxes' ? 'gift-boxes.html' : `catalog.html?category=${catId}`;

    return `
        <a href="${link}" class="category-card">
            <div class="category-img">
                <img src="${image}" alt="${category.name}" onerror="this.src='images/logo.png'">
            </div>
            <div class="category-overlay">
                <i class="fas ${icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <span class="category-count">${productCount} Items</span>
        </a>
    `;
}

// Render categories on home page
function renderCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;

    const allCategories = getCategories();
    const allProducts = getProducts();

    if (allCategories.length === 0) {
        categoryGrid.innerHTML = '<p style="text-align:center; color:#666; padding:40px;">No categories available. Add categories in admin panel.</p>';
        return;
    }

    // Filter out green crackers category if it exists
    const filteredCategories = allCategories.filter(cat => {
        const catId = (cat.id || cat.slug || '').toLowerCase();
        return catId !== 'green';
    });

    categoryGrid.innerHTML = filteredCategories.map(cat => {
        const catId = (cat.id || cat.slug || '').toLowerCase();
        // Count products with case-insensitive matching
        const count = allProducts.filter(p => (p.category || '').toLowerCase() === catId).length;
        return createCategoryCard(cat, count);
    }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if coming from admin (force refresh)
    const referrer = document.referrer;
    if (referrer && referrer.includes('admin.html')) {
        console.log('Coming from admin, clearing cache...');
        localStorage.removeItem('firebaseProducts');
        localStorage.removeItem('firebaseProductsTime');
        localStorage.removeItem('firebaseCategories');
        localStorage.removeItem('shopSettings');
    }

    loadProducts().then(() => {
        // Trigger custom event when products are loaded
        window.dispatchEvent(new CustomEvent('productsLoaded'));

        // Render categories on home page
        renderCategories();

        // Refresh featured products if on home page
        const featuredContainer = document.getElementById('featuredProducts');
        if (featuredContainer) {
            const featured = getFeaturedProducts();
            if (featured.length > 0) {
                featuredContainer.innerHTML = featured.map(p => createProductCard(p)).join('');
            } else {
                featuredContainer.innerHTML = '<p style="text-align:center; color:#666; padding:40px;">No products available. Add products in admin panel.</p>';
            }
        }
    });
});

// Force refresh products from Firebase
async function refreshProducts() {
    localStorage.removeItem('firebaseProducts');
    localStorage.removeItem('firebaseProductsTime');
    localStorage.removeItem('firebaseCategories');
    await loadProducts();
    window.location.reload();
}

// Export for use in other scripts
window.getProducts = getProducts;
window.getCategories = getCategories;
window.getFeaturedProducts = getFeaturedProducts;
window.getProductsByCategory = getProductsByCategory;
window.getProductById = getProductById;
window.searchProducts = searchProducts;
window.getGiftBoxes = getGiftBoxes;
window.createProductCard = createProductCard;
window.createCategoryCard = createCategoryCard;
window.renderCategories = renderCategories;
window.refreshProducts = refreshProducts;
window.loadProducts = loadProducts;
