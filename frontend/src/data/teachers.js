const teachers = {
  uz: [
    {
      id: 1,
      name: "Malika Xasanova",
      role: "Maktabga tayyorlov murabbiyi",
      description:
        "10 yillik tajribaga ega pedagog. Bolalarda o'qishga qiziqish va ishonchli nutqni shakllantirishga ixtisoslashgan.",
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Dilnoza Abdukarimova",
      role: "Ijod va musiqiy rivojlanish ustozasi",
      description:
        "Ranglar, ritm va sahna mashg'ulotlari orqali bolalarda ijodiy fikrlash va jamoaviy ishlash ko'nikmalarini rivojlantiradi.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Shahlo Tojiboyeva",
      role: "Erta rivojlanish bo'yicha metodist",
      description:
        "Montessori va o'yin asosidagi metodikalarni uyg'unlashtirib, bolalarning mustaqilligi va qiziqishini qo'llab-quvvatlaydi.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
    },
  ],
  en: [
    {
      id: 1,
      name: "Malika Xasanova",
      role: "School readiness mentor",
      description:
        "A teacher with 10 years of experience specializing in reading interest, confident speech, and early academic readiness.",
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Dilnoza Abdukarimova",
      role: "Creative and music teacher",
      description:
        "Develops creativity and teamwork through color, rhythm, movement, and playful stage activities.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Shahlo Tojiboyeva",
      role: "Early development methodologist",
      description:
        "Combines Montessori and play-based learning to support curiosity, independence, and joyful growth.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
    },
  ],
  ru: [
    {
      id: 1,
      name: "Malika Xasanova",
      role: "Наставник по подготовке к школе",
      description:
        "Педагог с 10-летним опытом, развивающий интерес к чтению, уверенную речь и готовность к школе.",
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Dilnoza Abdukarimova",
      role: "Педагог по творчеству и музыке",
      description:
        "Развивает творческое мышление и командную работу через цвет, ритм, движение и игровые выступления.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Shahlo Tojiboyeva",
      role: "Методист раннего развития",
      description:
        "Сочетает подход Montessori и игровое обучение, поддерживая самостоятельность и интерес детей.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
    },
  ],
};

export function getTeachers(locale) {
  return teachers[locale] ?? teachers.uz;
}
