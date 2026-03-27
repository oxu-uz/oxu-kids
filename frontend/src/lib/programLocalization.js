const PROGRAM_TRANSLATIONS = {
  "Kichik Qadamlar": {
    en: {
      title: "Little Steps",
      description:
        "A gentle adaptation program for ages 3-4 focused on speech, sensory play, and safe social development.",
    },
    ru: {
      title: "Маленькие шаги",
      description:
        "Мягкая адаптационная программа для детей 3-4 лет с упором на речь, сенсорные игры и безопасную социализацию.",
    },
  },
  "Ijodkorlar Bog'i": {
    en: {
      title: "Garden of Creators",
      description:
        "A 4-5 age program filled with art, music, theatre, nature discovery, and collaborative play.",
    },
    ru: {
      title: "Сад творцов",
      description:
        "Программа для детей 4-5 лет с рисованием, музыкой, театром, знакомством с природой и командными играми.",
    },
  },
  "Bilimga Parvoz": {
    en: {
      title: "Flight to Knowledge",
      description:
        "A 5-7 age program with school readiness, logic development, English, and confident early learning.",
    },
    ru: {
      title: "Полет к знаниям",
      description:
        "Программа для детей 5-7 лет с подготовкой к школе, логикой, английским языком и уверенным ранним обучением.",
    },
  },
};

export function formatAgeGroup(ageGroup, locale) {
  if (locale === "en") {
    return `${ageGroup} years`;
  }

  if (locale === "ru") {
    return `${ageGroup} лет`;
  }

  return `${ageGroup} yosh`;
}

export function localizeProgram(program, locale) {
  if (!program) {
    return program;
  }

  const translation = PROGRAM_TRANSLATIONS[program.title]?.[locale];

  return {
    ...program,
    title: translation?.title ?? program.title,
    description: translation?.description ?? program.description,
  };
}
