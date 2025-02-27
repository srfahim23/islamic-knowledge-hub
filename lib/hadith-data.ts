export type Hadith = {
  id: string
  textBengali: string
  textEnglish: string
  textArabic: string
  narrator: string
  source: string
  book?: string
  chapter?: string
  grade?: "sahih" | "hasan" | "daif" | "maudu"
  topics: string[]
}

export const hadiths: Hadith[] = [
  {
    id: "1",
    textBengali: "নিশ্চয় আমল নিয়তের উপর নির্ভরশীল। আর প্রত্যেক ব্যক্তি তাই পাবে যা সে নিয়ত করেছে।",
    textEnglish: "Actions are judged by intentions, so each man will have what he intended.",
    textArabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    narrator: "উমর ইবনুল খাত্তাব (রাঃ)",
    source: "সহীহ বুখারী ১, সহীহ মুসলিম ১৯০৭",
    book: "কিতাবুল ঈমান",
    chapter: "ওহীর সূচনা",
    grade: "sahih",
    topics: ["নিয়ত", "আমল", "প্রতিদান"],
  },
  {
    id: "2",
    textBengali:
      "ইসলাম পাঁচটি স্তম্ভের উপর প্রতিষ্ঠিত: আল্লাহ ছাড়া কোনো উপাস্য নেই এবং মুহাম্মদ (সাঃ) আল্লাহর রাসূল এ কথার সাক্ষ্য দেওয়া, নামায কায়েম করা, যাকাত প্রদান করা, হজ্জ করা এবং রমযানের রোযা রাখা।",
    textEnglish:
      "Islam is built on five pillars: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, performing the prayers, paying the Zakat, making the pilgrimage to the House, and fasting in Ramadan.",
    textArabic:
      "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ",
    narrator: "ইবনে উমর (রাঃ)",
    source: "সহীহ বুখারী ৮, সহীহ মুসলিম ১৬",
    book: "কিতাবুল ঈমান",
    grade: "sahih",
    topics: ["ইসলামের স্তম্ভ", "ঈমান", "মৌলিক বিষয়"],
  },
  {
    id: "3",
    textBengali: "নিশ্চয় আল্লাহ তোমাদের চেহারা ও ধন-সম্পদের দিকে তাকান না, বরং তিনি তোমাদের অন্তর ও আমলের দিকে তাকান।",
    textEnglish:
      "Allah does not look at your figures, nor at your attire but He looks at your hearts and accomplishments.",
    textArabic: "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    narrator: "আবু হুরায়রা (রাঃ)",
    source: "সহীহ মুসলিম ২৫৬৪",
    grade: "sahih",
    topics: ["চরিত্র", "আমল", "অন্তর"],
  },
  {
    id: "4",
    textBengali:
      "তোমাদের কেউ তত ক্ষণ পর্যন্ত পূর্ণ ঈমানদার হতে পারে না, যত ক্ষণ না সে তার ভাইয়ের জন্য তাই পছন্দ করে, যা সে নিজের জন্য পছন্দ করে।",
    textEnglish: "None of you [truly] believes until he loves for his brother what he loves for himself.",
    textArabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    narrator: "আনাস ইবনে মালিক (রাঃ)",
    source: "সহীহ বুখারী ১৩, সহীহ মুসলিম ৪৫",
    book: "কিতাবুল ঈমান",
    grade: "sahih",
    topics: ["ঈমান", "ভ্রাতৃত্ব", "ভালোবাসা"],
  },
  {
    id: "5",
    textBengali:
      "শক্তিশালী ব্যক্তি সে নয়, যে কুস্তিতে অন্যকে পরাজিত করে। বরং শক্তিশালী ব্যক্তি সে, যে রাগের সময় নিজেকে নিয়ন্ত্রণ করতে পারে।",
    textEnglish:
      "The strong person is not the one who can wrestle someone down. The strong person is the one who can control himself when he is angry.",
    textArabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
    narrator: "আবু হুরায়রা (রাঃ)",
    source: "সহীহ বুখারী ৬১১৪, সহীহ মুসলিম ২৬০৯",
    grade: "sahih",
    topics: ["রাগ", "আত্মনিয়ন্ত্রণ", "শক্তি"],
  },
]

export function getRandomHadith(): Hadith {
  const randomIndex = Math.floor(Math.random() * hadiths.length)
  return hadiths[randomIndex]
}

export function getHadithById(id: string): Hadith | undefined {
  return hadiths.find((hadith) => hadith.id === id)
}

export function getHadithsByTopic(topic: string): Hadith[] {
  return hadiths.filter((hadith) => hadith.topics.some((t) => t.toLowerCase() === topic.toLowerCase()))
}

