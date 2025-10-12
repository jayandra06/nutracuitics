export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Nutracuiticals</h1>
        
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to Nutracuiticals - your trusted partner in health and wellness.
            We are committed to providing premium nutraceutical products that help
            you achieve your health goals.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Our mission is to make high-quality nutraceutical products accessible to everyone.
            We carefully curate our product selection to ensure that every item meets our
            stringent quality standards.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                All our products are tested and certified for quality and purity.
              </p>
            </div>
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Price Comparison</h3>
              <p className="text-gray-600">
                Compare prices across Amazon and Flipkart to get the best deals.
              </p>
            </div>
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our team is here to help you choose the right products for your needs.
              </p>
            </div>
            <div className="border-l-4 border-primary-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping to your doorstep.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Transparency in product sourcing and pricing</li>
            <li>Customer satisfaction as our top priority</li>
            <li>Continuous improvement and innovation</li>
            <li>Ethical business practices</li>
            <li>Environmental responsibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

