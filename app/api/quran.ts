// app/api/quran.ts
export async function handler(req: any, res: any) {
    const quranData = [
      { id: 1, name: "Al-Fatiha", translation: "The Opening" },
      { id: 2, name: "Al-Baqarah", translation: "The Cow" },
      // Add more Surahs...
    ];
    res.status(200).json(quranData);
  }
  