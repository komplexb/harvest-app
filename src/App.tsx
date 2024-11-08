import React, { useState } from 'react';
import { DonationHouse } from './components/DonationHouse';
import { DonationControls } from './components/DonationControls';

const GOAL_AMOUNT = 1450000; // $1.45M goal
const INITIAL_AMOUNT = 500000; // $500K initial amount

export function App() {
  const [totalDonations, setTotalDonations] = useState(INITIAL_AMOUNT);

  const handleDonate = (amount: number) => {
    setTotalDonations(prev => Math.min(prev + amount, GOAL_AMOUNT));
    // drop bricks from the top of the page

    // gracefully fail if vibrate is not supported
    if (!navigator.vibrate) {
      return;
    }
    navigator.vibrate([200, 100, 200]);
  };

  return (
    <div className="min-h-screen bg-[#e8e1d7] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#4e665d] mb-4">
            A Home for the Harvest
          </h1>
          <p className="text-lg text-[#4e665d]">
            Help us reach our goal of ${(GOAL_AMOUNT).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <DonationHouse
            currentAmount={totalDonations}
            goalAmount={GOAL_AMOUNT}
          />
          <DonationControls
            onDonate={handleDonate}
            currentAmount={totalDonations}
            goalAmount={GOAL_AMOUNT}
          />
        </div>
      </div>
    </div>
  );
}