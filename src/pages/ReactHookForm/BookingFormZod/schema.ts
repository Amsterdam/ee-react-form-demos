import { z } from 'zod';

const bookingFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    startDate: z.string().min(1, 'Start date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endDate: z.string().min(1, 'End date is required'),
    endTime: z.string().min(1, 'End time is required'),
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
      message: 'End date and time must be later than start date and time',
      path: ['endTime'], // This will attach the error to the endTime field
    }
  );

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export default bookingFormSchema;
