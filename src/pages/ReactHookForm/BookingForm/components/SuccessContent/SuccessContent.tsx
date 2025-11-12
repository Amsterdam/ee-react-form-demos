import { Grid, Heading, Paragraph } from '@amsterdam/design-system-react';

const SuccessContent = () => (
  <Grid as="main" id="inhoud" paddingBottom="2x-large" paddingTop="large">
    <Grid.Cell
      span={{ narrow: 4, medium: 5, wide: 7 }}
      start={{ narrow: 1, medium: 2, wide: 3 }}
    >
      <header aria-labelledby="form-header" className="ams-mb-m ams-gap-xs">
        <Heading aria-hidden id="form-header" level={2} size="level-4">
          Afspraak maken
        </Heading>
        <Paragraph>Dank u voor uw inzending.</Paragraph>
      </header>
    </Grid.Cell>
  </Grid>
);

export default SuccessContent;
