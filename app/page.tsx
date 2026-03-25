'use client';

import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
    router.push('/onboarding');
    }
  }, [isConnected]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col items-center gap-8">
        <div className="text-8xl">📸</div>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-3">SnapFine</h1>
          <p className="text-gray-400 text-lg">Spot a violation. Snap it. Earn crypto.</p>
        </div>
        <div className="w-full bg-gray-900 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-white font-semibold text-lg">How it works</h2>
          <div className="flex items-center gap-4">
            <span className="text-2xl">📍</span>
            <p className="text-gray-400">Spot a public rule violation</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">📸</span>
            <p className="text-gray-400">Snap a photo with location proof</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">⛓️</span>
            <p className="text-gray-400">Report gets verified on Base blockchain</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">💰</span>
            <p className="text-gray-400">Earn crypto rewards instantly</p>
          </div>
        </div>
        <button
          onClick={() => connect({ connector: injected() })}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200"
        >
          Connect Wallet to Start
        </button>
        <p className="text-gray-600 text-sm">Running on Base Sepolia Testnet</p>
      </div>
    </main>
  );
}