import React from 'react';
import { DonationBrick } from './DonationBrick';
import { DonationTier } from '../types/donations';
import { Cross } from 'lucide-react';

interface HouseStructureProps {
  donations: DonationTier[];
  onBrickClick: (amount: number) => void;
}

export function HouseStructure({ donations, onBrickClick }: HouseStructureProps) {
  const totalBricks = donations.reduce((sum, tier) => sum + tier.count, 0);
  const bricks = Array.from({ length: totalBricks });
  
  // Calculate dimensions
  const baseWidth = 10; // Number of bricks in base
  const height = Math.ceil(totalBricks / baseWidth) + 4; // Add 4 rows for roof
  const rows = Array.from({ length: height });

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Cross */}
      <div className="text-gray-700 mb-2">
        <Cross size={32} />
      </div>

      {/* Roof */}
      <div className="flex flex-col items-center">
        {[4, 3, 2, 1].map((count, idx) => (
          <div key={`roof-${idx}`} className="flex gap-1">
            {Array.from({ length: count }).map((_, i) => (
              <DonationBrick
                key={`roof-${idx}-${i}`}
                amount={donations[0].amount}
                onClick={() => onBrickClick(donations[0].amount)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Walls */}
      <div className="flex flex-col gap-1">
        {rows.slice(0, height - 4).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-1">
            {Array.from({ length: baseWidth }).map((_, colIndex) => {
              const brickIndex = rowIndex * baseWidth + colIndex;
              if (brickIndex >= totalBricks) return null;
              
              // Cycle through donation tiers
              const tierIndex = brickIndex % donations.length;
              return (
                <DonationBrick
                  key={`brick-${brickIndex}`}
                  amount={donations[tierIndex].amount}
                  onClick={() => onBrickClick(donations[tierIndex].amount)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}