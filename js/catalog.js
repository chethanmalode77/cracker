// ================================
// Madhu Fireworks - Catalog Page
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Get category from URL first
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    // Wait for products to load from Firebase
    if (typeof window.loadProducts === 'function') {
        window.loadProducts().then(() => {
            initializeFilters();
            // Set category filter from URL AFTER initializing
            if (categoryParam) {
                document.getElementById('categoryFilter').value = categoryParam;
            }
            loadCatalogProducts();
        });
    } else {
        // Fallback if products.js not loaded yet
        setTimeout(() => {
            initializeFilters();
            if (categoryParam) {
                document.getElementById('categoryFilter').value = categoryParam;
            }
            loadCatalogProducts();
        }, 500);
    }

    // Filter event listeners
    document.getElementById('searchInput').addEventListener('input', debounce(loadCatalogProducts, 300));
    document.getElementById('categoryFilter').addEventListener('change', loadCatalogProducts);
    document.getElementById('priceFilter').addEventListener('change', loadCatalogProducts);
    document.getElementById('sortFilter').addEventListener('change', loadCatalogProducts);

    // Clear filters
    document.getElementById('clearFilters').addEventListener('click', function() {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('priceFilter').value = 'all';
        document.getElementById('sortFilter').value = 'name-asc';
        loadCatalogProducts();
    });

    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const grid = document.getElementById('productGrid');
            if (this.dataset.view === 'list') {
                grid.classList.add('list-view');
            } else {
                grid.classList.remove('list-view');
            }
        });
    });

    // Mobile filter toggle
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const sidebar = document.querySelector('.catalog-sidebar');

    if (mobileFilterBtn && sidebar) {
        mobileFilterBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && e.target !== mobileFilterBtn) {
                sidebar.classList.remove('active');
            }
        });
    }
});

// Initialize category filter options
function initializeFilters() {
    const categories = getCategories();
    const categorySelect = document.getElementById('categoryFilter');

    if (categorySelect) {
        categorySelect.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(cat => {
            const slug = cat.slug || cat.id;
            categorySelect.innerHTML += `<option value="${slug}">${cat.name}</option>`;
        });
    }
}

// Load and filter products for catalog
function loadCatalogProducts() {
    const products = getProducts();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const sortBy = document.getElementById('sortFilter').value;

    // Filter products
    let filtered = products.filter(product => {
        // Search filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) {
            return false;
        }

        // Category filter - case-insensitive comparison
        if (category !== 'all') {
            const productCategory = (product.category || '').toLowerCase();
            const filterCategory = category.toLowerCase();
            if (productCategory !== filterCategory) {
                return false;
            }
        }

        // Price filter
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            if (product.retailPrice < min || product.retailPrice > max) {
                return false;
            }
        }

        return true;
    });

    // Sort products
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.retailPrice - b.retailPrice;
            case 'price-desc':
                return b.retailPrice - a.retailPrice;
            default:
                return 0;
        }
    });

    // Render products
    const grid = document.getElementById('productGrid');
    const noResults = document.getElementById('noResults');
    const productCount = document.getElementById('productCount');

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        grid.innerHTML = filtered.map(product => createProductCard(product)).join('');
        noResults.style.display = 'none';
    }

    productCount.textContent = filtered.length;
}

// Debounce function for search
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
