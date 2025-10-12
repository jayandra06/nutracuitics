# Deployment Guide

This guide will help you deploy the Nutracuiticals e-commerce platform to production.

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Git repository
- Domain name (optional)

## Environment Setup

### 1. MongoDB Setup

**Option A: MongoDB Atlas (Recommended for Production)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs or specific IPs)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/nutracuiticals?retryWrites=true&w=majority
   ```

**Option B: Self-hosted MongoDB**

1. Install MongoDB on your server
2. Configure authentication
3. Use connection string:
   ```
   mongodb://username:password@host:27017/nutracuiticals
   ```

### 2. Environment Variables

Create a `.env.production` file with:

```env
# MongoDB
MONGODB_URI=your_mongodb_uri_here

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_secure_random_string_here

# Site URLs
NEXT_PUBLIC_ADMIN_URL=https://admin.yourdomain.com
NEXT_PUBLIC_MAIN_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Nutracuiticals
NEXT_PUBLIC_SITE_DESCRIPTION=Premium Nutraceutical Products
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## Deployment Options

### Option 1: Vercel (Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Add Environment Variables in Vercel Dashboard:**
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.production`

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

6. **Custom Domain:**
   - Go to Project Settings > Domains
   - Add your domain
   - Update DNS records as shown

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Initialize:**
   ```bash
   netlify init
   ```

4. **Add Environment Variables:**
   ```bash
   netlify env:set MONGODB_URI "your_value"
   netlify env:set NEXTAUTH_SECRET "your_value"
   # ... add all variables
   ```

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Option 3: VPS (Digital Ocean, AWS, etc.)

1. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

3. **Clone Repository:**
   ```bash
   git clone your-repo-url
   cd nutracuiticals
   ```

4. **Install Dependencies:**
   ```bash
   npm install
   ```

5. **Create `.env.local` file:**
   ```bash
   nano .env.local
   # Paste production environment variables
   ```

6. **Build Application:**
   ```bash
   npm run build
   ```

7. **Start with PM2:**
   ```bash
   pm2 start npm --name "nutracuiticals" -- start
   pm2 save
   pm2 startup
   ```

8. **Setup Nginx (Reverse Proxy):**
   ```bash
   sudo apt install nginx
   ```

   Create nginx config:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Setup SSL with Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 4: Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml:**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - MONGODB_URI=${MONGODB_URI}
         - NEXTAUTH_URL=${NEXTAUTH_URL}
         - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
       restart: unless-stopped
   ```

3. **Build and Run:**
   ```bash
   docker-compose up -d
   ```

## Post-Deployment Steps

### 1. Seed Database

Run the seeding script to create initial admin user and sample products:

```bash
npm run seed
```

Or manually create admin user in MongoDB.

### 2. Test Admin Access

1. Login with admin credentials
2. Access admin panel at `/admin`
3. Add products via Catalogue Management

### 3. Configure Settings

1. Go to Admin > Settings
2. Configure:
   - Tax/GST rates
   - Shipping costs and thresholds
   - Policy pages content

### 4. Add Products

1. Go to Admin > Catalogue
2. Add products with:
   - Product information
   - Images
   - Amazon/Flipkart links
   - Specifications
   - FAQs
3. Promote products to inventory

### 5. Test Order Flow

1. Create test customer account
2. Add items to cart
3. Complete checkout process
4. Verify order creation

## Performance Optimization

### 1. Enable Caching

Add to `next.config.mjs`:
```javascript
const nextConfig = {
  // ... existing config
  compress: true,
  poweredByHeader: false,
};
```

### 2. Image Optimization

- Use Next.js Image component
- Optimize images before upload
- Use CDN for image hosting (Cloudinary, imgix)

### 3. Database Indexing

Ensure indexes are created:
```javascript
// In MongoDB
db.products.createIndex({ name: "text", description: "text" })
db.products.createIndex({ category: 1 })
db.products.createIndex({ featured: 1 })
db.products.createIndex({ status: 1 })
```

### 4. Monitoring

**Vercel:**
- Built-in analytics and monitoring
- Real-time logs in dashboard

**Other Platforms:**
- Use PM2 for process monitoring
- Setup log aggregation (Papertrail, Loggly)
- Add APM (New Relic, DataDog)

## Security Checklist

- [ ] Strong NEXTAUTH_SECRET generated
- [ ] MongoDB credentials secured
- [ ] Environment variables not in repository
- [ ] HTTPS enabled (SSL certificate)
- [ ] CORS configured properly
- [ ] Rate limiting implemented (optional)
- [ ] Regular security updates
- [ ] Database backups configured

## Backup Strategy

### MongoDB Atlas
- Enable automatic backups in Atlas
- Configure backup frequency
- Test restore procedure

### Self-hosted MongoDB
```bash
# Create backup
mongodump --uri="your_mongodb_uri" --out=/backup/$(date +%Y%m%d)

# Restore backup
mongorestore --uri="your_mongodb_uri" /backup/20240101
```

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues
- Check MongoDB URI format
- Verify IP whitelist
- Test connection with MongoDB Compass

### Environment Variables Not Loading
- Restart application after changes
- Verify variable names match
- Check for typos in `.env` file

### 500 Errors
- Check application logs
- Verify MongoDB connection
- Check for missing environment variables

## Support

For deployment support:
- Email: support@nutracuiticals.com
- Documentation: README.md
- Issues: GitHub repository

## Maintenance

### Regular Tasks
- Monitor error logs
- Check database performance
- Update dependencies monthly
- Review security advisories
- Backup database regularly
- Monitor disk space and memory usage

### Updating Application
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Restart application
pm2 restart nutracuiticals  # For PM2
# or
vercel --prod  # For Vercel
```

