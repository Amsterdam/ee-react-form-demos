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

const invalidTypeError = 'Invalid type provided for this field';
const requiredError = 'This field cannot be blank';

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

// Example with custom validation
const ContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const validateForm = (formData: FormData): Record<string, string> => {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      body: formData.get('message') as string, // Note: your schema uses 'body' but form uses 'message'
    };

    try {
      ContactFormSchema.parse(data);
      return {}; // No errors
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log({ error });
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
      console.log('Form is valid, submitting...');
    }
  };
  console.log({ formData, errors });

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }} className="ams-mb-xl">
        <Heading level={1} size="level-3" className="ams-mb-m">
          Contactformulier
        </Heading>

        {/* Use noValidate so browser validation doesn't block JS */}
        <form className="ams-gap-m" noValidate onSubmit={handleSubmit}>
          {hasErrors && (
            <Alert heading="Niet gelukt" headingLevel={2} severity="error">
              <Paragraph>
                There was an error with the following fields:
              </Paragraph>
              <OrderedList>
                {Object.entries(errors).map(([field, message]) => (
                  <OrderedList.Item key={`error-item-${field}`}>
                    {field}: {message}
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
              placeholder="Name"
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
