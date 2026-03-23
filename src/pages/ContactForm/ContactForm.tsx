import {
  Alert,
  Button,
  ErrorMessage,
  Field,
  Grid,
  Heading,
  InvalidFormAlert,
  Label,
  Paragraph,
  TextArea,
  TextInput,
} from '@amsterdam/design-system-react';
import { FormEvent, useRef, useState } from 'react';
import { z } from 'zod/v4';
import Loader from '@/components/Loader/Loader';
import mapErrorsToAlert from '@/utils/mapErrorsToAlert';
import ContactFormSchema from './schema';
import styles from './ContactForm.module.css';

// This is a simple HTML5 form example that validates on submission using a
// Zod schema
const ContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isSubmittingRef = useRef(false);

  const validateForm = (formData: FormData): Record<string, string> => {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      body: formData.get('body') as string,
    };

    try {
      ContactFormSchema.parse(data);
      return {};
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

    // Prevent duplicate submissions
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    /**
     * If form is valid use setTimeout to Simulate API call
     * - Here's where validation can happen
     * - Here's where you can show a post-submission success component
     * or redirect the user to a new page
     */
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsSubmitted(true);
        isSubmittingRef.current = false;
      }, 1500);
    } else {
      isSubmittingRef.current = false;
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const alertErrors = mapErrorsToAlert(errors);

  if (isSubmitted) {
    return (
      <Grid paddingBottom="x-large" paddingTop="large">
        <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }}>
          <Heading level={1} size="level-3" className="ams-mb-m">
            Contact form
          </Heading>

          <Alert heading="Success!" headingLevel={2} severity="success">
            <Paragraph>
              The form has been sent. We have received your details.
            </Paragraph>
          </Alert>
        </Grid.Cell>
      </Grid>
    );
  }

  return (
    <Grid paddingBottom="x-large" paddingTop="large">
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }}>
        <Heading
          level={1}
          size="level-3"
          className="ams-mb-m"
          data-testid="heading"
        >
          Contact form
        </Heading>

        <Paragraph className="ams-mb-m">
          This form is a simple contact form with three required fields. It
          validates on submit.
        </Paragraph>

        <Paragraph className="ams-mb-m">
          The goal of this demo is to illustrate the most basic form validation
          scenario. Each field is required and the email must follow a valid
          format. Unlike more complex forms, no cross-field rules are needed —
          making it a clean example of straightforward validation.
        </Paragraph>

        {/* Use noValidate so browser validation doesn't block JS */}
        <form
          className={`${styles.form} ams-gap-m`}
          noValidate
          onSubmit={handleSubmit}
          data-testid="form"
        >
          {isLoading && <Loader />}
          {hasErrors && (
            <InvalidFormAlert
              errors={alertErrors}
              headingLevel={4}
              className="ams-mb-m"
            />
          )}

          <Field invalid={!!errors.name}>
            <Label htmlFor="name">Name</Label>
            {errors.name && (
              <ErrorMessage id={`error-name`} data-testid="error-message">
                {errors.name}
              </ErrorMessage>
            )}
            <TextInput
              id="name"
              name="name"
              aria-describedby={errors.name ? 'error-name' : ''}
              invalid={!!errors.name}
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>
          <Field invalid={!!errors.email}>
            <Label htmlFor="email">Email address</Label>
            {errors.email && (
              <ErrorMessage id={`error-email`} data-testid="error-message">
                {errors.email}
              </ErrorMessage>
            )}
            <TextInput
              type="text"
              // If we use type=email, in some browsers this triggers
              // `:invalid` and error styling is applied despite the form
              // noValidate on input change
              inputMode="email"
              autoComplete="email"
              id="email"
              name="email"
              aria-describedby={errors.email ? 'error-email' : ''}
              invalid={!!errors.email}
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>
          <Field invalid={!!errors.body} className="ams-mb-m">
            <Label htmlFor="body">Message</Label>
            {errors.body && (
              <ErrorMessage id={`error-body`} data-testid="error-message">
                {errors.body}
              </ErrorMessage>
            )}
            <TextArea
              id="body"
              name="body"
              aria-describedby={errors.body ? 'error-body' : ''}
              invalid={!!errors.body}
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>

          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Grid.Cell>
    </Grid>
  );
};

export default ContactForm;
