import { useCallback, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Grid, Heading } from '@amsterdam/design-system-react';
// import BookingFormProvider from './BookingFormProvider';
import TextInputControl from './components/TextInputControl/TextInputControl';
import CheckboxControl from './components/CheckboxControl/CheckboxControl';
import TextAreaControl from './components/TextAreaControl/TextAreaControl';
import DateControl from './components/DateControl/DateControl';
import TimeControl from './components/TimeControl/TimeControl';
import FormProvider from './FormProvider';
import DateTimeFieldset from './components/DateTimeFieldset/DateTimeFieldset';

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

// TODO fields display as invalid on load (HTML5 required)
// TODO validation messages
// TODO typescript issues in controls
// TODO zod variant
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// const bookingSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email'),
//   // ... other fields
// });

// const methods = useForm({
//   resolver: zodResolver(bookingSchema),
//   defaultValues: { /* ... */ }
// });
const BookingForm = () => {
  const nowDateTime = new Date();
  const nowDate = new Date().toISOString().split('T')[0];
  // console.log({ now, startDate });
  // For example, maxLength is 1 week (from the todayDate)
  // const endDate = useMemo(() => now.setDate(now.getDate() + 7), [startDate]);

  const methods = useForm<BookingFormData>({
    defaultValues: {
      name: '',
      email: '',
      startDate: nowDateTime.toISOString().split('T')[0],
      startTime: nowDateTime.toISOString().split('T')[1],
      endDate: nowDateTime.toISOString().split('T')[0],
      endTime: nowDateTime.toISOString().split('T')[1],
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
    console.log(`${startDate}T${startTime}`);
    return new Date(`${startDate}T${startTime}`);
  }, [startDate, startTime]);

  const endDateTime = useMemo(() => {
    if (!endDate || !endTime) return null;
    console.log(`${endDate}T${endTime}`);
    return new Date(`${endDate}T${endTime}`);
  }, [endDate, endTime]);

  const isValidDateRange = useMemo(() => {
    // Skip validation if values are incomplete
    if (!startDateTime || !endDateTime) return true;

    // TODO add check for if Date
    return new Date(endDate).getTime() >= new Date(startDate).getTime();
  }, [startDateTime, endDateTime]);

  const isValidTimeRange = useMemo(() => {
    // Skip validation if values are incomplete
    if (!startDateTime || !endDateTime) return true;
    return endDateTime.getTime() > startDateTime.getTime();
  }, [startDateTime, endDateTime]);

  const onValid: SubmitHandler<BookingFormData> = useCallback(async () => {
    // if (!dirtyFields.surveyedOn) {
    //   // make sure we keep the original value
    //   dataFromForm.surveyedOn = dateValueToIsoString(
    //     spanInstallationSurvey.surveyedOn
    //   );
    // }

    try {
      console.log('submit!');
      // await handleSurveyCompletionSubmit(surveyId, dataFromForm);
      // showToastMessage(translate('survey.submitSuccess'), {
      //   type: TYPE.SUCCESS,
      // });
      // dispatch(fetchSpanInstallationSurvey(surveyId));
    } catch (error) {
      console.log('form error!', error);
      // showToastMessage(translate('survey.submitError'), {
      // type: TYPE.ERROR,
      // });
    }
  }, []);

  return (
    // <BookingFormProvider>
    <FormProvider methods={methods} onValidSubmit={onValid}>
      <Grid paddingBottom="x-large" paddingTop="large">
        <Grid.Cell
          span={{ narrow: 4, medium: 8, wide: 8 }}
          className="ams-mb-xl"
        >
          <Heading level={1} size="level-3" className="ams-mb-m">
            Booking Form
          </Heading>

          {/* This component is 'uncontrolled' (in ReactHookForm terms), as it
          uses register inside the TextInput */}
          <TextInputControl<{ name: string }>
            label="Name"
            name="name"
            description="Your first or full name"
            testId="booking-create-name"
            registerOptions={{
              required: true,
            }}
          />

          <TextInputControl<{ email: string }>
            label="E-mailadres"
            name="email"
            type="email"
            testId="booking-create-email"
            registerOptions={{ required: true }}
          />

          {/* TODO: Move error handling above components to avoid
          alignment issues between date + time if one is invalid and the other not */}
          <DateTimeFieldset
            legend="Start date and time"
            fields={['startDate', 'startTime']}
          >
            <DateControl<{ startDate: string }>
              label="Start date"
              name="startDate"
              testId="booking-create-start-date"
              registerOptions={{
                required: true,
              }}
              min={nowDate}
            />

            <TimeControl<{ startTime: string }>
              label="Start time"
              name="startTime"
              testId="booking-create-start-time"
              registerOptions={{ required: true }}
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
                required: true,
                validate: () => isValidDateRange,
              }}
              min={startDate}
            />

            <TimeControl<{ endTime: string }>
              label="End time"
              name="endTime"
              testId="booking-create-end-time"
              registerOptions={{
                required: true,
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

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Grid.Cell>
      </Grid>
      {/* </BookingFormProvider> */}
    </FormProvider>
  );
};

export default BookingForm;
