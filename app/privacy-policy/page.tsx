export default function PrivacyPolicyPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information you provide directly to us, such as when you create an account,
            place an order, or contact us for support. This may include your name, email address,
            phone number, shipping address, and payment information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to process your orders, communicate with you,
            improve our services, and comply with legal obligations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            3. Information Sharing
          </h2>
          <p className="text-gray-700 mb-4">
            We do not sell or rent your personal information to third parties. We may share
            your information with service providers who assist us in operating our platform.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            4. Data Security
          </h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate security measures to protect your personal information
            from unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            5. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at
            support@nutracuiticals.com
          </p>
        </div>
      </div>
    </div>
  );
}

