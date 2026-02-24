// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapErrorsToAlert = (input: any) => {
  const result: { label: string; id: string }[] = [];

  for (const key in input) {
    if (input[key]) {
      if (key.startsWith('links.')) {
        result.push({
          label: `Links - ${input[key]}`,
          id: `#${key.replace(/\./g, '-')}`,
        });
      } else {
        result.push({ label: input[key], id: `#${key.replace(/\./g, '-')}` });
      }
    }
  }

  return result;
};

export default mapErrorsToAlert;
