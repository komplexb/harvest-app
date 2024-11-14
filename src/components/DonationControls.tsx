import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { ref, set, onValue } from 'firebase/database';

interface DonationControlsProps {
  onFamilySelect: (familySize: number) => void;
  totalBricks: number;
}

const TABLE_NAME = "familySizes";

const MAX_FAMILY = 8;
export const MAX_BRICKS = 550;

export function DonationControls({ onFamilySelect, totalBricks }: DonationControlsProps) {
  const [visitorId] = useState(() => uuidv4()); // Generate ID once when component mounts
  const [currentFamilySize, setCurrentFamilySize] = useState<number | null>(null);
  const familySizes = Array.from({ length: MAX_FAMILY }, (_, i) => i + 1);

  useEffect(() => {
    // Set up real-time listener for this visitor's family size
    const familySizeRef = ref(db, `${TABLE_NAME}/${visitorId}`);
    const unsubscribe = onValue(familySizeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentFamilySize(data.familySize);
      }
    });

    return () => unsubscribe();
  }, [visitorId]);

  const handleFamilySelect = async (size: number) => {
    try {
      // Save to Firebase Realtime Database with offline persistence
      await set(ref(db, `${TABLE_NAME}/${visitorId}`), {
        guid: visitorId,
        familySize: size
      });

      // Call the original handler
      onFamilySelect(size);
    } catch (error) {
      console.error('Error saving family size:', error);
      // Still call original handler even if Firebase fails
      onFamilySelect(size);
    }
  };

  return (
    <div id="button-box" className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-8">
      <p className="text-lg text-[#4e665d] mb-4 text-center font-semibold">
        Select your family size
        {currentFamilySize && (
          <span className="block text-sm mt-1">
            Current selection: {currentFamilySize}
          </span>
        )}
      </p>

      <div className="grid grid-cols-4 gap-4 mb-4">
        {familySizes.map(size => (
          <button
            key={size}
            onClick={() => handleFamilySelect(size)}
            className={`px-4 py-3 ${
              currentFamilySize === size
                ? 'bg-[#3d514a]'
                : 'bg-[#4e665d] hover:bg-[#3d514a]'
            }
                     text-white text-lg font-semibold rounded-lg transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
            disabled={totalBricks + size > MAX_BRICKS}
          >
            {size}
          </button>
        ))}
      </div>

      {totalBricks >= MAX_BRICKS && (
        <div className="mt-4 text-center text-[#4e665d] font-semibold">
          🎉 Church is full! Thank you for your support!
        </div>
      )}
    </div>
  );
}
