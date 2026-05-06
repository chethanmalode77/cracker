// Firebase Products Manager
import {
    db,
    storage,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from './firebase-config.js';

// Products Collection Reference
const productsCollection = collection(db, 'products');
const categoriesCollection = collection(db, 'categories');
const settingsCollection = collection(db, 'settings');

// Default categories
const defaultCategories = [
    { id: 'chakkars', name: 'Ground Chakkars', icon: 'fa-circle-notch', image: 'images/chakkar.png' },
    { id: 'rockets', name: 'Rockets', icon: 'fa-rocket', image: 'images/rocket.png' },
    { id: 'flowerpots', name: 'Flowerpots', icon: 'fa-seedling', image: 'images/flowerpot.png' },
    { id: 'sparklers', name: 'Sparklers', icon: 'fa-star', image: 'images/sparkler.png' },
    { id: 'aerial', name: 'Aerial Shots', icon: 'fa-arrows-up-to-line', image: 'images/aerial.png' },
    { id: 'bombs', name: 'Sound Crackers', icon: 'fa-bomb', image: 'images/bomb.png' },
    { id: 'fancy', name: 'Fancy Items', icon: 'fa-wand-magic-sparkles', image: 'images/fancy.png' },
    { id: 'giftboxes', name: 'Gift Boxes', icon: 'fa-gift', image: 'images/giftbox.png' },
    { id: 'green', name: 'Green Crackers', icon: 'fa-leaf', image: 'images/green-crackers.png' }
];

// Get all products from Firebase
async function getProducts() {
    try {
        const snapshot = await getDocs(productsCollection);
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Get single product
async function getProduct(productId) {
    try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Add new product
async function addProduct(productData) {
    try {
        const docRef = await addDoc(productsCollection, {
            ...productData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding product:', error);
        return { success: false, error: error.message };
    }
}

// Update product
async function updateProduct(productId, productData) {
    try {
        const docRef = doc(db, 'products', productId);
        await updateDoc(docRef, {
            ...productData,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, error: error.message };
    }
}

// Delete product
async function deleteProduct(productId) {
    try {
        const docRef = doc(db, 'products', productId);
        await deleteDoc(docRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: error.message };
    }
}

// Upload image to Firebase Storage
async function uploadImage(file, folder = 'products') {
    try {
        const timestamp = Date.now();
        const fileName = `${folder}/${timestamp}_${file.name}`;
        const storageRef = ref(storage, fileName);

        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return { success: true, url: downloadURL, path: fileName };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: error.message };
    }
}

// Delete image from Firebase Storage
async function deleteImage(imagePath) {
    try {
        const storageRef = ref(storage, imagePath);
        await deleteObject(storageRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting image:', error);
        return { success: false, error: error.message };
    }
}

// Get all categories
async function getCategories() {
    try {
        const snapshot = await getDocs(categoriesCollection);
        const categories = [];
        snapshot.forEach(doc => {
            categories.push({ id: doc.id, ...doc.data() });
        });

        // If no categories exist, initialize with defaults
        if (categories.length === 0) {
            await initializeCategories();
            return defaultCategories;
        }

        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return defaultCategories;
    }
}

// Initialize default categories
async function initializeCategories() {
    try {
        for (const category of defaultCategories) {
            await setDoc(doc(db, 'categories', category.id), category);
        }
        return { success: true };
    } catch (error) {
        console.error('Error initializing categories:', error);
        return { success: false, error: error.message };
    }
}

// Add new category
async function addCategory(categoryData) {
    try {
        const categoryId = categoryData.name.toLowerCase().replace(/\s+/g, '-');
        await setDoc(doc(db, 'categories', categoryId), {
            id: categoryId,
            ...categoryData,
            createdAt: new Date().toISOString()
        });
        return { success: true, id: categoryId };
    } catch (error) {
        console.error('Error adding category:', error);
        return { success: false, error: error.message };
    }
}

// Update category
async function updateCategory(categoryId, categoryData) {
    try {
        const docRef = doc(db, 'categories', categoryId);
        await updateDoc(docRef, categoryData);
        return { success: true };
    } catch (error) {
        console.error('Error updating category:', error);
        return { success: false, error: error.message };
    }
}

// Delete category
async function deleteCategory(categoryId) {
    try {
        const docRef = doc(db, 'categories', categoryId);
        await deleteDoc(docRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting category:', error);
        return { success: false, error: error.message };
    }
}

// Get shop settings
async function getSettings() {
    try {
        const docRef = doc(db, 'settings', 'shop');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
    }
}

// Update shop settings
async function updateSettings(settingsData) {
    try {
        const docRef = doc(db, 'settings', 'shop');
        await setDoc(docRef, {
            ...settingsData,
            updatedAt: new Date().toISOString()
        }, { merge: true });
        return { success: true };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: error.message };
    }
}

// Initialize default products (Retail only - no wholesale)
async function initializeDefaultProducts() {
    const defaultProducts = [
        { name: 'Ground Chakkar Regular', category: 'chakkars', retailPrice: 50, quantity: '10 pcs', description: 'Colorful spinning ground chakkar', image: 'images/chakkar.png', inStock: true, isGreen: false, isBestSeller: true },
        { name: 'Deluxe Ground Chakkar', category: 'chakkars', retailPrice: 80, quantity: '10 pcs', description: 'Premium quality ground spinner', image: 'images/chakkar.png', inStock: true, isGreen: false, isBestSeller: false },
        { name: 'Green Ground Chakkar', category: 'chakkars', retailPrice: 60, quantity: '10 pcs', description: 'Eco-friendly ground chakkar', image: 'images/chakkar.png', inStock: true, isGreen: true, isBestSeller: false },
        { name: 'Small Rocket', category: 'rockets', retailPrice: 100, quantity: '10 pcs', description: 'Small whistling rocket', image: 'images/rocket.png', inStock: true, isGreen: false, isBestSeller: true },
        { name: 'Whistling Rocket', category: 'rockets', retailPrice: 200, quantity: '10 pcs', description: 'Loud whistling rocket with trail', image: 'images/rocket.png', inStock: true, isGreen: false, isBestSeller: true },
        { name: 'Green Rocket', category: 'rockets', retailPrice: 180, quantity: '5 pcs', description: 'Eco-friendly rocket', image: 'images/rocket.png', inStock: true, isGreen: true, isBestSeller: false },
        { name: 'Multicolor Flowerpot', category: 'flowerpots', retailPrice: 100, quantity: '5 pcs', description: 'Beautiful multicolor fountain', image: 'images/flowerpot.png', inStock: true, isGreen: false, isBestSeller: true },
        { name: 'Giant Flowerpot', category: 'flowerpots', retailPrice: 250, quantity: '3 pcs', description: 'Extra large fountain', image: 'images/flowerpot.png', inStock: true, isGreen: false, isBestSeller: false },
        { name: 'Color Sparklers', category: 'sparklers', retailPrice: 30, quantity: '10 pcs', description: 'Multi-color hand sparklers', image: 'images/sparkler.png', inStock: true, isGreen: false, isBestSeller: true },
        { name: 'Green Sparklers', category: 'sparklers', retailPrice: 40, quantity: '10 pcs', description: 'Eco-friendly sparklers', image: 'images/sparkler.png', inStock: true, isGreen: true, isBestSeller: false },
        { name: '7 Shot Aerial', category: 'aerial', retailPrice: 350, quantity: '1 pc', description: '7 shot multicolor aerial', image: 'images/aerial.png', inStock: true, isGreen: false, isBestSeller: true },
        { name: '12 Shot Aerial', category: 'aerial', retailPrice: 500, quantity: '1 pc', description: '12 shot premium aerial', image: 'images/aerial.png', inStock: true, isGreen: false, isBestSeller: false },
        { name: 'Atom Bomb', category: 'bombs', retailPrice: 150, quantity: '10 pcs', description: 'Loud sound cracker', image: 'images/bomb.png', inStock: true, isGreen: false, isBestSeller: true },
        { name: 'Sutli Bomb', category: 'bombs', retailPrice: 200, quantity: '10 pcs', description: 'Classic sutli bomb', image: 'images/bomb.png', inStock: true, isGreen: false, isBestSeller: false },
        { name: 'Butterfly', category: 'fancy', retailPrice: 120, quantity: '5 pcs', description: 'Flying butterfly cracker', image: 'images/fancy.png', inStock: true, isGreen: false, isBestSeller: false },
        { name: 'Magic Pencil', category: 'fancy', retailPrice: 80, quantity: '10 pcs', description: 'Color changing pencil', image: 'images/fancy.png', inStock: true, isGreen: false, isBestSeller: true },
        { name: 'Family Pack', category: 'giftboxes', retailPrice: 500, quantity: '1 box', description: 'Complete family celebration pack', image: 'images/giftbox.png', inStock: true, isGreen: false, isBestSeller: true, originalPrice: 700 },
        { name: 'Deluxe Gift Box', category: 'giftboxes', retailPrice: 1000, quantity: '1 box', description: 'Premium assorted crackers box', image: 'images/giftbox.png', inStock: true, isGreen: false, isBestSeller: true, originalPrice: 1400 },
        { name: 'Mega Combo', category: 'giftboxes', retailPrice: 2000, quantity: '1 box', description: 'Ultimate celebration combo', image: 'images/giftbox.png', inStock: true, isGreen: false, isBestSeller: false, originalPrice: 2800 },
        { name: 'Green Chakkar Pack', category: 'green', retailPrice: 150, quantity: '10 pcs', description: 'CSIR-NEERI approved eco-friendly', image: 'images/green-crackers.png', inStock: true, isGreen: true, isBestSeller: true },
        { name: 'Green Sparkler Pack', category: 'green', retailPrice: 100, quantity: '20 pcs', description: 'Low emission sparklers', image: 'images/green-crackers.png', inStock: true, isGreen: true, isBestSeller: false }
    ];

    try {
        const snapshot = await getDocs(productsCollection);
        if (snapshot.empty) {
            for (const product of defaultProducts) {
                await addDoc(productsCollection, {
                    ...product,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
            console.log('Default products initialized');
        }
        return { success: true };
    } catch (error) {
        console.error('Error initializing products:', error);
        return { success: false, error: error.message };
    }
}

// Export functions
export {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    deleteImage,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    initializeCategories,
    initializeDefaultProducts,
    getSettings,
    updateSettings
};
