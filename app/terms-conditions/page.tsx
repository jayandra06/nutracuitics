export default function TermsAndConditionsPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms & Conditions
        </h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 mb-4">
            By accessing and using Nutracuiticals, you accept and agree to be bound by
            the terms and provisions of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            2. Use of Platform
          </h2>
          <p className="text-gray-700 mb-4">
            You agree to use this platform only for lawful purposes and in a way that does
            not infringe the rights of others or restrict their use of the platform.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            3. Product Information
          </h2>
          <p className="text-gray-700 mb-4">
            We strive to provide accurate product information. However, we do not warrant
            that product descriptions or other content is accurate, complete, or error-free.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            4. Pricing
          </h2>
          <p className="text-gray-700 mb-4">
            All prices are subject to change without notice. We reserve the right to modify
            or discontinue products at any time.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            Nutracuiticals shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of the platform.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            6. Contact Information
          </h2>
          <p className="text-gray-700">
            For questions about these Terms & Conditions, please contact us at
            support@nutracuiticals.com
          </p>
        </div>
      </div>
    </div>
  );
}

