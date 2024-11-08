import React from 'react';

interface DonationBrickProps {
  amount: number;
  onClick: () => void;
}

export function DonationBrick({ amount, onClick }: DonationBrickProps) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-4 bg-emerald-600 hover:bg-emerald-700 rounded-sm transition-colors duration-200"
      title={`$${amount.toLocaleString()} Donation`}
    />
  );
}