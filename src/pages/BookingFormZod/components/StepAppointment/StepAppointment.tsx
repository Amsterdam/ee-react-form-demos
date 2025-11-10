import {
  StandaloneLink,
  Button,
  FieldSet,
  Row,
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

      <FieldSet
        legend="Start date and time"
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
            label="Start date"
            value={formData.startDate}
            onChange={onChange}
            minValue={minValue}
            error={errors.startDate}
          />
          <FormTimeInput
            id="startTime"
            name="startTime"
            label="Start time"
            value={formData.startTime}
            onChange={onChange}
            error={errors.startTime}
          />
        </Row>
      </FieldSet>

      <FieldSet
        legend="End date and time"
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
            label="End date"
            value={formData.endDate}
            onChange={onChange}
            minValue={formData.startDate}
            error={errors.endDate}
          />
          <FormTimeInput
            id="endTime"
            name="endTime"
            label="End time"
            value={formData.endTime}
            onChange={onChange}
            error={errors.endTime}
          />
        </Row>
      </FieldSet>

      <Button type="button" onClick={() => onNextButtonClick()}>
        Volgende vraag
      </Button>
    </>
  );
};

export default StepAppointment;
