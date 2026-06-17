import {
  Alert,
  Button,
  Grid,
  Heading,
  InvalidFormAlert,
  Paragraph,
} from '@amsterdam/design-system-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckboxControlGroup,
  FormProvider,
  mapErrorsToAlert,
  RadioControl,
  TextAreaControl,
  TextInputControl,
} from '@amsterdam/ee-ads-rhf';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '@/components/Loader/Loader';
import contactFormSchema, { ContactFormData } from './schema';

// This is a simple React Hook Form example that validates using a Zod schema
const ContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      interests: [],
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const isSubmittingRef = useRef(false);

  // onSubmit will only fire if the form is valid
  const onSubmit = async (data: ContactFormData) => {
    // Prevent duplicate submissions
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    console.log('Form data:', data);

    /**
     * Use setTimeout to Simulate API call
     * - Here's where validation can happen
     * - Here's where you can show a post-submission success component
     * or redirect the user to a new page
     */
    try {
      await new Promise<void>(resolve => {
        setTimeout(() => {
          setIsSubmitted(true);
          resolve();
        }, 1500);
      });
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const showErrors = Object.keys(form.formState.errors).length > 0;
  const alertErrors = mapErrorsToAlert(form.formState.errors);

  // Disable scroll when preloader shows
  useEffect(() => {
    if (!form.formState.isSubmitting) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [form.formState.isSubmitting]);

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

          <Alert heading="Succes!" headingLevel={2} severity="success">
            <Paragraph>
              Het formulier is verzonden. We hebben je gegevens ontvangen.
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
          Contactformulier
        </Heading>

        <Paragraph className="ams-mb-m">
          Dit formulier is een eenvoudig contactformulier met vijf verplichte
          velden. Validatie vindt plaats bij het verzenden.
        </Paragraph>

        <Paragraph className="ams-mb-m">
          Het doel van deze demo is om de meest eenvoudige formulier-validatie
          te laten zien. Elk veld is verplicht en het e-mailadres moet een
          geldig formaat hebben. In tegenstelling tot complexere formulieren
          zijn er geen regels tussen velden nodig — waardoor dit een helder
          voorbeeld is van eenvoudige validatie.
        </Paragraph>

        <FormProvider form={form} onSubmit={onSubmit}>
          {/* Fake loader to simulate API request */}
          {form.formState.isSubmitting && <Loader />}

          {showErrors && (
            <InvalidFormAlert
              errors={alertErrors}
              headingLevel={4}
              className="ams-mb-m"
              data-testid="error-alert"
            />
          )}

          <TextInputControl<ContactFormData>
            label="Naam"
            name="name"
            registerOptions={{ required: true }}
            className="ams-mb-m"
          />

          <TextInputControl<ContactFormData>
            label="E-mailadres"
            type="text"
            // If we use type=email, in some browsers this triggers `:invalid`
            // and error styling is applied despite the form noValidate on
            // input change
            inputMode="email"
            autoComplete="email"
            name="email"
            registerOptions={{
              required: true,
            }}
            className="ams-mb-m"
          />

          <TextAreaControl<ContactFormData>
            label="Opmerkingen"
            name="message"
            registerOptions={{ required: true }}
            className="ams-mb-m"
          />

          <RadioControl<ContactFormData>
            label="Geslacht"
            name="gender"
            options={[
              { label: 'Man', value: 'man' },
              { label: 'Vrouw', value: 'vrouw' },
              { label: 'Non-binair', value: 'non_binair' },
              { label: 'Zeg ik liever niet', value: 'zeg_ik_liever_niet' },
            ]}
            registerOptions={{ required: true }}
            wrapperProps={{
              className: 'ams-mb-m',
            }}
          />

          <CheckboxControlGroup<ContactFormData>
            label="Interesses"
            name="interests"
            description="Selecteer minimaal één optie die op jou van toepassing is"
            options={[
              { label: 'Nieuwsbrieven', value: 'newsletters' },
              { label: 'Productupdates', value: 'product_updates' },
              { label: 'Evenementen en webinars', value: 'events_webinars' },
            ]}
            registerOptions={{ required: true }}
            wrapperProps={{
              className: 'ams-mb-xl',
            }}
          />

          <div>
            <Button type="submit">Verzenden</Button>
          </div>
        </FormProvider>
      </Grid.Cell>
    </Grid>
  );
};

export default ContactForm;
