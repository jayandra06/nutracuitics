'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({
    tax: { gstRate: 18, enabled: true },
    shipping: {
      freeShippingThreshold: 500,
      standardShippingCost: 50,
      expressShippingCost: 150,
      enabled: true,
    },
    policies: {
      privacyPolicy: '',
      refundPolicy: '',
      termsAndConditions: '',
      shippingPolicy: '',
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to update settings');

      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tax Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tax Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={settings.tax.gstRate}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    tax: {
                      ...settings.tax,
                      gstRate: parseFloat(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 mt-8">
                <input
                  type="checkbox"
                  checked={settings.tax.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      tax: { ...settings.tax, enabled: e.target.checked },
                    })
                  }
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable GST
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Shipping Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                min="0"
                value={settings.shipping.freeShippingThreshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      freeShippingThreshold: parseFloat(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Standard Shipping Cost (₹)
              </label>
              <input
                type="number"
                min="0"
                value={settings.shipping.standardShippingCost}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      standardShippingCost: parseFloat(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Express Shipping Cost (₹)
              </label>
              <input
                type="number"
                min="0"
                value={settings.shipping.expressShippingCost}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      expressShippingCost: parseFloat(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.shipping.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  shipping: {
                    ...settings.shipping,
                    enabled: e.target.checked,
                  },
                })
              }
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Enable Shipping
            </span>
          </label>
        </div>

        {/* Policies */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Policies</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Privacy Policy
              </label>
              <textarea
                value={settings.policies?.privacyPolicy || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    policies: {
                      ...settings.policies,
                      privacyPolicy: e.target.value,
                    },
                  })
                }
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refund Policy
              </label>
              <textarea
                value={settings.policies?.refundPolicy || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    policies: {
                      ...settings.policies,
                      refundPolicy: e.target.value,
                    },
                  })
                }
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Terms & Conditions
              </label>
              <textarea
                value={settings.policies?.termsAndConditions || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    policies: {
                      ...settings.policies,
                      termsAndConditions: e.target.value,
                    },
                  })
                }
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Policy
              </label>
              <textarea
                value={settings.policies?.shippingPolicy || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    policies: {
                      ...settings.policies,
                      shippingPolicy: e.target.value,
                    },
                  })
                }
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

