# 🔐 Dual Login System - User Guide

## 🎯 Overview

Your platform now has **TWO SEPARATE LOGIN PORTALS**:

1. **Customer Login** (`/auth/login`) - For shoppers
2. **Admin Login** (`/admin/login`) - For administrators

**Key Security Feature:** Customers CANNOT access admin panel, and admins CANNOT use customer login!

---

## 👥 Customer Login Portal

### Access URL:
**http://localhost:3000/auth/login**

### Features:
- ✅ Blue-themed login page
- ✅ Customers only
- ✅ Rejects admin credentials
- ✅ Link to registration
- ✅ Link to admin portal (for admins)

### What Happens:
1. **Customer logs in** → ✅ Access granted to shopping features
2. **Admin tries to log in** → ❌ Access denied + redirected to admin login

### Test Credentials:
```
Email: customer@example.com
Password: customer123
```

### After Login (Customer):
- ✅ Can shop and add to cart
- ✅ Can access checkout
- ✅ Can view orders
- ✅ Can save to wishlist
- ✅ Can write reviews
- ❌ CANNOT access `/admin` routes

---

## 🔒 Admin Login Portal

### Access URL:
**http://localhost:3000/admin/login**

### Features:
- ✅ Dark-themed login page with red accents
- ✅ "ADMIN PORTAL" badge
- ✅ Admins only
- ✅ Rejects customer credentials
- ✅ Security warning message
- ✅ No registration link (admins must be created)

### What Happens:
1. **Admin logs in** → ✅ Access granted to admin panel
2. **Customer tries to log in** → ❌ Access denied with error message

### Test Credentials:
```
Email: admin@nutracuiticals.com
Password: admin123
```

### After Login (Admin):
- ✅ Full access to admin panel
- ✅ Can manage products, orders, coupons
- ✅ Can view analytics
- ✅ Can manage users
- ✅ "View Website" link to go to main site
- ✅ Logout button (redirects to admin login)

---

## 🚀 How It Works

### Route Protection:

#### Admin Routes (`/admin/*`):
```
User tries to access → Middleware checks role
├─ No login → Redirect to /admin/login
├─ Customer logged in → Redirect to /admin/login (denied)
└─ Admin logged in → ✅ Allow access
```

#### Customer Routes (`/checkout`, `/orders`, etc.):
```
User tries to access → Middleware checks login
├─ Not logged in → Redirect to /auth/login
└─ Logged in (any role) → ✅ Allow access
```

### Login Validation:

#### Customer Login (`/auth/login`):
```
Submit credentials → NextAuth validates
├─ Invalid credentials → ❌ Error message
├─ Valid admin credentials → ❌ "Access Denied: Use Admin Login"
│                           → Auto-redirect to /admin/login after 2 seconds
└─ Valid customer credentials → ✅ Login successful
```

#### Admin Login (`/admin/login`):
```
Submit credentials → NextAuth validates
├─ Invalid credentials → ❌ Error message
├─ Valid customer credentials → ❌ "Access Denied: Admin credentials required"
└─ Valid admin credentials → ✅ Login successful → Redirect to /admin
```

---

## 🧪 Testing the System

### Test 1: Customer Login (Should Work)
1. Go to: http://localhost:3000/auth/login
2. Enter: `customer@example.com` / `customer123`
3. ✅ Should login successfully
4. Try to visit: http://localhost:3000/admin
5. ❌ Should redirect to admin login

### Test 2: Admin Login via Customer Portal (Should Fail)
1. Go to: http://localhost:3000/auth/login
2. Enter: `admin@nutracuiticals.com` / `admin123`
3. ❌ Should show "Access Denied" error
4. Should auto-redirect to `/admin/login` after 2 seconds

### Test 3: Admin Login (Should Work)
1. Go to: http://localhost:3000/admin/login
2. Enter: `admin@nutracuiticals.com` / `admin123`
3. ✅ Should login successfully
4. ✅ Should have full admin access

### Test 4: Customer Login via Admin Portal (Should Fail)
1. Go to: http://localhost:3000/admin/login
2. Enter: `customer@example.com` / `customer123`
3. ❌ Should show "Access Denied: Admin credentials required"

### Test 5: Direct Admin Access Without Login
1. Clear cookies/logout
2. Try to visit: http://localhost:3000/admin
3. ❌ Should redirect to `/admin/login`

---

## 🎨 Visual Differences

### Customer Login Page:
- 📘 **Blue theme** (primary-600)
- 👤 "Customer Login" title
- 🔗 "Create new account" link
- 🔗 "Are you an admin? Login here →" link
- ℹ️ Blue info box about customer portal

### Admin Login Page:
- 🔴 **Red/Dark theme** (red-600 + dark background)
- 🔒 "ADMIN PORTAL" badge at top
- 👮 "Admin Login" title
- 🏠 "Back to Website" link
- ⚠️ Red warning box about restricted access
- ❌ NO registration link

---

## 🛡️ Security Features

1. **Role Verification:**
   - Login validates role AFTER authentication
   - Wrong role = immediate logout + error

2. **Middleware Protection:**
   - All `/admin/*` routes check for admin role
   - All protected customer routes check for login

3. **Separate Login Pages:**
   - `/auth/login` - Customer portal (blue)
   - `/admin/login` - Admin portal (red/dark)

4. **Session Handling:**
   - Wrong role login = auto signout
   - Proper redirect after denial

5. **Visual Indicators:**
   - Admin panel shows logged-in email
   - Clear role-based theming

---

## 📋 User Journey Examples

### Customer Journey:
```
1. Visit website → Browse products
2. Click "Add to Cart"
3. Go to /checkout → Redirected to /auth/login
4. Login as customer → Back to checkout
5. Complete purchase → View orders
```

### Admin Journey:
```
1. Go to /admin → Redirected to /admin/login
2. Login with admin credentials → Access admin panel
3. Manage products, orders, etc.
4. Click "View Website" → Go to main site
5. Click "Logout" → Return to admin login
```

### Failed Access Attempts:
```
Customer → /admin/login → Denied ❌
Admin → /auth/login → Denied ❌ → Redirected to /admin/login
```

---

## 🔑 Default Credentials

### Customer Account:
- **Email:** customer@example.com
- **Password:** customer123
- **Access:** Shopping, cart, checkout, orders, wishlist, reviews

### Admin Account:
- **Email:** admin@nutracuiticals.com
- **Password:** admin123
- **Access:** Full admin panel (8 sections)

---

## ✅ What's Protected

### Customer-Only Routes (Require Customer Login):
- `/checkout` - Checkout page
- `/orders` - Order history
- `/orders/[id]` - Order details
- `/wishlist` - Saved items
- `/profile` - User profile

### Admin-Only Routes (Require Admin Login):
- `/admin` - Dashboard
- `/admin/catalogue` - Product management
- `/admin/inventory` - Stock management
- `/admin/orders` - Order management
- `/admin/coupons` - Coupon creation
- `/admin/analytics` - Analytics
- `/admin/users` - User management
- `/admin/settings` - Store settings

### Public Routes (No Login Required):
- `/` - Homepage
- `/products` - Product listing
- `/products/[slug]` - Product details
- `/about` - About page
- `/contact` - Contact page
- Policy pages

---

## 🎊 Summary

✅ **Two separate login portals** (customer & admin)  
✅ **Role-based authentication** (strict separation)  
✅ **Visual differentiation** (blue vs red/dark)  
✅ **Automatic redirects** on wrong portal  
✅ **Security warnings** on both portals  
✅ **Session validation** after login  
✅ **Protected routes** with middleware  
✅ **Logout functionality** for both roles  

Your authentication system is now **production-ready** with proper security! 🔒

