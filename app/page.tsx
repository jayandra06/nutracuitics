import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import HeroCarousel from '@/components/HeroCarousel';
import Link from 'next/link';
import { FiZap, FiTrendingUp, FiAward } from 'react-icons/fi';

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
    return (data.products || []).filter((p: any) => p.tags?.includes('flash-sale'));
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
    .slice(0, 4);

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Flash Sales */}
      {flashSaleProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <FiZap className="w-8 h-8 text-red-600" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Flash Sales
                  </h2>
                  <p className="text-red-600 font-semibold">
                    Limited time offers - Grab them now!
                  </p>
                </div>
              </div>
              <Link
                href="/products"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                View All →
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

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
              <Link
                href="/products"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All →
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

      {/* Latest Arrivals */}
      {latestProducts.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                  ✨
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Latest Arrivals
                </h2>
              </div>
              <Link
                href="/products"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All →
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

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <FiTrendingUp className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Trending Now
                  </h2>
                  <p className="text-gray-600">Most popular products this month</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Nutracuiticals?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Authentic</h3>
              <p className="text-gray-600">
                All products are genuine and sourced from trusted manufacturers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔬
              </div>
              <h3 className="text-xl font-semibold mb-2">Lab Tested</h3>
              <p className="text-gray-600">
                Third-party tested for purity and potency
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                💰
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Match</h3>
              <p className="text-gray-600">
                Compare with Amazon & Flipkart prices instantly
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                📦
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                On all orders above ₹500
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <FiAward className="w-8 h-8 text-primary-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All →
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

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive deals, health tips, and
            new product launches
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

