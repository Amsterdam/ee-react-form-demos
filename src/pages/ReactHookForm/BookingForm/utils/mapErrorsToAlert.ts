import { ErrorLink } from '@amsterdam/design-system-react';
import { FieldErrors, FieldValues } from 'react-hook-form';

const mapErrorsToAlert = (errors: FieldErrors<FieldValues>) =>
  Object.entries(errors).map(([key, error]) => ({
    id: `#${key}`,
    label: error?.message,
  })) as ErrorLink[];

export default mapErrorsToAlert;
