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

      {/* 🔗 GitHub Project Link */}
      <a
        href="https://github.com/ZajdoSmurf/daily-ayah-journal"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-2 text-xs text-gray-500 dark:text-gray-400 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        📂 View on GitHub
      </a>

      {/* 🧠 Made by Zajdo */}
      <a
        href="https://github.com/ZajdoSmurf"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400 font-medium opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        🧠 Made by <span className="font-semibold underline underline-offset-2 hover:text-blue-500">Zajdo</span>
      </a>
    </div>
  );
}

export default App;

