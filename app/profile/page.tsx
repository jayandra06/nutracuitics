'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiPackage, FiHeart, FiSettings } from 'react-icons/fi';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistItems: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/profile');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="container-custom py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary-100 text-primary-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="text-xl font-bold text-center mb-2">
              {session.user.name}
            </h2>
            <p className="text-gray-600 text-center text-sm mb-4">
              {session.user.email}
            </p>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Role:</span>{' '}
                <span className="capitalize">{session.user.role}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link
              href="/orders"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <FiPackage className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">My Orders</h3>
                  <p className="text-gray-600 text-sm">View order history</p>
                </div>
              </div>
            </Link>

            <Link
              href="/wishlist"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                  <FiHeart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">My Wishlist</h3>
                  <p className="text-gray-600 text-sm">Saved items</p>
                </div>
              </div>
            </Link>

            <Link
              href="/cart"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                  <FiUser className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Shopping Cart</h3>
                  <p className="text-gray-600 text-sm">Review cart items</p>
                </div>
              </div>
            </Link>

            {session.user.role === 'admin' && (
              <Link
                href="/admin"
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                    <FiSettings className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Admin Panel</h3>
                    <p className="text-gray-600 text-sm">Manage store</p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={session.user.name || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={session.user.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <p className="text-sm text-gray-500">
                To update your information, please contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

