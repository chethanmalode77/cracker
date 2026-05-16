// ================================
// Madhu Fireworks - Admin Panel
// ================================

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initializeAdmin();
});

// Check authentication
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('mc_admin_logged_in');

    if (isLoggedIn) {
        showDashboard();
    } else {
        showLogin();
    }
}

// Show login screen
function showLogin() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Show dashboard
function showDashboard() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    loadDashboardStats();
    loadProductsTable();
    loadCategoriesList();
    loadSettings();
}

// Initialize admin functionality
function initializeAdmin() {
    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const storedPassword = localStorage.getItem('mc_password') || 'admin123';

        if (password === storedPassword) {
            sessionStorage.setItem('mc_admin_logged_in', 'true');
            showDashboard();
        } else {
            alert('Invalid password');
        }
    });

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        sessionStorage.removeItem('mc_admin_logged_in');
        showLogin();
    });

    // Navigation
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
        });
    });

    // Add Product button
    document.getElementById('addProductBtn')?.addEventListener('click', openProductModal);

    // Add Category button
    document.getElementById('addCategoryBtn')?.addEventListener('click', openCategoryModal);

    // Product Modal
    document.getElementById('closeProductModal')?.addEventListener('click', closeProductModal);
    document.getElementById('cancelProduct')?.addEventListener('click', closeProductModal);
    document.getElementById('productForm')?.addEventListener('submit', saveProduct);

    // Category Modal
    document.getElementById('closeCategoryModal')?.addEventListener('click', closeCategoryModal);
    document.getElementById('cancelCategory')?.addEventListener('click', closeCategoryModal);
    document.getElementById('categoryForm')?.addEventListener('submit', saveCategory);

    // Auto-generate slug from name
    document.getElementById('categoryName')?.addEventListener('input', function() {
        const slug = this.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        document.getElementById('categorySlug').value = slug;
    });

    // Export/Import data
    document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
    document.getElementById('importDataBtn')?.addEventListener('click', () => {
        document.getElementById('importFileInput').click();
    });
    document.getElementById('importFileInput')?.addEventListener('change', importData);

    // Settings
    document.getElementById('saveWhatsApp')?.addEventListener('click', saveWhatsAppNumber);
    document.getElementById('changePasswordBtn')?.addEventListener('click', changePassword);
    document.getElementById('resetDataBtn')?.addEventListener('click', resetData);

    // Admin search and filter
    document.getElementById('adminSearch')?.addEventListener('input', loadProductsTable);
    document.getElementById('adminCategoryFilter')?.addEventListener('change', loadProductsTable);
}

// Show section
function showSection(sectionName) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(sectionName + 'Section')?.classList.add('active');
    document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');
}

// Load dashboard stats
function loadDashboardStats() {
    const products = getProducts();
    const categories = getCategories();

    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalCategories').textContent = categories.length;

    if (products.length > 0) {
        const avgPrice = Math.round(products.reduce((sum, p) => sum + p.retailPrice, 0) / products.length);
        document.getElementById('avgPrice').textContent = '₹' + avgPrice;
    }
}

// Load products table
function loadProductsTable() {
    const products = getProducts();
    const categories = getCategories();
    const search = document.getElementById('adminSearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('adminCategoryFilter')?.value || 'all';

    // Update category filter options
    const categorySelect = document.getElementById('adminCategoryFilter');
    if (categorySelect && categorySelect.options.length <= 1) {
        categories.forEach(cat => {
            categorySelect.innerHTML += `<option value="${cat.slug}">${cat.name}</option>`;
        });
    }

    // Filter products
    let filtered = products.filter(p => {
        if (search && !p.name.toLowerCase().includes(search)) return false;
        if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
        return true;
    });

    // Render table
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    tbody.innerHTML = filtered.map(product => {
        const category = categories.find(c => c.slug === product.category);
        const categoryName = category ? category.name : product.category;

        return `
            <tr>
                <td>
                    <div class="product-thumb">
                        ${product.image ?
                            `<img src="${product.image}" alt="${product.name}">` :
                            `<i class="fas fa-image"></i>`
                        }
                    </div>
                </td>
                <td>${product.name}</td>
                <td>${categoryName}</td>
                <td>₹${product.retailPrice}</td>
                <td>${product.pack || '-'}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Load categories list
function loadCategoriesList() {
    const categories = getCategories();
    const products = getProducts();
    const container = document.getElementById('categoriesList');

    if (!container) return;

    container.innerHTML = categories.map(cat => {
        const productCount = products.filter(p => p.category === cat.slug).length;

        return `
            <div class="category-item">
                <div class="category-item-info">
                    <i class="${cat.icon || 'fas fa-tag'}"></i>
                    <div>
                        <h4>${cat.name}</h4>
                        <small>${cat.slug} • ${productCount} products</small>
                    </div>
                </div>
                <div class="category-item-actions">
                    <button onclick="editCategory(${cat.id})"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteCategory(${cat.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');
}

// Load settings
function loadSettings() {
    const whatsappNumber = getWhatsAppNumber();
    const whatsappInput = document.getElementById('whatsappNumber');
    if (whatsappInput) {
        whatsappInput.value = whatsappNumber;
    }
}

// Product Modal functions
function openProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('modalTitle');
    const categories = getCategories();

    // Populate category select
    const categorySelect = document.getElementById('productCategory');
    categorySelect.innerHTML = categories.map(c =>
        `<option value="${c.slug}">${c.name}</option>`
    ).join('');

    if (productId) {
        // Edit mode
        const product = getProductById(productId);
        title.textContent = 'Edit Product';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productRetailPrice').value = product.retailPrice;
        document.getElementById('productPack').value = product.pack || '';
        document.getElementById('productImage').value = product.image || '';
        document.getElementById('productFeatured').checked = product.featured;
    } else {
        // Add mode
        title.textContent = 'Add Product';
        form.reset();
        document.getElementById('productId').value = '';
    }

    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function saveProduct(e) {
    e.preventDefault();

    const products = getProducts();
    const productId = document.getElementById('productId').value;

    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        retailPrice: parseInt(document.getElementById('productRetailPrice').value),
        pack: document.getElementById('productPack').value,
        image: document.getElementById('productImage').value,
        featured: document.getElementById('productFeatured').checked
    };

    if (productId) {
        // Update existing
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        // Add new
        productData.id = getNextProductId();
        products.push(productData);
    }

    saveProducts(products);
    closeProductModal();
    loadProductsTable();
    loadDashboardStats();
    alert('Product saved successfully!');
}

function editProduct(id) {
    openProductModal(id);
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    loadProductsTable();
    loadDashboardStats();
}

// Category Modal functions
function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const form = document.getElementById('categoryForm');
    const title = document.getElementById('categoryModalTitle');

    if (categoryId) {
        const categories = getCategories();
        const category = categories.find(c => c.id === categoryId);
        title.textContent = 'Edit Category';
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryName').value = category.name;
        document.getElementById('categorySlug').value = category.slug;
        document.getElementById('categoryIcon').value = category.icon || '';
    } else {
        title.textContent = 'Add Category';
        form.reset();
        document.getElementById('categoryId').value = '';
    }

    modal.classList.add('active');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
}

function saveCategory(e) {
    e.preventDefault();

    const categories = getCategories();
    const categoryId = document.getElementById('categoryId').value;

    const categoryData = {
        name: document.getElementById('categoryName').value,
        slug: document.getElementById('categorySlug').value,
        icon: document.getElementById('categoryIcon').value || 'fas fa-tag'
    };

    if (categoryId) {
        const index = categories.findIndex(c => c.id === parseInt(categoryId));
        if (index !== -1) {
            categories[index] = { ...categories[index], ...categoryData };
        }
    } else {
        categoryData.id = getNextCategoryId();
        categories.push(categoryData);
    }

    saveCategories(categories);
    closeCategoryModal();
    loadCategoriesList();
    loadDashboardStats();
    alert('Category saved successfully!');
}

function editCategory(id) {
    openCategoryModal(id);
}

function deleteCategory(id) {
    const products = getProducts();
    const categories = getCategories();
    const category = categories.find(c => c.id === id);

    const hasProducts = products.some(p => p.category === category.slug);
    if (hasProducts) {
        alert('Cannot delete category with products. Remove or reassign products first.');
        return;
    }

    if (!confirm('Are you sure you want to delete this category?')) return;

    const filtered = categories.filter(c => c.id !== id);
    saveCategories(filtered);
    loadCategoriesList();
    loadDashboardStats();
}

// Export data
function exportData() {
    const data = {
        products: getProducts(),
        categories: getCategories(),
        whatsapp: getWhatsAppNumber(),
        exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manish-crackers-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Import data
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);

            if (data.products) {
                saveProducts(data.products);
            }
            if (data.categories) {
                saveCategories(data.categories);
            }
            if (data.whatsapp) {
                localStorage.setItem('mc_whatsapp', data.whatsapp);
            }

            loadDashboardStats();
            loadProductsTable();
            loadCategoriesList();
            loadSettings();
            alert('Data imported successfully!');
        } catch (err) {
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

// Save WhatsApp number
function saveWhatsAppNumber() {
    const number = document.getElementById('whatsappNumber').value;
    if (!number) {
        alert('Please enter a WhatsApp number');
        return;
    }
    localStorage.setItem('mc_whatsapp', number);
    alert('WhatsApp number saved!');
}

// Change password
function changePassword() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    const storedPassword = localStorage.getItem('mc_password') || 'admin123';

    if (current !== storedPassword) {
        alert('Current password is incorrect');
        return;
    }

    if (newPass.length < 4) {
        alert('New password must be at least 4 characters');
        return;
    }

    if (newPass !== confirm) {
        alert('New passwords do not match');
        return;
    }

    localStorage.setItem('mc_password', newPass);
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    alert('Password changed successfully!');
}

// Reset data
function resetData() {
    if (!confirm('This will reset ALL data to defaults. Are you sure?')) return;
    if (!confirm('This action cannot be undone. Continue?')) return;

    localStorage.removeItem('mc_products');
    localStorage.removeItem('mc_categories');
    localStorage.removeItem('mc_whatsapp');
    localStorage.removeItem('mc_password');
    localStorage.removeItem('mc_cart');

    initializeData();
    loadDashboardStats();
    loadProductsTable();
    loadCategoriesList();
    loadSettings();
    alert('Data reset to defaults!');
}
