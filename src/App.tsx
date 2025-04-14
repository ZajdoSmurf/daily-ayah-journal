import { useEffect, useState } from 'react';
import DailyAyah from './components/DailyAyah';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-start p-8 space-y-8">
      
      {/* 🌙 Slide Toggle Switch */}
      <div
  onClick={() => setDarkMode(!darkMode)}
  className={`w-20 h-10 flex items-center px-1 rounded-full cursor-pointer transition-colors duration-300 ${
    darkMode ? 'bg-gray-700' : 'bg-gray-300'
  }`}
>
  <div
    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-all duration-300 ${
      darkMode
        ? 'translate-x-[2.5rem] bg-white text-black'
        : 'translate-x-0 bg-white text-yellow-500'
    }`}
  >
    {darkMode ? '🌙' : '☀️'}
  </div>
</div>

      {/* 📖 Ayah Display */}
      <DailyAyah />
    </div>
  );
}

export default App;