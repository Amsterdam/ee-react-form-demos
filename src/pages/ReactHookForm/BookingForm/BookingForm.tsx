import { useCallback, useRef, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Page, PageHeader } from '@amsterdam/design-system-react';
import Loader from '@/components/Loader/Loader';
import StepIntro from './components/StepIntro/StepIntro';
import SuccessContent from './components/SuccessContent/SuccessContent';
import StepPersonalDetails from './components/StepPersonalDetails/StepPersonalDetails';
import StepAppointment from './components/StepAppointment/StepAppointment';
import StepConfirm from './components/StepConfirm/StepConfirm';

export interface BookingFormData {
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isSubmittingRef = useRef(false);

  const nowDateTime = new Date();
  const nowDate = new Date().toISOString().split('T')[0];

  const form = useForm<BookingFormData>({
    defaultValues: {
      name: '',
      email: '',
      startDate: nowDateTime.toISOString().split('T')[0],
      startTime: '',
      endDate: '',
      endTime: '',
      comments: '',
    },
  });

  const handleSubmit: SubmitHandler<FieldValues> = useCallback(async () => {
    try {
      // Prevent duplicate submissions
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;

      /**
       * Use setTimeout to Simulate API call
       * - Here's where validation can happen
       * - Here's where you can show a post-submission success component
       * or redirect the user to a new page
       */
      setTimeout(() => {
        setIsSubmitted(true);
        isSubmittingRef.current = false;
      }, 1500);
    } catch (error) {
      console.log('form error!', error);
      isSubmittingRef.current = false;
    }
  }, []);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const steps = [
    <StepIntro onButtonClick={() => setCurrentStep(1)} key="step-0" />,
    <StepPersonalDetails
      onPrevButtonClick={() => setCurrentStep(0)}
      onNextButtonClick={handleNextStep}
      key="step-1"
    />,
    <StepAppointment
      minDateValue={nowDate}
      onPrevButtonClick={() => setCurrentStep(1)}
      onNextButtonClick={handleNextStep}
      key="step-2"
    />,
    <StepConfirm
      onPrevButtonClick={() => setCurrentStep(2)}
      onSubmit={handleSubmit}
      key="step-3"
    />,
  ];

  return (
    <Page>
      <PageHeader className="ams-mb-xl" />
      {form.formState.isSubmitting && !isSubmitted && <Loader />}
      <FormProvider {...form}>
        {!isSubmitted ? steps[currentStep] : <SuccessContent />}
      </FormProvider>
    </Page>
  );
};

export default BookingForm;
