import FocusTimer from './components/FocusTimer';
import DailyProgress from './components/DailyProgress';

export default function App() {
  const handleSessionComplete = (minutes) => {
    const today = new Date().toISOString().slice(0, 10);
    const existing = JSON.parse(localStorage.getItem('zenifyData')) || {};

    const updated = {
      ...existing,
      completedToday: (existing.completedToday || 0) + minutes,
      lastActiveDate: today
    };

    localStorage.setItem('zenifyData', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 md:flex-row md:gap-8">
      <FocusTimer onSessionComplete={handleSessionComplete} />
      <DailyProgress />
    </div>
  );
}
