import z from 'zod/v4';

const invalidTypeError = 'You have entered an invalid value for this field';
const requiredError = 'This field is required';

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

export default contactFormSchema;
