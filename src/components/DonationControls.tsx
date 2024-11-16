import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db, TABLE_NAME } from '../firebase';
import { ref, set, onValue } from 'firebase/database';

interface DonationControlsProps {
  onFamilySelect: (familySize: number) => void;
  totalBricks: number;
}

const MAX_FAMILY = 8;
export const MAX_BRICKS = 550;

// Key for storing visitor ID in localStorage
const VISITOR_ID_KEY = 'harvest_visitor_id';

export function DonationControls({ onFamilySelect, totalBricks }: DonationControlsProps) {
  const [visitorId, setVisitorId] = useState<string>('');
  const [currentFamilySize, setCurrentFamilySize] = useState<number | null>(null);
  const familySizes = Array.from({ length: MAX_FAMILY }, (_, i) => i + 1);

  useEffect(() => {
    // Get or create visitor ID from localStorage
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = uuidv4();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    setVisitorId(id);

    // Set up real-time listener for this visitor's family size
    const familySizeRef = ref(db, `${TABLE_NAME}/${id}`);
    const unsubscribe = onValue(familySizeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentFamilySize(data.familySize);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFamilySelect = async (size: number) => {
    if (!visitorId) return;

    try {
      // Save to Firebase Realtime Database
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
