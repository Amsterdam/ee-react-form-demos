import { z } from 'zod';

export const baseBookingSchema = z.object({
  name: z.string().min(1, 'Vul uw voornaam in'),
  email: z
    .string()
    .email('Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl'),
  startDate: z.string().min(1, 'Vul een startdatum in'),
  startTime: z.string().min(1, 'Vul een starttijd in'),
  endDate: z.string().min(1, 'Vul een einddatum in'),
  endTime: z.string().min(1, 'Vul een eindtijd in'),
  comments: z.string().optional(),
});

const bookingFormSchema = baseBookingSchema.refine(
  data => {
    if (!data.startDate || !data.startTime || !data.endDate || !data.endTime) {
      return true;
    }
    const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
    const endDateTime = new Date(`${data.endDate}T${data.endTime}`);
    return endDateTime > startDateTime;
  },
  {
    message:
      'De einddatum en -tijd moeten later zijn dan de startdatum en -tijd',
    path: ['endTime'],
  }
);

export const stepSchemas = {
  personal: baseBookingSchema.pick({ name: true, email: true }),
  appointment: baseBookingSchema.pick({
    startDate: true,
    startTime: true,
    endDate: true,
    endTime: true,
  }),
  confirm: baseBookingSchema.pick({
    comments: true,
  }),
};

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export default bookingFormSchema;
