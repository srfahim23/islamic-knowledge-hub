import { useEffect, useState } from "react";

const DuasPage = () => {
  const [duasData, setDuasData] = useState<any>([]);

  useEffect(() => {
    fetch("/api/duas")
      .then((response) => response.json())
      .then((data) => setDuasData(data))
      .catch((error) => console.error("Error fetching Duas data:", error));
  }, []);

  return (
    <div>
      <h1>Duas</h1>
      <ul>
        {duasData.map((dua: any) => (
          <li key={dua.id}>
            <strong>{dua.name}:</strong> {dua.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DuasPage;
