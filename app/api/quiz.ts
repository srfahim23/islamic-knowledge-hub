// app/api/quiz.ts

export async function GET() {
    // Example static data or fetch from a quiz API or database
    const quizData = [
      {
        question: "What is the first Surah of the Quran?",
        options: ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas"],
        answer: "Al-Fatiha",
      },
      {
        question: "How many pillars of Islam are there?",
        options: ["4", "5", "6"],
        answer: "5",
      },
      // Add more quiz questions here
    ];
  
    return new Response(JSON.stringify(quizData), { status: 200 });
  }
  