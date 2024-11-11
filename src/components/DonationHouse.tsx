import React from 'react';

interface DonationHouseProps {
  bricks: { id: number; x: number; y: number }[];
}

export function DonationHouse({ bricks }: DonationHouseProps) {
  const BRICK_WIDTH = 16; // pixels
  const BRICK_HEIGHT = 8; // pixels

  return (
    <div className="relative w-full max-w-[600px] mx-auto h-[600px]">
      {/* Church outline */}
      <div className="flex items-center justify-center">
        <svg width="600" height="600" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="churchMask">
              <path d="M227.2,138.8l-92.7-83.6V43.9h14.2c3.6,0,6.6-2.9,6.6-6.6c0-3.6-2.9-6.6-6.6-6.6h-14.2V16.6 c0-3.6-2.9-6.6-6.6-6.6c-3.6,0-6.6,2.9-6.6,6.6v14.2h-14.2c-3.6,0-6.6,2.9-6.6,6.6c0,3.6,2.9,6.6,6.6,6.6h14.2v11.3l-92.7,83.6 c-2.7,2.4-2.9,6.6-0.5,9.3c1.2,1.4,3,2.2,4.9,2.2h17.4v89.2c0,3.6,2.9,6.6,6.6,6.6h141.8c3.6,0,6.6-2.9,6.6-6.6v-89.2h17.4 c3.6,0,6.6-2.9,6.6-6.6C229.4,141.8,228.6,140.1,227.2,138.8L227.2,138.8z" />
            </clipPath>
          </defs>

          {/* Church background */}
          <path
            d="M227.2,138.8l-92.7-83.6V43.9h14.2c3.6,0,6.6-2.9,6.6-6.6c0-3.6-2.9-6.6-6.6-6.6h-14.2V16.6 c0-3.6-2.9-6.6-6.6-6.6c-3.6,0-6.6,2.9-6.6,6.6v14.2h-14.2c-3.6,0-6.6,2.9-6.6,6.6c0,3.6,2.9,6.6,6.6,6.6h14.2v11.3l-92.7,83.6 c-2.7,2.4-2.9,6.6-0.5,9.3c1.2,1.4,3,2.2,4.9,2.2h17.4v89.2c0,3.6,2.9,6.6,6.6,6.6h141.8c3.6,0,6.6-2.9,6.6-6.6v-89.2h17.4 c3.6,0,6.6-2.9,6.6-6.6C229.4,141.8,228.6,140.1,227.2,138.8L227.2,138.8z"
            fill="white"
          />

          {/* Church outline */}
          <path
            d="M227.2,138.8l-92.7-83.6V43.9h14.2c3.6,0,6.6-2.9,6.6-6.6c0-3.6-2.9-6.6-6.6-6.6h-14.2V16.6 c0-3.6-2.9-6.6-6.6-6.6c-3.6,0-6.6,2.9-6.6,6.6v14.2h-14.2c-3.6,0-6.6,2.9-6.6,6.6c0,3.6,2.9,6.6,6.6,6.6h14.2v11.3l-92.7,83.6 c-2.7,2.4-2.9,6.6-0.5,9.3c1.2,1.4,3,2.2,4.9,2.2h17.4v89.2c0,3.6,2.9,6.6,6.6,6.6h141.8c3.6,0,6.6-2.9,6.6-6.6v-89.2h17.4 c3.6,0,6.6-2.9,6.6-6.6C229.4,141.8,228.6,140.1,227.2,138.8L227.2,138.8z"
            stroke="#4e665d"
            strokeWidth="3"
            fill="none"
          />

          {/* Bricks container */}
          <g clipPath="url(#churchMask)">
            {bricks.map((brick) => (
              <rect
                key={brick.id}
                className="brick-fall"
                x={brick.x * BRICK_WIDTH + 50} // Add offset to center bricks
                y={256 - ((brick.y + 1) * BRICK_HEIGHT)}
                width={BRICK_WIDTH - 1} // Subtract 1 for gap
                height={BRICK_HEIGHT - 1} // Subtract 1 for gap
                fill="#bc4b51"
                stroke="#d4c5b9"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Total bricks counter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg">
          <span className="font-bold text-xl text-[#4e665d]">
            {bricks.length} Bricks
          </span>
        </div>
      </div>
    </div>
  );
}
