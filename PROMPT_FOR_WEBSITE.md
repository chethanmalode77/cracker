# Prompt to Build Manish Crackers Website

Copy and paste the prompt below into Claude to generate your complete cracker shop website:

---

## PROMPT START

Build me a complete, production-ready cracker (fireworks) shop website with the following specifications:

### Business Details
- **Shop Name**: Manish Crackers
- **Proprietor**: Manish
- **Business Type**: Wholesale & Retail Fireworks/Crackers
- **Tagline**: "Light Up Your Celebrations with Manish Crackers"
- **WhatsApp Number**: [REPLACE_WITH_YOUR_WHATSAPP_NUMBER]
- **Location**: [REPLACE_WITH_YOUR_CITY/ADDRESS]
- **Established**: 2026

### Technical Requirements
- **Hosting**: GitHub Pages (static site)
- **Framework**: Use vanilla HTML, CSS, and JavaScript OR React/Next.js with static export
- **Responsive**: Must work perfectly on mobile phones, tablets, and laptops
- **No Backend Required**: Use localStorage for cart, WhatsApp API for orders

### Pages & Features Required

#### 1. Home Page
- Hero banner with festive crackers images and shop name
- Welcome message highlighting wholesale & retail options
- Quick category navigation (Ground Chakkar, Rockets, Flowerpots, Bombs, Sparklers, Gift Boxes, etc.)
- Featured/Best Selling products section
- "Why Choose Us" section (Quality, Best Prices, Safe Products, Fast Delivery)
- Diwali/Festival countdown timer (optional)
- Contact information with WhatsApp button

#### 2. Product Catalog Page
- Grid/List view toggle
- Filter by:
  - Category (Ground Chakkar, Rockets, Flowerpots, Aerial, Sparklers, Fancy Items, Gift Boxes, Combo Packs)
  - Price Range
  - Type (Wholesale/Retail)
- Search functionality
- Each product card should show:
  - Product image
  - Product name
  - Pack size/quantity
  - Retail price
  - Wholesale price (minimum order quantity)
  - "Add to List" button
- Sort by: Price Low-High, Price High-Low, Name, Popularity

#### 3. Product Detail Page
- Large product image(s)
- Product name and description
- Safety instructions
- Retail price
- Wholesale price with minimum quantity
- Quantity selector
- "Add to List" button
- Related products section

#### 4. My List / Cart Page
- Show all added items
- Quantity adjustment (+/-)
- Remove item option
- Subtotal calculation
- Clear all button
- "Send Order via WhatsApp" button - This should:
  - Generate a formatted message with all items, quantities, and total
  - Open WhatsApp with pre-filled message
  - Include customer name field before sending

#### 5. About Us Page
- Shop story and history
- Proprietor introduction (Manish)
- Our values (Quality, Safety, Customer Satisfaction)
- Licenses and certifications section
- Shop photos

#### 6. Contact Page
- Shop address with Google Maps embed placeholder
- Phone number
- WhatsApp contact button
- Business hours
- Contact form (sends via WhatsApp or email)

#### 7. Admin Panel (Simple, Password Protected)
- Simple login (can use hardcoded password for now, stored in localStorage)
- Dashboard showing:
  - Quick stats placeholder
- Product Management:
  - View all products
  - Add new product (Name, Category, Description, Retail Price, Wholesale Price, Min Qty, Image URL)
  - Edit product
  - Delete product
  - Products stored in localStorage (can be exported/imported as JSON)
- Category Management:
  - Add/Edit/Delete categories
- Export/Import data as JSON file (for backup)

### WhatsApp Integration
- Floating WhatsApp button on all pages
- When customer clicks "Send Order via WhatsApp":
  ```
  Hello Manish Crackers!
  
  I would like to order:
  
  1. [Product Name] - Qty: X - ₹XXX
  2. [Product Name] - Qty: X - ₹XXX
  ...
  
  Total: ₹XXXX
  
  Customer Name: [Name]
  Phone: [Phone]
  Address: [Address]
  
  Please confirm availability and delivery.
  ```

### Design Requirements
- **Theme**: Festive, colorful (Orange, Red, Yellow, Gold colors)
- **Dark mode**: Optional toggle
- **Animations**: Subtle festive animations (sparkle effects, etc.)
- **Typography**: Clear, readable fonts
- **Icons**: Use free icon libraries (Font Awesome, Heroicons)
- **Images**: Use placeholder images, provide instructions for replacing

### Sample Product Categories & Items
Include these sample products (owner can edit/delete later):

1. **Ground Chakkars**
   - Ground Chakkar 10 pcs - ₹50 (Retail) / ₹40 (Wholesale min 10 packs)
   - Deluxe Chakkar 5 pcs - ₹80 / ₹65

2. **Rockets**
   - Small Rocket 10 pcs - ₹100 / ₹80
   - Big Rocket 5 pcs - ₹150 / ₹120
   - Whistling Rocket 10 pcs - ₹200 / ₹160

3. **Flowerpots**
   - Standard Flowerpot 10 pcs - ₹120 / ₹95
   - Multicolor Flowerpot 5 pcs - ₹100 / ₹80

4. **Sparklers**
   - Color Sparklers 10 pcs - ₹30 / ₹22
   - Electric Sparklers 10 pcs - ₹50 / ₹38

5. **Aerial Shots**
   - 7 Shot Color - ₹250 / ₹200
   - 12 Shot Crackling - ₹400 / ₹320

6. **Bombs/Sound Crackers**
   - Atom Bomb 10 pcs - ₹150 / ₹120
   - Lakshmi Bomb 10 pcs - ₹100 / ₹80

7. **Gift Boxes/Combos**
   - Family Pack - ₹500 / ₹400
   - Deluxe Gift Box - ₹1000 / ₹800
   - Mega Combo - ₹2000 / ₹1600

### File Structure
```
manish-crackers/
├── index.html
├── catalog.html
├── product.html
├── cart.html
├── about.html
├── contact.html
├── admin.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── products.js
│   ├── cart.js
│   └── admin.js
├── images/
│   └── (placeholder instructions)
└── README.md (deployment instructions)
```

### Additional Instructions
1. Include detailed README.md with:
   - How to deploy on GitHub Pages
   - How to add/update products
   - How to change WhatsApp number
   - How to customize colors/branding

2. Make all text content easily editable

3. Include SEO meta tags for better search visibility

4. Add favicon placeholder

5. Include safety disclaimer about fireworks

6. Add terms and conditions page template

### Future Enhancement Placeholders
- Comment where payment gateway can be integrated later
- Comment where user login/signup can be added
- Comment where order tracking can be implemented
- Comment where SMS notifications can be added

Please generate all the files with complete, working code. Make sure the website is fully functional with the localStorage-based product management and WhatsApp ordering system.

## PROMPT END

---

# Instructions for Using This Prompt

1. **Copy everything between "PROMPT START" and "PROMPT END"**

2. **Before pasting, replace these placeholders:**
   - `[REPLACE_WITH_YOUR_WHATSAPP_NUMBER]` → Your WhatsApp number with country code (e.g., +919876543210)
   - `[REPLACE_WITH_YOUR_CITY/ADDRESS]` → Your shop address

3. **Paste into Claude and let it generate the code**

4. **After getting the code:**
   - Create a new repository on GitHub
   - Upload all files
   - Go to Settings → Pages → Enable GitHub Pages
   - Your site will be live at: `https://yourusername.github.io/repository-name`

5. **To add your own product images:**
   - Upload images to the `images/` folder
   - Update image URLs in the admin panel or products.js file

Good luck with Manish Crackers! 🎆
