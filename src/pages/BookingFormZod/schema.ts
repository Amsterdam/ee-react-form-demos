import { z } from 'zod';

export const baseBookingSchema = z.object({
  name: z.string().min(1, 'Voornaam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  startDate: z.string().min(1, 'Startdatum is verplicht'),
  startTime: z.string().min(1, 'Starttijd is verplicht'),
  endDate: z.string().min(1, 'Einddatum is verplicht'),
  endTime: z.string().min(1, 'Eindtijd is verplicht'),
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
