export default function DailyProgress() {
    const dailyGoal = 90; // in minutes
    const completed = 45;
    const streak = 0;
    const yesterday = 0;
  
    const progress = completed / dailyGoal;
  
    return (
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 min-h-[430px] space-y-6 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center">Daily Progress</h2>
  
        <div className="flex items-center justify-between gap-6">
          {/* Yesterday */}
          <div className="text-center">
            <p className="text-sm text-gray-500">Yesterday</p>
            <p className="text-xl font-bold">{yesterday} min</p>
          </div>
  
          {/* Progress Ring */}
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
              <p className="text-lg font-bold">
                {dailyGoal >= 60 ? `${(dailyGoal / 60).toFixed(1)} hrs` : `${dailyGoal} min`}
              </p>
            </div>
          </div>
  
          {/* Streak */}
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
  