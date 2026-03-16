import { PropsWithChildren, useMemo } from 'react';
import { ErrorMessage, FieldSet, Row } from '@amsterdam/design-system-react';

const fieldNameMap = {
  startDate: 'Startdatum',
  startTime: 'Starttijd',
  endDate: 'Einddatum',
  endTime: 'Eindtijd',
};

interface DateTimeFieldsetProps {
  legend: string;
  fields: string[];
  errors: Record<string, string | undefined>;
  className?: string;
}

const DateTimeFieldset = ({
  children,
  legend,
  fields,
  errors,
  className = 'ams-mb-m',
}: DateTimeFieldsetProps & PropsWithChildren) => {
  const hasError = fields.some(field => errors[field]);

  const errorMessage = useMemo(() => {
    const requiredFields: string[] = [];
    const invalidFields: string[] = [];

    for (const field of fields) {
      if (errors?.[field] === undefined) continue;

      const type = errors?.[field]?.includes('verplicht')
        ? 'required'
        : 'invalid';

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
  }, [errors]);

  return (
    <FieldSet legend={legend} className={className} invalid={!!hasError}>
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
