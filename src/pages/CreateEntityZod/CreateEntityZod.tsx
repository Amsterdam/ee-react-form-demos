import {
  Alert,
  Button,
  Grid,
  Heading,
  Link,
  Paragraph,
  Row,
} from '@amsterdam/design-system-react';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import FormSelect from './components/FormSelect/FormSelect';
import FormTextInput from './components/FormTextInput/FormTextInput';
import FormTextarea from './components/FormTextarea/FormTextarea';
import FormCheckboxInput from './components/FormCheckboxInput/FormCheckboxInput';
import FormAutoSelect from './components/FormAutoSelect/FormAutoSelect';
import AnnotationRepeater from './components/AnnotationRepeater/AnnotationRepeater';
import LinkRepeater from './components/LinkRepeater/LinkRepeater';
import SubmissionOutput from '@/components/SubmissionOutput/SubmissionOutput';
import Loader from '@/components/Loader/Loader';
import getOwners from '@/utils/getOwners';
import getSystems from '@/utils/getSystems';
import getTags from '@/utils/getTags';
import sortAlphabetically from '@/utils/sortAlphabetically';
import styles from './CreateEntityZod.module.css';
import {
  // We renamed this as we still need the original EntityFormData type shape for
  // the SubmissionOutput component
  EntityFormData as ZodEntityFormData,
} from './schema';
import { EntityFormData } from '@/types/types';
import useEntityFormValidation from './hooks/useEntityFormValidation';
import scrollToFirstError from './utils/scrollToFirstError';

const ownerOptions = getOwners().sort(sortAlphabetically);
const systemOptions = getSystems().sort(sortAlphabetically);

const CreateEntity = () => {
  // The ref is only necessary if you want to scroll to the first error
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    kind: 'Component',
    name: 'ee-docs',
    description: 'The primary app for developers.amsterdam',
    tags: ['docusaurus', 'nodejs', 'react', 'typescript'],
    annotations: [
      {
        key: 'backstage.io/source-location',
        value: 'https://github.com/amsterdam/ee-docs/',
      },
      { key: 'github.com/project-slug', value: 'amsterdam/ee-docs' },
      {
        key: 'github.com/team-slug',
        value: 'amsterdam/engineering-enablement',
      },
      {
        key: 'lighthouse.com/website-url',
        value: 'https://developers.amsterdam',
      },
    ],
    links: [
      {
        url: 'https://developers.amsterdam/',
        title: 'developers.amsterdam',
        icon: 'launch',
      },
      {
        url: 'https://github.com/amsterdam/ee-docs',
        title: 'GitHub Repo',
        icon: 'github',
      },
      {
        url: 'https://gemeente-amsterdam.atlassian.net/browse/COM-70',
        title: 'Jira Board',
        icon: 'dashboard',
      },
    ],
    spec: {
      type: 'website',
      lifecycle: 'production',
      owner: 'dii-engineering-enablement',
      hasSystem: true,
      system: 'dii-ee-developers-amsterdam',
    },
  } as ZodEntityFormData);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keep all the form validation in a hook for reusability and to keep this
  // parent component clean. The formData handling could also be moved into a
  // hook if this parent component contains extra custom logic
  const { errors, validateField, validateForm, clearAllErrors } =
    useEntityFormValidation(formData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name.startsWith('spec.')) {
      const specField = name.split('.')[1] as keyof EntityFormData['spec'];
      const newValue = type === 'checkbox' ? checked : value;

      setFormData(prev => ({
        ...prev,
        spec: {
          ...prev.spec,
          [specField]: newValue,
        },
      }));

      validateField(name, newValue);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      validateField(name, value);
    }
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    const fieldValue = type === 'checkbox' ? checked : value;

    validateField(name, fieldValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      scrollToFirstError(formRef.current);
      return;
    }

    console.log('Form data:', formData);

    /**
     * Use setTimeout to Simulate API call
     * - Here's where validation can happen
     * - Here's where you can show a post-submission success component
     * or redirect the user to a new page
     */
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Reset the form to a blank state
  const handleResetClick = () => {
    setFormData({
      kind: '',
      name: '',
      description: '',
      tags: [],
      annotations: [],
      links: [],
      spec: {
        type: '',
        lifecycle: '',
        owner: '',
        hasSystem: false,
        system: '',
      },
    });
    clearAllErrors();
  };

  return (
    <Grid paddingBottom="x-large" paddingTop="large">
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }}>
        <Heading level={1} size="level-3">
          Create an entity
        </Heading>

        {/* The ref is only necessary if you want to scroll to the first
        error */}
        {/* Use noValidate so browser validation doesn't block zod */}
        <form onSubmit={handleSubmit} ref={formRef} noValidate>
          <FormSelect
            id="kind"
            label="Kind"
            description={
              <Paragraph id="kind-description" size="small">
                The kind is the high level entity type being described.{' '}
                <Link
                  href="https://backstage.io/docs/architecture-decisions/adrs-adr005"
                  target="_blank"
                  rel="noreferrer"
                >
                  ADR005
                </Link>{' '}
                describes a number of core kinds that plugins can know of and
                understand, but an organization using Backstage is free to also
                add entities of other kinds to the catalog.
              </Paragraph>
            }
            name="kind"
            // This looks a bit weird but is intended because select menu values
            // are often different to the labels (however, not in this example)
            options={{
              API: 'API',
              Component: 'Component',
              Domain: 'Domain',
              Group: 'Group',
              Resource: 'Resource',
              System: 'System',
              User: 'User',
            }}
            initialValue={formData.kind}
            required
            error={errors.kind}
            onChange={(_name, value) => {
              setFormData(prev => ({
                ...prev,
                kind: value,
              }));
              validateField('kind', value);
            }}
            onBlur={e => validateField('kind', e.target.value)}
          />

          <FormTextInput
            id="name"
            label="Name"
            description="The name of the entity. This name is both meant for human eyes to recognize the entity, and for machines and other components to reference the entity (e.g. in URLs or from other entity specification files)."
            name="name"
            value={formData.name}
            required
            error={errors.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormTextarea
            id="description"
            label="Description"
            description="A human readable description of the entity, to be shown in Backstage. Should be kept short and informative, suitable to give an overview of the entity's purpose at a glance. More detailed explanations and documentation should be placed elsewhere."
            name="description"
            value={formData.description ?? ''}
            error={errors.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormSelect
            id="spec-type"
            label="Type"
            description="The type of component as a string, e.g. `website`. This field is required."
            name="spec.type"
            options={{
              service: 'Service',
              website: 'Website',
              library: 'Library',
              'mobile-app': 'Mobile/Native App',
            }}
            initialValue={formData.spec.type}
            required
            error={errors['spec.type']}
            onChange={(name, value) => {
              setFormData(prev => ({
                ...prev,
                spec: {
                  ...prev.spec,
                  type: value,
                },
              }));
              validateField(name, value);
            }}
            onBlur={e => validateField('spec.type', e.target.value)}
          />

          <FormSelect
            id="lifecycle"
            label="Lifecycle"
            description="The lifecycle state of the component, e.g. `production`. This field is required."
            name="spec.lifecycle"
            options={{
              prototype: 'Prototype',
              alpha: 'Alpha',
              beta: 'Beta',
              production: 'Production',
              deprecated: 'Deprecated',
              archived: 'Archived',
            }}
            initialValue={formData.spec.lifecycle}
            required
            error={errors['spec.lifecycle']}
            onChange={(name, value) => {
              setFormData(prev => ({
                ...prev,
                spec: {
                  ...prev.spec,
                  lifecycle: value,
                },
              }));
              validateField(name, value);
            }}
            onBlur={e => validateField('spec.lifecycle', e.target.value)}
          />

          <FormAutoSelect
            id="owner"
            label="Owner"
            name="owner"
            description={
              <Paragraph size="small" id="owner-description">
                An{' '}
                <Link
                  href="https://backstage.io/docs/features/software-catalog/references#string-references"
                  target="_blank"
                  rel="noreferrer"
                >
                  entity reference
                </Link>{' '}
                to the owner of the component, e.g. `artist-relations-team`.
                This field is required.
              </Paragraph>
            }
            options={ownerOptions}
            initialValues={[formData.spec.owner]}
            required
            onChange={newValue => {
              // Handling react-select requires an extra step, as using
              // the isMulti prop as true, will return an array of values.
              // These minor prop differences can lead to some  complex
              // Type handling
              const option = Array.isArray(newValue) ? newValue[0] : newValue;
              const ownerValue = option?.value ?? '';

              // Update state
              setFormData(prev => ({
                ...prev,
                spec: {
                  ...prev.spec,
                  owner: ownerValue,
                },
              }));

              // Validate immediately
              validateField('spec.owner', ownerValue);
            }}
            onBlur={() => {
              validateField('spec.owner', formData.spec.owner || '');
            }}
          />

          <FormCheckboxInput
            id="hasSystem"
            label="Entity belongs to a system?"
            value={formData.spec.hasSystem}
            onChange={e =>
              setFormData({
                ...formData,
                spec: {
                  ...formData.spec,
                  hasSystem: e.target.checked,
                },
              })
            }
          />

          {formData.spec.hasSystem && (
            <FormAutoSelect
              id="hasSystem"
              label="System"
              name="system"
              description={
                <Paragraph id="system-description" size="small">
                  An{' '}
                  <Link
                    href="https://backstage.io/docs/features/software-catalog/references#string-references"
                    target="_blank"
                    rel="noreferrer"
                  >
                    entity reference
                  </Link>{' '}
                  to the system that the component belongs to, e.g.
                  `artist-engagement-portal`. This field is optional.
                </Paragraph>
              }
              options={systemOptions}
              initialValues={[formData.spec.system || '']}
              required={formData.spec.hasSystem}
              onChange={newValue => {
                const option = Array.isArray(newValue) ? newValue[0] : newValue;
                const systemValue = option?.value ?? '';

                setFormData(prev => ({
                  ...prev,
                  spec: {
                    ...prev.spec,
                    system: systemValue,
                  },
                }));

                validateField('spec.system', systemValue);
              }}
              onBlur={() => {
                validateField('spec.system', formData.spec.system || '');
              }}
            />
          )}

          <FormAutoSelect
            id="tags"
            label="Tags"
            name="tags"
            description="A list of single-valued strings, for example to classify catalog entities in various ways. This is different to the labels in metadata, as labels are key-value pairs."
            options={getTags()}
            isMulti
            initialValues={formData.tags}
            onChange={newValue => {
              // This React-Select component uses isMulti so we need to
              // handle an array of values
              const tagsValue = Array.isArray(newValue)
                ? newValue?.map(({ value }: { value: string }) => value)
                : [];
              setFormData(prev => ({
                ...prev,
                tags: tagsValue,
              }));

              validateField('tags', tagsValue);
            }}
            onBlur={() => {
              validateField('tags', formData.spec.system || '');
            }}
          />

          {/* An AnnotationRepeater field is a repeater field of two fields:
          1. A select (react-select) field (the repeater field's 'key')
          2. A corresponding input or select menu (the repeater field's
          'value'). On change it returns an object 'annotations' of array of
          { key: '', value: '' } */}
          <AnnotationRepeater
            items={formData.annotations ?? []}
            errors={errors}
            onChange={annotations => {
              setFormData({
                ...formData,
                annotations,
              });
            }}
          />

          {/* A linkRepeater field is a repeater field of three fields:
          - an input for URL
          - an input for Title
          - a select menu for Icon
          On change it returns an array of repeater fields - an array of
          the three fields' values */}
          <LinkRepeater
            items={formData?.links ?? []}
            errors={errors}
            onValidateField={validateField}
            onChange={links => {
              setFormData({
                ...formData,
                links,
              });
            }}
          />

          <Row>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleResetClick}
            >
              Reset
            </Button>
          </Row>
        </form>
      </Grid.Cell>
      <SubmissionOutput
        formData={
          {
            ...formData,
            spec: {
              ...formData.spec,
              type: formData.spec.type,
            },
          } as EntityFormData
        }
      />

      {/* Fake loader to simulate API request */}
      {isLoading && <Loader />}

      {/* Fake placeholder for post-submission state */}
      {isSubmitted && (
        <div className={styles.loader}>
          <Alert
            closeable
            heading="Gelukt"
            headingLevel={2}
            severity="success"
            onClose={() => {
              setIsLoading(false);
              setIsSubmitted(false);
            }}
          >
            <Paragraph>
              Het formulier is verzonden. We hebben uw gegevens goed ontvangen.
            </Paragraph>
          </Alert>
        </div>
      )}
    </Grid>
  );
};

export default CreateEntity;
