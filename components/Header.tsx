'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiChevronDown, FiHeart } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const wishlistItems = useWishlistStore((state) => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-600">
              Nutracuiticals
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition">
                <span>Categories</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  href="/products"
                  className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-semibold border-b"
                >
                  All Products
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${category}`}
                    className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{categoryIcons[category] || '📦'}</span>
                      <span>{category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/products"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              All Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative text-gray-700 hover:text-red-500 transition"
            >
              <FiHeart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-primary-600 transition"
            >
              <FiShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition">
                  <FiUser className="w-6 h-6" />
                  <span className="hidden md:block">{session.user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  >
                    My Wishlist
                    {wishlistItems.length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                  {session.user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 flex items-center space-x-2"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Categories - Mobile */}
              <div>
                <div className="text-gray-700 font-semibold py-2 border-b">
                  Categories
                </div>
                <div className="pl-4 pt-2 space-y-1">
                  <Link
                    href="/products"
                    className="block text-gray-600 hover:text-primary-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${category}`}
                      className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{categoryIcons[category] || '📦'}</span>
                      <span>{category}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className="text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

