'use client';

import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Verified Customer',
    rating: 5,
    comment: 'Excellent quality products! I love the price comparison feature. Saved a lot on my recent order.',
    image: '👩',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Verified Customer',
    rating: 5,
    comment: 'Fast delivery and authentic products. The Omega-3 supplement is of great quality. Highly recommended!',
    image: '👨',
  },
  {
    name: 'Anita Desai',
    role: 'Verified Customer',
    rating: 5,
    comment: 'Amazing customer service and the products are genuine. The flash sales are incredible!',
    image: '👩‍💼',
  },
  {
    name: 'Vikram Singh',
    role: 'Verified Customer',
    rating: 4,
    comment: 'Good range of products and competitive pricing. Website is easy to navigate.',
    image: '👨‍💼',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their health
            and wellness needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">{testimonial.image}</div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm italic">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                👤
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                👤
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                👤
              </div>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">5,000+ Happy Customers</p>
              <p className="text-xs text-gray-600">Trusted by wellness enthusiasts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

