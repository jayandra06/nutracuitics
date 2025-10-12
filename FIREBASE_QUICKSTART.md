# 🔥 Firebase Quick Start - Image Upload Setup

## ⚡ 3-Minute Setup

### 1️⃣ Create Firebase Project (1 minute)

1. Visit: https://console.firebase.google.com/
2. Click **"Add project"**
3. Name: `nutracuiticals`
4. Disable Analytics (optional)
5. Click **"Create"**

---

### 2️⃣ Enable Storage (1 minute)

1. In left menu, click **"Storage"**
2. Click **"Get started"**
3. Click **"Next"** → **"Done"**
4. Go to **"Rules"** tab
5. Paste this and click **"Publish"**:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

### 3️⃣ Get Your Config (1 minute)

1. Click ⚙️ **Settings** (top left)
2. Scroll to **"Your apps"**
3. Click **</>** (Web icon)
4. App name: `nutracuiticals-web`
5. Click **"Register"**
6. **Copy the config values**

You'll see this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",              // Copy this
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
  storageBucket: "xxx.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123..."
};
```

---

### 4️⃣ Update .env.local

Open `.env.local` and update these lines with YOUR values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123...
NEXT_PUBLIC_FIREBASE_APP_ID=1:123...
```

---

### 5️⃣ Restart Server

```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## ✅ Done! Test It:

1. Go to: **http://localhost:3000/admin/login**
2. Login: `admin@nutracuiticals.com` / `admin123`
3. Click **"Catalogue"** → **"Add Product"**
4. Scroll to **"Product Images"** section
5. **Click or drag images** → Upload!
6. See progress bar → Preview → Save product

---

## 🎯 Features You Get:

✅ **Drag & drop** image upload  
✅ **Progress bar** shows upload status  
✅ **Image previews** before saving  
✅ **Delete uploaded images**  
✅ **5 images per product**  
✅ **Auto-organized** in Firebase  
✅ **CDN delivery** (fast worldwide)  
✅ **Free tier** (5GB storage)  

---

## 🔒 Firebase Storage Rules (Simple Version)

If you want the SIMPLEST rules (good for development):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Note:** This allows anyone to upload. Use only for testing!

**For production, use the authenticated rules from Step 2.**

---

## 💡 Don't Have Firebase Account?

**No problem!** Firebase is:
- ✅ **FREE** (generous free tier)
- ✅ **No credit card required** for free tier
- ✅ **Sign in with Google** account
- ✅ **5 GB storage free**
- ✅ **Quick setup** (3 minutes)

---

## 🎊 That's It!

Once Firebase is configured, your image uploads will work automatically!

**The image upload component is already integrated** in:
- Admin → Catalogue → Add Product
- Admin → Catalogue → Edit Product

Just configure Firebase and you're ready to upload! 🚀

