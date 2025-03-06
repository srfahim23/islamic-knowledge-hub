// app/api/hadith.ts

export async function GET() {
    // Example static data or fetch from a Hadith API or database
    const hadithData = [
      { id: 1, content: "The best of you are those who learn the Quran and teach it." },
      { id: 2, content: "Actions are judged by intentions." },
      // Add more Hadiths here
    ];
  
    return new Response(JSON.stringify(hadithData), { status: 200 });
  }
  