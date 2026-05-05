# Manish Crackers - Wholesale & Retail Fireworks Shop

A complete e-commerce website for a cracker/fireworks shop with WhatsApp ordering system.

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Product Catalog**: Browse products by category, search, and filter
- **Shopping Cart**: Add items, adjust quantities, view totals
- **WhatsApp Ordering**: Send orders directly via WhatsApp
- **Admin Panel**: Manage products, categories, and settings
- **No Backend Required**: Everything stored in browser localStorage

## Pages

1. **Home** (`index.html`) - Landing page with featured products
2. **Catalog** (`catalog.html`) - Full product catalog with filters
3. **Cart** (`cart.html`) - Shopping cart and order summary
4. **About** (`about.html`) - About the shop
5. **Contact** (`contact.html`) - Contact information
6. **Admin** (`admin.html`) - Admin panel for managing products

## Quick Setup

### 1. Update WhatsApp Number

Open `js/products.js` and change the default WhatsApp number:
```javascript
localStorage.setItem('mc_whatsapp', '919876543210');
```
Replace `919876543210` with your number (with country code, no + sign).

Or update it from the Admin Panel → Settings.

### 2. Update Contact Information

Edit these files to add your actual contact details:
- `index.html` - Footer section
- `contact.html` - Contact cards
- `about.html` - Footer section

Search for `919876543210` and `Your City, India` and replace with your details.

### 3. Add Your Products

1. Open `admin.html` in browser
2. Login with password: `admin123`
3. Go to Products → Add Product
4. Fill in details and save

Or edit `js/products.js` directly to modify the `defaultProducts` array.

## Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click "New repository"
3. Name it `manish-crackers` (or any name)
4. Make it Public
5. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop ALL files from the Crackers folder
3. Click "Commit changes"

**Option B: Using Git Command Line**
```bash
cd path/to/Crackers
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/manish-crackers.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait 1-2 minutes

Your site will be live at: `https://YOUR_USERNAME.github.io/manish-crackers`

## Custom Domain (Optional)

1. Buy a domain (e.g., from GoDaddy, Namecheap)
2. In GitHub Pages settings, enter your domain
3. Add these DNS records at your domain provider:
   - Type: A, Name: @, Value: 185.199.108.153
   - Type: A, Name: @, Value: 185.199.109.153
   - Type: CNAME, Name: www, Value: YOUR_USERNAME.github.io

## Admin Panel

Access: `yoursite.com/admin.html`

**Default Password**: `admin123`

### Features:
- **Dashboard**: View stats
- **Products**: Add, edit, delete products
- **Categories**: Manage product categories
- **Settings**: Update WhatsApp number, change password
- **Export/Import**: Backup and restore data

### Important: Change Default Password
1. Login to admin panel
2. Go to Settings
3. Change password immediately

## Adding Product Images

### Option 1: Upload to GitHub
1. Create `images/products/` folder
2. Add your images
3. Use path like `images/products/rocket.jpg` in admin

### Option 2: Use External URLs
1. Upload images to services like:
   - [ImgBB](https://imgbb.com)
   - [Imgur](https://imgur.com)
   - Google Drive (make public)
2. Copy the direct image URL
3. Paste in product image field

## File Structure

```
Crackers/
├── index.html          # Home page
├── catalog.html        # Product catalog
├── cart.html           # Shopping cart
├── about.html          # About page
├── contact.html        # Contact page
├── admin.html          # Admin panel
├── css/
│   └── style.css       # All styles
├── js/
│   ├── products.js     # Product data & functions
│   ├── cart.js         # Cart functions
│   ├── main.js         # Main site functionality
│   ├── catalog.js      # Catalog page logic
│   ├── cart-page.js    # Cart page logic
│   └── admin.js        # Admin panel logic
├── images/             # Product images folder
└── README.md           # This file
```

## Customization

### Change Colors
Edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
    --primary-color: #ff6b35;    /* Main orange */
    --secondary-color: #ffd700;  /* Gold */
    --accent-color: #ff4444;     /* Red */
    /* ... more colors */
}
```

### Change Shop Name
Search and replace "Manish Crackers" in all HTML files.

### Add Google Maps
1. Go to Google Maps
2. Search your shop location
3. Click Share → Embed a map
4. Copy the iframe code
5. Replace the map placeholder in `contact.html`

## How Orders Work

1. Customer browses products
2. Adds items to cart
3. Goes to cart page
4. Enters name and phone
5. Clicks "Send Order via WhatsApp"
6. WhatsApp opens with formatted order message
7. Customer sends message
8. You receive the order on WhatsApp!

## Safety Disclaimer

This website includes a safety disclaimer about fireworks. Make sure to:
- Comply with local regulations
- Have proper licenses
- Include safety instructions with products

## Support

For any issues or customization help, feel free to reach out!

---

**Built for Manish Crackers** | Wholesale & Retail Fireworks

*Light Up Your Celebrations!*
