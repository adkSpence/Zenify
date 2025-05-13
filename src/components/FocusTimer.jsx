import { useState, useEffect, useRef } from "react";

export default function FocusTimer({ onSessionComplete }) {
  const [minutes, setMinutes] = useState(30);
  const [skipBreaks, setSkipBreaks] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(30 * 60);
  const [initialSeconds, setInitialSeconds] = useState(30 * 60);
  const timerRef = useRef(null);
  // Store the session minutes to report exact set time, not elapsed time
  const sessionMinutes = useRef(30);

  const adjustTime = (amount) => {
    setMinutes((prev) => {
      const next = prev + amount;
      return Math.max(5, Math.min(next, 120));
    });
  };

  const handleManualInput = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMinutes(Math.max(5, Math.min(value, 120)));
    }
  };

  const calculateBreaks = () => {
    if (skipBreaks) return "Breaks skipped";
    const breaks = Math.floor(minutes / 25);
    return breaks === 0 ? "No breaks" : `You'll get ${breaks} break${breaks > 1 ? "s" : ""}`;
  };

  const startSession = () => {
    const totalSeconds = minutes * 60;
    setRemainingSeconds(totalSeconds);
    setInitialSeconds(totalSeconds);
    setIsRunning(true);
    // Store the exact minutes that were set for this session
    sessionMinutes.current = minutes;
  };

  const quitSession = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    // Using a simple interval that updates every second is more reliable
    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        // Check if timer is done
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          
          // CRITICAL FIX: Use the stored session minutes value
          // instead of calculating from elapsed time
          if (onSessionComplete) {
            onSessionComplete(sessionMinutes.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, onSessionComplete]);

  const displayMinutes = Math.floor(remainingSeconds / 60);
  const progress = 1 - remainingSeconds / initialSeconds;

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 min-h-[430px] flex flex-col justify-center space-y-6">
      {!isRunning ? (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-1">Ready, set, focus!</h2>
            <p className="text-gray-600 text-sm">
              Achieve your goals and get more done with focus sessions.
              <br />
              Tell us how much time you have, and we'll set up the rest.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <input
              type="text"
              value={minutes}
              onChange={handleManualInput}
              className="text-3xl font-bold w-20 text-center px-2 py-1 border border-gray-300 rounded"
            />
            <span className="text-gray-600 text-base">mins</span>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => adjustTime(5)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 border"
                aria-label="Increase time"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={() => adjustTime(-5)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 border"
                aria-label="Decrease time"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">{calculateBreaks()}</p>
            <label className="flex items-center justify-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={skipBreaks}
                onChange={() => setSkipBreaks(!skipBreaks)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              Skip Breaks
            </label>
          </div>

          <div className="text-center">
            <button
              onClick={startSession}
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Start Focus Session
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 flex-1">
          <svg className="w-40 h-40" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 45}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="24"
              fill="#111827"
              fontFamily="monospace"
              dominantBaseline="middle"
            >
              {displayMinutes}
            </text>
          </svg>

          <button
            onClick={quitSession}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600 transition"
          >
            Quit
          </button>
        </div>
      )}
    </div>
  );
}