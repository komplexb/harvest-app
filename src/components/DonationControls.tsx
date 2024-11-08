import React, { useState } from 'react';

interface DonationControlsProps {
  onDonate: (amount: number) => void;
  currentAmount: number;
  goalAmount: number;
}

export function DonationControls({ onDonate, currentAmount, goalAmount }: DonationControlsProps) {
  const [customAmount, setCustomAmount] = useState('');

  const donationAmounts = [
    100000, 75000, 50000, 30000, 20000, 10000,
    8000, 5000, 3000, 1000
  ];

  const progress = (currentAmount / goalAmount) * 100;

  const handleCustomDonation = () => {
    const amount = parseFloat(customAmount.replace(/[^0-9.]/g, ''));
    if (amount > 0) {
      onDonate(amount);
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setCustomAmount(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomDonation();
    }
  };

  return (
    <div id="button-box" className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      {/* <div id="progress-bar" className="mb-6">
        <div className="flex justify-between text-sm text-[#4e665d] mb-2">
          <span>${currentAmount.toLocaleString()}</span>
          <span>${goalAmount.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f4a261] transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div> */}

      <div className="grid grid-cols-2 gap-3 mb-4">
        {donationAmounts.map(amount => (
          <button
            key={amount}
            onClick={() => onDonate(amount)}
            className="px-4 py-2 bg-[#4e665d] hover:bg-[#3d514a]
                   text-white font-semibold rounded-lg transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentAmount >= goalAmount}
          >
            ${amount.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter amount"
            className="w-full px-8 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-[#4e665d] focus:border-transparent outline-none"
            disabled={currentAmount >= goalAmount}
          />
        </div>
        <button
          onClick={handleCustomDonation}
          disabled={!customAmount || currentAmount >= goalAmount}
          className="px-4 py-2 bg-[#4e665d] hover:bg-[#3d514a]
                   text-white font-semibold rounded-lg transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Donate
        </button>
      </div>

      {currentAmount >= goalAmount && (
        <div className="mt-4 text-center text-[#4e665d] font-semibold">
          🎉 Goal reached! Thank you for your support!
        </div>
      )}
    </div>
  );
}