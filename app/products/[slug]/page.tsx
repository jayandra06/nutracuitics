'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FiShoppingCart, FiStar, FiExternalLink } from 'react-icons/fi';
import { SiAmazon, SiFlipkart } from 'react-icons/si';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import ProductCard from '@/components/ProductCard';

const platformConfig: { [key: string]: { name: string; color: string; bgColor: string; icon?: any } } = {
  amazon: { name: 'Amazon', color: 'text-orange-600', bgColor: 'bg-orange-50 hover:bg-orange-100', icon: SiAmazon },
  flipkart: { name: 'Flipkart', color: 'text-blue-600', bgColor: 'bg-blue-50 hover:bg-blue-100', icon: SiFlipkart },
  myntra: { name: 'Myntra', color: 'text-pink-600', bgColor: 'bg-pink-50 hover:bg-pink-100' },
  nykaa: { name: 'Nykaa', color: 'text-pink-700', bgColor: 'bg-pink-50 hover:bg-pink-100' },
  '1mg': { name: '1mg', color: 'text-orange-500', bgColor: 'bg-orange-50 hover:bg-orange-100' },
  pharmeasy: { name: 'PharmEasy', color: 'text-teal-600', bgColor: 'bg-teal-50 hover:bg-teal-100' },
  healthkart: { name: 'HealthKart', color: 'text-red-600', bgColor: 'bg-red-50 hover:bg-red-100' },
  bigbasket: { name: 'BigBasket', color: 'text-green-600', bgColor: 'bg-green-50 hover:bg-green-100' },
  jiomart: { name: 'JioMart', color: 'text-blue-700', bgColor: 'bg-blue-50 hover:bg-blue-100' },
};

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: session } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [reviewLoading, setReviewLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.slug}`);
      const data = await res.json();
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        _id: product._id,
        name: product.name,
        price: product.ourPrice,
        quantity: 1,
        image: product.images[0],
        slug: product.slug,
      });
      toast.success('Added to cart!');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Please login to submit a review');
      return;
    }

    setReviewLoading(true);
    try {
      const res = await fetch(`/api/products/${params.slug}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to submit review');
        return;
      }

      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      setReviewData({ rating: 5, comment: '' });
      fetchProduct();
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="relative h-96 md:h-[500px] mb-4 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-primary-600'
                      : 'border-gray-200'
                  }`}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          {product.averageRating && product.totalReviews ? (
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.averageRating.toFixed(1)} ({product.totalReviews}{' '}
                reviews)
              </span>
            </div>
          ) : null}

          <div className="text-4xl font-bold text-primary-600 mb-6">
            ₹{product.ourPrice.toFixed(2)}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* External Platform Links */}
          {product.productLinks && product.productLinks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Compare Prices ({product.productLinks.length} platforms)
              </h3>
              <div className="space-y-3">
                {product.productLinks.map((link: any, index: number) => {
                  const config = platformConfig[link.platform];
                  const Icon = config?.icon;
                  
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-4 rounded-lg transition ${config?.bgColor || 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        {Icon ? (
                          <Icon className={`w-6 h-6 mr-3 ${config.color}`} />
                        ) : (
                          <FiExternalLink className={`w-6 h-6 mr-3 ${config?.color || 'text-gray-600'}`} />
                        )}
                        <span className="font-semibold">Buy from {config?.name || link.platform}</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{link.price}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2 text-lg font-semibold"
          >
            <FiShoppingCart className="w-6 h-6" />
            <span>Add to Cart</span>
          </button>

          {product.stockLevel !== undefined && (
            <p className="mt-4 text-sm text-gray-600">
              {product.stockLevel > 0
                ? `${product.stockLevel} in stock`
                : 'Out of stock'}
            </p>
          )}
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Specifications
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec: any, index: number) => (
                <div
                  key={index}
                  className="flex border-b border-gray-200 pb-3"
                >
                  <span className="font-semibold text-gray-700 w-1/2">
                    {spec.key}:
                  </span>
                  <span className="text-gray-600 w-1/2">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      {product.detailedDescription && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Description
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 whitespace-pre-line">
              {product.detailedDescription}
            </p>
          </div>
        </div>
      )}

      {/* FAQs */}
      {product.faqs && product.faqs.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
          <div className="bg-white rounded-lg shadow divide-y">
            {product.faqs.map((faq: any, index: number) => (
              <div key={index} className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Customer Reviews
            {product.reviews && product.reviews.length > 0 && (
              <span className="text-lg text-gray-500 ml-2">
                ({product.reviews.length})
              </span>
            )}
          </h2>
          {session && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="bg-white rounded-lg shadow p-6 mb-6"
          >
            <h3 className="font-semibold mb-4">Write Your Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewData({ ...reviewData, rating: star })}
                    className="focus:outline-none"
                  >
                    <FiStar
                      className={`w-8 h-8 ${
                        star <= reviewData.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Share your experience with this product..."
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={reviewLoading}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {reviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{review.userName}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>

      {/* Frequently Bought With */}
      {product.frequentlyBoughtWith &&
        product.frequentlyBoughtWith.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Bought Together
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.frequentlyBoughtWith.map((item: any) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

