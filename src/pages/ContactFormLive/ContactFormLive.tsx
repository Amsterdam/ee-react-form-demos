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
import t, { translations } from '../ContactForm/utils/translate';
import ContactFormLiveSchema from '../ContactForm/schema';
import styles from './ContactFormLive.module.css';

// This is a simple HTML5 form example that validates using a Zod schema
// on change
const ContactFormLive = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitTouched, setSubmitTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string): string | null => {
    try {
      // Extract a single schema property for the form field
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fieldSchema = ContactFormLiveSchema.pick({ [name]: true } as any);
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
      ContactFormLiveSchema.parse(data);
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

    console.log('Form data:', formData);

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
      <Grid>
        <Grid.Cell
          span={{ narrow: 4, medium: 8, wide: 6 }}
          className="ams-mb-xl"
        >
          <Heading level={1} size="level-3" className="ams-mb-m">
            Contactformulier
          </Heading>

          <Alert heading="Gelukt" headingLevel={2} severity="success">
            <Paragraph>
              Het formulier is verzonden. We hebben uw gegevens goed ontvangen.
            </Paragraph>
          </Alert>
        </Grid.Cell>
      </Grid>
    );
  }

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }} className="ams-mb-xl">
        <Heading level={1} size="level-3" className="ams-mb-m">
          Contactformulier
        </Heading>

        <Paragraph className="ams-mb-m">
          This form validates whilst you type.
        </Paragraph>

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
          {submitTouched && hasErrors && (
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

          <Field invalid={submitTouched && !!errors.name}>
            <Label htmlFor="name">Naam</Label>
            {submitTouched && errors.name && (
              <ErrorMessage id={`error-name`}>{errors.name}</ErrorMessage>
            )}
            <TextInput
              id="name"
              name="name"
              placeholder="Voornaam"
              aria-describedby={
                submitTouched && errors.name ? 'error-name' : ''
              }
              invalid={!!errors.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field invalid={submitTouched && !!errors.email}>
            <Label htmlFor="email">E-mailadres</Label>
            {submitTouched && errors.email && (
              <ErrorMessage id={`error-email`}>{errors.email}</ErrorMessage>
            )}
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder="E-mailadres"
              aria-describedby={
                submitTouched && errors.name ? 'error-email' : ''
              }
              invalid={!!errors.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </Field>
          <Field invalid={submitTouched && !!errors.email}>
            <Label htmlFor="body">Bericht</Label>
            {submitTouched && errors.email && (
              <ErrorMessage id={`error-body`}>{errors.body}</ErrorMessage>
            )}
            <TextArea
              id="body"
              name="body"
              placeholder="Bericht"
              aria-describedby={
                submitTouched && errors.body ? 'error-body' : ''
              }
              invalid={!!errors.body}
              onChange={handleInputChange}
              onBlur={handleBlur}
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

export default ContactFormLive;
