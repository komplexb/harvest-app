import React from 'react';

interface DonationControlsProps {
  onFamilySelect: (familySize: number) => void;
  totalBricks: number;
}

export function DonationControls({ onFamilySelect, totalBricks }: DonationControlsProps) {
  const familySizes = Array.from({ length: 10 }, (_, i) => i + 1);
  const MAX_BRICKS = 400;

  return (
    <div id="button-box" className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-8">
      <p className="text-lg text-[#4e665d] mb-4 text-center font-semibold">
        Select your family size
      </p>

      <div className="grid grid-cols-5 gap-4 mb-4">
        {familySizes.map(size => (
          <button
            key={size}
            onClick={() => onFamilySelect(size)}
            className="px-4 py-3 bg-[#4e665d] hover:bg-[#3d514a]
                     text-white text-lg font-semibold rounded-lg transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            disabled={totalBricks + size > MAX_BRICKS}
          >
            {size}
          </button>
        ))}
      </div>

      {totalBricks >= MAX_BRICKS && (
        <div className="mt-4 text-center text-[#4e665d] font-semibold">
          🎉 Church is full! Thank you for your support!
        </div>
      )}
    </div>
  );
}
