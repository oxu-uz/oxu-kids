import classroomPlay from "../assets/photos/classroom-play.jpeg";
import friendshipRainbow from "../assets/photos/friendship-rainbow.png";
import gardenDiscovery from "../assets/photos/garden-discovery.webp";
import harvestGroup from "../assets/photos/harvest-group.jpg";
import harvestSmiles from "../assets/photos/harvest-smiles.jpg";
import heroArtClass from "../assets/photos/hero-art-class.jpg";
import readingFloor from "../assets/photos/reading-floor.jpg";
import sunnyBlocks from "../assets/photos/sunny-blocks.jpeg";
import wateringGarden from "../assets/photos/watering-garden.jpg";

export const homeHeroImages = {
  primary: heroArtClass,
  secondaryTop: friendshipRainbow,
  secondaryBottom: sunnyBlocks,
};

export const homeStoryImages = {
  classroom: classroomPlay,
  reading: readingFloor,
  garden: gardenDiscovery,
  watering: wateringGarden,
  harvest: harvestSmiles,
};

const baseGalleryItems = [
  {
    id: 1,
    image: heroArtClass,
    cardClassName: "md:col-span-2 xl:col-span-7 xl:row-span-2",
    imageClassName: "aspect-[16/11] xl:aspect-[16/14]",
  },
  {
    id: 2,
    image: readingFloor,
    cardClassName: "md:col-span-1 xl:col-span-5",
    imageClassName: "aspect-[16/11]",
  },
  {
    id: 3,
    image: friendshipRainbow,
    cardClassName: "md:col-span-1 xl:col-span-5",
    imageClassName: "aspect-[16/11]",
  },
  {
    id: 4,
    image: gardenDiscovery,
    cardClassName: "md:col-span-1 xl:col-span-4",
    imageClassName: "aspect-[4/3]",
  },
  {
    id: 5,
    image: harvestGroup,
    cardClassName: "md:col-span-1 xl:col-span-4",
    imageClassName: "aspect-[4/3]",
  },
  {
    id: 6,
    image: wateringGarden,
    cardClassName: "md:col-span-1 xl:col-span-4",
    imageClassName: "aspect-[4/3]",
  },
  {
    id: 7,
    image: classroomPlay,
    cardClassName: "md:col-span-1 xl:col-span-3",
    imageClassName: "aspect-[4/3]",
  },
  {
    id: 8,
    image: sunnyBlocks,
    cardClassName: "md:col-span-1 xl:col-span-3",
    imageClassName: "aspect-[4/3]",
  },
  {
    id: 9,
    image: harvestSmiles,
    cardClassName: "md:col-span-2 xl:col-span-6",
    imageClassName: "aspect-[16/10]",
  },
];

const galleryLayoutPresets = baseGalleryItems.map(({ cardClassName, imageClassName }) => ({
  cardClassName,
  imageClassName,
}));

const galleryCopy = {
  uz: [
    {
      id: 1,
      title: "Ranglar bilan ilk ijod",
      category: "Ijod",
      description: "Chizish, rang tanlash va nozik motorikani rivojlantiruvchi darslar.",
    },
    {
      id: 2,
      title: "Kitob bilan do'stlashuv",
      category: "Ta'lim",
      description: "O'qishga qiziqish uyg'otadigan yorug' va qulay makon.",
    },
    {
      id: 3,
      title: "Birga kulgan bolalik",
      category: "Do'stlik",
      description: "Jamoa bo'lib o'ynash va bir-birini qo'llab-quvvatlash muhiti.",
    },
    {
      id: 4,
      title: "Tabiatni kashf etamiz",
      category: "Bog'",
      description: "Tabiat bilan ishlash orqali kuzatish va sabr ko'nikmalari mustahkamlanadi.",
    },
    {
      id: 5,
      title: "Hosil bilan faxrlanamiz",
      category: "Ochiq maydon",
      description: "Bolalar mehnat natijasini ko'rib, mas'uliyatni his qiladi.",
    },
    {
      id: 6,
      title: "Birga parvarish qilamiz",
      category: "Amaliy tajriba",
      description: "Har bir kichik vazifa g'amxo'rlik va e'tibor madaniyatini tarbiyalaydi.",
    },
    {
      id: 7,
      title: "Quvnoq o'yin maydoni",
      category: "Faoliyat",
      description: "Konstruktor, o'yin va harakatli mashg'ulotlar uchun iliq sinfxona.",
    },
    {
      id: 8,
      title: "Quyoshli bolalar olami",
      category: "Muhit",
      description: "Yorug' makon va rangli o'yinlar bolalarda erkinlik tuyg'usini kuchaytiradi.",
    },
    {
      id: 9,
      title: "Tabassumga to'la kun",
      category: "Baxtli lahzalar",
      description: "Bog'cha hayoti samimiy, iliq va unutilmas xotiralarga boy bo'ladi.",
    },
  ],
  en: [
    {
      id: 1,
      title: "First creative colors",
      category: "Creativity",
      description: "Drawing, color choice, and fine motor skill development.",
    },
    {
      id: 2,
      title: "Making friends with books",
      category: "Learning",
      description: "A bright and comfortable reading space that inspires curiosity.",
    },
    {
      id: 3,
      title: "Childhood full of smiles",
      category: "Friendship",
      description: "A place where children play together and support each other.",
    },
    {
      id: 4,
      title: "Discovering nature",
      category: "Garden",
      description: "Working with nature strengthens observation and patience.",
    },
    {
      id: 5,
      title: "Proud of the harvest",
      category: "Outdoor",
      description: "Children see the results of their effort and feel responsibility.",
    },
    {
      id: 6,
      title: "Growing together",
      category: "Hands-on learning",
      description: "Each small task builds care, attention, and confidence.",
    },
    {
      id: 7,
      title: "Joyful playroom",
      category: "Activity",
      description: "A warm classroom for building, movement, and playful discovery.",
    },
    {
      id: 8,
      title: "A sunny world for kids",
      category: "Environment",
      description: "Light-filled spaces and colorful games encourage freedom and joy.",
    },
    {
      id: 9,
      title: "A day full of smiles",
      category: "Happy moments",
      description: "Kindergarten life is warm, sincere, and full of memorable moments.",
    },
  ],
  ru: [
    {
      id: 1,
      title: "Первые творческие краски",
      category: "Творчество",
      description: "Рисование, выбор цвета и развитие мелкой моторики.",
    },
    {
      id: 2,
      title: "Дружба с книгой",
      category: "Обучение",
      description: "Светлое и уютное пространство, пробуждающее интерес к чтению.",
    },
    {
      id: 3,
      title: "Детство в улыбках",
      category: "Дружба",
      description: "Место, где дети играют вместе и поддерживают друг друга.",
    },
    {
      id: 4,
      title: "Открываем природу",
      category: "Сад",
      description: "Работа с природой развивает наблюдательность и терпение.",
    },
    {
      id: 5,
      title: "Гордимся урожаем",
      category: "Открытый воздух",
      description: "Дети видят результат своего труда и чувствуют ответственность.",
    },
    {
      id: 6,
      title: "Заботимся вместе",
      category: "Практический опыт",
      description: "Каждое небольшое задание воспитывает заботу и внимательность.",
    },
    {
      id: 7,
      title: "Веселая игровая комната",
      category: "Активность",
      description: "Теплый класс для конструкторов, движения и игровых занятий.",
    },
    {
      id: 8,
      title: "Солнечный мир детей",
      category: "Среда",
      description: "Светлое пространство и яркие игры дарят чувство свободы и радости.",
    },
    {
      id: 9,
      title: "День, полный улыбок",
      category: "Счастливые моменты",
      description: "Жизнь в садике теплая, искренняя и наполнена яркими воспоминаниями.",
    },
  ],
};

export function getGalleryItems(locale) {
  const localizedItems = galleryCopy[locale] ?? galleryCopy.uz;

  return localizedItems.map((item, index) => ({
    ...baseGalleryItems[index],
    ...item,
  }));
}

export function applyGalleryLayout(items) {
  return items.map((item, index) => {
    const preset = galleryLayoutPresets[index % galleryLayoutPresets.length] ?? {};

    return {
      ...preset,
      ...item,
      image: item.image ?? item.imageUrl,
    };
  });
}
