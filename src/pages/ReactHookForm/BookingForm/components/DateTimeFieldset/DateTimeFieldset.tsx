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
    const requiredFields: string[] = [];
    const invalidFields: string[] = [];

    for (const field of fields) {
      const type = formState.errors?.[field]?.type;

      if (!type) continue;

      if (type === 'required') {
        requiredFields.push(field);
      } else {
        invalidFields.push(field);
      }
    }

    const formatFields = (fields: string[]) => {
      if (fields.length === 0) return '';

      if (fields.length === 1) {
        return `The ${fields[0]} field is required.`;
      }

      const last = fields.pop();
      return `The fields ${fields.join(', ')} and ${last} are required.`;
    };

    if (invalidFields.length) {
      return 'The end date and time must be later than the start date and time.';
    }

    const requiredMsg = formatFields(requiredFields);

    return requiredMsg || undefined;
  }, [formState]);

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
