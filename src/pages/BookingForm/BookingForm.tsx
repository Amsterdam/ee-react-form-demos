import { FocusEvent, FormEvent, InvalidEvent, useMemo, useState } from 'react';
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
import Loader from '@/components/Loader/Loader';
import styles from './BookingForm.module.css';
import FormCheckboxInput from './components/FormCheckboxInput/FormCheckboxInput';
import FormTextArea from './components/FormTextArea/FormTextArea';
import DateInput from './components/DateInput/DateInput';
import TimeInput from './components/TimeInput/TimeInput';
import translate, { translations } from './utils/translate';

const BookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nowDateTime = new Date();
  const nowDate = nowDateTime.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: nowDate,
    startTime: '',
    endDate: '',
    endTime: '',
    remote: false,
    comments: '',
  });

  const startDateTime = useMemo(() => {
    if (!formData.startDate || !formData.startTime) return null;
    return new Date(`${formData.startDate}T${formData.startTime}`);
  }, [formData.startDate, formData.startTime]);

  const endDateTime = useMemo(() => {
    if (!formData.endDate || !formData.endTime) return null;
    return new Date(`${formData.endDate}T${formData.endTime}`);
  }, [formData.endDate, formData.endTime]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      e.target instanceof HTMLInputElement && type === 'checkbox'
        ? e.target.checked
        : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    if (Object.keys(errors).includes(name)) {
      // Remove from errors
      setErrors(prev => {
        // Prevent the 'End date/time must be after start date/time.' error
        // showing if changing the other value in the date-time pair validates
        // a previously invalid start-end datetime value
        if (name === 'endDate' || name === 'endTime') {
          const { endDate: _endDate, endTime: _endTime, ...rest } = prev;
          void _endDate;
          void _endTime;
          return rest;
        }

        const { [name]: _unused, ...rest } = prev;
        void _unused;
        return rest;
      });
    }
  };

  const handleInvalid = (e: InvalidEvent<HTMLFormElement>) => {
    const { name, validationMessage } = e.target;
    setErrors(prev => ({
      ...prev,
      [name]: validationMessage,
    }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.currentTarget;

    if (input.checkValidity()) {
      setErrors(prev => {
        // Prevent the 'End date/time must be after start date/time.' error
        // showing if changing the other value in the date-time pair validates
        // a previously invalid start-end datetime value
        if (input.name === 'endDate' || input.name === 'endTime') {
          const { endDate: _endDate, endTime: _endTime, ...rest } = prev;
          void _endDate;
          void _endTime;
          return rest;
        }

        const { [input.name]: _unused, ...rest } = prev;
        void _unused;
        return rest;
      });
    } else {
      setErrors(prev => ({
        ...prev,
        [input.name]: input.validationMessage,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent the browser from submitting and handling the form
    e.preventDefault();

    // Extra: manual date/time range check
    if (startDateTime && endDateTime && endDateTime <= startDateTime) {
      setErrors(prev => ({
        ...prev,
        endTime: 'End date/time must be after start date/time.',
        endDate: 'End date/time must be after start date/time.',
      }));
      return;
    }

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

  return (
    <Grid paddingBottom="x-large" paddingTop="large">
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 8 }} className="ams-mb-xl">
        {isLoading && <Loader />}

        <form onSubmit={handleSubmit} onInvalid={handleInvalid}>
          <Heading level={1} size="level-3" className="ams-mb-m">
            Booking Form (Plain HTML5)
          </Heading>

          <Paragraph className="ams-mb-m">
            This form&apos;s code, particularly the error state handling
            demonstrates how native HTML5 validation can quickly become
            cumbersome when you have a rule that dynamically targets more than
            one field.
          </Paragraph>

          {Object.keys(errors).length > 0 && (
            <Alert
              severity="error"
              heading="Please fix the following:"
              headingLevel={2}
              className="ams-mb-m"
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

          <Field className="ams-mb-m" invalid={!!errors.name}>
            <Label htmlFor="name">Naam</Label>
            {errors.name && (
              <ErrorMessage id={`error-name`} data-testid="error-message">
                {errors.name}
              </ErrorMessage>
            )}
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              placeholder="Voornaam"
              required
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <Field className="ams-mb-m" invalid={!!errors.email}>
            <Label htmlFor="email">E-mailadres</Label>
            {errors.email && (
              <ErrorMessage id={`error-email`} data-testid="error-message">
                {errors.email}
              </ErrorMessage>
            )}
            <TextInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="E-mailadres"
              aria-describedby={errors.email ? 'error-email' : ''}
              required
              invalid={!!errors.email}
              onChange={handleChange}
            />
          </Field>

          <FieldSet
            legend="Start date and time"
            className="ams-mb-m"
            invalid={!!errors.startDate || !!errors.startTime}
          >
            <Row>
              <DateInput
                id="startDate"
                name="startDate"
                label="Start date"
                value={formData.startDate}
                onChange={handleChange}
                minValue={nowDate}
                required
                error={errors.startDate}
              />
              <TimeInput
                id="startTime"
                name="startTime"
                label="Start time"
                value={formData.startTime}
                onChange={handleChange}
                required
                error={errors.startTime}
              />
            </Row>
          </FieldSet>

          <FieldSet
            legend="End date and time"
            className="ams-mb-m"
            invalid={!!errors.endDate || !!errors.endTime}
          >
            <Row>
              <DateInput
                id="endDate"
                name="endDate"
                label="End date"
                value={formData.endDate}
                onChange={handleChange}
                minValue={formData.startDate}
                required
                error={errors.endDate}
              />
              <TimeInput
                id="endTime"
                name="endTime"
                label="End time"
                value={formData.endTime}
                onChange={handleChange}
                required
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
              heading="Gelukt"
              headingLevel={2}
              severity="success"
              onClose={() => setIsSubmitted(false)}
            >
              <Paragraph>
                Het formulier is verzonden. We hebben uw gegevens goed
                ontvangen.
              </Paragraph>
            </Alert>
          </div>
        )}
      </Grid.Cell>
    </Grid>
  );
};

export default BookingForm;
