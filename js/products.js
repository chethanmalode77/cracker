// ================================
// Manish Crackers - Products Data with LOCAL Images
// ================================

// LOCAL Cracker Images - stored in images folder
const CRACKER_IMAGES = {
    chakkar: 'images/chakkar.png',
    rocket: 'images/rocket.png',
    flowerpot: 'images/flowerpot.png',
    sparkler: 'images/sparkler.png',
    aerial: 'images/aerial.png',
    bomb: 'images/bomb.png',
    fancy: 'images/fancy.png',
    giftbox: 'images/giftbox.png',
    green: 'images/green-crackers.png',
    fountain: 'images/flowerpot.png',
    snake: 'images/fancy.png',
    smoke: 'images/fancy.png'
};

// Default Categories
const defaultCategories = [
    { id: 1, name: 'Ground Chakkars', slug: 'ground-chakkar', icon: 'fas fa-circle-notch' },
    { id: 2, name: 'Rockets', slug: 'rockets', icon: 'fas fa-rocket' },
    { id: 3, name: 'Flowerpots', slug: 'flowerpots', icon: 'fas fa-seedling' },
    { id: 4, name: 'Sparklers', slug: 'sparklers', icon: 'fas fa-magic' },
    { id: 5, name: 'Aerial Shots', slug: 'aerial', icon: 'fas fa-star' },
    { id: 6, name: 'Sound Crackers', slug: 'bombs', icon: 'fas fa-bomb' },
    { id: 7, name: 'Fancy Items', slug: 'fancy', icon: 'fas fa-wand-magic-sparkles' },
    { id: 8, name: 'Gift Boxes', slug: 'gift-boxes', icon: 'fas fa-gift' },
    { id: 9, name: 'Green Crackers', slug: 'green', icon: 'fas fa-leaf' }
];

// Default Products with LOCAL Images
const defaultProducts = [
    // ========== GROUND CHAKKARS ==========
    {
        id: 1,
        name: 'Ground Chakkar Regular',
        category: 'ground-chakkar',
        description: 'Classic ground spinner with colorful sparks',
        pack: '10 pcs',
        retailPrice: 50,
        wholesalePrice: 40,
        minQty: 10,
        image: CRACKER_IMAGES.chakkar,
        featured: true,
        isGreen: false
    },
    {
        id: 2,
        name: 'Deluxe Ground Chakkar',
        category: 'ground-chakkar',
        description: 'Premium chakkar with longer duration and multi-color',
        pack: '5 pcs',
        retailPrice: 80,
        wholesalePrice: 65,
        minQty: 10,
        image: CRACKER_IMAGES.chakkar,
        featured: false,
        isGreen: false
    },
    {
        id: 3,
        name: 'Big Ground Chakkar',
        category: 'ground-chakkar',
        description: 'Large size chakkar with stunning effects',
        pack: '3 pcs',
        retailPrice: 100,
        wholesalePrice: 80,
        minQty: 10,
        image: CRACKER_IMAGES.chakkar,
        featured: false,
        isGreen: false
    },
    {
        id: 4,
        name: 'Green Ground Chakkar',
        category: 'green',
        description: 'Eco-friendly chakkar with 30% less emission',
        pack: '10 pcs',
        retailPrice: 60,
        wholesalePrice: 48,
        minQty: 10,
        image: CRACKER_IMAGES.green,
        featured: true,
        isGreen: true
    },

    // ========== ROCKETS ==========
    {
        id: 5,
        name: 'Small Rocket',
        category: 'rockets',
        description: 'Entry-level rocket with bright trail',
        pack: '10 pcs',
        retailPrice: 100,
        wholesalePrice: 80,
        minQty: 10,
        image: CRACKER_IMAGES.rocket,
        featured: true,
        isGreen: false
    },
    {
        id: 6,
        name: 'Big Rocket',
        category: 'rockets',
        description: 'Powerful rocket with loud burst and colors',
        pack: '5 pcs',
        retailPrice: 150,
        wholesalePrice: 120,
        minQty: 10,
        image: CRACKER_IMAGES.rocket,
        featured: false,
        isGreen: false
    },
    {
        id: 7,
        name: 'Whistling Rocket',
        category: 'rockets',
        description: 'Rocket with whistling sound as it ascends',
        pack: '10 pcs',
        retailPrice: 200,
        wholesalePrice: 160,
        minQty: 10,
        image: CRACKER_IMAGES.rocket,
        featured: true,
        isGreen: false
    },
    {
        id: 8,
        name: 'Sky Shot Rocket',
        category: 'rockets',
        description: 'High altitude rocket with colorful burst',
        pack: '5 pcs',
        retailPrice: 250,
        wholesalePrice: 200,
        minQty: 10,
        image: CRACKER_IMAGES.rocket,
        featured: false,
        isGreen: false
    },
    {
        id: 9,
        name: 'Green Rocket',
        category: 'green',
        description: 'Eco-friendly rocket with reduced smoke',
        pack: '5 pcs',
        retailPrice: 180,
        wholesalePrice: 145,
        minQty: 10,
        image: CRACKER_IMAGES.green,
        featured: true,
        isGreen: true
    },

    // ========== FLOWERPOTS ==========
    {
        id: 10,
        name: 'Standard Flowerpot',
        category: 'flowerpots',
        description: 'Classic flowerpot with golden shower',
        pack: '10 pcs',
        retailPrice: 120,
        wholesalePrice: 95,
        minQty: 10,
        image: CRACKER_IMAGES.flowerpot,
        featured: false,
        isGreen: false
    },
    {
        id: 11,
        name: 'Multicolor Flowerpot',
        category: 'flowerpots',
        description: 'Flowerpot with multiple color changes',
        pack: '5 pcs',
        retailPrice: 100,
        wholesalePrice: 80,
        minQty: 10,
        image: CRACKER_IMAGES.flowerpot,
        featured: true,
        isGreen: false
    },
    {
        id: 12,
        name: 'Deluxe Flowerpot',
        category: 'flowerpots',
        description: 'Premium flowerpot with crackling effect',
        pack: '5 pcs',
        retailPrice: 150,
        wholesalePrice: 120,
        minQty: 10,
        image: CRACKER_IMAGES.flowerpot,
        featured: false,
        isGreen: false
    },
    {
        id: 13,
        name: 'Green Flowerpot',
        category: 'green',
        description: 'Eco-friendly flowerpot, less pollution',
        pack: '5 pcs',
        retailPrice: 130,
        wholesalePrice: 105,
        minQty: 10,
        image: CRACKER_IMAGES.green,
        featured: false,
        isGreen: true
    },

    // ========== SPARKLERS ==========
    {
        id: 14,
        name: 'Color Sparklers',
        category: 'sparklers',
        description: 'Hand-held sparklers with colored sparks',
        pack: '10 pcs',
        retailPrice: 30,
        wholesalePrice: 22,
        minQty: 20,
        image: CRACKER_IMAGES.sparkler,
        featured: true,
        isGreen: false
    },
    {
        id: 15,
        name: 'Electric Sparklers',
        category: 'sparklers',
        description: 'Bright white electric sparklers',
        pack: '10 pcs',
        retailPrice: 50,
        wholesalePrice: 38,
        minQty: 20,
        image: CRACKER_IMAGES.sparkler,
        featured: false,
        isGreen: false
    },
    {
        id: 16,
        name: 'Long Sparklers (30cm)',
        category: 'sparklers',
        description: 'Extra long sparklers for longer burn time',
        pack: '5 pcs',
        retailPrice: 40,
        wholesalePrice: 30,
        minQty: 20,
        image: CRACKER_IMAGES.sparkler,
        featured: false,
        isGreen: false
    },
    {
        id: 17,
        name: 'Rainbow Sparklers',
        category: 'sparklers',
        description: 'Multi-color changing sparklers',
        pack: '10 pcs',
        retailPrice: 60,
        wholesalePrice: 45,
        minQty: 20,
        image: CRACKER_IMAGES.sparkler,
        featured: false,
        isGreen: false
    },
    {
        id: 18,
        name: 'Green Sparklers',
        category: 'green',
        description: 'Eco-friendly sparklers for kids',
        pack: '10 pcs',
        retailPrice: 40,
        wholesalePrice: 30,
        minQty: 20,
        image: CRACKER_IMAGES.green,
        featured: true,
        isGreen: true
    },

    // ========== AERIAL SHOTS ==========
    {
        id: 19,
        name: '7 Shot Color',
        category: 'aerial',
        description: '7 continuous colorful aerial shots',
        pack: '1 pc',
        retailPrice: 250,
        wholesalePrice: 200,
        minQty: 5,
        image: CRACKER_IMAGES.aerial,
        featured: true,
        isGreen: false
    },
    {
        id: 20,
        name: '12 Shot Crackling',
        category: 'aerial',
        description: '12 shots with crackling effects',
        pack: '1 pc',
        retailPrice: 400,
        wholesalePrice: 320,
        minQty: 5,
        image: CRACKER_IMAGES.aerial,
        featured: false,
        isGreen: false
    },
    {
        id: 21,
        name: '21 Shot Multicolor',
        category: 'aerial',
        description: 'Premium 21 shots with various effects',
        pack: '1 pc',
        retailPrice: 700,
        wholesalePrice: 560,
        minQty: 5,
        image: CRACKER_IMAGES.aerial,
        featured: true,
        isGreen: false
    },
    {
        id: 22,
        name: '30 Shot Grand',
        category: 'aerial',
        description: 'Grand display with 30 powerful shots',
        pack: '1 pc',
        retailPrice: 1200,
        wholesalePrice: 960,
        minQty: 3,
        image: CRACKER_IMAGES.aerial,
        featured: false,
        isGreen: false
    },
    {
        id: 23,
        name: '50 Shot Supreme',
        category: 'aerial',
        description: 'Ultimate 50 shot aerial display',
        pack: '1 pc',
        retailPrice: 2000,
        wholesalePrice: 1600,
        minQty: 2,
        image: CRACKER_IMAGES.aerial,
        featured: true,
        isGreen: false
    },

    // ========== SOUND CRACKERS ==========
    {
        id: 24,
        name: 'Atom Bomb',
        category: 'bombs',
        description: 'Loud sound cracker',
        pack: '10 pcs',
        retailPrice: 150,
        wholesalePrice: 120,
        minQty: 10,
        image: CRACKER_IMAGES.bomb,
        featured: false,
        isGreen: false
    },
    {
        id: 25,
        name: 'Lakshmi Bomb',
        category: 'bombs',
        description: 'Classic Diwali bomb with powerful sound',
        pack: '10 pcs',
        retailPrice: 100,
        wholesalePrice: 80,
        minQty: 10,
        image: CRACKER_IMAGES.bomb,
        featured: true,
        isGreen: false
    },
    {
        id: 26,
        name: 'Bullet Bomb',
        category: 'bombs',
        description: 'Compact bomb with sharp sound',
        pack: '10 pcs',
        retailPrice: 80,
        wholesalePrice: 65,
        minQty: 10,
        image: CRACKER_IMAGES.bomb,
        featured: false,
        isGreen: false
    },
    {
        id: 27,
        name: 'Hydrogen Bomb',
        category: 'bombs',
        description: 'Extra loud with delayed fuse',
        pack: '5 pcs',
        retailPrice: 120,
        wholesalePrice: 95,
        minQty: 10,
        image: CRACKER_IMAGES.bomb,
        featured: false,
        isGreen: false
    },

    // ========== FANCY ITEMS ==========
    {
        id: 28,
        name: 'Pencil Firework',
        category: 'fancy',
        description: 'Colorful pencil-shaped firework',
        pack: '5 pcs',
        retailPrice: 80,
        wholesalePrice: 65,
        minQty: 10,
        image: CRACKER_IMAGES.fancy,
        featured: false,
        isGreen: false
    },
    {
        id: 29,
        name: 'Magic Snake',
        category: 'fancy',
        description: 'Fun snake that grows from tablet',
        pack: '5 pcs',
        retailPrice: 30,
        wholesalePrice: 22,
        minQty: 20,
        image: CRACKER_IMAGES.snake,
        featured: false,
        isGreen: false
    },
    {
        id: 30,
        name: 'Color Smoke',
        category: 'fancy',
        description: 'Colorful smoke bombs for fun',
        pack: '5 pcs',
        retailPrice: 100,
        wholesalePrice: 80,
        minQty: 10,
        image: CRACKER_IMAGES.smoke,
        featured: false,
        isGreen: false
    },
    {
        id: 31,
        name: 'Flower Fountain',
        category: 'fancy',
        description: 'Beautiful fountain with flower effect',
        pack: '3 pcs',
        retailPrice: 200,
        wholesalePrice: 160,
        minQty: 5,
        image: CRACKER_IMAGES.fountain,
        featured: true,
        isGreen: false
    },
    {
        id: 32,
        name: 'Twinkling Star',
        category: 'fancy',
        description: 'Star-shaped fountain with twinkle effect',
        pack: '2 pcs',
        retailPrice: 150,
        wholesalePrice: 120,
        minQty: 5,
        image: CRACKER_IMAGES.fancy,
        featured: false,
        isGreen: false
    },
    {
        id: 33,
        name: 'Butterfly Cracker',
        category: 'fancy',
        description: 'Spinning butterfly with sparks',
        pack: '5 pcs',
        retailPrice: 180,
        wholesalePrice: 145,
        minQty: 5,
        image: CRACKER_IMAGES.fancy,
        featured: false,
        isGreen: false
    },

    // ========== GIFT BOXES ==========
    {
        id: 34,
        name: 'Family Pack',
        category: 'gift-boxes',
        description: 'Assorted crackers for family celebration - Contains: 10 Sparklers, 5 Ground Chakkars, 5 Flowerpots, 3 Rockets, 2 Fancy Items',
        pack: '1 box (25 items)',
        retailPrice: 500,
        wholesalePrice: 400,
        minQty: 5,
        image: CRACKER_IMAGES.giftbox,
        featured: true,
        isGreen: false,
        contents: ['10 Sparklers', '5 Ground Chakkars', '5 Flowerpots', '3 Rockets', '2 Fancy Items']
    },
    {
        id: 35,
        name: 'Deluxe Gift Box',
        category: 'gift-boxes',
        description: 'Premium gift box with variety of crackers - Contains: 20 Sparklers, 10 Ground Chakkars, 10 Flowerpots, 10 Rockets, 5 Aerial Shots, 5 Fancy Items',
        pack: '1 box (60 items)',
        retailPrice: 1000,
        wholesalePrice: 800,
        minQty: 3,
        image: CRACKER_IMAGES.giftbox,
        featured: true,
        isGreen: false,
        contents: ['20 Sparklers (Assorted)', '10 Ground Chakkars', '10 Flowerpots', '10 Rockets', '5 Aerial Shots', '5 Fancy Items']
    },
    {
        id: 36,
        name: 'Mega Combo',
        category: 'gift-boxes',
        description: 'Ultimate combo with all types of crackers for mega celebrations',
        pack: '1 box (100+ items)',
        retailPrice: 2000,
        wholesalePrice: 1600,
        minQty: 2,
        image: CRACKER_IMAGES.giftbox,
        featured: true,
        isGreen: false,
        contents: ['30 Sparklers (Premium)', '15 Ground Chakkars', '15 Flowerpots', '15 Rockets', '10 Aerial Shots', '10 Fancy Items', '5 Sound Crackers']
    },
    {
        id: 37,
        name: 'Kids Special Pack',
        category: 'gift-boxes',
        description: 'Safe and fun crackers specially for kids',
        pack: '1 box (30 items)',
        retailPrice: 300,
        wholesalePrice: 240,
        minQty: 5,
        image: CRACKER_IMAGES.giftbox,
        featured: false,
        isGreen: false,
        contents: ['15 Sparklers', '5 Magic Snakes', '5 Color Smoke', '5 Ground Chakkars']
    },
    {
        id: 38,
        name: 'Premium Collection',
        category: 'gift-boxes',
        description: 'High-end crackers for grand celebrations',
        pack: '1 box (150+ items)',
        retailPrice: 3000,
        wholesalePrice: 2400,
        minQty: 2,
        image: CRACKER_IMAGES.giftbox,
        featured: false,
        isGreen: false,
        contents: ['50 Sparklers (Premium)', '20 Ground Chakkars', '20 Flowerpots', '20 Rockets', '15 Aerial Shots', '15 Fancy Items', '10 Sound Crackers']
    },
    {
        id: 39,
        name: 'Green Family Pack',
        category: 'gift-boxes',
        description: 'Eco-friendly crackers combo for responsible celebration',
        pack: '1 box (30 items)',
        retailPrice: 600,
        wholesalePrice: 480,
        minQty: 5,
        image: CRACKER_IMAGES.green,
        featured: true,
        isGreen: true,
        contents: ['10 Green Sparklers', '5 Green Chakkars', '5 Green Flowerpots', '5 Green Rockets', '5 Eco Fancy Items']
    },
    {
        id: 40,
        name: 'Grand Celebration Box',
        category: 'gift-boxes',
        description: 'For society and community celebrations',
        pack: '1 box (200+ items)',
        retailPrice: 5000,
        wholesalePrice: 4000,
        minQty: 1,
        image: CRACKER_IMAGES.giftbox,
        featured: false,
        isGreen: false,
        contents: ['100 Sparklers', '30 Ground Chakkars', '30 Flowerpots', '30 Rockets', '20 Aerial Shots', '20 Fancy Items', '10 Sound Crackers']
    },

    // ========== GREEN CRACKERS ==========
    {
        id: 41,
        name: 'Green Aerial 7 Shot',
        category: 'green',
        description: 'Eco-friendly 7 shot aerial with reduced emission',
        pack: '1 pc',
        retailPrice: 300,
        wholesalePrice: 240,
        minQty: 5,
        image: CRACKER_IMAGES.green,
        featured: false,
        isGreen: true
    },
    {
        id: 42,
        name: 'Green Fountain',
        category: 'green',
        description: 'Low smoke fountain with beautiful colors',
        pack: '3 pcs',
        retailPrice: 220,
        wholesalePrice: 175,
        minQty: 5,
        image: CRACKER_IMAGES.green,
        featured: false,
        isGreen: true
    },
    {
        id: 43,
        name: 'Green Fancy Shots',
        category: 'green',
        description: 'Eco-friendly fancy crackers with less pollution',
        pack: '5 pcs',
        retailPrice: 180,
        wholesalePrice: 145,
        minQty: 10,
        image: CRACKER_IMAGES.green,
        featured: false,
        isGreen: true
    }
];

// Initialize data in localStorage
function initializeData() {
    // Always reset to use local images
    localStorage.setItem('mc_products', JSON.stringify(defaultProducts));
    localStorage.setItem('mc_categories', JSON.stringify(defaultCategories));

    if (!localStorage.getItem('mc_whatsapp')) {
        localStorage.setItem('mc_whatsapp', '919876543210');
    }
    if (!localStorage.getItem('mc_password')) {
        localStorage.setItem('mc_password', 'admin123');
    }
}

// Get products from localStorage
function getProducts() {
    initializeData();
    return JSON.parse(localStorage.getItem('mc_products'));
}

// Get categories from localStorage
function getCategories() {
    initializeData();
    return JSON.parse(localStorage.getItem('mc_categories'));
}

// Get WhatsApp number
function getWhatsAppNumber() {
    initializeData();
    return localStorage.getItem('mc_whatsapp');
}

// Save products
function saveProducts(products) {
    localStorage.setItem('mc_products', JSON.stringify(products));
}

// Save categories
function saveCategories(categories) {
    localStorage.setItem('mc_categories', JSON.stringify(categories));
}

// Get featured products
function getFeaturedProducts() {
    const products = getProducts();
    return products.filter(p => p.featured).slice(0, 8);
}

// Get green crackers
function getGreenProducts() {
    const products = getProducts();
    return products.filter(p => p.isGreen === true);
}

// Get gift boxes
function getGiftBoxes() {
    const products = getProducts();
    return products.filter(p => p.category === 'gift-boxes');
}

// Get product by ID
function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === parseInt(id));
}

// Get category by slug
function getCategoryBySlug(slug) {
    const categories = getCategories();
    return categories.find(c => c.slug === slug);
}

// Generate next product ID
function getNextProductId() {
    const products = getProducts();
    if (products.length === 0) return 1;
    return Math.max(...products.map(p => p.id)) + 1;
}

// Generate next category ID
function getNextCategoryId() {
    const categories = getCategories();
    if (categories.length === 0) return 1;
    return Math.max(...categories.map(c => c.id)) + 1;
}

// Create product card HTML
function createProductCard(product) {
    const categories = getCategories();
    const category = categories.find(c => c.slug === product.category);
    const categoryName = category ? category.name : product.category;

    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.image ?
                    `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="placeholder-fallback" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; background: linear-gradient(135deg, #f5f5f5, #e0e0e0);">
                        <i class="fas fa-fire-alt" style="font-size: 3rem; color: #ddd;"></i>
                     </div>` :
                    `<i class="fas fa-fire-alt placeholder-icon"></i>`
                }
                ${product.featured ? '<span class="product-badge">Best Seller</span>' : ''}
                ${product.isGreen ? '<span class="product-badge" style="background: linear-gradient(135deg, #4caf50, #388e3c);"><i class="fas fa-leaf"></i> Green</span>' : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-pack">${product.pack}</p>
                <div class="product-prices">
                    <div class="price-box retail">
                        <span class="price-label">Retail</span>
                        <span class="price-value">₹${product.retailPrice}</span>
                    </div>
                    <div class="price-box wholesale">
                        <span class="price-label">Wholesale</span>
                        <span class="price-value">₹${product.wholesalePrice}</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Initialize on page load
initializeData();
