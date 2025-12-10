import z from 'zod/v4';

const contactFormSchema = z.object({
  name: z.string().min(1, { error: 'The name field is required' }),
  email: z
    .email({
      error: issue =>
        issue.input === undefined
          ? 'The email address field is required'
          : 'A valid email address is required',
    })
    .min(1, { error: 'The email field is required' }),
  body: z.string().min(1, { error: 'The message field is required' }),
});

export default contactFormSchema;
