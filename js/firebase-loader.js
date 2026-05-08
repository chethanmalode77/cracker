// Firebase Loader - Loads products from Firebase for the main website
import {
    db,
    collection,
    getDocs,
    doc,
    getDoc
} from './firebase-config.js';

// Get all products from Firebase
async function loadProductsFromFirebase() {
    try {
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error('Error loading products from Firebase:', error);
        return null;
    }
}

// Get all categories from Firebase
async function loadCategoriesFromFirebase() {
    try {
        const categoriesCollection = collection(db, 'categories');
        const snapshot = await getDocs(categoriesCollection);
        const categories = [];
        snapshot.forEach(doc => {
            categories.push({ id: doc.id, ...doc.data() });
        });
        return categories;
    } catch (error) {
        console.error('Error loading categories from Firebase:', error);
        return null;
    }
}

// Get shop settings from Firebase
async function loadSettingsFromFirebase() {
    try {
        const docRef = doc(db, 'settings', 'shop');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Error loading settings from Firebase:', error);
        return null;
    }
}

// Initialize products - try Firebase first, fall back to local
async function initializeProducts() {
    // Try to load from Firebase
    const firebaseProducts = await loadProductsFromFirebase();

    if (firebaseProducts && firebaseProducts.length > 0) {
        // Save to localStorage as cache
        localStorage.setItem('crackerProducts', JSON.stringify(firebaseProducts));
        console.log('Products loaded from Firebase:', firebaseProducts.length);
        return firebaseProducts;
    }

    // Fall back to localStorage or default products
    const localProducts = localStorage.getItem('crackerProducts');
    if (localProducts) {
        console.log('Products loaded from localStorage');
        return JSON.parse(localProducts);
    }

    // Fall back to default products from products.js
    if (typeof defaultProducts !== 'undefined') {
        console.log('Using default products');
        return defaultProducts;
    }

    return [];
}

// Initialize categories
async function initializeCategories() {
    const firebaseCategories = await loadCategoriesFromFirebase();

    if (firebaseCategories && firebaseCategories.length > 0) {
        localStorage.setItem('crackerCategories', JSON.stringify(firebaseCategories));
        console.log('Categories loaded from Firebase:', firebaseCategories.length);
        return firebaseCategories;
    }

    const localCategories = localStorage.getItem('crackerCategories');
    if (localCategories) {
        return JSON.parse(localCategories);
    }

    return [];
}

// Initialize settings
async function initializeSettings() {
    const firebaseSettings = await loadSettingsFromFirebase();

    if (firebaseSettings) {
        localStorage.setItem('shopSettings', JSON.stringify(firebaseSettings));
        return firebaseSettings;
    }

    const localSettings = localStorage.getItem('shopSettings');
    if (localSettings) {
        return JSON.parse(localSettings);
    }

    return {
        shopName: 'Madhu Fireworks',
        whatsappNumber: '919986954653',
        offerActive: true,
        offerTitle: 'Up to 40% OFF on Bulk Orders'
    };
}

// Export functions
export {
    loadProductsFromFirebase,
    loadCategoriesFromFirebase,
    loadSettingsFromFirebase,
    initializeProducts,
    initializeCategories,
    initializeSettings
};

// Also make available globally for non-module scripts
window.FirebaseLoader = {
    loadProductsFromFirebase,
    loadCategoriesFromFirebase,
    loadSettingsFromFirebase,
    initializeProducts,
    initializeCategories,
    initializeSettings
};
