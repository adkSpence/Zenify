import { useState, useEffect } from "react";

export default function DailyProgress() {
  const [dailyGoal, setDailyGoal] = useState(90);
  const [completed, setCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [yesterday, setYesterday] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [goalInput, setGoalInput] = useState(dailyGoal);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const data = JSON.parse(localStorage.getItem("zenifyData")) || {};

    if (data.dailyGoal) setDailyGoal(data.dailyGoal);
    if (data.completedToday) setCompleted(data.completedToday);
    if (data.streak) setStreak(data.streak);
    if (data.yesterday) setYesterday(data.yesterday);

    if (data.lastActiveDate && data.lastActiveDate !== today) {
      const lastDate = new Date(data.lastActiveDate);
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      const newStreak = lastDate.toDateString() === yesterdayDate.toDateString()
        ? (data.streak || 0) + 1
        : 0;

      const updated = {
        ...data,
        streak: newStreak,
        yesterday: data.completedToday || 0,
        completedToday: 0,
        lastActiveDate: today,
      };

      setStreak(updated.streak);
      setYesterday(updated.yesterday);
      setCompleted(0);
      localStorage.setItem("zenifyData", JSON.stringify(updated));
    }
  }, []);

  const handleSave = () => {
    const val = parseInt(goalInput);
    if (!isNaN(val) && val >= 10 && val <= 240) {
      setDailyGoal(val);
      setIsEditing(false);

      const existing = JSON.parse(localStorage.getItem("zenifyData")) || {};
      localStorage.setItem("zenifyData", JSON.stringify({
        ...existing,
        dailyGoal: val
      }));
    }
  };

  const rawProgress = completed / dailyGoal;
  const progress = Math.min(1, Math.max(rawProgress, completed > 0 ? 0.01 : 0));

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 min-h-[430px] space-y-6 flex flex-col justify-center relative">
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        title="Edit Goal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487c.48-.48 1.257-.48 1.737 0l.914.914c.48.48.48 1.257 0 1.737L6.75 19.912l-3 0 .001-2.999L16.862 4.487z"
          />
        </svg>
      </button>

      <h2 className="text-2xl font-bold text-center">Daily Progress</h2>

      <div className="flex items-center justify-between gap-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">Yesterday</p>
          <p className="text-xl font-bold">{yesterday} min</p>
        </div>

        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100">
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
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 45}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500">Daily Goal</p>
            {isEditing ? (
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  min={10}
                  max={240}
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="w-16 text-center border border-gray-300 rounded px-1 py-0.5 text-sm"
                />
                <button
                  onClick={handleSave}
                  className="mt-1 text-xs text-blue-600 hover:underline"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-lg font-bold">
                {dailyGoal >= 60 ? `${(dailyGoal / 60).toFixed(1)} hrs` : `${dailyGoal} min`}
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Streak</p>
          <p className="text-xl font-bold">{streak}</p>
          <p className="text-sm text-gray-500">days</p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-700">
        Completed: <span className="font-semibold">{completed} min</span>
      </p>
    </div>
  );
}
