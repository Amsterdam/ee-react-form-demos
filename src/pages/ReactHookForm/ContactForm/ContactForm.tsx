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
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, Resolver, useForm } from 'react-hook-form';
import t, { translations } from './utils/translate';
import contactFormSchema, { ContactFormData } from './schema';
import Loader from '@/components/Loader/Loader';
import styles from './ContactForm.module.css';

// This is a simple React Hook Form example that validates using a Zod schema
// on change
const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema) as Resolver<ContactFormData>,

    // Uncomment for validation onChange or check the `reValidateMode` property
    // mode: 'onChange', // Allowed values: onChange | onBlur | onSubmit
    // | onTouched | all
    defaultValues: {
      name: '',
      email: '',
      body: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // onSubmit will only fire if the form is valid
  const onSubmit = async (data: ContactFormData) => {
    console.log('Form data:', data);

    /**
     * If form is valid use setTimeout to Simulate API call
     * - Here's where validation can happen
     * - Here's where you can show a post-submission success component
     * or redirect the user to a new page
     */
    setIsLoading(true);

    setTimeout(() => {
      setIsSubmitted(true);
    }, 1500);
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
    <Grid paddingBottom="x-large" paddingTop="large">
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 8 }} className="ams-mb-xl">
        <Heading level={1} size="level-3" className="ams-mb-m">
          Contactformulier 2
        </Heading>

        <Paragraph className="ams-mb-m">
          This form uses React Hook Form.
        </Paragraph>

        {/* Use noValidate so browser validation doesn't block JS */}
        <form
          className={`${styles.form} ams-gap-m`}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Fake loader to simulate API request */}
          {isLoading && <Loader />}
          {hasErrors && (
            <Alert heading="Niet gelukt" headingLevel={2} severity="error">
              <Paragraph>Er was een fout met de volgende velden:</Paragraph>
              <OrderedList>
                {Object.entries(errors).map(([field, { message }]) => (
                  <OrderedList.Item key={`error-item-${field}`}>
                    {t(field as keyof typeof translations)}: {message}
                  </OrderedList.Item>
                ))}
              </OrderedList>
            </Alert>
          )}

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Field invalid={!!errors.name}>
                <Label htmlFor="name">Naam</Label>
                {errors.name?.message && (
                  <ErrorMessage id={`error-name`}>
                    {errors.name.message}
                  </ErrorMessage>
                )}
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Voornaam"
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
                <Label htmlFor="email">E-mailadres</Label>
                {errors.email?.message && (
                  <ErrorMessage id={`error-email`}>
                    {errors.email.message}
                  </ErrorMessage>
                )}
                <TextInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="naam@email.nl"
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
              <Field invalid={!!errors.body}>
                <Label htmlFor="body">Bericht</Label>
                {errors.body?.message && (
                  <ErrorMessage id={`error-body`}>
                    {errors.body.message}
                  </ErrorMessage>
                )}
                <TextArea
                  id="body"
                  name="body"
                  placeholder="Bericht"
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
            <Button type="submit">Versturen</Button>
          </div>
        </form>
      </Grid.Cell>
    </Grid>
  );
};

export default ContactForm;
