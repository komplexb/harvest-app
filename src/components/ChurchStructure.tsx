import React from 'react';
import { DonationBrick } from './DonationBrick';
import { DonationTier } from '../data/donations';
import { Cross } from 'lucide-react';

interface ChurchStructureProps {
  donationTiers: DonationTier[];
  onBrickClick: (amount: number) => void;
}

export function ChurchStructure({ donationTiers, onBrickClick }: ChurchStructureProps) {
  const renderTierBricks = (tier: DonationTier, index: number) => {
    return Array.from({ length: tier.required }).map((_, brickIndex) => (
      <DonationBrick
        key={`${index}-${brickIndex}`}
        filled={brickIndex < tier.received}
        amount={tier.amount}
        onClick={() => onBrickClick(tier.amount)}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Cross on top */}
      <div className="text-gray-700 mb-2">
        <Cross size={32} />
      </div>

      {/* Roof structure - triangle shape */}
      <div className="flex flex-col items-center">
        {[4, 3, 2, 1].map((count, idx) => (
          <div key={`roof-${idx}`} className="flex gap-1">
            {Array.from({ length: count }).map((_, brickIndex) => (
              <DonationBrick
                key={`roof-${idx}-${brickIndex}`}
                filled={donationTiers[0].received > (idx * 4 + brickIndex)}
                amount={donationTiers[0].amount}
                onClick={() => onBrickClick(donationTiers[0].amount)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* House walls structure */}
      <div className="flex flex-col gap-1 items-center mt-1">
        {donationTiers.slice(1).map((tier, index) => (
          <div key={index} className="flex gap-1 flex-wrap justify-center" style={{ maxWidth: '280px' }}>
            {renderTierBricks(tier, index)}
          </div>
        ))}
      </div>
    </div>
  );
}