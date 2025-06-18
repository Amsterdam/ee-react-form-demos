import { ZodError } from 'zod/v4';

const findRelevantError = (error: ZodError, fieldPath: string) => {
  return error.issues.find(err => {
    const errorPath = err.path.join('.');

    if (fieldPath.startsWith('links.')) {
      return (
        errorPath.includes('links') &&
        (errorPath === fieldPath ||
          errorPath.endsWith(fieldPath.split('.').pop() || ''))
      );
    }

    return (
      errorPath === fieldPath ||
      (fieldPath.startsWith('spec.') && errorPath === fieldPath.split('.')[1])
    );
  });
};

export default findRelevantError;
