import { PropsWithChildren, useMemo } from 'react';
import { ErrorMessage, FieldSet, Row } from '@amsterdam/design-system-react';
import { useFormContext } from 'react-hook-form';

const fieldNameMap = {
  startDate: 'Startdatum',
  startTime: 'Starttijd',
  endDate: 'Einddatum',
  endTime: 'Eindtijd',
};

interface DateTimeFieldsetProps {
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
        return `${fieldNameMap[fields[0] as keyof typeof fieldNameMap]} is verplicht.`;
      }

      return `${fieldNameMap[fields[0] as keyof typeof fieldNameMap]} en ${fieldNameMap[fields[1] as keyof typeof fieldNameMap]} is verplicht.`;
    };

    if (invalidFields.length) {
      return 'De einddatum en -tijd moeten later zijn dan de startdatum en -tijd';
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
