import React from 'react';

export default function TabButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-[0_5px_4px_rgba(0,0,0,0.25)] transition
                ${
                  isActive
                    ? 'bg-[#E0E0E0] text-black'
                    : 'bg-[#E0E0E0] text-black hover:bg-gray-300'
                }
            `}
    >
      {label}
    </button>
  );
}
