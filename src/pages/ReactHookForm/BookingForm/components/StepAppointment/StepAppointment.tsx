import {
  Button,
  Grid,
  Heading,
  InvalidFormAlert,
  Paragraph,
  StandaloneLink,
} from '@amsterdam/design-system-react';
import { MouseEvent, useMemo } from 'react';
import { BookingFormData } from '../../BookingForm';
import { ChevronBackwardIcon } from '@amsterdam/design-system-react-icons';
import mapErrorsToAlert from '../../utils/mapErrorsToAlert';
import DateTimeFieldset from '../DateTimeFieldset/DateTimeFieldset';
import DateControl from '../DateControl/DateControl';
import TimeControl from '../TimeControl/TimeControl';
import { useFormContext } from 'react-hook-form';

interface StepAppointmentProps {
  minDateValue: string;
  disabled?: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

const StepAppointment = ({
  minDateValue,
  onPrevButtonClick,
  onNextButtonClick,
}: StepAppointmentProps) => {
  const {
    clearErrors,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext();
  const showErrors = Object.keys(errors).length > 0;
  const alertErrors = mapErrorsToAlert(errors);

  const [startDate, startTime, endDate, endTime] = watch([
    'startDate',
    'startTime',
    'endDate',
    'endTime',
  ]);

  const startDateTime = useMemo(() => {
    if (!startDate || !startTime) return null;
    return new Date(`${startDate}T${startTime}`);
  }, [startDate, startTime]);

  const endDateTime = useMemo(() => {
    if (!endDate || !endTime) return null;
    return new Date(`${endDate}T${endTime}`);
  }, [endDate, endTime]);

  const isValidDateRange = useMemo(() => {
    // Skip validation if values are incomplete
    if (!startDateTime || !endDateTime) return true;

    // It would logical to use a library like dayjs to validate date strings
    return new Date(endDate).getTime() >= new Date(startDate).getTime();
  }, [startDateTime, endDateTime]);

  const isValidTimeRange = useMemo(() => {
    // Skip validation if values are incomplete
    if (!startDateTime || !endDateTime) return true;
    // return endDateTime.getTime() > startDateTime.getTime();
    if (endDateTime.getTime() > startDateTime.getTime()) {
      return true;
    }

    return 'De einddatum en -tijd moeten later zijn dan de startdatum en -tijd';
  }, [startDateTime, endDateTime]);

  const handleNextButtonClick = async () => {
    const isValid = await trigger([
      'startDate',
      'startTime',
      'endDate',
      'endTime',
    ]);
    if (isValid) onNextButtonClick();
  };

  const handlePrevButtonClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    clearErrors();
    onPrevButtonClick();
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
            onClick={handlePrevButtonClick}
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

          {/* Enable noValidate to prevent browser validation blocking JS */}
          <form noValidate>
            <DateTimeFieldset
              legend="Startdatum en -tijd"
              fields={['startDate', 'startTime']}
            >
              <DateControl<BookingFormData>
                label="Startdatum"
                name="startDate"
                registerOptions={{
                  required: 'Startdatum is verplicht',
                }}
                min={minDateValue}
              />

              <TimeControl<BookingFormData>
                label="Starttijd"
                name="startTime"
                registerOptions={{ required: 'Starttijd is verplicht' }}
              />
            </DateTimeFieldset>
            <DateTimeFieldset
              legend="Einddatum-tijd"
              fields={['endDate', 'endTime']}
              className="ams-mb-xl"
            >
              <DateControl<BookingFormData>
                label="Einddatum"
                name="endDate"
                registerOptions={{
                  required: 'Einddatum is verplicht',
                  validate: () => isValidDateRange,
                }}
                min={startDate}
              />

              <TimeControl<BookingFormData>
                label="Eindtijd"
                name="endTime"
                registerOptions={{
                  required: 'Eindtijd is verplicht',
                  validate: () => isValidTimeRange,
                }}
              />
            </DateTimeFieldset>

            <Button type="button" onClick={handleNextButtonClick}>
              Volgende vraag
            </Button>
          </form>
        </Grid.Cell>
      </Grid>
    </>
  );
};

export default StepAppointment;
