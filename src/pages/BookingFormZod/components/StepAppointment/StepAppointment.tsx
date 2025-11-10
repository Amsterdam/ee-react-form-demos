import {
  StandaloneLink,
  Button,
  FieldSet,
  Row,
  Grid,
  Heading,
  Paragraph,
} from '@amsterdam/design-system-react';
import { ChangeEvent, useState } from 'react';
import { FormData } from '../../BookingFormZod';
import { ChevronBackwardIcon } from '@amsterdam/design-system-react-icons';
import FormDateInput from '../FormDateInput/FormDateInput';
import FormTimeInput from '../FormTimeInput/FormTimeInput';

interface StepAppointmentProps {
  formData: FormData;
  minValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

const StepAppointment = ({
  formData,
  minValue,
  onChange,
  errors,
  onPrevButtonClick,
  onNextButtonClick,
}: StepAppointmentProps) => {
  const [submitTouched, setSubmitTouched] = useState(false);
  // const [errors, setErrors] = useState<Record<string, string>>({});

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
            <Paragraph>Stap 2 van 3: Afspraak</Paragraph>
          </header>

          <FieldSet
            legend="Startdatum en -tijd"
            className="ams-mb-m"
            invalid={
              (submitTouched && !!errors.startDate) ||
              (submitTouched && !!errors.startTime)
            }
          >
            <Row>
              <FormDateInput
                id="startDate"
                name="startDate"
                label="Startdatum"
                value={formData.startDate}
                onChange={onChange}
                minValue={minValue}
                error={errors.startDate}
              />
              <FormTimeInput
                id="startTime"
                name="startTime"
                label="Starttijd"
                value={formData.startTime}
                onChange={onChange}
                error={errors.startTime}
              />
            </Row>
          </FieldSet>

          <FieldSet
            legend="Einddatum-tijd"
            className="ams-mb-m"
            invalid={
              (submitTouched && !!errors.endDate) ||
              (submitTouched && !!errors.endTime)
            }
          >
            <Row>
              <FormDateInput
                id="endDate"
                name="endDate"
                label="Einddatum"
                value={formData.endDate}
                onChange={onChange}
                minValue={formData.startDate}
                error={errors.endDate}
              />
              <FormTimeInput
                id="endTime"
                name="endTime"
                label="Eindtijd"
                value={formData.endTime}
                onChange={onChange}
                error={errors.endTime}
              />
            </Row>
          </FieldSet>

          <Button type="button" onClick={() => onNextButtonClick()}>
            Volgende vraag
          </Button>
        </Grid.Cell>
      </Grid>
    </>
  );
};

export default StepAppointment;
