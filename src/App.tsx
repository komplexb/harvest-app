import React, { useState, useEffect } from 'react';
import { DonationHouse } from './components/DonationHouse';
import { DonationControls } from './components/DonationControls';

interface BrickState {
  id: number;
  x: number;
  y: number;
  variant: number;
}

export function App() {
  const [bricks, setBricks] = useState<BrickState[]>([]);
  const [nextBrickId, setNextBrickId] = useState(0);

  const COLUMNS = 20;
  const MAX_BRICKS = 400;
  const INITIAL_BRICKS = 400; // Reduced from 400 to 200

  const getRandomVariant = () => Math.floor(Math.random() * 4);

  const findNextPosition = (column: number, currentBricks: BrickState[]): number => {
    const bricksInColumn = currentBricks.filter(b => b.x === column);
    const maxY = Math.max(...bricksInColumn.map(b => b.y), -1);
    return maxY + 1;
  };

  useEffect(() => {
    const initialBricks: BrickState[] = [];
    for (let i = 0; i < INITIAL_BRICKS; i++) {
      const columns = Array.from({ length: COLUMNS }, (_, i) => i);
      const lowestColumn = columns.reduce((lowest, current) => {
        const heightLowest = findNextPosition(lowest, initialBricks);
        const heightCurrent = findNextPosition(current, initialBricks);
        return heightCurrent < heightLowest ? current : lowest;
      }, 0);

      initialBricks.push({
        id: i,
        x: lowestColumn,
        y: findNextPosition(lowestColumn, initialBricks),
        variant: getRandomVariant(),
      });
    }
    setBricks(initialBricks);
    setNextBrickId(INITIAL_BRICKS);
  }, []);

  const handleFamilySelect = (familySize: number) => {
    if (bricks.length + familySize > MAX_BRICKS) return;

    const newBricks: BrickState[] = [];
    const currentBricks = [...bricks];

    // Add new bricks with a slight delay between each
    for (let i = 0; i < familySize; i++) {
      const columns = Array.from({ length: COLUMNS }, (_, i) => i);
      const lowestColumn = columns.reduce((lowest, current) => {
        const heightLowest = findNextPosition(lowest, [...currentBricks, ...newBricks]);
        const heightCurrent = findNextPosition(current, [...currentBricks, ...newBricks]);
        return heightCurrent < heightLowest ? current : lowest;
      }, 0);

      newBricks.push({
        id: nextBrickId + i,
        x: lowestColumn,
        y: findNextPosition(lowestColumn, [...currentBricks, ...newBricks]),
        variant: getRandomVariant(),
      });
    }

    setBricks(prev => [...prev, ...newBricks]);
    setNextBrickId(prev => prev + familySize);

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e1d7] py-12 px-4 overflow-hidden relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#4e665d] mb-4">
            A Home for the Harvest
          </h1>
          <p className="text-lg text-[#4e665d]">
            Add your family's bricks to help build our church
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <DonationHouse bricks={bricks} />
          <DonationControls onFamilySelect={handleFamilySelect} totalBricks={bricks.length} />
        </div>
      </div>
    </div>
  );
}
