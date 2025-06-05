import {
  Button,
  Field,
  Grid,
  Heading,
  Label,
  TextArea,
  TextInput,
} from '@amsterdam/design-system-react';
import { FormEvent, useRef, useState } from 'react';
import { z } from 'zod/v4';

const invalidTypeError = 'Invalid type provided for this field';
const requiredError = 'This field cannot be blank';

const ContactFormSchema = z.object({
  name: z
    .string({
      error: issue =>
        issue.input === undefined ? requiredError : invalidTypeError,
    })
    .min(1, { error: requiredError }),
  email: z
    .email({
      error: issue =>
        issue.input === undefined ? requiredError : invalidTypeError,
    })
    .min(1, { error: requiredError }),
  body: z
    .string({
      error: issue =>
        issue.input === undefined ? requiredError : invalidTypeError,
    })
    .min(1, { error: requiredError }),
});

type ValidationError = {
  field: string;
  message: string;
  element: Element;
};

// Example with custom validation
const ContactForm = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const formRef = useRef(null);

  const validateForm = (): ValidationError[] => {
    const validationErrors = [];

    if (formRef.current) {
      const formDiv = formRef.current as HTMLFormElement;
      const inputs = formDiv.querySelectorAll('input');

      inputs.forEach((element: HTMLInputElement) => {
        if (!element.checkValidity()) {
          const fieldName = element.name || element.id || 'Unknown field';
          const message = element.validationMessage || 'Invalid input';

          validationErrors.push({
            field: fieldName,
            message,
            element,
          });
        }
      });

      const textarea = formDiv.querySelector('textarea') as HTMLTextAreaElement;

      if (!textarea.checkValidity()) {
        const message = textarea.validationMessage || 'Invalid textarea';

        validationErrors.push({
          field: textarea.name,
          message,
          element: textarea,
        });
      }
    }

    return validationErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const validationResult = ContactFormSchema.safeParse(formData);

    if (!validationResult.success) {
      console.log('form fails', {
        validationResult,
        errormsg: validationResult.error.message,
        errormsgjson: JSON.parse(validationResult.error.message),
      });
    } else {
      console.log('form passes');
    }

    // const validationErrors = validateForm();

    // if (validationErrors.length > 0) {
    //   setErrors(validationErrors);
    // }

    // submitForm(new FormData(form));
  };
  console.log({ formData });
  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }} className="ams-mb-xl">
        <Heading level={1} size="level-3">
          Contactformulier
        </Heading>

        {/* Use noValidate so browser validation doesn't block JS */}
        <form noValidate onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="name">Naam</Label>
            <TextInput
              id="name"
              name="name"
              placeholder="Name"
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>
          <Field>
            <Label htmlFor="email">E-mailadres</Label>
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder="E-mailadres"
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>
          <Field>
            <Label htmlFor="body">Bericht</Label>
            <TextArea
              id="body"
              name="body"
              placeholder="Bericht"
              onChange={e =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </Field>

          <div>
            <Button type="submit">Versturen</Button>
          </div>
        </form>
      </Grid.Cell>
    </Grid>
  );
};

export default ContactForm;
