import { Button, Grid, Heading, Row } from '@amsterdam/design-system-react';
import BookingFormProvider from './BookingFormProvider';
import TextInputControl from './components/TextInputControl/TextInputControl';
import CheckboxControl from './components/CheckboxControl/CheckboxControl';
import TextAreaControl from './components/TextAreaControl/TextAreaControl';
import DateControl from './components/DateControl/DateControl';
import TimeControl from './components/TimeControl/TimeControl';
import { useCallback, useMemo } from 'react';
import FormProvider from './FormProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormRow from './components/FormFieldset/FormRow';

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
  const now = new Date();
  // const startDate = now.toISOString().split('T')[0];
  // console.log({ now, startDate });
  // For example, maxLength is 1 week (from the todayDate)
  // const endDate = useMemo(() => now.setDate(now.getDate() + 7), [startDate]);

  const methods = useForm<BookingFormData>({
    values: {
      name: '',
      email: '',
      startDate: now.toISOString().split('T')[0],
      startTime: now.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0],
      endTime: now.toISOString().split('T')[0],
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
  const isValidTimeRange = useMemo(() => {
    if (!startDateTime || !endDateTime) return true; // Skip validation if incomplete

    return endDateTime.getTime() > startDateTime.getTime(); // Simple numeric comparison!
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
          <FormRow>
            <DateControl<{ startDate: string }>
              label="Start date"
              name="startDate"
              testId="booking-create-start-date"
              registerOptions={{ required: true }}
              min={startDate}
            />

            <TimeControl<{ startTime: string }>
              label="Start time"
              name="startTime"
              testId="booking-create-start-time"
              registerOptions={{ required: true }}
            />
          </FormRow>
          <Row>
            <DateControl<{ endDate: string }>
              label="End date"
              name="endDate"
              testId="booking-create-end-date"
              registerOptions={{
                required: true,
                validate: () => isValidTimeRange,
             }}
              max={endDate}
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
          </Row>

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
