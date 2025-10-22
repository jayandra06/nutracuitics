'use client';

import React, { useState } from 'react';
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, getGSTAmount, getFinalTotal } = useCart();
  const { trackAddToCart, trackRemoveFromCart, trackBeginCheckout } = useAnalytics();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
      >
        <FiShoppingCart className="w-5 h-5" />
        <span>Cart</span>
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some products to get started</p>
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-purple-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-green-700 transition-all"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={item.image || '/placeholder-product.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-lg font-bold text-purple-600">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            updateQuantity(item._id, item.quantity - 1);
                            trackRemoveFromCart(item._id, item.name, item.category || 'General', item.price);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => {
                            updateQuantity(item._id, item.quantity + 1);
                            trackAddToCart(item._id, item.name, item.category || 'General', item.price);
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          removeItem(item._id);
                          trackRemoveFromCart(item._id, item.name, item.category || 'General', item.price);
                        }}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Summary */}
            {items.length > 0 && (
              <div className="border-t p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%):</span>
                    <span className="font-semibold">{formatPrice(getGSTAmount())}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-purple-600">{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Continue Shopping
                  </button>
                  <Link
                    href="/checkout"
                    onClick={() => {
                      setIsOpen(false);
                      trackBeginCheckout(getFinalTotal(), 'INR', items.map(item => ({
                        item_id: item._id,
                        item_name: item.name,
                        item_category: item.category || 'General',
                        price: item.price,
                        quantity: item.quantity,
                      })));
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-green-700 transition-all text-center"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

