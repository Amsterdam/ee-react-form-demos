import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import {
  Alert,
  Button,
  ErrorMessage,
  Field,
  FieldSet,
  Grid,
  Heading,
  Label,
  Paragraph,
  Row,
  TextInput,
  UnorderedList,
} from '@amsterdam/design-system-react';
import translate, { translations } from './utils/translate';
import Loader from '@/components/Loader/Loader';
import FormCheckboxInput from './components/FormCheckboxInput/FormCheckboxInput';
import FormTextArea from './components/FormTextArea/FormTextArea';
import FormDateInput from './components/FormDateInput/FormDateInput';
import FormTimeInput from './components/FormTimeInput/FormTimeInput';
import schema, { baseBookingSchema, BookingFormData } from './schema';
import styles from './BookingFormZod.module.css';
import StepIntro from './components/StepIntro/StepIntro';
import Layout from '@/components/Layout/Layout';
import StepPersonalDetails from './components/StepPersonalDetails/StepPersonalDetails';
import StepAppointment from './components/StepAppointment/StepAppointment';
import StepConfirm from './components/StepConfirm/StepConfirm';

export interface FormData {
  name: string;
  email: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  remote: boolean;
  comments: string;
}

const BookingFormZod = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitTouched, setIsSubmitTouched] = useState(false);
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
    remote: false,
    comments: '',
  });

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

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value =
      e.target instanceof HTMLInputElement && type === 'checkbox'
        ? e.target.checked
        : e.target.value;

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
    setIsSubmitTouched(true);

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

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      startDate: nowDate,
      startTime: '',
      endDate: '',
      endTime: '',
      remote: false,
      comments: '',
    });
    setErrors({});
  };

  const steps = [
    <StepIntro onButtonClick={() => setCurrentStep(1)} key="step-0" />,
    <StepPersonalDetails
      formData={formData}
      onChange={handleChange}
      errors={errors}
      onPrevButtonClick={() => setCurrentStep(0)}
      onNextButtonClick={() => setCurrentStep(2)}
      key="step-1"
    />,
    <StepAppointment
      formData={formData}
      minValue={nowDate}
      onChange={handleChange}
      errors={errors}
      onPrevButtonClick={() => setCurrentStep(1)}
      onNextButtonClick={() => setCurrentStep(3)}
      key="step-2"
    />,
    <StepConfirm
      formData={formData}
      onChange={handleChange}
      onPrevButtonClick={() => setCurrentStep(2)}
      onSubmitButtonClick={() => {}} // TODO
      key="step-3"
    />,
  ];

  return (
    <Layout>
      <Grid as="main" id="inhoud" paddingBottom="2x-large" paddingTop="large">
        <Grid.Cell
          span={{ narrow: 4, medium: 5, wide: 7 }}
          start={{ narrow: 1, medium: 2, wide: 3 }}
        >
          <form onSubmit={handleSubmit} noValidate>
            {steps[currentStep]}
          </form>
        </Grid.Cell>
      </Grid>
    </Layout>
  );

  return (
    <Grid paddingBottom="x-large" paddingTop="large">
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 8 }} className="ams-mb-xl">
        {isLoading && <Loader />}

        <form onSubmit={handleSubmit} noValidate>
          <Heading level={1} size="level-3" className="ams-mb-m">
            Booking Form (Zod Validation)
          </Heading>

          <Paragraph className="ams-mb-m">
            This form is an example of a generic booking form. The key
            validation is with checking that the <strong>End date</strong> and{' '}
            <strong>End time</strong> fields are not older than the{' '}
            <strong>Start date</strong> and <strong>Start time</strong> fields.
          </Paragraph>
          <Paragraph className="ams-mb-m">
            The goal of this demo is to illustrate how to handle cross-field
            validation in forms. While individual field rules (e.g. &quot;email
            must be valid&quot;) are straightforward, checking relationships
            between multiple fields—such as ensuring the end of a booking is
            after the start—requires more advanced validation logic.
          </Paragraph>

          {isSubmitTouched && Object.keys(errors).length > 0 && (
            <Alert
              severity="error"
              heading="Please fix the following:"
              headingLevel={2}
              className="ams-mb-m"
              data-testid="error-alert"
            >
              <UnorderedList>
                {Object.entries(errors).map(
                  ([field, message]) =>
                    message && (
                      <UnorderedList.Item key={field}>
                        {translate(field as keyof typeof translations)}:{' '}
                        {message}
                      </UnorderedList.Item>
                    )
                )}
              </UnorderedList>
            </Alert>
          )}

          <Field
            className="ams-mb-m"
            invalid={isSubmitTouched && !!errors.name}
          >
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <Field
            className="ams-mb-m"
            invalid={isSubmitTouched && !!errors.email}
          >
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
              onChange={handleChange}
            />
          </Field>

          <FieldSet
            legend="Start date and time"
            className="ams-mb-m"
            invalid={
              (isSubmitTouched && !!errors.startDate) ||
              (isSubmitTouched && !!errors.startTime)
            }
          >
            <Row>
              <FormDateInput
                id="startDate"
                name="startDate"
                label="Start date"
                value={formData.startDate}
                onChange={handleChange}
                minValue={nowDate}
                error={errors.startDate}
              />
              <FormTimeInput
                id="startTime"
                name="startTime"
                label="Start time"
                value={formData.startTime}
                onChange={handleChange}
                error={errors.startTime}
              />
            </Row>
          </FieldSet>

          <FieldSet
            legend="End date and time"
            className="ams-mb-m"
            invalid={
              (isSubmitTouched && !!errors.endDate) ||
              (isSubmitTouched && !!errors.endTime)
            }
          >
            <Row>
              <FormDateInput
                id="endDate"
                name="endDate"
                label="End date"
                value={formData.endDate}
                onChange={handleChange}
                minValue={formData.startDate}
                error={errors.endDate}
              />
              <FormTimeInput
                id="endTime"
                name="endTime"
                label="End time"
                value={formData.endTime}
                onChange={handleChange}
                error={errors.endTime}
              />
            </Row>
          </FieldSet>

          <FormCheckboxInput
            id="remote"
            label="Is the meeting remote?"
            name="remote"
            value={formData.remote}
            onChange={handleChange}
          />

          <FormTextArea
            id="comments"
            label="Additional comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />

          <Row>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Row>
        </form>

        {isSubmitted && (
          <div className={styles.success}>
            <Alert
              closeable
              heading="Success!"
              headingLevel={2}
              severity="success"
              onClose={() => setIsSubmitted(false)}
            >
              <Paragraph>
                The form has been sent. We have received your details.
              </Paragraph>
            </Alert>
          </div>
        )}
      </Grid.Cell>
    </Grid>
  );
};

export default BookingFormZod;
