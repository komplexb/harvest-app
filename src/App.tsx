import React, { useState, useEffect } from 'react';
import { DonationHouse } from './components/DonationHouse';
import { DonationControls, MAX_BRICKS } from './components/DonationControls';
import { db, TABLE_NAME } from './firebase';
import { ref, get, child } from 'firebase/database';

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

export function App() {
  const [bricks, setBricks] = useState<BrickState[]>([]);
  const [nextBrickId, setNextBrickId] = useState(0);
  const [initialBricksLoaded, setInitialBricksLoaded] = useState(false);

  const COLUMNS = 20;

  const getRandomVariant = () => Math.floor(Math.random() * 4);

  const findNextPosition = (column: number, currentBricks: BrickState[]): number => {
    const bricksInColumn = currentBricks.filter(b => b.x === column);
    const maxY = Math.max(...bricksInColumn.map(b => b.y), -1);
    return maxY + 1;
  };

  useEffect(() => {
    const loadInitialBricks = async () => {
      try {
        // Reference to the familySizes node in the Firebase Realtime Database
        const familySizesRef = ref(db);

        // A snapshot is a read-only view of the data at a specific location in the Firebase Realtime Database
        // It contains the data from that location at the moment in time when the snapshot was taken
        // The snapshot can be used to check if data exists and access its value
        const snapshot = await get(child(familySizesRef, TABLE_NAME));

        let totalFamilySize = 0;
        if (snapshot.exists()) {
          const families = snapshot.val() as FamilySizes;

          // Calculate total family size by reducing over all families
          // The reduce method is used here to calculate the total number of family members across all families
          // It iterates through each family object in the families array
          // For each family, it adds that family's size to a running sum
          // The initial value of the sum is 0 (the last parameter)
          totalFamilySize = Object.values(families).reduce((sum, family) =>
            sum + (family.familySize || 0), 0);
        }

        // Convert total family size to bricks (multiply by 1.67 and round up)
        const INITIAL_BRICKS = Math.ceil(totalFamilySize * 1.67);
        console.log({totalFamilySize, INITIAL_BRICKS})

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
        setInitialBricksLoaded(true);
      } catch (error) {
        console.error('Error loading initial bricks:', error);
        setInitialBricksLoaded(true); // Still set to true so UI can render
      }
    };

    loadInitialBricks();
  }, []);

  const handleFamilySelect = (familySize: number) => {
    // Convert family size to actual bricks (multiply by 1.67 and round up)
    const bricksToAdd = Math.ceil(familySize * 1.67);
    if (bricks.length + bricksToAdd > MAX_BRICKS) return;

    const newBricks: BrickState[] = [];
    const currentBricks = [...bricks];

    // Add new bricks with a slight delay between each
    for (let i = 0; i < bricksToAdd; i++) {
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
    setNextBrickId(prev => prev + bricksToAdd);

    // vibrate on donation
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    // play a brick sound on donation
    // const audio = new Audio('/brick-sound.mp3');
    // audio.play();
  };

  if (!initialBricksLoaded) {
    return (
      <div className="min-h-screen bg-[#e8e1d7] flex items-center justify-center">
        <div className="text-[#4e665d] text-xl">Loading...</div>
      </div>
    );
  }

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
