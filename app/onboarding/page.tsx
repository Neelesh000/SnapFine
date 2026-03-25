'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isConnected) {
    router.push('/');
    return null;
  }

  const handleSave = async () => {
    if (!name || !email) return;
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSaving(false);
    router.push('/report');
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-400">
            Fill in your details to start reporting violations and earning rewards
          </p>
        </div>

        {/* Wallet Badge */}
        <div className="bg-gray-900 rounded-xl p-3 flex items-center gap-3">
          <span className="text-green-400 text-xl">✅</span>
          <div>
            <p className="text-gray-600 text-xs">Wallet Connected</p>
            <p className="text-gray-400 text-sm font-mono truncate">{address}</p>
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full bg-gray-900 text-gray-300 rounded-2xl p-4 border-2 border-gray-800 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-gray-900 text-gray-300 rounded-2xl p-4 border-2 border-gray-800 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full bg-gray-900 text-gray-300 rounded-2xl p-4 border-2 border-gray-800 focus:border-blue-500 outline-none"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            className="w-full bg-gray-900 text-gray-300 rounded-2xl p-4 border-2 border-gray-800 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!name || !email || saving}
          className={`w-full font-bold py-4 rounded-2xl text-lg transition-all ${
            !name || !email
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saving ? '⏳ Saving...' : '🚀 Start Reporting'}
        </button>

        <p className="text-gray-600 text-sm text-center pb-6">
          Your details are stored securely and never shared
        </p>

      </div>
    </main>
  );
}
