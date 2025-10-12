import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import HeroCarousel from '@/components/HeroCarousel';
import Link from 'next/link';
import { 
  FiZap, 
  FiTrendingUp, 
  FiAward, 
  FiHeart, 
  FiActivity, 
  FiStar,
  FiTruck,
  FiShield,
  FiTag,
  FiClock,
  FiPackage,
  FiDollarSign,
  FiSmartphone,
  FiUsers,
  FiCheckCircle
} from 'react-icons/fi';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:3000'}/api/products?featured=true&status=inventory&limit=8`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

async function getLatestProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:3000'}/api/products?status=inventory&limit=8&sort=-createdAt`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
}

async function getFlashSaleProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:3000'}/api/products?status=inventory`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    // Filter products tagged with 'flash-sale'
    return (data.products || []).filter((p: any) => p.tags?.includes('flash-sale')).slice(0, 8);
  } catch (error) {
    console.error('Error fetching flash sale products:', error);
    return [];
  }
}

async function getAllProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:3000'}/api/products?status=inventory`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const latestProducts = await getLatestProducts();
  const flashSaleProducts = await getFlashSaleProducts();
  const allProducts = await getAllProducts();

  // Get unique categories
  const categories = Array.from(
    new Set(allProducts.map((p: any) => p.category))
  );

  // Get trending products (highest rated)
  const trendingProducts = [...allProducts]
    .sort((a: any, b: any) => b.averageRating - a.averageRating)
    .slice(0, 8);

  // Get best sellers (most reviews)
  const bestSellers = [...allProducts]
    .sort((a: any, b: any) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
    .slice(0, 8);

  // Get best deals (highest discount)
  const bestDeals = [...allProducts]
    .filter((p: any) => p.compareAtPrice && p.compareAtPrice > p.ourPrice)
    .sort((a: any, b: any) => {
      const discountA = ((b.compareAtPrice - b.ourPrice) / b.compareAtPrice) * 100;
      const discountB = ((a.compareAtPrice - a.ourPrice) / a.compareAtPrice) * 100;
      return discountB - discountA;
    })
    .slice(0, 8);

  // Budget buys (under ₹500)
  const budgetBuys = [...allProducts]
    .filter((p: any) => p.ourPrice < 500)
    .sort((a: any, b: any) => b.averageRating - a.averageRating)
    .slice(0, 8);

  // Premium products (above ₹1000)
  const premiumProducts = [...allProducts]
    .filter((p: any) => p.ourPrice >= 1000)
    .sort((a: any, b: any) => b.averageRating - a.averageRating)
    .slice(0, 8);

  // Health concern categories (like 1mg/Netmeds)
  const healthConcerns = [
    { name: 'Diabetes Care', icon: '🩸', category: 'Vitamins & Supplements', color: 'bg-blue-100 text-blue-600' },
    { name: 'Heart Health', icon: '❤️', category: 'Vitamins & Supplements', color: 'bg-red-100 text-red-600' },
    { name: 'Immunity', icon: '🛡️', category: 'Immunity Boosters', color: 'bg-green-100 text-green-600' },
    { name: 'Bone & Joint', icon: '🦴', category: 'Ayurvedic', color: 'bg-orange-100 text-orange-600' },
    { name: 'Weight Loss', icon: '⚖️', category: 'Weight Management', color: 'bg-purple-100 text-purple-600' },
    { name: 'Skin Care', icon: '✨', category: 'Protein Supplements', color: 'bg-pink-100 text-pink-600' },
  ];

  // Category cards with icons
  const categoryCards = [
    { name: 'Vitamins & Supplements', icon: '💊', image: '🧪', count: allProducts.filter((p: any) => p.category === 'Vitamins & Supplements').length },
    { name: 'Protein Supplements', icon: '💪', image: '🥤', count: allProducts.filter((p: any) => p.category === 'Protein Supplements').length },
    { name: 'Ayurvedic', icon: '🌿', image: '🍃', count: allProducts.filter((p: any) => p.category === 'Ayurvedic').length },
    { name: 'Immunity Boosters', icon: '🛡️', image: '💉', count: allProducts.filter((p: any) => p.category === 'Immunity Boosters').length },
    { name: 'Weight Management', icon: '⚖️', image: '🏃', count: allProducts.filter((p: any) => p.category === 'Weight Management').length },
    { name: 'Sports Nutrition', icon: '🏋️', image: '⚡', count: allProducts.filter((p: any) => p.category === 'Sports Nutrition').length },
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Shop by Health Concern - Like 1mg/Netmeds */}
      <section className="py-12 bg-white border-b">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shop by Health Concern
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {healthConcerns.map((concern) => (
              <Link
                key={concern.name}
                href={`/products?category=${encodeURIComponent(concern.category)}`}
                className="group"
              >
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-primary-500 hover:shadow-lg transition-all text-center">
                  <div className={`w-16 h-16 ${concern.color} rounded-full flex items-center justify-center mx-auto mb-3 text-3xl group-hover:scale-110 transition-transform`}>
                    {concern.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600">
                    {concern.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sales / Deals of the Day */}
      {flashSaleProducts.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-red-600 text-white p-3 rounded-lg">
                  <FiZap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    ⚡ Deals of the Day
                  </h2>
                  <p className="text-red-600 font-medium flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    Limited time offers - Grab them now!
                  </p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                View All <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Shop by Category */}
      <section className="py-12 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 text-white p-3 rounded-lg">
                <FiPackage className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Shop by Category
                </h2>
                <p className="text-gray-600">Explore our wide range of products</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCards.map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white rounded-xl p-5 hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-500"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {cat.image}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-indigo-600">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500">{cat.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-600 text-white p-3 rounded-lg">
                  <FiStar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    🏆 Best Sellers
                  </h2>
                  <p className="text-gray-600">Most loved by our customers</p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-yellow-600 hover:text-yellow-700 font-semibold flex items-center gap-1"
              >
                View All <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-600 text-white p-3 rounded-lg">
                  <FiAward className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1"
              >
                View All <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Budget Buys - Under ₹500 */}
      {budgetBuys.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-600 text-white p-3 rounded-lg">
                  <FiDollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    💸 Budget Buys
                  </h2>
                  <p className="text-gray-600">Top rated products under ₹500</p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
              >
                View All <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {budgetBuys.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Deals / Maximum Savings */}
      {bestDeals.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 text-white p-3 rounded-lg">
                  <FiTag className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Maximum Savings
                  </h2>
                  <p className="text-gray-600">Biggest discounts on popular products</p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
              >
                View All <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestDeals.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Range */}
      {premiumProducts.length > 0 && (
        <section className="py-12 bg-gradient-to-br from-amber-50 to-yellow-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-600 text-white p-3 rounded-lg">
                  <FiAward className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    👑 Premium Range
                  </h2>
                  <p className="text-gray-600">High-quality premium products</p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
              >
                View All <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Arrivals */}
      {latestProducts.length > 0 && (
        <section className="py-12 bg-blue-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 text-white p-3 rounded-lg text-xl">
                  ✨
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    New Arrivals
                  </h2>
                  <p className="text-gray-600">Just launched - Check them out!</p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                View All <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Now */}
      {trendingProducts.length > 0 && (
        <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 text-white p-3 rounded-lg">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    🔥 Trending Now
                  </h2>
                  <p className="text-gray-600">Most popular products this month</p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
              >
                View All <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Download App Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-4">
                <FiSmartphone className="w-12 h-12" />
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Download the Nutracuiticals App
                  </h2>
                  <p className="text-indigo-100 text-lg">
                    Get exclusive app-only deals & offers
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-6 h-6 text-green-300" />
                  <span className="text-white">Extra 5% discount on app orders</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-6 h-6 text-green-300" />
                  <span className="text-white">Early access to flash sales</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="w-6 h-6 text-green-300" />
                  <span className="text-white">Track orders in real-time</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  App Store
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition flex items-center gap-2">
                  <span className="text-2xl">▶️</span>
                  Google Play
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="text-9xl">📱</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Trust Badges */}
      <section className="py-12 bg-white border-y">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why 50,000+ Customers Trust Nutracuiticals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiShield className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">100% Authentic</h3>
              <p className="text-sm text-gray-600">
                Genuine products only
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiTruck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Delivery</h3>
              <p className="text-sm text-gray-600">
                On orders above ₹500
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiTag className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Best Prices</h3>
              <p className="text-sm text-gray-600">
                Compare with 9 platforms
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUsers className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">50,000+ Happy Customers</h3>
              <p className="text-sm text-gray-600">
                Trusted nationwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health & Wellness Tips - Like 1mg */}
      <section className="py-12 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-teal-600 text-white p-3 rounded-lg">
                <FiActivity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Health & Wellness Tips
                </h2>
                <p className="text-gray-600">Expert advice for a healthier you</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-3">🧘‍♀️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Boost Your Immunity
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Top 10 supplements to strengthen your immune system naturally
              </p>
              <Link href="/products?category=Immunity+Boosters" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
                Shop Now →
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Build Muscle Mass
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Best protein supplements for muscle growth and recovery
              </p>
              <Link href="/products?category=Protein+Supplements" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
                Shop Now →
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Natural Wellness
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Ayurvedic remedies for everyday health concerns
              </p>
              <Link href="/products?category=Ayurvedic" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-3">Stay Updated with Health Tips</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Subscribe to get exclusive deals, health tips, new product launches, and expert wellness advice
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-primary-200 text-xs mt-3">
            Join 50,000+ happy customers getting healthier every day
          </p>
        </div>
      </section>
    </div>
  );
}
