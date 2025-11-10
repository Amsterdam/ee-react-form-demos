import {
  Button,
  Grid,
  Heading,
  Paragraph,
  StandaloneLink,
} from '@amsterdam/design-system-react';
import { FormData } from '../../BookingFormZod';
import { ChangeEvent } from 'react';
import { ChevronBackwardIcon } from '@amsterdam/design-system-react-icons';
import FormCheckboxInput from '../FormCheckboxInput/FormCheckboxInput';
import FormTextArea from '../FormTextArea/FormTextArea';

interface StepConfirmProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPrevButtonClick: () => void;
  onSubmitButtonClick: () => void;
}

const StepConfirm = ({
  formData,
  onChange,
  onPrevButtonClick,
  onSubmitButtonClick,
}: StepConfirmProps) => (
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

        <FormCheckboxInput
          id="remote"
          label="Is the meeting remote?"
          name="remote"
          value={formData.remote}
          onChange={onChange}
        />

        <FormTextArea
          id="comments"
          label="Additional comments"
          name="comments"
          value={formData.comments}
          onChange={onChange}
        />

        <Button type="button" onClick={() => onSubmitButtonClick()}>
          Submit
        </Button>
      </Grid.Cell>
    </Grid>
  </>
);

export default StepConfirm;
