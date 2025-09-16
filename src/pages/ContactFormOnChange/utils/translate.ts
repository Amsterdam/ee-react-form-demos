// Prettify the labels
export const translations = {
  name: 'First name',
  email: 'Email address',
  body: 'Message',
};

const t = (input: keyof typeof translations) => {
  return translations[input];
};

export default t;
