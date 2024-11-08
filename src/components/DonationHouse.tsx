import React from 'react';

interface DonationHouseProps {
  currentAmount: number;
  goalAmount: number;
}

export function DonationHouse({ currentAmount, goalAmount }: DonationHouseProps) {
  const progress = (currentAmount / goalAmount) * 100;

  return (
    <div className="relative w-full max-w-md mx-auto h-[448px]">
      {/* Church SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="448" height="448" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
            </pattern>
            <clipPath id="churchShape">
              <path d="M227.2,138.8l-92.7-83.6V43.9h14.2c3.6,0,6.6-2.9,6.6-6.6c0-3.6-2.9-6.6-6.6-6.6h-14.2V16.6 c0-3.6-2.9-6.6-6.6-6.6c-3.6,0-6.6,2.9-6.6,6.6v14.2h-14.2c-3.6,0-6.6,2.9-6.6,6.6c0,3.6,2.9,6.6,6.6,6.6h14.2v11.3l-92.7,83.6 c-2.7,2.4-2.9,6.6-0.5,9.3c1.2,1.4,3,2.2,4.9,2.2h17.4v89.2c0,3.6,2.9,6.6,6.6,6.6h141.8c3.6,0,6.6-2.9,6.6-6.6v-89.2h17.4 c3.6,0,6.6-2.9,6.6-6.6C229.4,141.8,228.6,140.1,227.2,138.8L227.2,138.8z" />
            </clipPath>
          </defs>

          {/* Progress fill with grid */}
          <g clipPath="url(#churchShape)">
            <rect
              x="0"
              y="0"
              width="256"
              height="256"
              fill="#F4A33A"
              style={{
                transformOrigin: 'bottom',
                transform: `scaleY(${progress / 100})`,
                transition: 'transform 1s ease-in-out'
              }}
            />
            <rect
              x="0"
              y="0"
              width="256"
              height="256"
              fill="url(#gridPattern)"
              style={{
                transformOrigin: 'bottom',
                transform: `scaleY(${progress / 100})`,
                transition: 'transform 1s ease-in-out'
              }}
            />
          </g>

          {/* Door */}
          <path
            d="M154.1,239.4h-52.2v-40.1c0-14.4,11.7-26.1,26.1-26.1c14.4,0,26.1,11.7,26.1,26.1V239.4z"
            fill="#ffffff"
            fillOpacity={progress > 66 ? 1 : 0}
            style={{
              transition: 'fill-opacity 1s ease-in-out'
            }}
          />

          {/* Church outline */}
          <path
            d="M227.2,138.8l-92.7-83.6V43.9h14.2c3.6,0,6.6-2.9,6.6-6.6c0-3.6-2.9-6.6-6.6-6.6h-14.2V16.6 c0-3.6-2.9-6.6-6.6-6.6c-3.6,0-6.6,2.9-6.6,6.6v14.2h-14.2c-3.6,0-6.6,2.9-6.6,6.6c0,3.6,2.9,6.6,6.6,6.6h14.2v11.3l-92.7,83.6 c-2.7,2.4-2.9,6.6-0.5,9.3c1.2,1.4,3,2.2,4.9,2.2h17.4v89.2c0,3.6,2.9,6.6,6.6,6.6h141.8c3.6,0,6.6-2.9,6.6-6.6v-89.2h17.4 c3.6,0,6.6-2.9,6.6-6.6C229.4,141.8,228.6,140.1,227.2,138.8L227.2,138.8z"
            stroke="#4e665d"
            strokeWidth="3"
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
