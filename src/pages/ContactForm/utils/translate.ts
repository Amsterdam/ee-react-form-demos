export const translations = {
  name: 'Voornaam',
  email: 'E-mailadres',
  body: 'Bericht',
};

const t = (input: keyof typeof translations) => {
  return translations[input];
};

export default t;
