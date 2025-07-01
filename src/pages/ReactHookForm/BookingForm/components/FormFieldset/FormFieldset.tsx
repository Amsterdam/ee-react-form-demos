import { useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';

interface FormFieldsetProps {
  children: ReactNode;
  errorFields?: string[]; // Array of field names to check for errors
  className?: string;
}

const FormFieldset = ({
  children,
  errorFields = [],
  className,
}: FormFieldsetProps) => {
  const { formState } = useFormContext();

  // Check if any of the specified fields have errors
  const hasAnyError = errorFields.some(
    fieldName => formState.errors[fieldName]
  );

  // You can apply conditional styling based on hasAnyError
  const rowClassName = `
    ${className || ''}
    ${hasAnyError ? 'row-with-error' : ''}
  `.trim();

  return (
    <div className={rowClassName} data-has-error={hasAnyError}>
      {children}
    </div>
  );
};

export default FormFieldset;
