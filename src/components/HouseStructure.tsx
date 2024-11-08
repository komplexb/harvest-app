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

  // Calculate dimensions
  const baseWidth = 10; // Number of bricks in base
  const wallHeight = Math.ceil(totalBricks / baseWidth);
  const minWallHeight = 8;
  const actualWallHeight = Math.max(wallHeight, minWallHeight);

  // Calculate roof dimensions (from bottom to top)
  const roofRows = [
    { width: baseWidth, offset: 0 },   // Bottom row (10 bricks)
    { width: 8, offset: 1 },           // Fourth row (8 bricks)
    { width: 6, offset: 2 },           // Third row (6 bricks)
    { width: 4, offset: 3 },           // Second row (4 bricks)
    { width: 2, offset: 4 }            // Top row (2 bricks)
  ];

  // Calculate total roof bricks needed
  const roofBricks = roofRows.reduce((sum, row) => sum + row.width, 0);

  return (
    <div className="flex flex-col items-center">
      {/* Cross */}
      <div className="text-gray-700 mb-2">
        <Cross size={32} />
      </div>

      {/* Roof */}
      <div className="flex flex-col items-center gap-1">
        {roofRows.map(({ width, offset }, idx) => (
          <div
            key={`roof-${idx}`}
            className="flex gap-1"
            style={{
              paddingLeft: `${offset * 0.95}rem`,
              paddingRight: `${offset * 0.95}rem`
            }}
          >
            {Array.from({ length: width }).map((_, i) => (
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
      <div className="flex flex-col gap-1 -mt-1">
        {Array.from({ length: actualWallHeight }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-1">
            {Array.from({ length: baseWidth }).map((_, colIndex) => {
              const brickIndex = rowIndex * baseWidth + colIndex;
              // Add roofBricks to account for the roof in the total count
              if (brickIndex + roofBricks >= totalBricks) return null;

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
