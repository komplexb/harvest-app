import React from 'react';
import { DonationTier } from '../types/donations';

interface DonationStatsProps {
  donations: DonationTier[];
}

export function DonationStats({ donations }: DonationStatsProps) {
  const totalAmount = donations.reduce((sum, tier) => 
    sum + (tier.amount * tier.count), 0
  );

  const totalBricks = donations.reduce((sum, tier) => 
    sum + tier.count, 0
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Donation Progress</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Donations</p>
            <p className="text-2xl font-bold text-emerald-600">
              ${totalAmount.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Bricks Placed</p>
            <p className="text-2xl font-bold text-emerald-600">
              {totalBricks}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {donations.map((tier, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">${tier.amount} Donations:</span>
              <span className="font-medium">{tier.count} bricks</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}