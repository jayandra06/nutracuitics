'use client';

import { useEffect, useState } from 'react';
import { FiTrendingUp, FiDollarSign, FiShoppingBag, FiUsers } from 'react-icons/fi';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    topProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/products?status=inventory'),
        fetch('/api/admin/users?role=customer'),
      ]);

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      const usersData = await usersRes.json();

      const orders = ordersData.orders || [];
      const revenue = orders.reduce(
        (sum: number, order: any) => sum + order.totalPrice,
        0
      );

      setStats({
        totalRevenue: revenue,
        totalOrders: orders.length,
        totalProducts: productsData.products?.length || 0,
        totalCustomers: usersData.users?.length || 0,
        recentOrders: orders.slice(0, 5),
        topProducts: (productsData.products || [])
          .sort((a: any, b: any) => b.averageRating - a.averageRating)
          .slice(0, 5),
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">₹{stats.totalRevenue.toFixed(0)}</p>
            </div>
            <FiDollarSign className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Orders</p>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <FiShoppingBag className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Total Products</p>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <FiTrendingUp className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">Total Customers</p>
              <p className="text-3xl font-bold">{stats.totalCustomers}</p>
            </div>
            <FiUsers className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          {stats.recentOrders.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order: any) => (
                <div
                  key={order._id}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-semibold text-sm">
                      Order #{order.orderNumber}
                    </p>
                    <p className="text-xs text-gray-600">
                      {format(new Date(order.createdAt), 'PP')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">
                      ₹{order.totalPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600 capitalize">
                      {order.orderStatus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Top Rated Products
          </h2>
          <div className="space-y-3">
            {stats.topProducts.map((product: any) => (
              <div
                key={product._id}
                className="flex justify-between items-center py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-sm">
                      {product.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">₹{product.ourPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

