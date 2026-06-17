import z from 'zod/v4';

const GENDER_OPTIONS = [
  'man',
  'vrouw',
  'non_binair',
  'zeg_ik_liever_niet',
] as const;

const INTEREST_OPTIONS = [
  'newsletters',
  'product_updates',
  'events_webinars',
] as const;

const contactFormSchema = z.object({
  name: z
    .string({
      error: () => 'Vul uw naam in',
    })
    .min(1, { error: 'Vul uw naam in' }),
  email: z
    .string({
      error: () => 'Vul uw e-mailadres in',
    })
    .min(1, { error: 'Vul uw e-mailadres in' })
    .email({
      error: () =>
        'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl',
    }),
  message: z
    .string({
      error: () => 'Vul uw bericht in',
    })
    .min(1, { error: 'Vul uw bericht in' }),
  gender: z.enum(GENDER_OPTIONS, { message: 'Vul uw geslacht in' }),
  interests: z
    .array(z.enum(INTEREST_OPTIONS))
    .min(1, { message: 'Selecteer minimaal één interesse' }),
});

// We kunnen de types afleiden van het zod object
export type ContactFormData = z.infer<typeof contactFormSchema>;

export default contactFormSchema;
