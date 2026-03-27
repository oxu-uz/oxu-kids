const MAP_LINK = "https://maps.app.goo.gl/5zqTqmHU62RTwrFL6";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Buxoro%20shahar%20Rudizar%20toyxona&output=embed";

const CONTACT_INFO = {
  uz: {
    noteTitle: "Biz bilan bemalol bog'laning",
    noteText:
      "OXU KIDS Buxoro shahrida bolajonlar uchun iliq, tartibli va ishonchli muhit yaratadi. Qabul, guruhlar va tashrif bo'yicha jamoamiz sizga mamnuniyat bilan yo'l-yo'riq beradi.",
    mapTitle: "OXU KIDS Buxoro joylashuvi",
    mapButton: "Google Maps'da ochish",
    footerAddress: "Buxoro shahar, Rudizar to'yxona ro'parasi",
    footerPhone: "+998 55 305 00 09",
    footerHours: "Dushanba - Shanba, 08:00 - 18:00",
    cards: [
      { key: "address", title: "Manzil", value: "Buxoro shahar", href: MAP_LINK },
      { key: "landmark", title: "Mo'ljal", value: "Rudizar to'yxona ro'parasi" },
      { key: "phone", title: "Telefon", value: "+998 55 305 00 09", href: "tel:+998553050009" },
      { key: "telegram", title: "Telegram", value: "@oxu_uz", href: "https://t.me/oxu_uz" },
      { key: "email", title: "Email", value: "oxu-kids@oxu.uz", href: "mailto:oxu-kids@oxu.uz" },
      { key: "hours", title: "Ish vaqti", value: "Dushanba - Shanba, 08:00 - 18:00" },
      { key: "dayOff", title: "Dam olish kuni", value: "Yakshanba" },
      { key: "instagram", title: "Instagram", value: "@oxu_kids", href: "https://instagram.com/oxu_kids" },
      { key: "facebook", title: "Facebook", value: "oxu_kids", href: "https://facebook.com/oxu_kids" },
    ],
  },
  en: {
    noteTitle: "Get in touch with confidence",
    noteText:
      "OXU KIDS in Bukhara offers a warm, structured, and trusted environment for children. Our team is happy to guide you on admissions, groups, and campus visits.",
    mapTitle: "OXU KIDS Bukhara location",
    mapButton: "Open in Google Maps",
    footerAddress: "Bukhara city, across from Rudizar wedding hall",
    footerPhone: "+998 55 305 00 09",
    footerHours: "Monday - Saturday, 08:00 - 18:00",
    cards: [
      { key: "address", title: "Address", value: "Bukhara city", href: MAP_LINK },
      { key: "landmark", title: "Landmark", value: "Across from Rudizar wedding hall" },
      { key: "phone", title: "Phone", value: "+998 55 305 00 09", href: "tel:+998553050009" },
      { key: "telegram", title: "Telegram", value: "@oxu_uz", href: "https://t.me/oxu_uz" },
      { key: "email", title: "Email", value: "oxu-kids@oxu.uz", href: "mailto:oxu-kids@oxu.uz" },
      { key: "hours", title: "Opening hours", value: "Monday - Saturday, 08:00 - 18:00" },
      { key: "dayOff", title: "Closed on", value: "Sunday" },
      { key: "instagram", title: "Instagram", value: "@oxu_kids", href: "https://instagram.com/oxu_kids" },
      { key: "facebook", title: "Facebook", value: "oxu_kids", href: "https://facebook.com/oxu_kids" },
    ],
  },
  ru: {
    noteTitle: "Свяжитесь с нами в удобное время",
    noteText:
      "OXU KIDS в Бухаре создает теплую, организованную и надежную среду для детей. Мы с радостью подскажем вам по вопросам приема, групп и визита в садик.",
    mapTitle: "Расположение OXU KIDS в Бухаре",
    mapButton: "Открыть в Google Maps",
    footerAddress: "Бухара, напротив ресторана Rudizar",
    footerPhone: "+998 55 305 00 09",
    footerHours: "Понедельник - Суббота, 08:00 - 18:00",
    cards: [
      { key: "address", title: "Адрес", value: "город Бухара", href: MAP_LINK },
      { key: "landmark", title: "Ориентир", value: "напротив ресторана Rudizar" },
      { key: "phone", title: "Телефон", value: "+998 55 305 00 09", href: "tel:+998553050009" },
      { key: "telegram", title: "Telegram", value: "@oxu_uz", href: "https://t.me/oxu_uz" },
      { key: "email", title: "Email", value: "oxu-kids@oxu.uz", href: "mailto:oxu-kids@oxu.uz" },
      { key: "hours", title: "Время работы", value: "Понедельник - Суббота, 08:00 - 18:00" },
      { key: "dayOff", title: "Выходной", value: "Воскресенье" },
      { key: "instagram", title: "Instagram", value: "@oxu_kids", href: "https://instagram.com/oxu_kids" },
      { key: "facebook", title: "Facebook", value: "oxu_kids", href: "https://facebook.com/oxu_kids" },
    ],
  },
};

export function getContactInfo(locale) {
  return CONTACT_INFO[locale] ?? CONTACT_INFO.uz;
}

export { MAP_EMBED_URL, MAP_LINK };
