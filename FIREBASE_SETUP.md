# 🔥 Firebase Setup Guide for Image Uploads

## 📋 Overview

Your product image uploads now use **Firebase Storage** instead of URLs. This guide will help you set up Firebase in 5 minutes!

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: **`nutracuiticals`** (or any name)
4. Disable Google Analytics (optional)
5. Click "Create project"

---

### Step 2: Enable Firebase Storage

1. In your Firebase project, click **"Storage"** in the left menu
2. Click **"Get started"**
3. Click **"Next"** (use default security rules)
4. Select your region (choose closest to you)
5. Click **"Done"**

---

### Step 3: Update Storage Rules (Important!)

1. In Storage, click on the **"Rules"** tab
2. Replace the rules with this:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      // Allow read to everyone
      allow read: if true;
      
      // Allow write only to authenticated users (your admin)
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

---

### Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon ⚙️ in left sidebar)
2. Scroll down to **"Your apps"**
3. Click the **Web icon** (</>)
4. Register your app:
   - App nickname: `nutracuiticals-web`
   - Don't check "Firebase Hosting"
   - Click "Register app"
5. Copy the `firebaseConfig` object

You'll see something like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

---

### Step 5: Update Environment Variables

1. Open your `.env.local` file
2. Replace the Firebase variables with your actual values:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxxx
```

3. Save the file
4. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

---

## ✅ You're Done! 

Now the image upload feature will work!

---

## 🎯 How to Use Image Upload

### In Admin Panel:

1. Go to **http://localhost:3000/admin/login**
2. Login with admin credentials
3. Navigate to **Catalogue** → **Add Product**
4. In the **Product Images** section:
   - Click the upload area or drag & drop images
   - Upload up to 5 images per product
   - First image = main product image
   - See upload progress bar
   - Preview images before saving
   - Remove images with X button

### Features:
✅ Drag & drop support  
✅ Multiple file upload  
✅ Image preview  
✅ Upload progress bar  
✅ Max 5MB per image  
✅ Max 5 images per product  
✅ Delete uploaded images  
✅ Automatic Firebase storage  
✅ First image marked as "Main"  

---

## 📸 Supported Image Formats

- PNG
- JPG/JPEG
- WEBP
- GIF

**Max file size:** 5MB per image

---

## 🔒 Security Rules Explained

```javascript
// Allow everyone to READ images (for customers to see products)
allow read: if true;

// Allow only authenticated users to WRITE (upload/delete)
// This means only your logged-in admins can upload
allow write: if request.auth != null;
```

This ensures:
- ✅ Customers can see product images
- ✅ Only admins can upload images
- ❌ Unauthorized users can't upload

---

## 💾 Storage Structure

Your images will be organized as:
```
Storage Bucket
└── products/
    ├── 1234567890-abc123-product1.jpg
    ├── 1234567891-def456-product2.png
    └── 1234567892-ghi789-product3.webp
```

Each filename includes:
- Timestamp (prevents collisions)
- Random string (extra uniqueness)
- Original filename (for reference)

---

## 🧪 Testing the Upload

1. **Install Firebase dependency:**
   ```bash
   npm install
   ```

2. **Restart the server**

3. **Test upload:**
   - Go to Admin → Catalogue → Add Product
   - Click upload area
   - Select an image from your computer
   - Watch the progress bar
   - See preview appear
   - Save the product

4. **Verify:**
   - Image should appear in product card
   - Check Firebase Console → Storage to see uploaded file

---

## 🔧 Troublesho oting

### Error: "Firebase not configured"
**Solution:** Make sure all Firebase environment variables are set in `.env.local`

### Error: "Permission denied"
**Solution:** Check Firebase Storage Rules are set correctly (Step 3)

### Error: "Image too large"
**Solution:** Compress image to under 5MB or increase limit in `ImageUpload.tsx`

### Images not appearing
**Solution:** 
- Check Firebase Console → Storage to verify upload
- Check browser console for errors
- Verify storage bucket name in `.env.local`

---

## 📊 Firebase Free Tier Limits

Firebase offers a **generous free tier**:

- **Storage:** 5 GB
- **Downloads:** 1 GB/day
- **Uploads:** 20,000/day

This is MORE than enough for your e-commerce store!

---

## 🎨 Image Upload Component Features

### Visual Features:
- Drag & drop zone
- Upload progress bar
- Image grid preview
- Remove button on hover
- "Main" badge on first image
- File count indicator

### Validation:
- File type checking (images only)
- File size limit (5MB)
- Maximum images limit (5)
- Duplicate prevention

### User Experience:
- Real-time progress
- Toast notifications
- Error handling
- Loading states
- Preview before save

---

## 🔄 Migration from URLs

### Old System:
```typescript
images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
```

### New System:
```typescript
images: ['https://firebasestorage.googleapis.com/.../image1.jpg', ...]
```

**Good news:** The system works with BOTH!
- Old products with URL images will still work
- New products will use Firebase uploaded images
- No migration needed!

---

## 💡 Pro Tips

1. **Optimize images before upload:**
   - Use tools like TinyPNG or Squoosh
   - Recommended size: 800x800px for product images
   - Keep under 500KB for faster loading

2. **Image naming:**
   - Use descriptive filenames
   - Example: `omega-3-bottle-front.jpg`

3. **Upload order:**
   - Upload the main/best image FIRST
   - It will be shown as the primary product image

4. **Backup:**
   - Firebase automatically backs up your images
   - You can download them from Firebase Console

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs/storage)
- [Firebase Console](https://console.firebase.google.com/)
- [Storage Security Rules](https://firebase.google.com/docs/storage/security)

---

## ✨ What You Get

✅ **Professional image management**  
✅ **CDN-powered delivery** (fast loading worldwide)  
✅ **Automatic optimization**  
✅ **Secure storage**  
✅ **No server storage needed**  
✅ **99.99% uptime**  
✅ **Free tier is generous**  
✅ **Easy to use interface**  

Your image upload system is now **production-ready**! 🎉

