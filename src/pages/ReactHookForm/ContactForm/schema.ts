import z from 'zod/v4';

const invalidTypeError = 'U hebt een ongeldige waarde ingevoerd voor dit veld';
const requiredError = 'Dit veld is verplicht';

const contactFormSchema = z.object({
  name: z
    .string({
      error: issue =>
        issue.input === undefined ? requiredError : invalidTypeError,
    })
    .min(1, { error: requiredError }),
  email: z
    .email({
      error: issue =>
        issue.input === undefined ? requiredError : invalidTypeError,
    })
    .min(1, { error: requiredError }),
  body: z
    .string({
      error: issue =>
        issue.input === undefined ? requiredError : invalidTypeError,
    })
    .min(1, { error: requiredError }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export default contactFormSchema;
