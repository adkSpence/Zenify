import { useState } from "react";

export default function FocusTimer() {
  const [minutes, setMinutes] = useState(30);

  const adjustTime = (amount) => {
    setMinutes((prev) => {
      const next = prev + amount;
      return Math.max(5, Math.min(next, 120));
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">Ready, set, focus!</h2>
        <p className="text-gray-600 text-sm">
          Achieve your goals and get more done with focus sessions.
          <br />
          Tell us how much time you have, and we’ll set up the rest.
        </p>
      </div>

      {/* Time Selector */}
      <div className="flex items-center justify-center gap-3">
        {/* Value Display */}
        <div className="text-3xl font-bold w-16 text-center">{minutes}</div>
        <span className="text-gray-600 text-base">mins</span>

        {/* Vertical Stepper */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => adjustTime(5)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 border"
            aria-label="Increase time"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => adjustTime(-5)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 border"
            aria-label="Decrease time"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Breaks Info */}
      <p className="text-center text-sm text-gray-500 mt-2">You'll get 1 break</p>

      {/* Start Button */}
      <div className="text-center">
        <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Start Focus Session
        </button>
      </div>
    </div>
  );
}