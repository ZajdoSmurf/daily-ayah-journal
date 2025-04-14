import { useEffect, useState } from 'react';
import axios from 'axios';

const DailyAyah = () => {
  const [tafsir, setTafsir] = useState('');
  const [showTafsir, setShowTafsir] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [arabic, setArabic] = useState('');
  const [english, setEnglish] = useState('');
  const [ayahRef, setAyahRef] = useState('');

  const fetchRandomAyah = async () => {
    const totalAyahs = 6236;
    const randomAyahId = Math.floor(Math.random() * totalAyahs) + 1;

    try {
      const [arabicRes, englishRes] = await Promise.all([
        axios.get(`https://api.alquran.cloud/v1/ayah/${randomAyahId}/ar.alafasy`),
        axios.get(`https://api.alquran.cloud/v1/ayah/${randomAyahId}/en.sahih`)
      ]);

      const arabicText = arabicRes.data.data.text;
      const englishText = englishRes.data.data.text;
      const surahName = arabicRes.data.data.surah.englishName;
      const surahNumber = arabicRes.data.data.surah.number;
      const ayahNumber = arabicRes.data.data.numberInSurah;
      const audio = arabicRes.data.data.audio;

      setArabic(arabicText);
      setEnglish(englishText);
      setAyahRef(`${surahName} — Ayah ${ayahNumber}`);
      setAudioUrl(audio);
      setShowTafsir(false); // reset on new ayah

      // ✅ Fetch Ibn Kathir Tafsir from quran-tafseer-api
      const tafsirRes = await axios.get(
        `https://quran-tafseer-api.vercel.app/tafseer/ibn-kathir/${surahNumber}/${ayahNumber}`
      );

      const tafsirText = tafsirRes.data.text || 'Tafsir not available.';
      setTafsir(tafsirText);
    } catch (error) {
      console.error('Error fetching ayah or tafsir:', error);
      setTafsir('Tafsir not available.');
    }
  };

  useEffect(() => {
    fetchRandomAyah();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow-lg max-w-xl w-full transition-all duration-300 text-center space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-wide">Ayah of the Day</h2>

      <p className="quran-text-override">{arabic}</p>

      <p className="text-gray-700 dark:text-gray-300 italic">"{english}"</p>

      <p className="text-sm text-gray-500 dark:text-gray-400">{ayahRef}</p>

      {tafsir && (
        <button
          onClick={() => setShowTafsir(!showTafsir)}
          className="px-4 py-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition"
        >
          {showTafsir ? '📖 Hide Tafsir' : '📚 Show Tafsir (Ibn Kathir)'}
        </button>
      )}

      {showTafsir && tafsir && (
        <div className="text-left mt-4 p-4 bg-gray-100 dark:bg-gray-700 text-sm rounded-md leading-relaxed text-gray-800 dark:text-gray-100">
          {tafsir}
        </div>
      )}

      {audioUrl && (
        <button
          onClick={() => new Audio(audioUrl).play()}
          className="px-4 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          🔊 Play Recitation
        </button>
      )}

      <button
        onClick={fetchRandomAyah}
        className="mt-4 px-6 py-2 rounded-full transition duration-200
          bg-gray-900 text-white hover:bg-gray-800
          dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400"
      >
        Next Ayah 🔁
      </button>
    </div>
  );
};

export default DailyAyah;