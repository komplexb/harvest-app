import React from 'react';
import { Cross } from 'lucide-react';

interface DonationHouseProps {
  currentAmount: number;
  goalAmount: number;
}

export function DonationHouse({ currentAmount, goalAmount }: DonationHouseProps) {
  const progress = (currentAmount / goalAmount) * 100;

  return (
    <div className="relative w-80 h-96">
      {/* Cross */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-[#4e665d]">
        <Cross size={32} strokeWidth={3} />
      </div>

      {/* Church SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background fill that changes with progress */}
          <path
            d="M128,58.1l-94.8,85.6h23.9v95.7h141.8v-95.7h23.9L128,58.1z"
            fill="#b8d8df"
            fillOpacity={progress / 100}
            style={{
              transition: 'fill-opacity 1s ease-in-out'
            }}
          />

          {/* Door */}
          <path
            d="M154.1,239.4h-52.2v-40.1c0-14.4,11.7-26.1,26.1-26.1c14.4,0,26.1,11.7,26.1,26.1V239.4z"
            fill="#f7c885"
            fillOpacity={progress > 66 ? 1 : 0}
            style={{
              transition: 'fill-opacity 1s ease-in-out'
            }}
          />

          {/* Small detail */}
          <path
            d="M176.2,150.2c-0.4,0-0.9,0-1.3-0.1c-0.4-0.1-0.8-0.2-1.2-0.4c-0.4-0.2-0.8-0.4-1.1-0.6 c-0.4-0.2-0.7-0.5-1-0.8s-0.6-0.6-0.8-1c-0.2-0.4-0.4-0.7-0.6-1.1c-0.3-0.8-0.5-1.6-0.5-2.5c0-0.4,0-0.9,0.1-1.3 c0.1-0.4,0.2-0.8,0.4-1.2c0.2-0.4,0.4-0.8,0.6-1.1c0.2-0.4,0.5-0.7,0.8-1c0.3-0.3,0.6-0.6,1-0.8c0.7-0.5,1.5-0.8,2.4-1 c0.8-0.2,1.7-0.2,2.6,0c0.4,0.1,0.8,0.2,1.2,0.4c0.4,0.2,0.8,0.4,1.1,0.6c0.4,0.2,0.7,0.5,1,0.8s0.6,0.6,0.8,1 c0.2,0.4,0.4,0.7,0.6,1.1c0.3,0.8,0.5,1.6,0.5,2.5c0,0.4,0,0.9-0.1,1.3c-0.1,0.4-0.2,0.8-0.4,1.2c-0.2,0.4-0.4,0.8-0.6,1.1 c-0.2,0.4-0.5,0.7-0.8,1c-0.3,0.3-0.6,0.6-1,0.8c-0.4,0.2-0.7,0.4-1.1,0.6C177.9,150.1,177.1,150.2,176.2,150.2L176.2,150.2z"
            fill="#040000"
          />

          {/* Outline */}
          <path
            d="M227.2,138.8l-92.7-83.6V43.9h14.2c3.6,0,6.6-2.9,6.6-6.6c0-3.6-2.9-6.6-6.6-6.6h-14.2V16.6 c0-3.6-2.9-6.6-6.6-6.6c-3.6,0-6.6,2.9-6.6,6.6v14.2h-14.2c-3.6,0-6.6,2.9-6.6,6.6c0,3.6,2.9,6.6,6.6,6.6h14.2v11.3l-92.7,83.6 c-2.7,2.4-2.9,6.6-0.5,9.3c1.2,1.4,3,2.2,4.9,2.2h17.4v89.2c0,3.6,2.9,6.6,6.6,6.6h141.8c3.6,0,6.6-2.9,6.6-6.6v-89.2h17.4 c3.6,0,6.6-2.9,6.6-6.6C229.4,141.8,228.6,140.1,227.2,138.8L227.2,138.8z"
            stroke="#4e665d"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Progress text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg">
          <span className="font-bold text-xl text-[#4e665d]">
            ${currentAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
