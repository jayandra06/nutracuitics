# 🚀 Nutracuiticals - Quick Reference Card

## 🌐 URLs

### Live Site:
**http://localhost:3000**

### Admin Panel:
**http://localhost:3000/admin/login**

---

## 🔑 Login Credentials

### Customer:
```
Email: customer@example.com
Password: customer123
Portal: http://localhost:3000/auth/login
```

### Admin:
```
Email: admin@nutracuiticals.com
Password: admin123
Portal: http://localhost:3000/admin/login
```

---

## 📦 Product Count

**14 products** across 6 categories:
- 💊 Vitamins (5)
- 🌿 Supplements (3)
- ⚡ Minerals (2)
- 🦠 Probiotics (1)
- 💪 Protein (1)
- 🍃 Herbs (2)

---

## 🎯 Quick Actions

### To Add Product with Images:
1. Login: `/admin/login`
2. Go to: Catalogue → Add Product
3. Fill form
4. **Upload images** (drag & drop or click)
5. Add Amazon/Flipkart links
6. Save
7. Promote to inventory

### To Create Coupon:
1. Login: `/admin/login`
2. Go to: Coupons → Create Coupon
3. Enter code (e.g., SAVE20)
4. Set discount (% or ₹)
5. Set expiry & limits
6. Save

### To Test Shopping:
1. Browse: `/products`
2. Add to cart
3. Go to: `/checkout`
4. Login as customer
5. Apply coupon (if created)
6. Place order
7. View in `/orders`

---

## 🖼️ Firebase Setup Status

### Need to Configure:
1. Create Firebase project
2. Enable Storage
3. Get config keys
4. Update `.env.local`
5. Restart server

### Guide:
See **FIREBASE_QUICKSTART.md** (3 minutes)

---

## 🎨 Homepage Sections

1. 🎠 **Hero Carousel** (4 slides, auto-rotate)
2. ⚡ **Flash Sales** (50% OFF items)
3. 🏆 **Featured Products** (6 items)
4. ✨ **Latest Arrivals** (8 items)
5. 📈 **Trending Now** (4 highest-rated)
6. 💡 **Why Choose Us** (4 benefits)
7. 💬 **Testimonials** (4 reviews)
8. 📧 **Newsletter** (email signup)

---

## 🔧 Admin Panel Sections

1. 📊 **Dashboard** - Stats overview
2. 📦 **Catalogue** - Add/edit products (with Firebase upload!)
3. 📦 **Inventory** - Stock management
4. 🛒 **Orders** - Order processing
5. 🎟️ **Coupons** - Discount codes
6. 📈 **Analytics** - Business metrics
7. 👥 **Users** - User management
8. ⚙️ **Settings** - Store config

---

## 🎯 Key Features

### Customer:
- ❤️ Wishlist
- 🛒 Shopping cart
- 🎟️ Coupon codes
- ⭐ Product reviews
- 📦 Order tracking
- 🔍 Advanced search
- 🏷️ Category filtering

### Admin:
- 🖼️ **Firebase image upload**
- 📊 Analytics dashboard
- 🛒 Order management
- 🎟️ Coupon creation
- 📦 Inventory control
- 👥 User management

---

## 🔄 Common Tasks

### Restart Server:
```bash
# Ctrl+C to stop
npm run dev
```

### Re-seed Database:
```bash
npm run seed
```

### Install Dependencies:
```bash
npm install
```

### Check Server:
```bash
curl http://localhost:3000
```

---

## 📱 Test Scenarios

### 1. Customer Shopping:
- Browse → Add to cart → Checkout → Login → Order

### 2. Admin Product Management:
- Login → Catalogue → Add Product → Upload Images → Save → Promote

### 3. Coupon System:
- Admin: Create coupon
- Customer: Apply at checkout

### 4. Review System:
- Customer: View product → Write review
- Public: See reviews on product page

---

## 🚨 Important Notes

1. **Firebase Required** for image uploads
2. **Separate logins** - customer ≠ admin
3. **First image** = main product image
4. **Free shipping** on orders ₹500+
5. **GST** calculated at 18%

---

## 📞 Quick Links

- **Firebase Console:** https://console.firebase.google.com/
- **MongoDB Atlas:** https://cloud.mongodb.com/
- **Documentation:** See README.md

---

## ✅ Current Status

✅ Platform fully functional  
✅ 14 products loaded  
✅ Dual login working  
✅ Hero carousel active  
⏳ Firebase setup needed (3 min)  

---

**Your platform is 95% complete!**  
**Just configure Firebase and you're ready to go! 🎉**

