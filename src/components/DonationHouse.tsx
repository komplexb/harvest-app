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

      {/* House outline */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* Eaves */}
        <div className="w-[110%] h-4 bg-[#4e665d] -translate-y-2" />
        
        {/* Roof */}
        <div className="w-full h-1/3 relative">
          <div className="absolute inset-0 border-4 border-[#4e665d]"
               style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}>
          </div>
        </div>
        
        {/* House body */}
        <div className="w-4/5 h-2/3 border-4 border-t-0 border-[#4e665d]"></div>
      </div>

      {/* Fill container */}
      <div className="absolute inset-0 flex flex-col items-center overflow-hidden">
        {/* Roof fill */}
        <div className="w-full h-1/3 relative mt-4">
          <div className="absolute inset-0 bg-[#f4a261] transition-all duration-1000"
               style={{ 
                 clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                 opacity: progress > 66 ? 1 : 0 
               }}>
          </div>
        </div>
        {/* House body fill */}
        <div className="w-4/5 h-2/3 bg-[#f4a261] origin-bottom transition-all duration-1000"
             style={{ 
               transform: `scaleY(${Math.min(progress / 66, 1)})` 
             }}>
        </div>
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