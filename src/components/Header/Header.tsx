import { Grid, PageHeader } from '@amsterdam/design-system-react';
import { Link } from 'react-router';

const Header = () => (
  <Grid>
    <Grid.Cell span="all">
      <PageHeader
        brandName="Backstage Forms"
        menuItems={[
          <Link key={1} to=".." className="ams-page-header__menu-link">
            Create an entity
          </Link>,
          <Link key={2} to="../contact" className="ams-page-header__menu-link">
            Contact
          </Link>,
        ]}
      />
    </Grid.Cell>
  </Grid>
);

export default Header;
