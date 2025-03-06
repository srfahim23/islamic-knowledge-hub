// app/hadith/page.tsx

"use client";  // Add this line at the top

import { useEffect, useState } from "react";

const HadithPage = () => {
  const [hadithData, setHadithData] = useState<any>([]);

  useEffect(() => {
    fetch("/api/hadith")
      .then((response) => response.json())
      .then((data) => {
        console.log("Hadith Data:", data); // Log the data
        setHadithData(data);
      })
      .catch((error) => console.error("Error fetching Hadith data:", error));
  }, []);

  return (
    <div>
      <h1>Hadith</h1>
      <ul>
        {hadithData.map((hadith: any) => (
          <li key={hadith.id}>
            {hadith.text} - {hadith.source}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HadithPage;
