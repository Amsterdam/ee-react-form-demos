import { ChangeEvent, FormEvent, useState } from 'react';
import { Page, PageHeader } from '@amsterdam/design-system-react';
import schema, {
  baseBookingSchema,
  BookingFormData,
  stepSchemas,
} from './schema';
import StepIntro from './components/StepIntro/StepIntro';
import StepPersonalDetails from './components/StepPersonalDetails/StepPersonalDetails';
import StepAppointment from './components/StepAppointment/StepAppointment';
import StepConfirm from './components/StepConfirm/StepConfirm';
import Loader from '@/components/Loader/Loader';
import SuccessContent from './components/SuccessContent/SuccessContent';

export interface FormData {
  name: string;
  email: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  comments: string;
}

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nowDateTime = new Date();
  const nowDate = nowDateTime.toISOString().split('T')[0];

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    startDate: nowDate,
    startTime: '',
    endDate: '',
    endTime: '',
    comments: '',
  });

  const validateStep = (stepIndex: number, data: FormData) => {
    let stepSchema;
    switch (stepIndex) {
      case 1:
        stepSchema = stepSchemas.personal;
        break;
      case 2:
        stepSchema = stepSchemas.appointment;
        break;
      case 3:
        stepSchema = stepSchemas.confirm;
        break;
      default:
        return { success: true, errors: {} };
    }

    const stepResult = stepSchema.safeParse(data);

    // Collect field-level errors
    const fieldErrors: Record<string, string> = {};

    if (!stepResult.success) {
      stepResult.error.errors.forEach(err => {
        fieldErrors[err.path[0] as string] = err.message;
      });
    }

    // For appointment step: run the full refine to check that the start date
    // is not later than the end date
    if (stepIndex === 2) {
      const fullResult = schema.safeParse(data);

      if (!fullResult.success) {
        fullResult.error.errors.forEach(err => {
          // merge additional cross-field errors
          fieldErrors[err.path[0] as string] = err.message;
        });
      }
    }

    return {
      success: Object.keys(fieldErrors).length === 0,
      errors: fieldErrors,
    };
  };

  const handleNextStep = () => {
    const validation = validateStep(currentStep, formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return; // block progress
    }

    // clear step-specific errors and move on
    setErrors({});
    setCurrentStep(currentStep + 1);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value =
      e.target instanceof HTMLInputElement && type === 'checkbox'
        ? e.target.checked
        : e.target.value;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // validate this field immediately
    const shape = baseBookingSchema.shape[name as keyof BookingFormData];

    if (shape) {
      const result = shape.safeParse(value);
      if (!result.success) {
        setErrors(prev => ({
          ...prev,
          [name]: result.error.errors[0].message,
        }));
      } else {
        setErrors(prev => {
          const { [name]: _unused, ...rest } = prev;
          void _unused;
          return rest;
        });
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent the browser from submitting and handling the form
    e.preventDefault();

    const result = schema.safeParse(formData);

    if (!result.success) {
      // Transform Zod errors into your { [field]: message } format
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const steps = [
    <StepIntro onButtonClick={() => setCurrentStep(1)} key="step-0" />,
    <StepPersonalDetails
      formData={formData}
      errors={errors}
      disabled={isLoading}
      onChange={handleChange}
      onPrevButtonClick={() => setCurrentStep(0)}
      onNextButtonClick={handleNextStep}
      key="step-1"
    />,
    <StepAppointment
      formData={formData}
      minDateValue={nowDate}
      errors={errors}
      disabled={isLoading}
      onChange={handleChange}
      onPrevButtonClick={() => setCurrentStep(1)}
      onNextButtonClick={handleNextStep}
      key="step-2"
    />,
    <StepConfirm
      formData={formData}
      disabled={isLoading}
      onChange={handleChange}
      onPrevButtonClick={() => setCurrentStep(2)}
      onSubmit={handleSubmit}
      key="step-3"
    />,
  ];

  return (
    <Page>
      <PageHeader className="ams-mb-xl" />
      {isLoading && !isSubmitted && <Loader />}
      <div>{!isSubmitted ? steps[currentStep] : <SuccessContent />}</div>
    </Page>
  );
};

export default BookingForm;
