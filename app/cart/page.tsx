'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to get started!
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
            >
              <Link href={`/products/${item.slug}`}>
                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="flex-grow">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-primary-600">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-primary-600 font-bold">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-900">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ₹{getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {getTotalPrice() > 500 ? 'FREE' : '₹50.00'}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>GST (18%)</span>
                <span>₹{(getTotalPrice() * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary-600">
                  ₹
                  {(
                    getTotalPrice() * 1.18 +
                    (getTotalPrice() > 500 ? 0 : 50)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition block text-center font-semibold"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="w-full mt-3 border-2 border-primary-600 text-primary-600 py-3 px-6 rounded-lg hover:bg-primary-50 transition block text-center font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

