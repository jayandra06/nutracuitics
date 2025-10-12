'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/orders');
    } else if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
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

  if (loading || status === 'loading') {
    return (
      <div className="container-custom py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No Orders Yet
          </h1>
          <p className="text-gray-600 mb-8">
            You haven&apos;t placed any orders yet. Start shopping!
          </p>
          <Link
            href="/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Order #{order.orderNumber}
                </h3>
                <p className="text-sm text-gray-600">
                  Placed on {format(new Date(order.createdAt), 'PPP')}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus.toUpperCase()}
                </span>
                <span className="text-xl font-bold text-primary-600">
                  ₹{order.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.name}
                    <br />
                    {order.shippingAddress.street}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.pincode}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Order Items</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item: any, index: number) => (
                      <li key={index}>
                        {item.name} x {item.quantity} - ₹{item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-600">
                  Payment: {order.paymentMethod} ({order.paymentStatus})
                </div>
                <Link
                  href={`/orders/${order._id}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

