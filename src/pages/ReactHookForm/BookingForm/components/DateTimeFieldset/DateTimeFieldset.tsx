import { PropsWithChildren, useMemo } from 'react';
import { ErrorMessage, FieldSet, Row } from '@amsterdam/design-system-react';
import { useFormContext } from 'react-hook-form';

interface DateTimeFieldsetProps {
  errorFields?: string[]; // Array of field names to check for errors
  legend: string;
  fields: string[];
}

const DateTimeFieldset = ({
  children,
  legend,
  fields,
}: DateTimeFieldsetProps & PropsWithChildren) => {
  const { formState } = useFormContext();
  const hasError = fields.some(
    field => formState.errors[field] && formState.errors[field]?.message
  );

  const errorMessage = useMemo(() => {
    const erroredFields = fields.filter(field => formState.errors?.[field]);

    if (erroredFields.length === 1) {
      return `The ${erroredFields[0]} field is required.`;
    } else if (erroredFields.length > 1) {
      const lastField = erroredFields.pop();
      return `The fields ${erroredFields.join(', ')} and ${lastField} are required.`;
    }

    return undefined;
  }, [formState.errors]);

  console.log({ formState });
  return (
    <FieldSet legend={legend} className="ams-mb-m" invalid={!!hasError}>
      {hasError && (
        <Row>
          <ErrorMessage id={`${fields[0]}-error`}>{errorMessage}</ErrorMessage>
        </Row>
      )}
      <Row>{children}</Row>
    </FieldSet>
  );
};

export default DateTimeFieldset;
