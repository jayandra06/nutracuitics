'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiDatabase, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function SeedPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      setChecking(true);
      const res = await fetch('/api/admin/seed');
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      setChecking(false);
    }
  };

  const handleSeed = async () => {
    if (!confirm('Are you sure you want to seed the production database? This will add sample products.')) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        checkStatus(); // Refresh status
      } else {
        toast.error(data.error || 'Failed to seed database');
      }
    } catch (error) {
      toast.error('Failed to seed database');
      console.error('Seed error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Database Seeding
        </h1>
        <p className="text-gray-600">
          Add sample products to your production database
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiDatabase className="w-6 h-6" />
          Database Status
        </h2>

        {checking ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Checking database...</p>
          </div>
        ) : status ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Total Products:</span>
              <span className="font-bold text-gray-900">{status.productCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-gray-700">In Inventory:</span>
              <span className="font-bold text-gray-900">{status.inventoryCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-gray-700">Featured Products:</span>
              <span className="font-bold text-gray-900">{status.featuredCount}</span>
            </div>
            
            {status.needsSeeding ? (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <FiAlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-yellow-800 mb-1">
                    Database is Empty
                  </p>
                  <p className="text-sm text-yellow-700">
                    Your production database has no products. Click the button below to add sample data.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <FiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-green-800 mb-1">
                    Database Has Products
                  </p>
                  <p className="text-sm text-green-700">
                    Your production database already contains products. Seeding is disabled to prevent duplicates.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Seed Button */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Seed Production Database
        </h2>
        <p className="text-gray-600 mb-6">
          This will add <strong>12 sample products</strong> to your production database including:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Vitamin C with Rose Hips (Flash Sale)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Zinc Picolinate (Flash Sale)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Turmeric Curcumin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Ashwagandha Extract</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Biotin Hair Growth</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Apple Cider Vinegar Gummies</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>CoQ10 Ubiquinol</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>B-Complex with B12</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Premium Omega-3 Fish Oil</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Whey Protein Isolate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>+ 2 more products</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> These products will be added to your production MongoDB database. 
            They will appear on your homepage in all sections (Featured, Flash Sales, Trending, etc.)
          </p>
        </div>

        <button
          onClick={handleSeed}
          disabled={loading || (status && !status.needsSeeding)}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            loading || (status && !status.needsSeeding)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Seeding Database...
            </>
          ) : (
            <>
              <FiDatabase className="w-5 h-5" />
              {status && !status.needsSeeding 
                ? 'Database Already Seeded' 
                : 'Seed Production Database'
              }
            </>
          )}
        </button>

        {status && !status.needsSeeding && (
          <p className="text-sm text-gray-500 mt-3 text-center">
            To reseed, first delete existing products from the Catalogue page
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          📋 Instructions
        </h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-bold text-primary-600">1.</span>
            <span>Click the &quot;Seed Production Database&quot; button above</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary-600">2.</span>
            <span>Wait for confirmation (takes 2-5 seconds)</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary-600">3.</span>
            <span>Visit your homepage to see all the products in different sections</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary-600">4.</span>
            <span>You can now add more products manually through the Catalogue page</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

