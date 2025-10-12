export default function RefundPolicyPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund Policy</h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            1. Return Window
          </h2>
          <p className="text-gray-700 mb-4">
            You may return most items within 30 days of delivery for a full refund.
            Products must be unused and in their original packaging.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            2. Non-Returnable Items
          </h2>
          <p className="text-gray-700 mb-4">
            Certain items cannot be returned, including opened supplements, personalized products,
            and items marked as final sale.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            3. Refund Process
          </h2>
          <p className="text-gray-700 mb-4">
            Once we receive your return, we will inspect it and process your refund within
            5-7 business days. Refunds will be issued to your original payment method.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            4. Damaged or Defective Items
          </h2>
          <p className="text-gray-700 mb-4">
            If you receive a damaged or defective item, please contact us immediately at
            support@nutracuiticals.com with photos of the damage.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            5. Contact Us
          </h2>
          <p className="text-gray-700">
            For questions about returns or refunds, please email support@nutracuiticals.com
            or call +91 1800-123-4567.
          </p>
        </div>
      </div>
    </div>
  );
}

