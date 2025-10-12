'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      fetchOrder();
    }
  }, [status, router]);

  const fetchOrder = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      const foundOrder = data.orders?.find((o: any) => o._id === params.id);
      setOrder(foundOrder);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FiPackage className="w-6 h-6" />;
      case 'processing':
        return <FiPackage className="w-6 h-6" />;
      case 'shipped':
        return <FiTruck className="w-6 h-6" />;
      case 'delivered':
        return <FiCheckCircle className="w-6 h-6" />;
      default:
        return <FiPackage className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="container-custom py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Not Found
          </h1>
          <Link
            href="/orders"
            className="text-primary-600 hover:text-primary-700"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Link
        href="/orders"
        className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
      >
        ← Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order #{order.orderNumber}
            </h1>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${getStatusColor(order.orderStatus)}`}>
            <div className="flex items-center space-x-2">
              {getStatusIcon(order.orderStatus)}
              <span className="font-semibold capitalize">{order.orderStatus}</span>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
              const currentIndex = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.orderStatus);
              const isActive = index <= currentIndex;
              return (
                <div key={status} className="flex-1 flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`flex-1 h-1 ${
                        isActive ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-600 capitalize">Pending</span>
            <span className="text-xs text-gray-600 capitalize">Processing</span>
            <span className="text-xs text-gray-600 capitalize">Shipped</span>
            <span className="text-xs text-gray-600 capitalize">Delivered</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-4 pb-4 border-b last:border-0"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">
                    Total: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-3">Shipping Address</h3>
            <div className="text-gray-600 text-sm space-y-1">
              <p className="font-semibold text-gray-900">
                {order.shippingAddress.name}
              </p>
              <p>{order.shippingAddress.email}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.pincode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Payment Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">
                  ₹{order.itemsPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold">
                  ₹{order.shippingPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (GST):</span>
                <span className="font-semibold">
                  ₹{order.taxPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary-600">
                  ₹{order.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>Payment Method:</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Payment Status:</span>
                <span
                  className={`font-semibold ${
                    order.paymentStatus === 'completed'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

