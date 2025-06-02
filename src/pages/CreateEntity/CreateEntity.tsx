import { Button, Grid, Heading } from '@amsterdam/design-system-react';
import FormSelect from '@/components/FormSelect/FormSelect';
import SubmissionOutput from '@/components/SubmissionOutput/SubmissionOutput';
import FormTextInput from '@/components/FormTextInput/FormTextInput';
import { ChangeEvent, FormEvent, useState } from 'react';
import { EntityFormData } from '@/types';
import FormTextarea from '@/components/FormTextarea/FormTextarea';
// import FormRepeaterInput from '@/components/FormRepeaterInput/FormRepeaterInput';
import FormAutoSelect from '@/components/FormAutoSelect/FormAutoSelect';
import getTags from '@/utils/getTags';
import FormAnnotationFields from '@/components/FormAnnotationFields/FormAnnotationFields';
import { ActionMeta, MultiValue } from 'react-select';
// import styles from './styles.module.css';

// apiVersion: backstage.io/v1alpha1
// kind: Component
// metadata:
//   name: ee-docs
//   description: The primary app for developers.amsterdam
//   tags: [docusaurus, nodejs, react, typescript]
//   annotations:
//     backstage.io/source-location: url:https://github.com/amsterdam/ee-docs/
//     github.com/project-slug: amsterdam/ee-docs
//     github.com/team-slug: amsterdam/engineering-enablement
//     lighthouse.com/website-url: https://developers.amsterdam
//   links:
//     - url: https://developers.amsterdam/
//       title: developers.amsterdam
//       icon: launch
//     - url: https://github.com/amsterdam/ee-docs
//       title: GitHub Repo
//       icon: github
//     - url: https://gemeente-amsterdam.atlassian.net/browse/COM-70
//       title: Jira Board
//       icon: dashboard
// spec:
//   type: website
//   lifecycle: production
//   owner: dii-engineering-enablement
//   system: dii-ee-developers-amsterdam

// TODO links repeater field
// TODO spec fields
// TODO handle initial values (should match YAML output - example: Kind select menu)
// TODO validation
// TODO tests
const Home = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    kind: 'Component',
    name: 'ee-docs',
    description: 'The primary app for developers.amsterdam',
    tags: ['docusaurus', 'nodejs', 'react', 'typescript'],
    annotations: {
      'backstage.io/source-location': 'https://github.com/amsterdam/ee-docs/',
      'github.com/project-slug': 'amsterdam/ee-docs',
      'github.com/team-slug': 'amsterdam/engineering-enablement',
      'lighthouse.com/website-url': 'https://developers.amsterdam',
    },
  } as EntityFormData);

  // const [formState, formAction] = useActionState(submitEntityForm);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [formData, setFormData] = useState({
  //   kind: '',
  //   name: '',
  // });
  // const isPending = formState.status === 'pending';

  // useEffect(() => {
  //   if (formState.success) {
  //     setIsSubmitted(true);
  //   }
  // }, [formState]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO handle annotations and new tags
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // Simple validation
    const newErrors = {};
    // if (!data.name) newErrors.name = 'Name is required';
    // if (!data.email) newErrors.email = 'Email is required';

    const formattedFormData: EntityFormData = {
      kind: data.kind as string,
      name: data.name as string,
      description: data.description as string,
      tags: formData.getAll('tags') as string[],
    };

    if (Object.keys(newErrors).length === 0) {
      // Submit the data
      console.log('Submitting:', data, {
        formattedFormData,
        toJson: Object.fromEntries(formData.entries()),
        tagsfield: formData.getAll('tags'),
      });

      // setFormData(Object.fromEntries(formData.entries()) as EntityFormData);
      setFormData(formattedFormData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }} className="ams-mb-xl">
        <Heading level={1} size="level-3">
          Create an entity
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormSelect
            label="Kind"
            // TODO include link in description - what happens?
            description="Description text goes here..."
            // This looks a bit weird but is intended because select menu values
            // are often different to the labels (in this example they're not)
            options={{
              API: 'API',
              Component: 'Component',
              Domain: 'Domain',
              Group: 'Group',
              Resource: 'Resource',
              System: 'System',
              User: 'User',
            }}
            onChange={handleChange}
            // TODO refactor props order + value or initialValue?
            initialValue={formData.kind}
          />

          <FormTextInput
            label="Name"
            description="Textinput description text goes here..."
            value={formData.name}
            onChange={handleChange}
          />

          <FormTextarea
            label="Description"
            description="Textarea description text goes here..."
            value={formData.description}
            onChange={handleChange}
          />

          {/* Single input repeater */}
          {/* <FormRepeaterInput
            label="Tags"
            initialValues={formData.tags}
            onChange={(tags: string[]) => setFormData({ ...formData, tags })}
          /> */}

          <FormAutoSelect
            label="Tags"
            name="tags"
            description="Tags text goes here..."
            options={getTags()}
            initialValues={formData.tags}
            onChange={(
              newValue: MultiValue<{
                label: string;
                value: string;
              }>,
              actionMeta: ActionMeta<{
                label: string;
                value: string;
              }>
            ) => {
              setFormData(prev => ({
                ...prev,
                [actionMeta.name as string]: newValue.map(({ value }) => value),
              }));
            }}
          />

          <FormAnnotationFields
            initialValues={Object.keys(formData.annotations).map(
              annotation => ({
                key: annotation,
                value: formData.annotations[annotation],
              })
            )}
            // TODO refactor
            onChange={(
              annotations: {
                key: string | undefined;
                value: string | undefined;
              }[]
            ) =>
              setFormData({
                ...formData,
                annotations: annotations
                  .filter(
                    (a): a is { key: string; value: string | undefined } =>
                      typeof a.key === 'string'
                  )
                  .reduce(
                    (acc, { key, value }) => {
                      acc[key] = value ?? '';
                      return acc;
                    },
                    {} as Record<string, string | undefined>
                  ),
              })
            }
          />

          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Grid.Cell>
      <SubmissionOutput formData={formData} />
    </Grid>
  );
};

export default Home;
