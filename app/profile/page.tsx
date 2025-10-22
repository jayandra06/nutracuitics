'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FiUser, FiPhone, FiMail, FiMapPin, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

interface Order {
  id: string;
  items: any[];
  customer: any;
  total: number;
  gst: number;
  subtotal: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  trackingNumber?: string;
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const result = await response.json();
      if (result.success) {
        setOrders(result.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5" />;
      case 'shipped':
        return <FiTruck className="w-5 h-5" />;
      default:
        return <FiPackage className="w-5 h-5" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile</p>
          <Link
            href="/"
            className="bg-gradient-to-r from-purple-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-green-700 transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUser className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Welcome back!</h2>
                  <p className="text-gray-600">{user.phoneNumber || user.email}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{user.phoneNumber || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{user.email || 'Not provided'}</span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Order History */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                    <Link
                      href="/products"
                      className="bg-gradient-to-r from-purple-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-green-700 transition-all"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <p className="text-lg font-bold text-purple-600 mt-1">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {item.name} x {item.quantity}
                              </span>
                              <span className="font-medium">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            {getStatusIcon(order.status)}
                            <span>
                              {order.status === 'delivered' && 'Delivered'}
                              {order.status === 'shipped' && 'Shipped'}
                              {order.status === 'confirmed' && 'Confirmed'}
                              {order.status === 'pending' && 'Processing'}
                            </span>
                            {order.trackingId && (
                              <a
                                href={`/track?id=${order.trackingId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 text-purple-600 hover:text-purple-700 font-medium"
                              >
                                Track: {order.trackingId}
                              </a>
                            )}
                          </div>
                          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}