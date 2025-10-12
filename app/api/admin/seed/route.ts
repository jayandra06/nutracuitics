import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Only allow admin users to seed
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      return NextResponse.json({ 
        message: 'Database already has products. Delete them first if you want to reseed.',
        existingCount: existingProducts 
      }, { status: 400 });
    }

    // Sample products data
    const sampleProducts = [
      {
        name: 'Vitamin C 1000mg with Rose Hips',
        slug: 'vitamin-c-1000mg-rose-hips',
        description: '⚡ FLASH SALE! High-potency Vitamin C with natural Rose Hips for immune support',
        longDescription: 'Our premium Vitamin C supplement combines 1000mg of pure ascorbic acid with natural Rose Hips for enhanced absorption and immune support. Perfect for daily wellness.',
        category: 'Vitamins & Supplements',
        ourPrice: 399,
        compareAtPrice: 799,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 799 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 849 }
        ],
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'],
        specifications: [
          { key: 'Dosage', value: '1000mg per serving' },
          { key: 'Servings', value: '60 capsules' },
          { key: 'Form', value: 'Capsules' }
        ],
        tags: ['flash-sale', 'immunity', 'vitamin-c'],
        featured: true,
        stockLevel: 100,
        status: 'inventory',
        averageRating: 4.8,
        reviews: []
      },
      {
        name: 'Zinc Picolinate 50mg',
        slug: 'zinc-picolinate-50mg',
        description: '⚡ FLASH SALE! Highly absorbable zinc for immune function',
        longDescription: 'Premium zinc supplement in highly bioavailable picolinate form. Supports immune system, skin health, and cellular function.',
        category: 'Vitamins & Supplements',
        ourPrice: 299,
        compareAtPrice: 599,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 599 }
        ],
        images: ['https://images.unsplash.com/photo-1550572017-4fade76d01fe?w=500'],
        specifications: [
          { key: 'Dosage', value: '50mg per serving' },
          { key: 'Servings', value: '90 capsules' },
          { key: 'Form', value: 'Capsules' }
        ],
        tags: ['flash-sale', 'immunity', 'zinc'],
        featured: true,
        stockLevel: 150,
        status: 'inventory',
        averageRating: 4.7,
        reviews: []
      },
      {
        name: 'Turmeric Curcumin with BioPerine',
        slug: 'turmeric-curcumin-bioperine',
        description: 'Powerful anti-inflammatory with enhanced absorption',
        longDescription: 'Premium turmeric extract standardized to 95% curcuminoids with BioPerine black pepper extract for maximum absorption. Natural anti-inflammatory support.',
        category: 'Ayurvedic',
        ourPrice: 999,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1199 }
        ],
        images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500'],
        specifications: [
          { key: 'Curcumin Content', value: '95%' },
          { key: 'Servings', value: '60 capsules' },
          { key: 'BioPerine', value: 'Included' }
        ],
        tags: ['ayurvedic', 'anti-inflammatory'],
        featured: true,
        stockLevel: 80,
        status: 'inventory',
        averageRating: 4.9,
        reviews: []
      },
      {
        name: 'Ashwagandha Extract 600mg',
        slug: 'ashwagandha-extract-600mg',
        description: 'Premium adaptogen for stress relief and energy',
        longDescription: 'High-potency Ashwagandha root extract standardized to contain 5% withanolides. Ancient Ayurvedic herb for stress management and vitality.',
        category: 'Ayurvedic',
        ourPrice: 899,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 999 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 1049 }
        ],
        images: ['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500'],
        specifications: [
          { key: 'Extract Ratio', value: '10:1' },
          { key: 'Servings', value: '60 capsules' },
          { key: 'Withanolides', value: '5%' }
        ],
        tags: ['ayurvedic', 'stress-relief', 'adaptogen'],
        featured: true,
        stockLevel: 120,
        status: 'inventory',
        averageRating: 4.8,
        reviews: []
      },
      {
        name: 'Biotin 10,000mcg Hair Growth',
        slug: 'biotin-10000mcg-hair-growth',
        description: 'Maximum strength biotin for hair, skin, and nails',
        longDescription: 'High-potency biotin supplement to support healthy hair growth, strong nails, and radiant skin. Vegan-friendly formula.',
        category: 'Vitamins & Supplements',
        ourPrice: 599,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 699 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 749 }
        ],
        images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
        specifications: [
          { key: 'Potency', value: '10,000mcg' },
          { key: 'Servings', value: '120 capsules' },
          { key: 'Vegan', value: 'Yes' }
        ],
        tags: ['beauty', 'hair-growth', 'biotin'],
        featured: true,
        stockLevel: 200,
        status: 'inventory',
        averageRating: 4.7,
        reviews: []
      },
      {
        name: 'Apple Cider Vinegar Gummies',
        slug: 'apple-cider-vinegar-gummies',
        description: 'Delicious gummies for weight management and digestion',
        longDescription: 'Tasty apple-flavored gummies with the benefits of apple cider vinegar. Supports weight management, digestion, and metabolism.',
        category: 'Weight Management',
        ourPrice: 799,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 899 }
        ],
        images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500'],
        specifications: [
          { key: 'Servings', value: '60 gummies' },
          { key: 'Flavor', value: 'Apple' },
          { key: 'Sugar', value: 'Low sugar' }
        ],
        tags: ['weight-loss', 'gummies', 'digestion'],
        featured: true,
        stockLevel: 90,
        status: 'inventory',
        averageRating: 4.6,
        reviews: []
      },
      {
        name: 'CoQ10 200mg Ubiquinol',
        slug: 'coq10-200mg-ubiquinol',
        description: 'Advanced heart health and cellular energy support',
        longDescription: 'Premium CoQ10 in the active Ubiquinol form for superior absorption. Supports heart health, cellular energy production, and antioxidant protection.',
        category: 'Vitamins & Supplements',
        ourPrice: 1699,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1899 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 1949 }
        ],
        images: ['https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500'],
        specifications: [
          { key: 'Form', value: 'Ubiquinol (Active)' },
          { key: 'Dosage', value: '200mg' },
          { key: 'Servings', value: '60 softgels' }
        ],
        tags: ['heart-health', 'energy', 'coq10'],
        featured: true,
        stockLevel: 50,
        status: 'inventory',
        averageRating: 4.9,
        reviews: []
      },
      {
        name: 'B-Complex with B12',
        slug: 'b-complex-with-b12',
        description: 'Complete B-vitamin complex for energy and metabolism',
        longDescription: 'Comprehensive B-complex formula with all 8 essential B vitamins including high-potency B12. Supports energy, metabolism, and nervous system health.',
        category: 'Vitamins & Supplements',
        ourPrice: 649,
        productLinks: [
          { platform: 'flipkart', url: 'https://flipkart.com', price: 749 }
        ],
        images: ['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500'],
        specifications: [
          { key: 'B Vitamins', value: 'All 8 types' },
          { key: 'B12 Dosage', value: '1000mcg' },
          { key: 'Servings', value: '90 capsules' }
        ],
        tags: ['energy', 'b-vitamins', 'metabolism'],
        featured: true,
        stockLevel: 110,
        status: 'inventory',
        averageRating: 4.7,
        reviews: []
      },
      {
        name: 'Premium Omega-3 Fish Oil',
        slug: 'premium-omega-3-fish-oil',
        description: 'High-quality Omega-3 supplement with EPA and DHA for heart and brain health',
        longDescription: 'Molecularly distilled omega-3 fish oil providing 1000mg of EPA and DHA per serving. Supports cardiovascular health, brain function, and joint mobility.',
        category: 'Vitamins & Supplements',
        ourPrice: 1199,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1299 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 1349 }
        ],
        images: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
        specifications: [
          { key: 'EPA + DHA', value: '1000mg' },
          { key: 'Purity', value: 'Molecularly distilled' },
          { key: 'Servings', value: '60 softgels' }
        ],
        tags: ['omega-3', 'heart-health', 'brain'],
        featured: true,
        stockLevel: 75,
        status: 'inventory',
        averageRating: 4.8,
        reviews: []
      },
      {
        name: 'Vitamin D3 5000 IU',
        slug: 'vitamin-d3-5000-iu',
        description: 'High-potency Vitamin D3 for bone health and immune support',
        longDescription: 'Premium Vitamin D3 (cholecalciferol) supplement providing 5000 IU per softgel. Essential for bone health, immune function, and mood support.',
        category: 'Vitamins & Supplements',
        ourPrice: 549,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 599 },
          { platform: 'flipkart', url: 'https://flipkart.com', price: 649 }
        ],
        images: ['https://images.unsplash.com/photo-1550572017-4fade76d01fe?w=500'],
        specifications: [
          { key: 'Dosage', value: '5000 IU' },
          { key: 'Form', value: 'D3 (Cholecalciferol)' },
          { key: 'Servings', value: '120 softgels' }
        ],
        tags: ['vitamin-d', 'bone-health', 'immunity'],
        featured: true,
        stockLevel: 140,
        status: 'inventory',
        averageRating: 4.8,
        reviews: []
      },
      {
        name: 'Probiotic Complex 50 Billion CFU',
        slug: 'probiotic-complex-50-billion-cfu',
        description: 'Advanced probiotic formula for digestive and immune health',
        longDescription: 'Professional-grade probiotic supplement with 10 clinically studied strains providing 50 billion CFU. Supports gut health, digestion, and immune function.',
        category: 'Immunity Boosters',
        ourPrice: 1699,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1899 }
        ],
        images: ['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500'],
        specifications: [
          { key: 'CFU Count', value: '50 Billion' },
          { key: 'Strains', value: '10 types' },
          { key: 'Servings', value: '30 capsules' }
        ],
        tags: ['probiotics', 'gut-health', 'immunity'],
        featured: false,
        stockLevel: 60,
        status: 'inventory',
        averageRating: 4.9,
        reviews: []
      },
      {
        name: 'Collagen Peptides Powder',
        slug: 'collagen-peptides-powder',
        description: 'Hydrolyzed collagen for skin, hair, and joint health',
        longDescription: 'Grass-fed bovine collagen peptides in easily mixable powder form. Supports skin elasticity, hair growth, nail strength, and joint mobility.',
        category: 'Protein Supplements',
        ourPrice: 1599,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1799 }
        ],
        images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
        specifications: [
          { key: 'Type', value: 'Grass-fed bovine' },
          { key: 'Serving Size', value: '10g' },
          { key: 'Servings', value: '30 servings' }
        ],
        tags: ['collagen', 'beauty', 'joints'],
        featured: false,
        stockLevel: 70,
        status: 'inventory',
        averageRating: 4.7,
        reviews: []
      },
      {
        name: 'Whey Protein Isolate Chocolate',
        slug: 'whey-protein-isolate-chocolate',
        description: 'Premium whey protein for muscle building and recovery',
        longDescription: '100% pure whey protein isolate with 25g protein per serving. Low in carbs and fat. Perfect for post-workout recovery and muscle building.',
        category: 'Protein Supplements',
        ourPrice: 2499,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 2799 },
          { platform: 'healthkart', url: 'https://healthkart.com', price: 2699 }
        ],
        images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500'],
        specifications: [
          { key: 'Protein per Serving', value: '25g' },
          { key: 'Flavor', value: 'Chocolate' },
          { key: 'Servings', value: '30 servings (1kg)' }
        ],
        tags: ['protein', 'muscle', 'workout'],
        featured: false,
        stockLevel: 50,
        status: 'inventory',
        averageRating: 4.8,
        reviews: []
      },
      {
        name: 'Green Tea Extract Fat Burner',
        slug: 'green-tea-extract-fat-burner',
        description: 'Natural fat burner with EGCG for weight management',
        longDescription: 'Concentrated green tea extract standardized to 50% EGCG. Supports metabolism, fat burning, and antioxidant protection.',
        category: 'Weight Management',
        ourPrice: 699,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 799 },
          { platform: '1mg', url: 'https://1mg.com', price: 749 }
        ],
        images: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500'],
        specifications: [
          { key: 'EGCG Content', value: '50%' },
          { key: 'Servings', value: '90 capsules' },
          { key: 'Caffeine', value: 'Natural from tea' }
        ],
        tags: ['weight-loss', 'metabolism', 'green-tea'],
        featured: false,
        stockLevel: 95,
        status: 'inventory',
        averageRating: 4.5,
        reviews: []
      },
      {
        name: 'Multivitamin for Men',
        slug: 'multivitamin-for-men',
        description: 'Complete daily nutrition for men with 20+ vitamins & minerals',
        longDescription: 'Comprehensive multivitamin formula specifically designed for men. Contains essential vitamins, minerals, and antioxidants for overall health and vitality.',
        category: 'Vitamins & Supplements',
        ourPrice: 799,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 899 },
          { platform: 'pharmeasy', url: 'https://pharmeasy.in', price: 849 }
        ],
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'],
        specifications: [
          { key: 'Nutrients', value: '20+ vitamins & minerals' },
          { key: 'Servings', value: '60 tablets' },
          { key: 'Gender', value: 'Men' }
        ],
        tags: ['multivitamin', 'men', 'daily'],
        featured: false,
        stockLevel: 130,
        status: 'inventory',
        averageRating: 4.6,
        reviews: []
      },
      {
        name: 'Multivitamin for Women',
        slug: 'multivitamin-for-women',
        description: 'Complete daily nutrition for women with iron & folic acid',
        longDescription: 'Specially formulated multivitamin for women with added iron, folic acid, and calcium. Supports energy, bone health, and overall wellness.',
        category: 'Vitamins & Supplements',
        ourPrice: 799,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 899 },
          { platform: 'nykaa', url: 'https://nykaa.com', price: 879 }
        ],
        images: ['https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500'],
        specifications: [
          { key: 'Nutrients', value: '20+ vitamins & minerals' },
          { key: 'Servings', value: '60 tablets' },
          { key: 'Gender', value: 'Women' }
        ],
        tags: ['multivitamin', 'women', 'daily'],
        featured: false,
        stockLevel: 125,
        status: 'inventory',
        averageRating: 4.7,
        reviews: []
      },
      {
        name: 'Magnesium Glycinate 400mg',
        slug: 'magnesium-glycinate-400mg',
        description: 'Highly absorbable magnesium for sleep and relaxation',
        longDescription: 'Premium magnesium in glycinate form for maximum absorption and minimal digestive upset. Supports muscle relaxation, sleep quality, and bone health.',
        category: 'Vitamins & Supplements',
        ourPrice: 749,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 849 }
        ],
        images: ['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500'],
        specifications: [
          { key: 'Form', value: 'Glycinate' },
          { key: 'Dosage', value: '400mg elemental' },
          { key: 'Servings', value: '90 capsules' }
        ],
        tags: ['magnesium', 'sleep', 'relaxation'],
        featured: false,
        stockLevel: 100,
        status: 'inventory',
        averageRating: 4.8,
        reviews: []
      },
      {
        name: 'BCAA 2:1:1 Powder',
        slug: 'bcaa-211-powder',
        description: 'Branched-chain amino acids for muscle recovery',
        longDescription: 'Pure BCAA powder in the optimal 2:1:1 ratio of leucine, isoleucine, and valine. Supports muscle recovery, reduces soreness, and prevents muscle breakdown.',
        category: 'Sports Nutrition',
        ourPrice: 1299,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1499 },
          { platform: 'healthkart', url: 'https://healthkart.com', price: 1399 }
        ],
        images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500'],
        specifications: [
          { key: 'Ratio', value: '2:1:1' },
          { key: 'Serving Size', value: '5g' },
          { key: 'Servings', value: '60 servings' }
        ],
        tags: ['bcaa', 'recovery', 'muscle'],
        featured: false,
        stockLevel: 85,
        status: 'inventory',
        averageRating: 4.6,
        reviews: []
      },
      {
        name: 'Creatine Monohydrate Micronized',
        slug: 'creatine-monohydrate-micronized',
        description: 'Pure creatine for strength and muscle gains',
        longDescription: 'Micronized creatine monohydrate for faster absorption. Scientifically proven to increase strength, power, and lean muscle mass.',
        category: 'Sports Nutrition',
        ourPrice: 999,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1199 },
          { platform: 'healthkart', url: 'https://healthkart.com', price: 1099 }
        ],
        images: ['https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500'],
        specifications: [
          { key: 'Form', value: 'Micronized monohydrate' },
          { key: 'Serving Size', value: '5g' },
          { key: 'Servings', value: '100 servings (500g)' }
        ],
        tags: ['creatine', 'strength', 'muscle'],
        featured: false,
        stockLevel: 120,
        status: 'inventory',
        averageRating: 4.9,
        reviews: []
      },
      {
        name: 'Immunity Booster Combo Pack',
        slug: 'immunity-booster-combo-pack',
        description: 'Complete immunity support with Vitamin C, Zinc, and Elderberry',
        longDescription: 'Comprehensive immunity pack combining Vitamin C, Zinc, and Elderberry extract. Triple-action formula for year-round immune support.',
        category: 'Immunity Boosters',
        ourPrice: 1299,
        compareAtPrice: 1899,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1599 },
          { platform: '1mg', url: 'https://1mg.com', price: 1549 }
        ],
        images: ['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500'],
        specifications: [
          { key: 'Includes', value: 'Vitamin C + Zinc + Elderberry' },
          { key: 'Servings', value: '30-day supply' },
          { key: 'Value Pack', value: 'Yes' }
        ],
        tags: ['immunity', 'combo', 'value-pack'],
        featured: false,
        stockLevel: 80,
        status: 'inventory',
        averageRating: 4.8,
        reviews: []
      },
      {
        name: 'Pre-Workout Energy Booster',
        slug: 'pre-workout-energy-booster',
        description: 'Advanced pre-workout formula for explosive energy and focus',
        longDescription: 'High-performance pre-workout blend with caffeine, beta-alanine, and citrulline. Enhances energy, focus, endurance, and muscle pumps.',
        category: 'Sports Nutrition',
        ourPrice: 1799,
        productLinks: [
          { platform: 'amazon', url: 'https://amazon.in', price: 1999 },
          { platform: 'healthkart', url: 'https://healthkart.com', price: 1899 }
        ],
        images: ['https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500'],
        specifications: [
          { key: 'Caffeine', value: '200mg' },
          { key: 'Beta-Alanine', value: '3g' },
          { key: 'Servings', value: '30 servings' }
        ],
        tags: ['pre-workout', 'energy', 'performance'],
        featured: false,
        stockLevel: 65,
        status: 'inventory',
        averageRating: 4.7,
        reviews: []
      }
    ];

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);

    return NextResponse.json({
      success: true,
      message: 'Production database seeded successfully!',
      productsAdded: products.length,
      products: products.map(p => ({ name: p.name, slug: p.slug }))
    }, { status: 200 });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to check seed status
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const productCount = await Product.countDocuments();
    const inventoryCount = await Product.countDocuments({ status: 'inventory' });
    const featuredCount = await Product.countDocuments({ featured: true });

    return NextResponse.json({
      productCount,
      inventoryCount,
      featuredCount,
      needsSeeding: productCount === 0
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to check seed status', details: error.message },
      { status: 500 }
    );
  }
}

