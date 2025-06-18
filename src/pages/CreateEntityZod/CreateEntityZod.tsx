import {
  Alert,
  Button,
  Grid,
  Heading,
  Link,
  Paragraph,
  Row,
} from '@amsterdam/design-system-react';
import { ChangeEvent, FormEvent, useState } from 'react';
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
import entityFormSchema, {
  EntityFormData as ZodEntityFormData,
  FieldErrors,
  specSchema,
} from './schema';
import z from 'zod/v4';
import { EntityFormData } from '@/types';

const ownerOptions = getOwners().sort(sortAlphabetically);
const systemOptions = getSystems().sort(sortAlphabetically);

// TODO validation - variant of CreateEntity (plain) with zod validation?
//  - TextInput has invalid class but doesnt show invalid message
//  - Can we replace `any` in `value: any`?
//  - fix warnings
//  - cleanup validation method

// TODO document results
// - Check shared GitHub examples (in Slack)
// - README/storybook setup?
// - validation alert/header with invalid fields - Cannot accomplish with browser validation
// - smaller forms - use react validation
// - larger/dynamic forms - use browser validation
// - react-hook-form to this migration path?
// TODO tests
const CreateEntity = () => {
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

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate a single field
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateField = (fieldPath: string, value: any) => {
    try {
      // Handle nested link fields like links.0.url
      if (fieldPath.startsWith('links.')) {
        const pathParts = fieldPath.split('.');

        if (pathParts.length === 3) {
          // Individual field validation (e.g., links.0.url)
          const [, indexStr, fieldName] = pathParts;
          const index = parseInt(indexStr, 10);

          if (!isNaN(index) && formData.links?.[index]) {
            const testLinks = [...(formData.links || [])];
            testLinks[index] = {
              ...testLinks[index],
              [fieldName]: value,
            };

            const testData = { ...formData, links: testLinks };
            entityFormSchema.parse(testData);
          }
        } else if (pathParts.length === 1) {
          // Entire links array validation
          const testData = { ...formData, links: value };
          entityFormSchema.parse(testData);
        }
      } else if (fieldPath.startsWith('spec.')) {
        // Existing spec field validation...
        const specField = fieldPath.split('.')[1] as keyof z.infer<
          typeof specSchema
        >;
        const specData = { ...formData.spec, [specField]: value };
        specSchema.parse(specData);
      } else {
        // Existing top-level field validation...
        const testData = { ...formData, [fieldPath]: value };
        entityFormSchema.parse(testData);
      }

      // Clear error if validation passes
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldPath as keyof FieldErrors];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle link-specific errors
        if (fieldPath.startsWith('links.')) {
          const linkError = error.issues.find(err => {
            const errorPath = err.path.join('.');
            return (
              errorPath.includes('links') &&
              (errorPath === fieldPath ||
                errorPath.endsWith(fieldPath.split('.').pop() || ''))
            );
          });

          if (linkError) {
            setErrors(prev => ({
              ...prev,
              [fieldPath]: linkError.message,
            }));
          }
        } else {
          // Existing error handling for other fields...
          const fieldError = error.issues.find(
            err =>
              err.path.join('.') === fieldPath ||
              (fieldPath.startsWith('spec.') &&
                err.path.join('.') === fieldPath.split('.')[1])
          );

          if (fieldError) {
            setErrors(prev => ({
              ...prev,
              [fieldPath]: fieldError.message,
            }));
          }
        }
      }
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    try {
      entityFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FieldErrors = {};

        error.issues.forEach(err => {
          const path = err.path.join('.');
          // Handle nested spec fields
          if (err.path[0] === 'spec' && err.path.length > 1) {
            newErrors[`spec.${String(err.path[1])}` as keyof FieldErrors] =
              err.message;
          } else {
            newErrors[path as keyof FieldErrors] = err.message;
          }
        });

        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name.startsWith('spec.')) {
      const specField = name.split('.')[1] as keyof z.infer<typeof specSchema>;
      const newValue = type === 'checkbox' ? checked : value;

      setFormData(prev => ({
        ...prev,
        spec: {
          ...prev.spec,
          [specField]: newValue,
        },
      }));

      // Validate on change (optional - you might prefer on blur)
      validateField(name, newValue);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      // Validate on change (optional)
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

    // Validate on blur for better UX
    validateField(name, fieldValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate entire form before submission
    if (!validateForm()) {
      console.log('Validation failed:', errors);
      return;
    }

    console.log('Form data is valid:', formData);

    // Simulate API call
    // Here's where validation could happen
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
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
    setErrors({});
  };

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }} className="ams-mb-xl">
        <Heading level={1} size="level-3">
          Create an entity
        </Heading>

        {/* Use noValidate so browser validation doesn't block zod */}
        <form onSubmit={handleSubmit} noValidate>
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
            error={errors['spec.owner']}
            onChange={newValue => {
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
              error={errors['spec.system']}
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
            error={errors.tags}
            onChange={newValue => {
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

          <AnnotationRepeater
            initialValues={formData.annotations.map(annotation => ({
              key: annotation.key,
              value: annotation.value,
            }))}
            errors={errors}
            onChange={(
              annotations: {
                label: string | undefined;
                value: string | undefined;
              }[]
            ) => {
              const newAnnotations = annotations
                .filter(
                  // We're not interested in values with no parent key value
                  (a): a is { label: string; value: string | undefined } =>
                    typeof a.label === 'string'
                )
                .map(({ label, value }) => ({
                  key: label,
                  value: value ?? '',
                }));

              setFormData(prev => ({
                ...prev,
                annotations: newAnnotations,
              }));

              // Validate the annotations array
              validateField('annotations', newAnnotations);
            }}
          />
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
            <Button type="button" variant="secondary" onClick={resetForm}>
              Reset
            </Button>
          </Row>
        </form>
      </Grid.Cell>
      <SubmissionOutput
        formData={
          {
            ...formData,
            annotations: formData.annotations
              ? formData.annotations.reduce(
                  (acc, curr) => {
                    acc[curr.key] = curr.value;
                    return acc;
                  },
                  {} as Record<string, string | undefined>
                )
              : {},
            spec: {
              ...formData.spec,
              type: formData.spec.type,
            },
          } as EntityFormData
        }
      />

      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

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
