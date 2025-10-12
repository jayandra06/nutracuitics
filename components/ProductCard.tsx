'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiStar, FiHeart, FiExternalLink } from 'react-icons/fi';
import { SiAmazon, SiFlipkart } from 'react-icons/si';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import toast from 'react-hot-toast';

interface ProductLink {
  platform: 'amazon' | 'flipkart' | 'myntra' | 'nykaa' | '1mg' | 'pharmeasy' | 'healthkart' | 'bigbasket' | 'jiomart';
  url: string;
  price: number;
}

const platformConfig: { [key: string]: { name: string; color: string; icon?: any } } = {
  amazon: { name: 'Amazon', color: 'text-orange-600', icon: SiAmazon },
  flipkart: { name: 'Flipkart', color: 'text-blue-600', icon: SiFlipkart },
  myntra: { name: 'Myntra', color: 'text-pink-600' },
  nykaa: { name: 'Nykaa', color: 'text-pink-700' },
  '1mg': { name: '1mg', color: 'text-orange-500' },
  pharmeasy: { name: 'PharmEasy', color: 'text-teal-600' },
  healthkart: { name: 'HealthKart', color: 'text-red-600' },
  bigbasket: { name: 'BigBasket', color: 'text-green-600' },
  jiomart: { name: 'JioMart', color: 'text-blue-700' },
};

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    images: string[];
    ourPrice: number;
    productLinks: ProductLink[];
    averageRating?: number;
    totalReviews?: number;
    tags?: string[];
    stockLevel?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const isFlashSale = product.tags?.includes('flash-sale');
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.ourPrice,
      quantity: 1,
      image: product.images[0],
      slug: product.slug,
    });
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product._id);
      toast.success('Added to wishlist!');
    }
  };

  const isLowStock = product.stockLevel !== undefined && product.stockLevel > 0 && product.stockLevel <= 10;
  const isOutOfStock = product.stockLevel !== undefined && product.stockLevel === 0;
  
  // Get the lowest price platform for flash sale discount calculation
  const lowestExternalPrice = product.productLinks.length > 0 
    ? Math.min(...product.productLinks.map(link => link.price))
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      {/* Flash Sale Badge */}
      {isFlashSale && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
            <span>⚡</span>
            <span>FLASH SALE</span>
          </div>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-2 left-2 z-10 p-2 rounded-full shadow-lg transition-all ${
          inWishlist
            ? 'bg-red-500 text-white'
            : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
        }`}
      >
        <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
      </button>

      {/* Stock Badges */}
      {isOutOfStock && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold">
            OUT OF STOCK
          </div>
        </div>
      )}
      {isLowStock && !isFlashSale && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            ONLY {product.stockLevel} LEFT
          </div>
        </div>
      )}

      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 w-full">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {product.averageRating && product.totalReviews ? (
          <div className="flex items-center mb-3">
            <FiStar className="text-yellow-400 fill-yellow-400 w-4 h-4" />
            <span className="ml-1 text-sm text-gray-600">
              {product.averageRating.toFixed(1)} ({product.totalReviews} reviews)
            </span>
          </div>
        ) : null}

        <div className="mb-4">
          <div className="flex items-baseline space-x-2 mb-2">
            <div className="text-2xl font-bold text-primary-600">
              ₹{product.ourPrice.toFixed(2)}
            </div>
            {isFlashSale && lowestExternalPrice && lowestExternalPrice > product.ourPrice && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through">
                  ₹{lowestExternalPrice}
                </span>
                <span className="text-xs font-bold text-red-600">
                  Save {Math.round(((lowestExternalPrice - product.ourPrice) / lowestExternalPrice) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* External Platform Links */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {product.productLinks.slice(0, 3).map((link, index) => {
              const config = platformConfig[link.platform];
              const Icon = config?.icon;
              
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    {Icon ? (
                      <Icon className={`w-4 h-4 mr-2 ${config.color}`} />
                    ) : (
                      <FiExternalLink className={`w-4 h-4 mr-2 ${config?.color || 'text-gray-600'}`} />
                    )}
                    <span className="text-xs">{config?.name || link.platform}</span>
                  </div>
                  <span className="font-semibold text-xs">₹{link.price}</span>
                </a>
              );
            })}
            {product.productLinks.length > 3 && (
              <p className="text-xs text-gray-500 text-center">
                +{product.productLinks.length - 3} more platforms
              </p>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2 ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}

