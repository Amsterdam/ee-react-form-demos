// eslint-disable-next-line @typescript-eslint/no-explicit-any
const collectErrorMessages = (input: any) => {
  const result: { [key: string]: string } = {};

  for (const key in input) {
    if (input[key] && input[key].message) {
      result[key] = input[key].message;
    }
  }

  return result;
};

export default collectErrorMessages;
