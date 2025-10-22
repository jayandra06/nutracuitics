'use client';

import React, { useState, useEffect } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiRefreshCw, FiEye, FiEdit, FiDownload, FiCalendar, FiMapPin } from 'react-icons/fi';

interface Order {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  gst: number;
  subtotal: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shipmentStatus: 'not_created' | 'created' | 'picked_up' | 'in_transit' | 'delivered' | 'failed';
  trackingId?: string;
  awbNumber?: string;
  courierName?: string;
  estimatedDelivery?: string;
  shippingCost: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

  const handleOrderAction = async (orderId: string, action: string) => {
    setActionLoading(orderId);
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          action,
        }),
      });

      const result = await response.json();
      if (result.success) {
        await fetchOrders(); // Refresh orders
        setSelectedOrder(result.order);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setActionLoading(null);
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
    <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600">Manage orders and shipments</p>
            </div>
            <button
              onClick={fetchOrders}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                          <div className="text-sm text-gray-500">{order.customer.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(order.total)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.trackingId ? (
                            <a
                              href={`/track?id=${order.trackingId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-700"
                            >
                              {order.trackingId}
                            </a>
                          ) : (
                            <span className="text-gray-500">Not created</span>
                          )}
                        </div>
                        {order.courierName && (
                          <div className="text-sm text-gray-500">{order.courierName}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          
                          {order.paymentStatus === 'paid' && order.shipmentStatus === 'not_created' && (
                            <button
                              onClick={() => handleOrderAction(order.id, 'create_shipment')}
                              disabled={actionLoading === order.id}
                              className="text-green-600 hover:text-green-700 disabled:opacity-50"
                            >
                              <FiTruck className="w-4 h-4" />
                            </button>
                          )}
                          
                          {order.status === 'pending' && order.paymentStatus === 'paid' && (
                            <button
                              onClick={() => handleOrderAction(order.id, 'confirm_payment')}
                              disabled={actionLoading === order.id}
                              className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                              title="Confirm Payment"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          
                          {order.trackingId && (
                            <button
                              onClick={() => window.open(`/track?id=${order.trackingId}`, '_blank')}
                              className="text-purple-600 hover:text-purple-700"
                              title="Track Shipment"
                            >
                              <FiMapPin className="w-4 h-4" />
                            </button>
                          )}
                          
                          {order.shipmentStatus === 'created' && (
                            <button
                              onClick={() => handleOrderAction(order.id, 'schedule_pickup')}
                              disabled={actionLoading === order.id}
                              className="text-orange-600 hover:text-orange-700 disabled:opacity-50"
                              title="Schedule Pickup"
                            >
                              <FiCalendar className="w-4 h-4" />
                            </button>
                          )}
                          
                          {order.shipmentStatus === 'created' && (
                            <button
                              onClick={() => handleOrderAction(order.id, 'generate_label')}
                              disabled={actionLoading === order.id}
                              className="text-green-600 hover:text-green-700 disabled:opacity-50"
                              title="Generate Label"
                            >
                              <FiDownload className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiXCircle className="w-6 h-6" />
                  </button>
        </div>

                <div className="p-6 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Name:</span> {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                        <p><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                        <p><span className="font-medium">Phone:</span> {selectedOrder.customer.phone}</p>
                        <p><span className="font-medium">Address:</span> {selectedOrder.customer.address}</p>
                        <p><span className="font-medium">City:</span> {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}</p>
            </div>
            </div>

                    {/* Order Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                        <p><span className="font-medium">Status:</span> 
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status}
                          </span>
                        </p>
                        <p><span className="font-medium">Payment:</span> 
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                            {selectedOrder.paymentStatus}
              </span>
                        </p>
                        <p><span className="font-medium">Total:</span> {formatPrice(selectedOrder.total)}</p>
                        <p><span className="font-medium">Created:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipment Info */}
                  {selectedOrder.trackingId && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><span className="font-medium">Tracking ID:</span> {selectedOrder.trackingId}</p>
                          <p><span className="font-medium">AWB Number:</span> {selectedOrder.awbNumber}</p>
                          <p><span className="font-medium">Courier:</span> {selectedOrder.courierName}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Estimated Delivery:</span> {selectedOrder.estimatedDelivery}</p>
                          <p><span className="font-medium">Shipping Cost:</span> {formatPrice(selectedOrder.shippingCost)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}