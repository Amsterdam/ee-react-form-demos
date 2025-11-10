import type { HTMLAttributes, PropsWithChildren } from 'react';
import { PageFooter, SkipLink } from '@amsterdam/design-system-react';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';

type LayoutProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

const Layout = ({ children }: LayoutProps) => (
  <>
    <SkipLink href="#inhoud">Direct naar inhoud</SkipLink>
    <AppHeader />
    {children}
    <PageFooter>
      <AppFooter />
    </PageFooter>
  </>
);

export default Layout;
