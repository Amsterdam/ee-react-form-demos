import { Grid, LinkList, PageHeader } from '@amsterdam/design-system-react';

const links = ['Label 1', 'Label 2', 'Label 3'];

export const AppHeader = () => (
  <PageHeader
    menuItems={links.map((link: string) => (
      <PageHeader.MenuLink href="#" key={link}>
        {link}
      </PageHeader.MenuLink>
    ))}
  >
    <Grid paddingBottom="2x-large" paddingTop="large">
      <PageHeader.GridCellNarrowWindowOnly span="all">
        <LinkList>
          <LinkList.Link href={'#'} key="Label 1">
            Label 1
          </LinkList.Link>
          <LinkList.Link href={'#'} key="Label 2">
            Label 2
          </LinkList.Link>
          <LinkList.Link href={'#'} key="Label 3">
            Label 3
          </LinkList.Link>
          {links.map(link => (
            <LinkList.Link href="#" key={link}>
              {link}
            </LinkList.Link>
          ))}
        </LinkList>
      </PageHeader.GridCellNarrowWindowOnly>
    </Grid>
  </PageHeader>
);

export default AppHeader;
