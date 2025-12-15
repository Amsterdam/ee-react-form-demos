// eslint-disable-next-line @typescript-eslint/no-explicit-any
const collectErrorMessages = (obj: any): { [key: string]: string } => {
  const result: { [key: string]: string } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function helper(innerObj: any, prefix: string) {
    for (const key in innerObj) {
      if (innerObj[key] && typeof innerObj[key] === 'object') {
        // If object has a 'message' property, add it to result
        if (innerObj[key].message) {
          if (prefix.startsWith('annotations')) {
            result[`${prefix}${key}`] =
              `Annotations - ${innerObj[key].message}`;
          } else if (prefix.startsWith('links')) {
            result[`${prefix}${key}`] = `Links - ${innerObj[key].message}`;
          } else {
            result[`${prefix}${key}`] = innerObj[key].message;
          }
        }

        // Recursively handle child objects
        helper(innerObj[key], prefix === 'spec' ? key : `${prefix}${key}.`);
      }
    }
  }

  helper(obj, '');
  return result;
};

export default collectErrorMessages;
