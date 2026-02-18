import { z } from 'zod';

const bookingFormSchema = z
  .object({
    name: z.string().min(1, 'Voornaam is verplicht'),
    email: z.string().email('Ongeldig e-mailadres'),
    startDate: z.string().min(1, 'Startdatum is verplicht'),
    startTime: z.string().min(1, 'Starttijd is verplicht'),
    endDate: z.string().min(1, 'Einddatum is verplicht'),
    endTime: z.string().min(1, 'Eindtijd is verplicht'),
    comments: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Skip if required fields are missing
    if (!data.startDate || !data.startTime || !data.endDate || !data.endTime) {
      return;
    }

    const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
    const endDateTime = new Date(`${data.endDate}T${data.endTime}`);

    if (endDateTime <= startDateTime) {
      const sameDay = data.startDate === data.endDate;

      ctx.addIssue({
        code: 'custom',
        message:
          'De einddatum en -tijd moeten later zijn dan de startdatum en -tijd',

        // Conditionally apply where the error appears
        path: sameDay ? ['endTime'] : ['endDate'],
      });
    }
  });

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export default bookingFormSchema;
