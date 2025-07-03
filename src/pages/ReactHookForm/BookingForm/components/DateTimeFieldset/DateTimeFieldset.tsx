import { PropsWithChildren } from 'react';
import { FieldSet, Row } from '@amsterdam/design-system-react';
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

  return (
    <FieldSet legend={legend} className="ams-mb-m" invalid={!!hasError}>
      <Row>{children}</Row>
    </FieldSet>
  );
};

export default DateTimeFieldset;
