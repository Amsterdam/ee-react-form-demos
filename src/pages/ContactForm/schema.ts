import z from 'zod/v4';

const contactFormSchema = z.object({
  name: z.string().min(1, { error: 'Enter your name' }),
  email: z
    .email({
      error: issue =>
        issue.input === undefined
          ? 'Enter your email address'
          : 'Enter an email address in the correct format, like name@example.com',
    })
    .min(1, { error: 'Enter your email address' }),
  body: z.string().min(1, { error: 'Enter your message' }),
});

export default contactFormSchema;
