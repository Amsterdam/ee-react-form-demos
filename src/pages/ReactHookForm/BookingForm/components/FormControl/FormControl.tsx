import type { ReactElement } from 'react';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

// Children need to be react-hook-form friendly form components
type FormControlProps<TFieldValues extends FieldValues> = {
  children(children: UseFormReturn<TFieldValues>): ReactElement;
};

const FormControl = <TFieldValues extends FieldValues>({
  children,
}: FormControlProps<TFieldValues>) => {
  const methods = useFormContext<TFieldValues>();
  return children({ ...methods });
};

export default FormControl;
