import {
  StandaloneLink,
  Button,
  Grid,
  Heading,
  Paragraph,
  InvalidFormAlert,
} from '@amsterdam/design-system-react';
import { MouseEvent } from 'react';
import { BookingFormData } from '../../BookingForm';
import { ChevronBackwardIcon } from '@amsterdam/design-system-react-icons';
import mapErrorsToAlert from '../../utils/mapErrorsToAlert';
import TextInputControl from '../TextInputControl/TextInputControl';
import { useFormContext } from 'react-hook-form';

interface StepPersonalDetailsProps {
  disabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

const StepPersonalDetails = ({
  onPrevButtonClick,
  onNextButtonClick,
}: StepPersonalDetailsProps) => {
  const {
    clearErrors,
    formState: { errors },
    trigger,
  } = useFormContext();

  const showErrors = Object.keys(errors).length > 0;
  const alertErrors = mapErrorsToAlert(errors);

  const handleNextButtonClick = async () => {
    const isValid = await trigger(['name', 'email']);
    if (isValid) onNextButtonClick();
  };

  const handlePrevButtonClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    clearErrors();
    onPrevButtonClick();
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
            onClick={handlePrevButtonClick}
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

          <TextInputControl<BookingFormData>
            label="Voornaam"
            name="name"
            registerOptions={{ required: 'Voornaam is verplicht' }}
          />

          <TextInputControl<BookingFormData>
            label="E-mailadres"
            type="email"
            name="email"
            registerOptions={{
              required: 'E-mailadres is verplicht',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Ongeldig e-mailadres',
              },
            }}
          />

          <Button type="button" onClick={handleNextButtonClick}>
            Volgende vraag
          </Button>
        </Grid.Cell>
      </Grid>
    </>
  );
};

export default StepPersonalDetails;
