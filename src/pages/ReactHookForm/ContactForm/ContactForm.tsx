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
import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, Resolver, useForm } from 'react-hook-form';
import contactFormSchema, { ContactFormData } from './schema';
import mapErrorsToAlert from '@/utils/mapErrorsToAlert';
import Loader from '@/components/Loader/Loader';
import collectErrorMessages from './utils/collectErrorMessages';
import styles from './ContactForm.module.css';

// This is a simple React Hook Form example that validates using a Zod schema
// on change
const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema) as Resolver<ContactFormData>,
    defaultValues: {
      name: '',
      email: '',
      body: '',
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const isSubmittingRef = useRef(false);

  // onSubmit will only fire if the form is valid
  const onSubmit = async (data: ContactFormData) => {
    console.log('Form data:', data);

    // Prevent duplicate submissions
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      await new Promise<void>(resolve => {
        window.setTimeout(resolve, 2500);
      });

      setIsSubmitted(true);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const alertErrors = mapErrorsToAlert(collectErrorMessages(errors));

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
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 8 }} className="ams-mb-xl">
        <Heading level={1} size="level-3" className="ams-mb-m">
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
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Fake loader to simulate API request */}
          {isSubmitting && <Loader />}
          {hasErrors && (
            <InvalidFormAlert
              errors={alertErrors}
              headingLevel={4}
              className="ams-mb-m"
            />
          )}

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Field invalid={!!errors.name}>
                <Label htmlFor="name">Name</Label>
                {errors.name?.message && (
                  <ErrorMessage id={`error-name`}>
                    {errors.name.message}
                  </ErrorMessage>
                )}
                <TextInput
                  id="name"
                  name="name"
                  aria-describedby={errors.name?.message ? 'error-name' : ''}
                  invalid={!!errors.name}
                  onChange={field.onChange}
                  value={field.value}
                  // You can also use the spread operator to pass all field
                  // values
                  // {...field} // This spreads value, onChange, onBlur, etc.
                />
              </Field>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Field invalid={!!errors.email}>
                <Label htmlFor="email">Email address</Label>
                {errors.email?.message && (
                  <ErrorMessage id={`error-email`}>
                    {errors.email.message}
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
                  aria-describedby={errors.email?.message ? 'error-email' : ''}
                  invalid={!!errors.email}
                  value={field.value}
                  onChange={field.onChange}
                  // You can also use the spread operator to pass all field
                  // values
                  // {...field} // This spreads value, onChange, onBlur, etc.
                />
              </Field>
            )}
          />
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <Field invalid={!!errors.body} className="ams-mb-m">
                <Label htmlFor="body">Message</Label>
                {errors.body?.message && (
                  <ErrorMessage id={`error-body`}>
                    {errors.body.message}
                  </ErrorMessage>
                )}
                <TextArea
                  id="body"
                  name="body"
                  aria-describedby={errors.body?.message ? 'error-body' : ''}
                  invalid={!!errors.body}
                  value={field.value}
                  onChange={field.onChange}
                  // You can also use the spread operator to pass all field
                  // values
                  // {...field} // This spreads value, onChange, onBlur, etc.
                />
              </Field>
            )}
          />

          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Grid.Cell>
    </Grid>
  );
};

export default ContactForm;
