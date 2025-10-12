'use client';

import { useEffect, useState } from 'react';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    catalogueProducts: 0,
    inventoryProducts: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, usersRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/users'),
      ]);

      const productsData = await productsRes.json();
      const usersData = await usersRes.json();

      const products = productsData.products || [];
      const catalogueCount = products.filter((p: any) => p.status === 'catalogue').length;
      const inventoryCount = products.filter((p: any) => p.status === 'inventory').length;

      setStats({
        totalProducts: products.length,
        catalogueProducts: catalogueCount,
        inventoryProducts: inventoryCount,
        totalUsers: usersData.users?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FiPackage,
      color: 'bg-blue-500',
    },
    {
      title: 'Catalogue Products',
      value: stats.catalogueProducts,
      icon: FiPackage,
      color: 'bg-yellow-500',
    },
    {
      title: 'Inventory Products',
      value: stats.inventoryProducts,
      icon: FiShoppingBag,
      color: 'bg-green-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2">
            <a
              href="/admin/catalogue"
              className="block px-4 py-3 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition"
            >
              Add New Product
            </a>
            <a
              href="/admin/inventory"
              className="block px-4 py-3 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition"
            >
              Manage Inventory
            </a>
            <a
              href="/admin/settings"
              className="block px-4 py-3 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition"
            >
              Update Settings
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            System Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Platform</span>
              <span className="font-semibold">Nutracuiticals</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-semibold">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Environment</span>
              <span className="font-semibold">
                {process.env.NODE_ENV || 'development'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

