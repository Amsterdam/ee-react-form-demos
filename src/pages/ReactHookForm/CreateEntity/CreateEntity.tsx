import { useRef, useState } from 'react';
import {
  useForm,
  Controller,
  useWatch,
  useFieldArray,
  Resolver,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  Grid,
  Heading,
  Link,
  Paragraph,
  Row,
} from '@amsterdam/design-system-react';
import FormSelect from './components/FormSelect/FormSelect';
import FormTextInput from './components/FormTextInput/FormTextInput';
import FormTextArea from './components/FormTextArea/FormTextArea';
import FormCheckboxInput from './components/FormCheckboxInput/FormCheckboxInput';
import FormAutoSelect from './components/FormAutoSelect/FormAutoSelect';
import AnnotationRepeater from './components/AnnotationRepeater/AnnotationRepeater';
import LinksRepeater from './components/LinkRepeater/LinkRepeater';
import SubmissionOutput from '@/components/SubmissionOutput/SubmissionOutput';
import Loader from '@/components/Loader/Loader';
import getOwners from '@/utils/getOwners';
import getSystems from '@/utils/getSystems';
import getTags from '@/utils/getTags';
import sortAlphabetically from '@/utils/sortAlphabetically';
import entityFormSchema, {
  // We renamed this as we still need the original EntityFormData type shape for
  // the SubmissionOutput component
  EntityFormData as RHFEntityFormData,
} from './schema';
import { EntityFormData } from '@/types/types';
import styles from './CreateEntity.module.css';
import scrollToFirstError from './utils/scrollToFirstError';

const ownerOptions = getOwners().sort(sortAlphabetically);
const systemOptions = getSystems().sort(sortAlphabetically);

const CreateEntity = () => {
  // The ref is only necessary if you want to scroll to the first error
  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RHFEntityFormData>({
    // Resolvers allows you to use any external validation library (like Zod)
    resolver: zodResolver(entityFormSchema) as Resolver<RHFEntityFormData>,

    // Uncomment for validation onChange
    // mode: 'onChange',
    defaultValues: {
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
        componentType: 'website',
        lifecycle: 'production',
        owner: 'dii-engineering-enablement',
        hasSystem: true,
        system: 'dii-ee-developers-amsterdam',
      },
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // useFieldArray for repeater fields. This is also used in the
  // AnnotationRepeater component
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  // Watch the hasSystem field to conditionally show system field
  const hasSystem = useWatch({ control, name: 'spec.hasSystem' });
  const formData = watch();

  // onSubmit will only fire if the form is valid
  // @ts-expect-error 'data' is defined but never used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: RHFEntityFormData) => {
    // console.log('Form data:', data);

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

  const onInvalid = () => {
    scrollToFirstError(formRef.current);
  };

  // Reset the form to a blank state
  const resetForm = () => {
    reset({
      kind: 'API',
      name: '',
      description: '',
      tags: [],
      annotations: [],
      links: [],
      spec: {
        componentType: 'service',
        lifecycle: 'prototype',
        owner: '',
        hasSystem: false,
        system: '',
      },
    });
  };

  return (
    <Grid paddingBottom="x-large" paddingTop="large">
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }}>
        <Heading level={1} size="level-3">
          Create an entity
        </Heading>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          // The ref is only necessary if you want to scroll to the first error
          ref={formRef}
          // Use noValidate so browser validation doesn't block react-hook-form
          // + zod
          noValidate
        >
          <Controller
            name="kind"
            control={control}
            render={({ field }) => (
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
                    describes a number of core kinds that plugins can know of
                    and understand, but an organization using Backstage is free
                    to also add entities of other kinds to the catalog.
                  </Paragraph>
                }
                // This options format may look a bit overcomplicated. In this
                // example it is intended to demonstate select menus where the
                // value might be an ID or code and is, therefore, not useful
                // to present to frontend users. Go to the 'Type' Select field
                // for an example where this happens.
                options={{
                  API: 'API',
                  Component: 'Component',
                  Domain: 'Domain',
                  Group: 'Group',
                  Resource: 'Resource',
                  System: 'System',
                  User: 'User',
                }}
                value={field.value}
                error={errors.kind?.message}
                required
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormTextInput
                id="name"
                label="Name"
                description="The name of the entity. This name is both meant for human eyes to recognize the entity, and for machines and other components to reference the entity (e.g. in URLs or from other entity specification files)."
                value={field.value}
                error={errors.name?.message}
                required
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormTextArea
                id="description"
                label="Description"
                description="A human readable description of the entity, to be shown in Backstage. Should be kept short and informative, suitable to give an overview of the entity's purpose at a glance. More detailed explanations and documentation should be placed elsewhere."
                value={field.value || ''}
                error={errors.description?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="spec.componentType"
            control={control}
            render={({ field }) => (
              <FormSelect
                id="type"
                label="Type"
                description="The type of component as a string, e.g. `website`. This field is required."
                options={{
                  service: 'Service',
                  website: 'Website',
                  library: 'Library',
                  'mobile-app': 'Mobile/Native App',
                }}
                value={field.value}
                required
                error={errors.spec?.componentType?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="spec.lifecycle"
            control={control}
            render={({ field }) => (
              <FormSelect
                id="lifecycle"
                label="Lifecycle"
                description="The lifecycle state of the component, e.g. `production`. This field is required."
                options={{
                  prototype: 'Prototype',
                  alpha: 'Alpha',
                  beta: 'Beta',
                  production: 'Production',
                  deprecated: 'Deprecated',
                  archived: 'Archived',
                }}
                value={field.value}
                required
                error={errors.spec?.lifecycle?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="spec.owner"
            control={control}
            render={({ field }) => {
              const selectedOption =
                ownerOptions?.find(opt => opt.value === field.value) ?? null;

              return (
                <FormAutoSelect
                  id="owner"
                  label="Owner"
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
                      to the owner of the component, e.g.
                      `artist-relations-team`. This field is required.
                    </Paragraph>
                  }
                  options={ownerOptions}
                  value={selectedOption}
                  required
                  error={errors.spec?.owner?.message}
                  onChange={selectedOption => {
                    // Handling react-select requires an extra step, as using
                    // the isMulti prop as true, will return an array of values.
                    // These minor prop differences can lead to some  complex
                    // Type handling
                    const option = Array.isArray(selectedOption)
                      ? selectedOption[0]
                      : selectedOption;
                    field.onChange(selectedOption ? option.value : '');
                  }}
                />
              );
            }}
          />

          <Controller
            name="spec.hasSystem"
            control={control}
            render={({ field }) => (
              <FormCheckboxInput
                id="hasSystem"
                label="Entity belongs to a system?"
                value={field.value ?? false}
                onChange={field.onChange}
              />
            )}
          />

          {hasSystem && (
            <Controller
              name="spec.system"
              control={control}
              render={({ field }) => {
                const selectedOption =
                  systemOptions?.find(opt => opt.value === field.value) ?? null;

                return (
                  <FormAutoSelect
                    id="system"
                    label="System"
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
                    value={selectedOption}
                    error={errors.spec?.system?.message}
                    required
                    onChange={selectedOption => {
                      const option = Array.isArray(selectedOption)
                        ? selectedOption[0]
                        : selectedOption;

                      field.onChange(selectedOption ? option.value : '');
                    }}
                  />
                );
              }}
            />
          )}

          <Controller
            name="tags"
            control={control}
            render={({ field }) => {
              const selectedOptions = (field.value ?? []).map(val => ({
                value: val,
                label: val,
              }));

              return (
                <FormAutoSelect
                  id="tags"
                  label="Tags"
                  description="A list of single-valued strings, for example to classify catalog entities in various ways. This is different to the labels in metadata, as labels are key-value pairs."
                  options={getTags()}
                  value={selectedOptions}
                  isMulti
                  error={errors.tags?.message}
                  onChange={selectedOptions => {
                    // This React-Select component uses isMulti so we need to
                    // handle an array of values
                    field.onChange(
                      Array.isArray(selectedOptions)
                        ? selectedOptions.map(
                            ({ value }: { value: string }) => value
                          )
                        : []
                    );
                  }}
                />
              );
            }}
          />

          {/* An AnnotationRepeater field is a repeater field of two fields:
          1. A select (react-select) field (the repeater field's 'key')
          2. A corresponding input or select menu (the repeater field's
          'value'). */}
          <AnnotationRepeater
            control={control}
            errors={errors}
            setValue={setValue}
          />

          {/* A linkRepeater field is a repeater field of three fields:
          - an input for URL
          - an input for Title
          - a select menu for Icon
          On change it returns an array of repeater fields - an array of
          the three fields' values */}
          <Controller
            name="links"
            control={control}
            render={() => (
              <LinksRepeater
                fields={fields}
                append={append}
                remove={remove}
                control={control}
                errors={errors.links}
              />
            )}
          />

          <Row>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
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
            spec: {
              ...formData.spec,
              type: formData.spec.componentType,
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
