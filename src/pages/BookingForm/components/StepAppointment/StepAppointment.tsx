import {
  Button,
  Grid,
  Heading,
  InvalidFormAlert,
  Paragraph,
  Row,
  StandaloneLink,
} from '@amsterdam/design-system-react';
import { ChangeEvent, useMemo, useState } from 'react';
import { FormData } from '../../BookingForm';
import { ChevronBackwardIcon } from '@amsterdam/design-system-react-icons';
import FormDateInput from '../FormDateInput/FormDateInput';
import FormTimeInput from '../FormTimeInput/FormTimeInput';
import mapErrorsToAlert from '../../utils/mapErrorsToAlert';
import DateTimeFieldset from '../DateTimeFieldset/DateTimeFieldset';

interface StepAppointmentProps {
  formData: FormData;
  minDateValue: string;
  errors: Record<string, string>;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

const StepAppointment = ({
  formData,
  minDateValue,
  errors,
  onChange,
  onPrevButtonClick,
  onNextButtonClick,
}: StepAppointmentProps) => {
  const [submitTouched, setSubmitTouched] = useState(false);
  const showErrors = submitTouched && Object.keys(errors).length > 0;
  const alertErrors = mapErrorsToAlert(errors);
  const startErrors = useMemo(() => {
    return {
      ...(submitTouched &&
        errors.startDate !== undefined && { startDate: errors.startDate }),
      ...(submitTouched &&
        errors.startTime !== undefined && { startTime: errors.startTime }),
    };
  }, [errors]);
  const endErrors = useMemo(() => {
    return {
      ...(submitTouched &&
        errors.endDate !== undefined && { endDate: errors.endDate }),
      ...(submitTouched &&
        errors.endTime !== undefined && { endTime: errors.endTime }),
    };
  }, [errors]);

  const handleNextButtonClick = () => {
    setSubmitTouched(true);
    onNextButtonClick();
  };

  return (
    <>
      <Grid className="ams-mb-xl">
        <Grid.Cell
          span={{ narrow: 4, medium: 6, wide: 7 }}
          start={{ narrow: 1, medium: 2, wide: 3 }}
        >
          <StandaloneLink
            href="#"
            icon={ChevronBackwardIcon}
            onClick={e => {
              e.preventDefault();
              onPrevButtonClick();
            }}
          >
            Vorige vraag
          </StandaloneLink>
        </Grid.Cell>
      </Grid>
      <Grid as="main" paddingBottom="2x-large">
        <Grid.Cell
          span={{ narrow: 4, medium: 6, wide: 7 }}
          start={{ narrow: 1, medium: 2, wide: 3 }}
        >
          {/*
           * Notifying a user of errors is threefold:
           * - We add the error count to the document title, so it is the first
           * thing a screen reader user hears.
           * - We show the Invalid Form Alert at the top of the main container.
           * - We add error messages next to the relevant form fields.
           * For more info, see: https://designsystem.amsterdam/?path=/docs/components-forms-invalid-form-alert--docs
           */}
          {showErrors && (
            <InvalidFormAlert
              errors={alertErrors}
              headingLevel={4}
              className="ams-mb-m"
            />
          )}

          <header aria-labelledby="form-header" className="ams-mb-m ams-gap-xs">
            <Heading aria-hidden id="form-header" level={2} size="level-4">
              Afspraak maken
            </Heading>
            {/*
              * Start by testing your form without a progress indicator to see
              if it’s simple enough that users do not need one.
              * If you do, use a simple one like this one.
              * For more info, see: https://design-system.service.gov.uk/patterns/question-pages/#using-progress-indicators
              */}
            <Paragraph>Stap 2 van 3: Afspraak</Paragraph>
          </header>

          <DateTimeFieldset
            legend="Startdatum en -tijd"
            fields={['startDate', 'startTime']}
            errors={startErrors}
          >
            <Row>
              <FormDateInput
                id="startDate"
                name="startDate"
                label="Startdatum"
                value={formData.startDate}
                onChange={onChange}
                minValue={minDateValue}
                error={submitTouched ? !!errors.startDate : undefined}
              />
              <FormTimeInput
                id="startTime"
                name="startTime"
                label="Starttijd"
                value={formData.startTime}
                onChange={onChange}
                error={submitTouched ? !!errors.startTime : undefined}
              />
            </Row>
          </DateTimeFieldset>

          <DateTimeFieldset
            legend="Einddatum en -tijd"
            fields={['endDate', 'endTime']}
            errors={endErrors}
          >
            <Row>
              <FormDateInput
                id="endDate"
                name="endDate"
                label="Einddatum"
                value={formData.endDate}
                onChange={onChange}
                minValue={formData.startDate}
                error={submitTouched ? !!errors.endDate : undefined}
              />
              <FormTimeInput
                id="endTime"
                name="endTime"
                label="Eindtijd"
                value={formData.endTime}
                onChange={onChange}
                error={submitTouched ? !!errors.endTime : undefined}
              />
            </Row>
          </DateTimeFieldset>

          <Button type="button" onClick={handleNextButtonClick}>
            Volgende vraag
          </Button>
        </Grid.Cell>
      </Grid>
    </>
  );
};

export default StepAppointment;
