'use client';

import React, { useState } from 'react';
import { FiX, FiPhone, FiMail, FiUser } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const { signInWithPhone, verifyOTP } = useAuth();
  const { trackLogin } = useAnalytics();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPhone(`+91${phoneNumber}`);
      setConfirmationResult(result);
      setStep('otp');
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await verifyOTP(confirmationResult, otp);
      trackLogin('phone');
      onClose();
    } catch (error: any) {
      setError(error.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'phone' ? 'Login to AXION SCIENTIFICS' : 'Verify OTP'}
          </h2>
          <p className="text-gray-600">
            {step === 'phone' 
              ? 'Enter your phone number to receive OTP' 
              : `OTP sent to +91${phoneNumber}`
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || phoneNumber.length !== 10}
              className="w-full bg-gradient-to-r from-purple-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-purple-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-purple-600 hover:text-purple-700 font-medium"
            >
              Change Phone Number
            </button>
          </form>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

