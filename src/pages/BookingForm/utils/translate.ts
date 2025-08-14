// Prettify the labels
export const translations = {
  name: 'Name',
  email: 'E-mail',
  startDate: 'Start date',
  startTime: 'Start time',
  endDate: 'End date',
  endTime: 'End time',
  remote: 'Is the meeting remote?',
  comments: 'Additonal comments',
};

const t = (input: keyof typeof translations) => {
  return translations[input];
};

export default t;
