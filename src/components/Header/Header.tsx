import {
  Grid,
  PageHeader,
  Heading,
  LinkList,
} from '@amsterdam/design-system-react';
import { Link } from 'react-router';

const Header = () => (
  <Grid>
    <Grid.Cell span="all">
      <PageHeader
        brandName="React Template"
        menuItems={[
          <Link key={1} to=".." className="ams-page-header__menu-link">
            Home
          </Link>,
          <Link key={2} to="../contact" className="ams-page-header__menu-link">
            Contact
          </Link>,
        ]}
      >
        <Grid paddingBottom="large">
          <PageHeader.GridCellNarrowWindowOnly span="all">
            <LinkList>
              <LinkList.Link href="#" lang="en">
                English
              </LinkList.Link>
            </LinkList>
          </PageHeader.GridCellNarrowWindowOnly>
          <Grid.Cell span={4}>
            <Heading className="ams-mb-s" level={3}>
              Onderdelen
            </Heading>
            <LinkList>
              <LinkList.Link href="#">Kaart</LinkList.Link>
              <LinkList.Link href="#">Panoramabeelden</LinkList.Link>
              <LinkList.Link href="#">Tabellen</LinkList.Link>
              <LinkList.Link href="#">Catalogus (Beta)</LinkList.Link>
              <LinkList.Link href="#">Kaarten</LinkList.Link>
              <LinkList.Link href="#">Datacatalogus</LinkList.Link>
            </LinkList>
          </Grid.Cell>
          <Grid.Cell span={4}>
            <Heading className="ams-mb-s" level={3}>
              Over ons
            </Heading>
            <LinkList>
              <LinkList.Link href="#">Over de organisatie</LinkList.Link>
              <LinkList.Link href="#">Over het dataplatform</LinkList.Link>
            </LinkList>
          </Grid.Cell>
          <Grid.Cell span={4}>
            <Heading className="ams-mb-s" level={3}>
              Help
            </Heading>
            <LinkList>
              <LinkList.Link href="#">Help</LinkList.Link>
              <LinkList.Link href="#">Contact</LinkList.Link>
            </LinkList>
          </Grid.Cell>
        </Grid>
      </PageHeader>
    </Grid.Cell>
  </Grid>
);

export default Header;
