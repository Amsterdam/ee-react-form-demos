import { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Fake data
const bookingSession = {
  name: 'A Foobar',
  email: 'a.foobar@amsterdam.nl',
  startDate: new Date().toISOString().split('T')[0],
  startTime: '10:00',
  endDate: '2025-06-30',
  endTime: '11:30',
  remote: false,
  comments: '',
};

const BookingFormProvider = ({ children }: PropsWithChildren) => {
  const form = useForm({
    defaultValues: bookingSession ?? {
      startTime: Date.now(),
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export default BookingFormProvider;
