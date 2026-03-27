import {
  BookOpen,
  Brush,
  Flower2,
  HeartHandshake,
  Music4,
  Puzzle,
} from "lucide-react";

const activities = {
  uz: [
    {
      title: "Tonggi kutib olish",
      time: "08:00 - 09:00",
      description: "Mehribon kutib olish, erkin o'yin va kun kayfiyatini iliq boshlash.",
      Icon: HeartHandshake,
    },
    {
      title: "Bilim va savod mashg'ulotlari",
      time: "09:30 - 11:00",
      description: "Raqamlar, harflar, hikoya tinglash va mantiqiy o'yinlar.",
      Icon: BookOpen,
    },
    {
      title: "Ijodiy studiyalar",
      time: "11:15 - 12:00",
      description: "Rasm, qo'l mehnati, sahna va ranglar bilan ishlash.",
      Icon: Brush,
    },
    {
      title: "Musiqa va ritm",
      time: "15:00 - 15:40",
      description: "Qo'shiq, harakatli o'yin va sahna ko'rinishlari.",
      Icon: Music4,
    },
    {
      title: "Tabiat bilan tanishuv",
      time: "16:00 - 16:40",
      description: "Bog' hududida kuzatishlar, daraxtlar va gullar bilan tanishuv.",
      Icon: Flower2,
    },
    {
      title: "Mantiqiy o'yinlar",
      time: "16:45 - 17:20",
      description: "Konstruktorlar, jumboqlar va jamoaviy topqirlik topshiriqlari.",
      Icon: Puzzle,
    },
  ],
  en: [
    {
      title: "Morning welcome",
      time: "08:00 - 09:00",
      description: "A warm welcome, free play, and a calm start to the day.",
      Icon: HeartHandshake,
    },
    {
      title: "Literacy and learning",
      time: "09:30 - 11:00",
      description: "Numbers, letters, storytelling, and logic-based games.",
      Icon: BookOpen,
    },
    {
      title: "Creative studios",
      time: "11:15 - 12:00",
      description: "Drawing, handcrafts, stage activities, and color exploration.",
      Icon: Brush,
    },
    {
      title: "Music and rhythm",
      time: "15:00 - 15:40",
      description: "Songs, movement games, and little stage performances.",
      Icon: Music4,
    },
    {
      title: "Nature discovery",
      time: "16:00 - 16:40",
      description: "Observation walks, trees, flowers, and outdoor discovery.",
      Icon: Flower2,
    },
    {
      title: "Logic games",
      time: "16:45 - 17:20",
      description: "Construction toys, puzzles, and collaborative thinking tasks.",
      Icon: Puzzle,
    },
  ],
  ru: [
    {
      title: "Утренний прием",
      time: "08:00 - 09:00",
      description: "Теплая встреча, свободная игра и мягкое начало дня.",
      Icon: HeartHandshake,
    },
    {
      title: "Грамота и знания",
      time: "09:30 - 11:00",
      description: "Цифры, буквы, рассказы и логические игры.",
      Icon: BookOpen,
    },
    {
      title: "Творческие студии",
      time: "11:15 - 12:00",
      description: "Рисование, поделки, сценические занятия и работа с цветом.",
      Icon: Brush,
    },
    {
      title: "Музыка и ритм",
      time: "15:00 - 15:40",
      description: "Песни, подвижные игры и маленькие выступления.",
      Icon: Music4,
    },
    {
      title: "Знакомство с природой",
      time: "16:00 - 16:40",
      description: "Наблюдения в саду, деревья, цветы и прогулки.",
      Icon: Flower2,
    },
    {
      title: "Логические игры",
      time: "16:45 - 17:20",
      description: "Конструкторы, пазлы и совместные задания на смекалку.",
      Icon: Puzzle,
    },
  ],
};

export function getDailyActivities(locale) {
  return activities[locale] ?? activities.uz;
}
