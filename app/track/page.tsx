'use client';

import React, { useState, useEffect } from 'react';
import { FiPackage, FiTruck, FiMapPin, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation';

interface TrackingData {
  tracking_id: string;
  status: string;
  current_location: string;
  estimated_delivery: string;
  timeline: Array<{
    status: string;
    location: string;
    timestamp: string;
    description: string;
  }>;
}

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setTrackingId(id);
      handleTrack();
    }
  }, [searchParams]);

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/orders?trackingId=${trackingId}`);
      const result = await response.json();

      if (result.success) {
        setTrackingData(result.tracking);
      } else {
        setError(result.error || 'Tracking failed');
      }
    } catch (error) {
      setError('Failed to track shipment');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <FiCheckCircle className="w-6 h-6 text-green-600" />;
      case 'out for delivery':
        return <FiTruck className="w-6 h-6 text-blue-600" />;
      case 'in transit':
        return <FiPackage className="w-6 h-6 text-purple-600" />;
      case 'picked up':
        return <FiMapPin className="w-6 h-6 text-orange-600" />;
      case 'failed':
        return <FiXCircle className="w-6 h-6 text-red-600" />;
      default:
        return <FiPackage className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800';
      case 'in transit':
        return 'bg-purple-100 text-purple-800';
      case 'picked up':
        return 'bg-orange-100 text-orange-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-gray-600">Enter your tracking ID to get real-time updates</p>
          </div>

          {/* Tracking Input */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking ID (e.g., TRK123456789)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Tracking...' : 'Track'}
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Current Status</h2>
                    <p className="text-gray-600">Tracking ID: {trackingData.tracking_id}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(trackingData.status)}`}>
                      {trackingData.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      {getStatusIcon(trackingData.status)}
                    </div>
                    <h3 className="font-semibold text-gray-900">Status</h3>
                    <p className="text-sm text-gray-600">{trackingData.status}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiMapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Current Location</h3>
                    <p className="text-sm text-gray-600">{trackingData.current_location}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiClock className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Estimated Delivery</h3>
                    <p className="text-sm text-gray-600">{trackingData.estimated_delivery}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking Timeline</h3>
                
                <div className="space-y-4">
                  {trackingData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          {getStatusIcon(event.status)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{event.status}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mt-1">{event.description}</p>
                        
                        {event.location && (
                          <div className="flex items-center gap-2 mt-2">
                            <FiMapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Support</h4>
                <p className="text-gray-600 mb-2">For any tracking issues or questions</p>
                <p className="text-purple-600 font-medium">+91 9876543210</p>
                <p className="text-purple-600 font-medium">support@axionscientifcs.com</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Common Issues</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Tracking ID not found</li>
                  <li>• Delivery delayed</li>
                  <li>• Package damaged</li>
                  <li>• Wrong address</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

