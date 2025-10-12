'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { FiHome, FiPackage, FiShoppingBag, FiSettings, FiUsers, FiShoppingCart, FiTag, FiBarChart, FiLogOut, FiGlobe } from 'react-icons/fi';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Don't apply admin layout to login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: FiHome },
    { href: '/admin/catalogue', label: 'Catalogue', icon: FiPackage },
    { href: '/admin/inventory', label: 'Inventory', icon: FiShoppingBag },
    { href: '/admin/orders', label: 'Orders', icon: FiShoppingCart },
    { href: '/admin/coupons', label: 'Coupons', icon: FiTag },
    { href: '/admin/analytics', label: 'Analytics', icon: FiBarChart },
    { href: '/admin/users', label: 'Users', icon: FiUsers },
    { href: '/admin/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          {session?.user && (
            <div className="mt-3 text-sm">
              <p className="text-gray-400">Logged in as:</p>
              <p className="text-white font-semibold truncate">{session.user.email}</p>
            </div>
          )}
        </div>
        <nav className="px-4 py-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition"
          >
            <FiGlobe className="w-5 h-5" />
            <span>View Website</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-900 rounded-lg transition"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}

