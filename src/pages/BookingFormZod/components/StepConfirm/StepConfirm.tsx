import { Button, Grid, StandaloneLink } from '@amsterdam/design-system-react';
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
  </>
);

export default StepConfirm;
