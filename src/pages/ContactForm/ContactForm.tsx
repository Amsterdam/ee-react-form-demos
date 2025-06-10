import Loader from '@/components/Loader/Loader';
import {
  Alert,
  Button,
  ErrorMessage,
  Field,
  Grid,
  Heading,
  Label,
  OrderedList,
  Paragraph,
  TextArea,
  TextInput,
} from '@amsterdam/design-system-react';
import { FormEvent, useState } from 'react';
import { z } from 'zod/v4';
import styles from './ContactForm.module.css';

// Quick translate method
const translations = {
  name: 'Voornaam',
  email: 'E-mailadres',
  body: 'Bericht',
};
const t = (input: keyof typeof translations) => {
  return translations[input];
};

const invalidTypeError = 'U hebt een ongeldige waarde ingevoerd voor dit veld';
const requiredError = 'Dit veld is verplicht';

const ContactFormSchema = z.object({
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

const ContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (formData: FormData): Record<string, string> => {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      body: formData.get('body') as string, // Note: your schema uses 'body' but form uses 'message'
    };

    try {
      ContactFormSchema.parse(data);
      return {}; // No errors
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });

        return errors;
      }

      return {};
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, proceed with submission
      setIsLoading(true);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }} className="ams-mb-xl">
        <Heading level={1} size="level-3" className="ams-mb-m">
          Contactformulier
        </Heading>

        {/* Use noValidate so browser validation doesn't block JS */}
        <form
          className={`${styles.form} ams-gap-m`}
          noValidate
          onSubmit={handleSubmit}
        >
          {isLoading && (
            <div className={styles.loader}>
              <Loader />
            </div>
          )}
          {hasErrors && (
            <Alert heading="Niet gelukt" headingLevel={2} severity="error">
              <Paragraph>Er was een fout met de volgende velden:</Paragraph>
              <OrderedList>
                {Object.entries(errors).map(([field, message]) => (
                  <OrderedList.Item key={`error-item-${field}`}>
                    {t(field as keyof typeof translations)}: {message}
                  </OrderedList.Item>
                ))}
              </OrderedList>
            </Alert>
          )}

          <Field invalid={!!errors.name}>
            <Label htmlFor="name">Naam</Label>
            {errors.name && (
              <ErrorMessage id={`error-name`}>{errors.name}</ErrorMessage>
            )}
            <TextInput
              id="name"
              name="name"
              placeholder="Voornaam"
              aria-describedby={errors.name ? 'error-name' : ''}
              invalid={!!errors.name}
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>
          <Field invalid={!!errors.email}>
            <Label htmlFor="email">E-mailadres</Label>
            {errors.email && (
              <ErrorMessage id={`error-email`}>{errors.email}</ErrorMessage>
            )}
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder="E-mailadres"
              aria-describedby={errors.name ? 'error-email' : ''}
              invalid={!!errors.name}
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>
          <Field invalid={!!errors.email}>
            <Label htmlFor="body">Bericht</Label>
            {errors.email && (
              <ErrorMessage id={`error-body`}>{errors.body}</ErrorMessage>
            )}
            <TextArea
              id="body"
              name="body"
              placeholder="Bericht"
              aria-describedby={errors.body ? 'error-body' : ''}
              invalid={!!errors.body}
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>

          <div>
            <Button type="submit">Versturen</Button>
          </div>
        </form>
      </Grid.Cell>
    </Grid>
  );
};

export default ContactForm;
