import React, { useState, useEffect } from 'react';
import { DonationHouse } from './DonationHouse';
import { db, TABLE_NAME } from '../firebase';
import { ref, onValue } from 'firebase/database';

interface BrickState {
  id: number;
  x: number;
  y: number;
  variant: number;
}

interface FamilySize {
  guid: string;
  familySize: number;
}

interface FamilySizes {
  [key: string]: FamilySize;
}

export function LivePledgePage() {
  const [bricks, setBricks] = useState<BrickState[]>([]);
  const [initialBricksLoaded, setInitialBricksLoaded] = useState(false);

  const COLUMNS = 20;

  const getRandomVariant = () => Math.floor(Math.random() * 4);

  const findNextPosition = (column: number, currentBricks: BrickState[]): number => {
    const bricksInColumn = currentBricks.filter(b => b.x === column);
    const maxY = Math.max(...bricksInColumn.map(b => b.y), -1);
    return maxY + 1;
  };

  const createBricks = (totalFamilySize: number) => {
    // override totalFamilySize to test UI
    const totalBricks = Math.ceil(totalFamilySize * 1.67);
    const newBricks: BrickState[] = [];

    for (let i = 0; i < totalBricks; i++) {
      const columns = Array.from({ length: COLUMNS }, (_, i) => i);
      const lowestColumn = columns.reduce((lowest, current) => {
        const heightLowest = findNextPosition(lowest, newBricks);
        const heightCurrent = findNextPosition(current, newBricks);
        return heightCurrent < heightLowest ? current : lowest;
      }, 0);

      newBricks.push({
        id: i,
        x: lowestColumn,
        y: findNextPosition(lowestColumn, newBricks),
        variant: getRandomVariant(),
      });
    }

    return newBricks;
  };

  useEffect(() => {
    const familySizesRef = ref(db, TABLE_NAME);
    const unsubscribe = onValue(familySizesRef, (snapshot) => {
      let totalFamilySize = 0;
      if (snapshot.exists()) {
        const families = snapshot.val() as FamilySizes;
        totalFamilySize = Object.values(families).reduce((sum, family) =>
          sum + (family.familySize || 0), 0);
      }

      const newBricks = createBricks(totalFamilySize);
      setBricks(newBricks);
      setInitialBricksLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  if (!initialBricksLoaded) {
    return (
      <div className="min-h-screen bg-[#e8e1d7] flex items-center justify-center">
        <div className="text-[#4e665d] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e1d7] flex items-center justify-center p-8">
      <div className="w-full max-w-[1800px]">
        <DonationHouse bricks={bricks} scale={2} />
      </div>
    </div>
  );
}
