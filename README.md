# Nutracuiticals E-commerce Platform

A modern, full-featured e-commerce platform built with Next.js 14, TypeScript, MongoDB, and Tailwind CSS. Designed for nutraceutical products with integrated Amazon and Flipkart price comparisons.

## 🚀 Features

### Customer Features
- **Product Browsing**
  - Featured products showcase
  - Latest arrivals section
  - Product search and filtering
  - Detailed product pages with images, specifications, reviews, and FAQs
  
- **Multi-Platform Shopping**
  - Compare prices from Amazon and Flipkart
  - Direct purchase links to Amazon and Flipkart
  - Add to cart for direct purchase from Nutracuiticals
  
- **Shopping Cart & Checkout**
  - Persistent cart using Zustand
  - Real-time cart updates
  - Secure checkout process
  - User authentication required for checkout
  - Cash on Delivery (COD) payment option
  
- **User Account**
  - User registration and login
  - Profile management
  - Order history

### Admin Features
- **Catalogue Management**
  - Add/Edit/Delete products
  - Product information including images, descriptions, specifications
  - Amazon and Flipkart links with prices
  - Product categorization and tagging
  - FAQs management
  
- **Inventory Management**
  - Promote products from catalogue to inventory
  - Stock level management
  - Low stock alerts
  - Stock refill options
  - Move products back to catalogue
  
- **Settings**
  - Tax/GST configuration
  - Shipping settings (free shipping threshold, costs)
  - Policy management (Privacy, Refund, Terms, Shipping)
  
- **User Management**
  - View all customers and admins
  - Change user roles
  - User activity tracking

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Forms:** React Hook Form with Zod validation
- **Icons:** React Icons
- **Notifications:** React Hot Toast

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nutracuiticals
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/nutracuiticals
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_ADMIN_URL=http://admin.localhost:3000
NEXT_PUBLIC_MAIN_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Nutracuiticals
NEXT_PUBLIC_SITE_DESCRIPTION=Premium Nutraceutical Products
```

4. **Set up MongoDB**
- Install MongoDB locally or use MongoDB Atlas
- Update the `MONGODB_URI` in `.env.local`

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 🔐 Creating Admin User

To create an admin user, you'll need to:

1. Register a new user through the UI (`/auth/register`)
2. Connect to MongoDB and update the user's role:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or use MongoDB Compass/Studio to update the user document manually.

## 📱 Pages & Routes

### Public Pages
- `/` - Homepage with featured and latest products
- `/products` - All products listing
- `/products/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/auth/login` - User login
- `/auth/register` - User registration
- `/privacy-policy` - Privacy policy
- `/refund-policy` - Refund policy
- `/terms-conditions` - Terms & conditions
- `/shipping-policy` - Shipping policy

### Protected Pages (Require Login)
- `/checkout` - Checkout page
- `/profile` - User profile
- `/orders` - Order history

### Admin Pages (Require Admin Role)
- `/admin` - Admin dashboard
- `/admin/catalogue` - Catalogue management
- `/admin/inventory` - Inventory management
- `/admin/users` - User management
- `/admin/settings` - Platform settings

## 🎨 Color Scheme

The platform uses a blue color theme with Tailwind CSS primary color variants:
- Primary: Blue (`primary-50` to `primary-950`)
- Accent colors for status indicators

## 📊 Database Models

### User
- name, email, password
- role (customer/admin)
- address information
- timestamps

### Product
- name, slug, description
- category, images, specifications
- Amazon & Flipkart links with prices
- our price, stock level
- reviews, FAQs, ratings
- status (catalogue/inventory)

### Cart
- user reference
- items with product, quantity, price
- total amount

### Order
- user reference
- order number
- items, shipping address
- payment information
- order status tracking

### Settings
- tax/GST configuration
- shipping settings
- policies

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Deploy to Vercel**
```bash
npm i -g vercel
vercel
```

3. **Set environment variables in Vercel dashboard**
- Add all variables from `.env.local`
- Update URLs for production

4. **Update MongoDB connection**
- Use MongoDB Atlas for production
- Update `MONGODB_URI` in Vercel environment variables

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- Digital Ocean
- Self-hosted with Node.js

## 🔧 Configuration

### Tax Settings
Configure GST rate and enable/disable tax in Admin > Settings

### Shipping Settings
- Free shipping threshold
- Standard shipping cost
- Express shipping cost
Configure in Admin > Settings

### Policies
Update all policy pages content through Admin > Settings

## 📝 API Routes

### Public APIs
- `GET /api/products` - Get all products
- `GET /api/products/[slug]` - Get product by slug
- `POST /api/auth/register` - Register new user
- `GET /api/admin/settings` - Get settings (public)

### Protected APIs (Require Authentication)
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Remove item from cart
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Admin APIs (Require Admin Role)
- `GET /api/admin/products` - Get all products (admin view)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products` - Update product
- `DELETE /api/admin/products` - Delete product
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users` - Update user
- `PUT /api/admin/settings` - Update settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For support, email support@nutracuiticals.com or call +91 1800-123-4567.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- MongoDB for database
- Tailwind CSS for styling utilities

