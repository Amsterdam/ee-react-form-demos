import {
  ErrorMessage,
  Field,
  Label,
  TextInput,
  StandaloneLink,
  Button,
} from '@amsterdam/design-system-react';
import { ChangeEvent, useState } from 'react';
import { FormData } from '../../BookingFormZod';
import { ChevronBackwardIcon } from '@amsterdam/design-system-react-icons';

interface StepPersonalDetailsProps {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

const StepPersonalDetails = ({
  formData,
  onChange,
  errors,
  onPrevButtonClick,
  onNextButtonClick,
}: StepPersonalDetailsProps) => {
  const [submitTouched, setSubmitTouched] = useState(false);
  // const [errors, setErrors] = useState<Record<string, string>>({});

  return (
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
      <Field className="ams-mb-m" invalid={submitTouched && !!errors.name}>
        <Label htmlFor="name">Name</Label>
        {errors.name && (
          <ErrorMessage id={`error-name`} data-testid="error-message">
            {errors.name}
          </ErrorMessage>
        )}
        <TextInput
          id="name"
          name="name"
          value={formData.name}
          placeholder="First name"
          invalid={!!errors.name}
          onChange={onChange}
          // onBlur={handleBlur}
        />
      </Field>

      <Field className="ams-mb-m" invalid={submitTouched && !!errors.email}>
        <Label htmlFor="email">Email address</Label>
        {errors.email && (
          <ErrorMessage id={`error-email`} data-testid="error-message">
            {errors.email}
          </ErrorMessage>
        )}
        <TextInput
          // type="email"
          id="email"
          name="email"
          value={formData.email}
          placeholder="Email address"
          aria-describedby={errors.email ? 'error-email' : ''}
          invalid={!!errors.email}
          onChange={onChange}
        />
      </Field>

      <Button type="button" onClick={() => onNextButtonClick()}>
        Volgende vraag
      </Button>
    </>
  );
};

export default StepPersonalDetails;
