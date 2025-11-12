import {
  Button,
  Grid,
  Heading,
  Paragraph,
  StandaloneLink,
  Table,
} from '@amsterdam/design-system-react';
import { BookingFormData } from '../../BookingForm';
import { ChevronBackwardIcon } from '@amsterdam/design-system-react-icons';
import TextAreaControl from '../TextAreaControl/TextAreaControl';
import { useFormContext } from 'react-hook-form';

interface StepConfirmProps {
  disabled?: boolean;
  onPrevButtonClick: () => void;
}

const StepConfirm = ({
  disabled = false,
  onPrevButtonClick,
}: StepConfirmProps) => {
  const { getValues } = useFormContext();

  const formData = getValues();

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
            <Paragraph>Stap 3 van 3: Controleren</Paragraph>
          </header>

          <Table className="ams-mb-l">
            <Table.Caption>
              <Heading level={4}>Controleer uw gegevens</Heading>
            </Table.Caption>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Voornaam</Table.Cell>
                <Table.Cell>{formData.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>E-mailadres</Table.Cell>
                <Table.Cell>{formData.email}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Startdatum en -tijd</Table.Cell>
                <Table.Cell>
                  {new Date(`${formData.startDate}T${formData.startTime}`)
                    .toLocaleString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })
                    .replace(',', '')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Einddatum en -tijd</Table.Cell>
                <Table.Cell>
                  {new Date(`${formData.endDate}T${formData.endTime}`)
                    .toLocaleString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })
                    .replace(',', '')}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <TextAreaControl<BookingFormData>
            label="Opmerkingen"
            name="comments"
            className="ams-mb-m"
          />

          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </Grid.Cell>
      </Grid>
    </>
  );
};

export default StepConfirm;
