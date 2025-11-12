import {
  ErrorMessage,
  Field,
  Label,
  TextInput,
  StandaloneLink,
  Button,
  Grid,
  Heading,
  Paragraph,
  InvalidFormAlert,
} from '@amsterdam/design-system-react';
import { ChangeEvent, useState } from 'react';
import { FormData } from '../../BookingForm';
import { ChevronBackwardIcon } from '@amsterdam/design-system-react-icons';
import mapErrorsToAlert from '../../utils/mapErrorsToAlert';

interface StepPersonalDetailsProps {
  formData: FormData;
  errors: Record<string, string>;
  disabled: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

const StepPersonalDetails = ({
  formData,
  errors,
  onChange,
  onPrevButtonClick,
  onNextButtonClick,
}: StepPersonalDetailsProps) => {
  const [submitTouched, setSubmitTouched] = useState(false);
  const showErrors = submitTouched && Object.keys(errors).length > 0;
  const alertErrors = mapErrorsToAlert(errors);

  const handleNextButtonClick = () => {
    setSubmitTouched(true);
    onNextButtonClick();
  };

  return (
    <>
      <Grid paddingBottom="2x-large" paddingTop="large">
        <Grid.Cell
          span={{ narrow: 4, medium: 5, wide: 7 }}
          start={{ narrow: 1, medium: 2, wide: 3 }}
        >
          <StandaloneLink
            href="#"
            icon={ChevronBackwardIcon}
            onClick={e => {
              e.preventDefault();
              onPrevButtonClick();
            }}
          >
            Vorige vraag
          </StandaloneLink>
        </Grid.Cell>
      </Grid>
      <Grid as="main" id="inhoud" paddingBottom="2x-large" paddingTop="large">
        <Grid.Cell
          span={{ narrow: 4, medium: 5, wide: 7 }}
          start={{ narrow: 1, medium: 2, wide: 3 }}
        >
          {/*
           * Notifying a user of errors is threefold:
           * - We add the error count to the document title, so it is the first
           * thing a screen reader user hears.
           * - We show the Invalid Form Alert at the top of the main container.
           * - We add error messages next to the relevant form fields.
           * For more info, see: https://designsystem.amsterdam/?path=/docs/components-forms-invalid-form-alert--docs
           */}
          {showErrors && (
            <InvalidFormAlert
              errors={alertErrors}
              headingLevel={4}
              className="ams-mb-m"
            />
          )}

          <header aria-labelledby="form-header" className="ams-mb-m ams-gap-xs">
            <Heading aria-hidden id="form-header" level={2} size="level-4">
              Afspraak maken
            </Heading>
            {/*
             * Start by testing your form without a progress indicator to see if
             it’s simple enough that users do not need one.
             * If you do, use a simple one like this one.
             * For more info, see: https://design-system.service.gov.uk/patterns/question-pages/#using-progress-indicators
             */}
            <Paragraph>Stap 1 van 3: Uw gegevens</Paragraph>
          </header>
          <Field className="ams-mb-m" invalid={submitTouched && !!errors.name}>
            <Label htmlFor="name">Voornaam</Label>
            {submitTouched && errors.name && (
              <ErrorMessage id={`error-name`} data-testid="error-message">
                {errors.name}
              </ErrorMessage>
            )}
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              placeholder="Voornaam"
              invalid={submitTouched && !!errors.name}
              onChange={onChange}
            />
          </Field>

          <Field className="ams-mb-m" invalid={submitTouched && !!errors.email}>
            <Label htmlFor="email">E-mailadres</Label>
            {submitTouched && errors.email && (
              <ErrorMessage id={`error-email`} data-testid="error-message">
                {errors.email}
              </ErrorMessage>
            )}
            <TextInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="E-mailadres"
              aria-describedby={errors.email ? 'error-email' : ''}
              invalid={submitTouched && !!errors.email}
              onChange={onChange}
            />
          </Field>

          <Button type="button" onClick={handleNextButtonClick}>
            Volgende vraag
          </Button>
        </Grid.Cell>
      </Grid>
    </>
  );
};

export default StepPersonalDetails;
