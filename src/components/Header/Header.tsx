import { Grid, PageHeader } from '@amsterdam/design-system-react';
import { Link } from 'react-router';

const Header = () => (
  <Grid>
    <Grid.Cell span="all">
      <PageHeader
        brandName="Form Examples"
        menuItems={[
          <Link key={1} to=".." className="ams-page-header__menu-link">
            Create a Backstage entity
          </Link>,
          <Link key={2} to="../contact" className="ams-page-header__menu-link">
            Contact
          </Link>,
          <Link
            key={3}
            to="../contact-2"
            className="ams-page-header__menu-link"
          >
            Contact (2)
          </Link>,
        ]}
      />
    </Grid.Cell>
  </Grid>
);

export default Header;
