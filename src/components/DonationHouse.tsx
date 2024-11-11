import React from 'react';

interface DonationHouseProps {
  bricks: { id: number; x: number; y: number; variant: number }[];
}

const BRICK_COLORS = [
  '#c65d45', // red-orange
  '#b8462c', // darker red
  '#d17f6b', // light terracotta
  '#a64b38', // deep brick red
];

export function DonationHouse({ bricks }: DonationHouseProps) {
  const BRICK_WIDTH = 16;
  const BRICK_HEIGHT = 8;
  const SVG_WIDTH = 256;
  const BRICK_OFFSET = (SVG_WIDTH - (BRICK_WIDTH * 15)) / 2; // Center 15 bricks width

  return (
    <div className="relative w-full max-w-[600px] mx-auto h-[600px]">
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
                x={(brick.x % 15) * BRICK_WIDTH + BRICK_OFFSET}
                y={246 - ((brick.y + 1) * BRICK_HEIGHT)}
                width={BRICK_WIDTH - 1}
                height={BRICK_HEIGHT - 1}
                fill={BRICK_COLORS[brick.variant]}
                stroke="#ffffff"
                strokeWidth="0.5"
                rx="1"
                ry="1"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Total bricks counter */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg">
          <span className="font-bold text-xl text-[#4e665d]">
            {bricks.length} Bricks
          </span>
        </div>
      </div>
    </div>
  );
}
