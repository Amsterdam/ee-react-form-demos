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
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useCallback,
  useState,
} from 'react';
import { z } from 'zod/v4';
import { debounce } from 'es-toolkit';
import Loader from '@/components/Loader/Loader';
import t, { translations } from './utils/translate';
import ContactFormOnChangeSchema from './schema';
import styles from './ContactFormOnChange.module.css';

// This is a simple HTML5 form example that validates using a Zod schema
// on change
const ContactFormOnChange = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Touched state handling enables active and passive validation handling
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitTouched, setSubmitTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string): string | null => {
    try {
      // Extract a single schema property for the form field
      const fieldSchema = ContactFormOnChangeSchema.pick({
        [name]: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      fieldSchema.parse({ [name]: value });

      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || 'Invalid input';
      }

      return null;
    }
  };

  // Use debounce for smoother user interaction
  const debouncedValidate = useCallback(
    debounce((name: string, value: string) => {
      if (touched[name]) {
        const fieldError = validateField(name, value);

        setErrors(prev => {
          const newErrors = { ...prev };

          if (fieldError) {
            newErrors[name] = fieldError;
          } else {
            delete newErrors[name];
          }
          return newErrors;
        });
      }
    }, 300),
    [touched]
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    debouncedValidate(name, value);
  };

  // Handle when a field loses focus (and mark as touched)
  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate the field when it's first touched
    const fieldError = validateField(name, value);

    if (fieldError) {
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const validateForm = (formData: FormData): Record<string, string> => {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      body: formData.get('body') as string,
    };

    try {
      ContactFormOnChangeSchema.parse(data);
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

    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);

    setErrors(validationErrors);
    setSubmitTouched(true);

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
      }, 1500);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  if (isSubmitted) {
    return (
      <Grid paddingBottom="x-large" paddingTop="large">
        <Grid.Cell
          span={{ narrow: 4, medium: 8, wide: 6 }}
          className="ams-mb-xl"
        >
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
          validates on change.
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
          {/* Fake loader to simulate API request */}
          {isLoading && <Loader />}
          {/* Only display an error alert after user hits submit `active validation`,
          fields will already have subtle styling (for example, a red border)
          before this `passive validation` */}
          {submitTouched && hasErrors && (
            <Alert
              heading="Unsuccessful"
              headingLevel={2}
              severity="error"
              data-testid="alert"
            >
              <Paragraph>
                There was an error with the following fields:
              </Paragraph>
              <OrderedList>
                {Object.entries(errors).map(([field, message]) => (
                  <OrderedList.Item key={`error-item-${field}`}>
                    {t(field as keyof typeof translations)}: {message}
                  </OrderedList.Item>
                ))}
              </OrderedList>
            </Alert>
          )}

          <Field invalid={submitTouched && !!errors.name}>
            <Label htmlFor="name">Name</Label>
            {submitTouched && errors.name && (
              <ErrorMessage id={`error-name`} data-testid="error-message">
                {errors.name}
              </ErrorMessage>
            )}
            <TextInput
              id="name"
              name="name"
              placeholder="First name"
              aria-describedby={
                submitTouched && errors.name ? 'error-name' : ''
              }
              invalid={!!errors.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field invalid={submitTouched && !!errors.email}>
            <Label htmlFor="email">Email address</Label>
            {submitTouched && errors.email && (
              <ErrorMessage id={`error-email`} data-testid="error-message">
                {errors.email}
              </ErrorMessage>
            )}
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              aria-describedby={
                submitTouched && errors.email ? 'error-email' : ''
              }
              invalid={!!errors.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field invalid={submitTouched && !!errors.body}>
            <Label htmlFor="body">Message</Label>
            {submitTouched && errors.body && (
              <ErrorMessage id={`error-body`} data-testid="error-message">
                {errors.body}
              </ErrorMessage>
            )}
            <TextArea
              id="body"
              name="body"
              placeholder="Message"
              aria-describedby={
                submitTouched && errors.body ? 'error-body' : ''
              }
              invalid={!!errors.body}
              onChange={handleInputChange}
              onBlur={handleBlur}
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

export default ContactFormOnChange;
