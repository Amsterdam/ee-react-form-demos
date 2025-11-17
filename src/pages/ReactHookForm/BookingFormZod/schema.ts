import { z } from 'zod';

const bookingFormSchema = z
  .object({
    name: z.string().min(1, 'Voornaam is verplicht'),
    email: z.string().email('Ongeldig e-mailadres'),
    startDate: z.string().min(1, 'Startdatum is verplicht'),
    startTime: z.string().min(1, 'Starttijd is verplicht'),
    endDate: z.string().min(1, 'Einddatum is verplicht'),
    endTime: z.string().min(1, 'Eindtijd is verplicht'),
    remote: z.boolean().default(false),
    comments: z.string().optional(),
  })
  .refine(
    data => {
      // Skip validation if any required fields are missing
      if (
        !data.startDate ||
        !data.startTime ||
        !data.endDate ||
        !data.endTime
      ) {
        return true;
      }

      const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
      const endDateTime = new Date(`${data.endDate}T${data.endTime}`);

      return endDateTime > startDateTime;
    },
    {
      message:
        'De einddatum en -tijd moeten later zijn dan de startdatum en -tijd',
      path: ['endTime'], // This will attach the error to the endTime field
    }
  );

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export default bookingFormSchema;
