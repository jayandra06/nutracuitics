# Quick Start Guide

Get your Nutracuiticals e-commerce platform up and running in minutes!

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Git installed

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

The `.env.local` file is already configured for local development. If you need to modify it:

```env
MONGODB_URI=mongodb://localhost:27017/nutracuiticals
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=nutracuiticals-secret-key-change-in-production-2024
NEXT_PUBLIC_ADMIN_URL=http://admin.localhost:3000
NEXT_PUBLIC_MAIN_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Nutracuiticals
NEXT_PUBLIC_SITE_DESCRIPTION=Premium Nutraceutical Products
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services app
```

**Option B: MongoDB Atlas**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Update `MONGODB_URI` in `.env.local`

### Step 4: Seed Database (Optional but Recommended)

```bash
npm run seed
```

This creates:
- Admin user (email: `admin@nutracuiticals.com`, password: `admin123`)
- Test customer (email: `customer@example.com`, password: `customer123`)
- 6 sample products

### Step 5: Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 🎉

## 🎯 Next Steps

### 1. Login as Admin
- Go to http://localhost:3000/auth/login
- Email: `admin@nutracuiticals.com`
- Password: `admin123`

### 2. Add Your First Product
1. Navigate to Admin Panel (`/admin`)
2. Click "Catalogue" in sidebar
3. Click "Add Product"
4. Fill in product details:
   - Name, SKU, Description
   - Category, Price
   - Images (use URLs from Unsplash or your own)
   - Amazon/Flipkart links and prices
   - Specifications, FAQs
5. Save product

### 3. Promote to Inventory
1. Go to Admin > Inventory
2. Find your product in "Catalogue Products"
3. Click "Promote to Inventory"
4. Set initial stock level

### 4. Test Shopping Experience
1. Logout from admin account
2. Browse products on homepage
3. Click on a product to view details
4. Add to cart
5. View cart
6. Register/Login as customer
7. Complete checkout

### 5. Configure Settings
1. Go to Admin > Settings
2. Configure:
   - GST rate (default: 18%)
   - Shipping costs
   - Free shipping threshold
   - Policy pages content

## 📁 Project Structure

```
nutracuiticals/
├── app/                    # Next.js app directory
│   ├── (pages)/           # Public pages
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── models/               # MongoDB models
│   ├── User.ts
│   ├── Product.ts
│   ├── Order.ts
│   └── Cart.ts
├── lib/                  # Utilities
│   ├── mongodb.ts
│   └── auth.ts
├── store/                # State management
│   └── cartStore.ts
├── scripts/              # Utility scripts
│   └── seed.ts
└── public/              # Static files
```

## 🎨 Customization

### Change Color Theme

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Change these values to your brand colors
    50: '#eff6ff',
    // ... rest of colors
  },
}
```

### Update Site Name

Update `.env.local`:
```env
NEXT_PUBLIC_SITE_NAME=Your Store Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your description
```

### Modify Product Fields

Edit `models/Product.ts` to add/remove fields.

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Port 3000 Already in Use
```
Error: Port 3000 is already in use
```
**Solution:** Kill the process or use different port
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
```

### Database Not Seeding
```
Error: Cannot find module 'ts-node'
```
**Solution:** Install ts-node globally
```bash
npm install -g ts-node
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)

## 💡 Tips

1. **Use Sample Images**: The seed script uses Unsplash images. For production, upload your own.

2. **Test with Different Roles**: 
   - Admin: Full access to admin panel
   - Customer: Shopping experience only

3. **Customize Policies**: Update policy pages in Admin > Settings

4. **Monitor Performance**: Use Next.js built-in analytics

5. **Backup Regularly**: Export MongoDB data regularly

## 📞 Need Help?

- Check README.md for detailed documentation
- Check DEPLOYMENT.md for production deployment
- Open an issue on GitHub
- Email: support@nutracuiticals.com

## ✅ Production Checklist

Before going live:

- [ ] Change all default passwords
- [ ] Update NEXTAUTH_SECRET
- [ ] Use production MongoDB (Atlas)
- [ ] Add real product images
- [ ] Configure payment gateway
- [ ] Update policy pages
- [ ] Test complete order flow
- [ ] Enable HTTPS
- [ ] Setup domain
- [ ] Configure email notifications
- [ ] Setup analytics

Happy selling! 🚀

