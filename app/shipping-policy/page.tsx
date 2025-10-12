export default function ShippingPolicyPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Shipping Policy
        </h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            1. Shipping Methods
          </h2>
          <p className="text-gray-700 mb-4">
            We offer standard and express shipping options. Shipping costs are calculated
            based on your location and the weight of your order.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            2. Processing Time
          </h2>
          <p className="text-gray-700 mb-4">
            Orders are typically processed within 1-2 business days. You will receive a
            tracking number once your order has been shipped.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            3. Delivery Time
          </h2>
          <p className="text-gray-700 mb-4">
            Standard shipping: 5-7 business days<br />
            Express shipping: 2-3 business days
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            4. Free Shipping
          </h2>
          <p className="text-gray-700 mb-4">
            We offer free standard shipping on all orders over ₹500 within India.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            5. International Shipping
          </h2>
          <p className="text-gray-700 mb-4">
            We currently ship within India only. International shipping will be available soon.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            6. Tracking Your Order
          </h2>
          <p className="text-gray-700 mb-4">
            Once your order ships, you will receive an email with tracking information.
            You can also track your order by logging into your account.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            7. Contact Us
          </h2>
          <p className="text-gray-700">
            For shipping inquiries, please email support@nutracuiticals.com or
            call +91 1800-123-4567.
          </p>
        </div>
      </div>
    </div>
  );
}

