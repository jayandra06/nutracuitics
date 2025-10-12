/**
 * Database Seeding Script
 * Run this script to populate the database with sample data
 * 
 * Usage: node scripts/seed.ts
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Update this with your MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nutracuiticals';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  detailedDescription: String,
  category: String,
  images: [String],
  specifications: [{ key: String, value: String }],
  productLinks: [{
    platform: String,
    url: String,
    price: Number,
  }],
  ourPrice: Number,
  stockLevel: Number,
  lowStockThreshold: Number,
  sku: String,
  tags: [String],
  featured: Boolean,
  status: String,
  reviews: [{
    user: mongoose.Schema.Types.ObjectId,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: Date,
  }],
  faqs: [{ question: String, answer: String }],
  averageRating: Number,
  totalReviews: Number,
  frequentlyBoughtWith: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@nutracuiticals.com',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('Created admin user');

    // Create sample customer
    const customerPassword = await bcrypt.hash('customer123', 12);
    await User.create({
      name: 'John Doe',
      email: 'customer@example.com',
      password: customerPassword,
      role: 'customer',
    });
    console.log('Created sample customer');

    // Create sample products
    const sampleProducts = [
      {
        name: 'Premium Omega-3 Fish Oil',
        slug: 'premium-omega-3-fish-oil-' + Date.now(),
        description: 'High-quality Omega-3 supplement with EPA and DHA for heart and brain health',
        detailedDescription: 'Our Premium Omega-3 Fish Oil is sourced from wild-caught fish and contains 1000mg of EPA and DHA per serving. Support your cardiovascular health, brain function, and joint health with this essential supplement.',
        category: 'Supplements',
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800', 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800'],
        specifications: [
          { key: 'Serving Size', value: '2 Softgels' },
          { key: 'Servings Per Container', value: '60' },
          { key: 'EPA', value: '600mg' },
          { key: 'DHA', value: '400mg' },
        ],
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1299 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 1349 },
        ],
        ourPrice: 1199,
        stockLevel: 100,
        lowStockThreshold: 10,
        sku: 'NUT-OM3-001',
        tags: ['omega-3', 'heart-health', 'brain-health'],
        featured: true,
        status: 'inventory',
        faqs: [
          { question: 'How should I take this supplement?', answer: 'Take 2 softgels daily with meals.' },
          { question: 'Is this suitable for vegetarians?', answer: 'No, this is a fish-based supplement.' },
        ],
        averageRating: 4.5,
        totalReviews: 0,
      },
      {
        name: 'Vitamin D3 5000 IU',
        slug: 'vitamin-d3-5000-iu-' + Date.now(),
        description: 'High-potency Vitamin D3 for bone health and immune support',
        detailedDescription: 'Support your immune system and maintain strong bones with our Vitamin D3 supplement. Each capsule provides 5000 IU of cholecalciferol, the most bioavailable form of Vitamin D.',
        category: 'Vitamins',
        images: ['https://images.unsplash.com/photo-1550572017-4245e5b4d4a1?w=800'],
        specifications: [
          { key: 'Serving Size', value: '1 Capsule' },
          { key: 'Servings Per Container', value: '120' },
          { key: 'Vitamin D3', value: '5000 IU (125 mcg)' },
        ],
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 599 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 649 },
        ],
        ourPrice: 549,
        stockLevel: 150,
        lowStockThreshold: 15,
        sku: 'NUT-VD3-001',
        tags: ['vitamin-d', 'bone-health', 'immunity'],
        featured: true,
        status: 'inventory',
        faqs: [
          { question: 'When is the best time to take Vitamin D?', answer: 'Morning with a meal containing healthy fats for optimal absorption.' },
        ],
        averageRating: 4.7,
        totalReviews: 0,
      },
      {
        name: 'Probiotic Complex 50 Billion CFU',
        slug: 'probiotic-complex-50-billion-cfu-' + Date.now(),
        description: 'Advanced probiotic formula for digestive and immune health',
        detailedDescription: '10 strains of beneficial bacteria with 50 billion CFUs per serving. Supports digestive health, immune function, and overall wellness.',
        category: 'Probiotics',
        images: ['https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=800'],
        specifications: [
          { key: 'Serving Size', value: '1 Capsule' },
          { key: 'CFU Count', value: '50 Billion' },
          { key: 'Strains', value: '10 Different Strains' },
        ],
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1899 },
        ],
        ourPrice: 1699,
        stockLevel: 75,
        lowStockThreshold: 10,
        sku: 'NUT-PRO-001',
        tags: ['probiotics', 'digestive-health', 'immunity'],
        featured: false,
        status: 'inventory',
        faqs: [],
        averageRating: 4.6,
        totalReviews: 0,
      },
      {
        name: 'Multivitamin for Men',
        slug: 'multivitamin-for-men-' + Date.now(),
        description: 'Complete daily multivitamin formulated specifically for men',
        detailedDescription: 'A comprehensive blend of vitamins, minerals, and antioxidants to support men\'s health, energy, and vitality.',
        category: 'Vitamins',
        images: ['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800'],
        specifications: [
          { key: 'Serving Size', value: '2 Tablets' },
          { key: 'Servings Per Container', value: '45' },
        ],
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 999 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 1049 },
        ],
        ourPrice: 899,
        stockLevel: 120,
        lowStockThreshold: 15,
        sku: 'NUT-MVM-001',
        tags: ['multivitamin', 'men-health', 'energy'],
        featured: true,
        status: 'inventory',
        faqs: [],
        averageRating: 4.4,
        totalReviews: 0,
      },
      {
        name: 'Collagen Peptides Powder',
        slug: 'collagen-peptides-powder-' + Date.now(),
        description: 'Hydrolyzed collagen for skin, hair, and joint health',
        detailedDescription: 'Grass-fed bovine collagen peptides that dissolve easily in hot or cold liquids. Supports skin elasticity, hair strength, and joint flexibility.',
        category: 'Protein',
        images: ['https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800'],
        specifications: [
          { key: 'Serving Size', value: '1 Scoop (10g)' },
          { key: 'Servings Per Container', value: '30' },
          { key: 'Protein', value: '9g per serving' },
        ],
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1799 },
        ],
        ourPrice: 1599,
        stockLevel: 60,
        lowStockThreshold: 10,
        sku: 'NUT-COL-001',
        tags: ['collagen', 'skin-health', 'joint-health'],
        featured: false,
        status: 'inventory',
        faqs: [],
        averageRating: 4.5,
        totalReviews: 0,
      },
      {
        name: 'Magnesium Glycinate 400mg',
        slug: 'magnesium-glycinate-400mg-' + Date.now(),
        description: 'High-absorption magnesium for muscle and sleep support',
        detailedDescription: 'Chelated magnesium glycinate for superior absorption. Supports muscle relaxation, restful sleep, and cardiovascular health.',
        category: 'Minerals',
        images: ['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800'],
        specifications: [
          { key: 'Serving Size', value: '2 Capsules' },
          { key: 'Magnesium (as Glycinate)', value: '400mg' },
        ],
        productLinks: [
          { platform: 'flipkart', url: 'https://flipkart.com', price: 799 },
        ],
        ourPrice: 699,
        stockLevel: 90,
        lowStockThreshold: 10,
        sku: 'NUT-MAG-001',
        tags: ['magnesium', 'sleep', 'muscle-health'],
        featured: false,
        status: 'inventory',
        faqs: [],
        averageRating: 4.3,
        totalReviews: 0,
      },
    ];

    await Product.insertMany(sampleProducts);
    console.log(`Created ${sampleProducts.length} sample products`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin Credentials:');
    console.log('Email: admin@nutracuiticals.com');
    console.log('Password: admin123');
    console.log('\nCustomer Credentials:');
    console.log('Email: customer@example.com');
    console.log('Password: customer123');

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

