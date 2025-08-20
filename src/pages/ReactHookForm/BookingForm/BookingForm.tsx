import { useCallback, useMemo, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Grid,
  Heading,
  Paragraph,
  Row,
} from '@amsterdam/design-system-react';
import TextInputControl from './components/TextInputControl/TextInputControl';
import CheckboxControl from './components/CheckboxControl/CheckboxControl';
import TextAreaControl from './components/TextAreaControl/TextAreaControl';
import DateControl from './components/DateControl/DateControl';
import TimeControl from './components/TimeControl/TimeControl';
import DateTimeFieldset from './components/DateTimeFieldset/DateTimeFieldset';
import Loader from '@/components/Loader/Loader';
import styles from './BookingForm.module.css';

interface BookingFormData {
  name: string;
  email: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  remote: boolean;
  comments: string;
}

const BookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nowDateTime = new Date();
  const nowDate = new Date().toISOString().split('T')[0];

  const methods = useForm<BookingFormData>({
    // Uncomment for validation onChange
    // mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      startDate: nowDateTime.toISOString().split('T')[0],
      startTime: '',
      endDate: '',
      endTime: '',
      remote: false,
      comments: '',
    },
  });
  const [startDate, startTime, endDate, endTime] = methods.watch([
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

    return 'This field has an invalid value.';
  }, [startDateTime, endDateTime]);

  const onValidSubmit: SubmitHandler<BookingFormData> =
    useCallback(async () => {
      try {
        /**
         * Use setTimeout to Simulate API call
         * - Here's where validation can happen
         * - Here's where you can show a post-submission success component
         * or redirect the user to a new page
         */
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          setIsSubmitted(true);
        }, 1500);
      } catch (error) {
        console.log('form error!', error);
      }
    }, []);

  return (
    <Grid paddingBottom="x-large" paddingTop="large">
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 8 }} className="ams-mb-xl">
        {/* Fake loader to simulate API request */}
        {isLoading && <Loader />}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onValidSubmit)}>
            <Heading level={1} size="level-3" className="ams-mb-m">
              Booking Form
            </Heading>

            <Paragraph className="ams-mb-m">
              This form is an example of a generic booking form. The key
              validation is with checking that the <strong>End date</strong> and{' '}
              <strong>End time</strong> fields are not older than the{' '}
              <strong>Start date</strong> and <strong>Start time</strong>{' '}
              fields.
            </Paragraph>
            <Paragraph className="ams-mb-m">
              The goal of this demo is to illustrate how to handle cross-field
              validation in forms. While individual field rules (e.g.
              &quot;email must be valid&quot;) are straightforward, checking
              relationships between multiple fields—such as ensuring the end of
              a booking is after the start—requires more advanced validation
              logic.
            </Paragraph>

            {/* This component is 'uncontrolled' (in ReactHookForm terms), as it
            uses register inside the TextInput */}
            <TextInputControl<{ name: string }>
              label="Name"
              name="name"
              description="Your first or full name"
              testId="booking-create-name"
              registerOptions={{
                required: 'This field is required.',
              }}
            />

            <TextInputControl<{ email: string }>
              label="E-mailadres"
              name="email"
              type="email"
              testId="booking-create-email"
              registerOptions={{ required: 'This field is required.' }}
            />

            <DateTimeFieldset
              legend="Start date and time"
              fields={['startDate', 'startTime']}
            >
              <DateControl<{ startDate: string }>
                label="Start date"
                name="startDate"
                testId="booking-create-start-date"
                registerOptions={{
                  required: 'This field is required.',
                }}
                min={nowDate}
              />

              <TimeControl<{ startTime: string }>
                label="Start time"
                name="startTime"
                testId="booking-create-start-time"
                registerOptions={{ required: 'This field is required.' }}
              />
            </DateTimeFieldset>
            <DateTimeFieldset
              legend="End date and time"
              fields={['endDate', 'endTime']}
            >
              <DateControl<{ endDate: string }>
                label="End date"
                name="endDate"
                testId="booking-create-end-date"
                registerOptions={{
                  required: 'This field is required.',
                  validate: () => isValidDateRange,
                }}
                min={startDate}
              />

              <TimeControl<{ endTime: string }>
                label="End time"
                name="endTime"
                testId="booking-create-end-time"
                registerOptions={{
                  required: 'This field is required.',
                  validate: () => isValidTimeRange,
                }}
              />
            </DateTimeFieldset>

            <CheckboxControl<{ remote: boolean }>
              label="Is the meeting remote?"
              name="remote"
              description="For remote meetings a video call invite will be sent in advance"
            />

            <TextAreaControl<{ comments: string }>
              label="Additional comments"
              name="comments"
              testId="booking-create-comments"
              className="ams-mb-m"
            />

            <Row>
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => methods.reset()}
              >
                Reset
              </Button>
            </Row>
          </form>
        </FormProvider>

        {/* Fake placeholder for post-submission state */}
        {isSubmitted && (
          <div className={styles.success}>
            <Alert
              closeable
              heading="Gelukt"
              headingLevel={2}
              severity="success"
              onClose={() => {
                setIsLoading(false);
                setIsSubmitted(false);
              }}
            >
              <Paragraph>
                Het formulier is verzonden. We hebben uw gegevens goed
                ontvangen.
              </Paragraph>
            </Alert>
          </div>
        )}
      </Grid.Cell>
    </Grid>
  );
};

export default BookingForm;
