'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiChevronDown, FiHeart, FiPackage } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';
import Cart from './Cart';

export default function Header() {
  const { data: session } = useSession();
  const { user, logout } = useAuth();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const wishlistItems = useWishlistStore((state) => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/products?status=inventory');
      const data = await res.json();
      const uniqueCategories = Array.from(
        new Set((data.products || []).map((p: any) => p.category))
      );
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const categoryIcons: { [key: string]: string } = {
    'Vitamins': '💊',
    'Supplements': '🌿',
    'Minerals': '⚡',
    'Probiotics': '🦠',
    'Protein': '💪',
    'Herbs': '🍃',
  };

  return (
    <>
    <header className="bg-gradient-to-r from-purple-900 to-green-800 shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="text-4xl font-bold text-white flex items-center">
                <span>AXI</span>
                <div className="relative mx-2">
                  <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute w-8 h-8 border border-white rounded-full opacity-60"></div>
                    <div className="absolute w-10 h-10 border border-white rounded-full opacity-40"></div>
                  </div>
                </div>
                <span>N</span>
              </div>
              <div className="text-sm font-bold text-blue-200 uppercase tracking-wider">
                SCIENTIFICS
              </div>
              <div className="w-full h-0.5 bg-purple-300 mt-1"></div>
              <div className="text-xs text-gray-200 mt-1">
                Empowered by Science || Innovative in Solutions
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-yellow-300 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-yellow-300 transition font-medium"
            >
              About Us
            </Link>
            <Link
              href="/products"
              className="text-white hover:text-yellow-300 transition font-medium"
            >
              Products
            </Link>
            <Link
              href="/scientific-edge"
              className="text-white hover:text-yellow-300 transition font-medium"
            >
              Scientific Edge
            </Link>
            <Link
              href="/testimonials"
              className="text-white hover:text-yellow-300 transition font-medium"
            >
              Testimonials
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Login/Profile */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                >
                  <FiUser className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                >
                  <FiPackage className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <FiUser className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}

            {/* Cart */}
            <Cart />

            {/* Get In Touch Button */}
            <Link
              href="/contact"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Get In Touch
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-white hover:text-yellow-300 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-yellow-300 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-yellow-300 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/scientific-edge"
                className="text-white hover:text-yellow-300 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Scientific Edge
              </Link>
              <Link
                href="/testimonials"
                className="text-white hover:text-yellow-300 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-yellow-300 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>

    {/* Login Modal */}
    <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
  </>
  );
}

