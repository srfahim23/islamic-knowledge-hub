import { useEffect, useState } from "react";

const QuranPage = () => {
  const [quranData, setQuranData] = useState<any>([]);

  useEffect(() => {
    fetch("/api/quran")
      .then((response) => response.json())
      .then((data) => {
        console.log("Quran Data:", data); // Log the data
        setQuranData(data);
      })
      .catch((error) => console.error("Error fetching Quran data:", error));
  }, []);

  return (
    <div>
      <h1>Quran Surahs</h1>
      <ul>
        {quranData.map((surah: any) => (
          <li key={surah.id}>
            {surah.name} - {surah.translation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuranPage;
