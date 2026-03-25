'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

const violations = [
  { id: 1, emoji: '🚦', label: 'Signal jumping' },
  { id: 2, emoji: '🦓', label: 'Zebra crossing violation' },
  { id: 3, emoji: '⛑️', label: 'No helmet' },
  { id: 4, emoji: '🚫', label: 'Wrong side driving' },
  { id: 5, emoji: '🔥', label: 'Blocked fire exit' },
  { id: 6, emoji: '⚠️', label: 'Unsafe event' },
];

export default function ReportPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [selectedViolation, setSelectedViolation] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isConnected) {
    router.push('/');
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedViolation || !image) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">
          <div className="text-8xl">🎉</div>
          <h1 className="text-4xl font-bold text-white">Report Submitted!</h1>
          <p className="text-gray-400 text-lg">Your report is being verified on Base blockchain.</p>
          <div className="w-full bg-gray-900 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">Estimated reward</p>
            <p className="text-4xl font-bold text-green-400">+0.01 ETH</p>
            <p className="text-gray-600 text-sm mt-2">Paid after verification</p>
          </div>
          <div className="w-full bg-gray-900 rounded-2xl p-4">
            <p className="text-gray-600 text-xs">Submitted by</p>
            <p className="text-gray-400 text-sm font-mono">{address}</p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setImage(null);
              setSelectedViolation(null);
              setDescription('');
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-lg transition-all"
          >
            Submit Another Report
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center p-6 pt-10">
      <div className="max-w-md w-full flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Report Violation</h1>
          <span className="text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">
            Connected
          </span>
        </div>

        {/* Wallet address */}
        <div className="bg-gray-900 rounded-xl p-3">
          <p className="text-gray-600 text-xs">Wallet</p>
          <p className="text-gray-400 text-sm font-mono truncate">{address}</p>
        </div>

        {/* Upload Photo */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Upload Evidence Photo</label>
          <label className="w-full cursor-pointer">
            <div className="w-full h-48 bg-gray-900 rounded-2xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center hover:border-blue-500 transition-all">
              {image ? (
                <img src={image} alt="evidence" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <span className="text-4xl mb-2">📸</span>
                  <span className="text-gray-400">Tap to upload photo</span>
                  <span className="text-gray-600 text-sm">JPG, PNG supported</span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Violation Type */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Select Violation Type</label>
          <div className="grid grid-cols-2 gap-3">
            {violations.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedViolation(v.id)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  selectedViolation === v.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-800 bg-gray-900 hover:border-gray-600'
                }`}
              >
                <span className="text-2xl">{v.emoji}</span>
                <span className="text-gray-300 text-sm text-center">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what happened..."
            className="w-full bg-gray-900 text-gray-300 rounded-2xl p-4 border-2 border-gray-800 focus:border-blue-500 outline-none resize-none h-24"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedViolation || !image || submitting}
          className={`w-full font-bold py-4 rounded-2xl text-lg transition-all ${
            !selectedViolation || !image
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {submitting ? '⏳ Submitting to blockchain...' : '🚨 Submit Report'}
        </button>

        <p className="text-gray-600 text-sm text-center pb-6">
          Reports are stored on IPFS and verified on Base Sepolia
        </p>

      </div>
    </main>
  );
}