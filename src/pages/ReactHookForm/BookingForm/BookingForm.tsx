import { Button, Grid, Heading, Row } from '@amsterdam/design-system-react';
import BookingFormProvider from './BookingFormProvider';
import TextInputControl from './components/TextInputControl/TextInputControl';
import CheckboxControl from './components/CheckboxControl/CheckboxControl';
import TextAreaControl from './components/TextAreaControl/TextAreaControl';
import DateControl from './components/DateControl/DateControl';
import TimeControl from './components/TimeControl/TimeControl';

const BookingForm = () => {
  return (
    <BookingFormProvider>
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
            registerOptions={{ required: true }}
          />

          <TextInputControl<{ email: string }>
            label="E-mailadres"
            name="email"
            type="email"
            testId="booking-create-email"
            registerOptions={{ required: true }}
          />

          <Row>
            <DateControl<{ startDate: string }>
              label="Start date"
              name="startDate"
              testId="booking-create-start-date"
              registerOptions={{ required: true }}
            />

            <TimeControl<{ startTime: string }>
              label="Start time"
              name="startTime"
              testId="booking-create-start-time"
              registerOptions={{ required: true }}
            />
          </Row>
          <Row>
            <DateControl<{ endDate: string }>
              label="End date"
              name="endDate"
              testId="booking-create-end-date"
              registerOptions={{ required: true }}
            />

            <TimeControl<{ endTime: string }>
              label="End time"
              name="endTime"
              testId="booking-create-end-time"
              registerOptions={{ required: true }}
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

          <Button variant="primary">Submit</Button>
        </Grid.Cell>
      </Grid>
    </BookingFormProvider>
  );
};

export default BookingForm;
