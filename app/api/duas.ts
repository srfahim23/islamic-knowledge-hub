// app/api/duas.ts

export async function GET() {
    // Example static data or fetch from external sources or database
    const duasData = [
      { id: 1, name: "Dua for Protection", content: "اللهم إني أعوذ بك من شر ما عملت..." },
      { id: 2, name: "Dua for Guidance", content: "اللهم اجعلنا من أهل الهدى..." },
      // Add more Duas here
    ];
  
    return new Response(JSON.stringify(duasData), { status: 200 });
  }
  