import {
  PageFooter,
  Grid,
  Heading,
  LinkList,
  StandaloneLink,
} from '@amsterdam/design-system-react';
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MastodonIcon,
  PhoneIcon,
} from '@amsterdam/design-system-react-icons';
import { ReactNode } from 'react';

type FollowLink = {
  icon?: ReactNode;
  text: string;
};

const followLinks: FollowLink[] = [
  { text: 'De Amsterdam App' },
  { text: 'Nieuwsbrieven' },
  { icon: <FacebookIcon />, text: 'Facebook' },
  { icon: <InstagramIcon />, text: 'Instagram' },
  { icon: <LinkedInIcon />, text: 'LinkedIn' },
  { icon: <MastodonIcon />, text: 'Mastodon' },
];

const AppFooter = () => (
  <>
    <PageFooter.Spotlight key={1}>
      <Grid paddingVertical="x-large">
        <Grid.Cell span={4}>
          <Heading
            className="ams-mb-s"
            color="inverse"
            level={2}
            size="level-3"
          >
            Contact
          </Heading>
          <LinkList className="ams-mb-xl">
            <LinkList.Link color="inverse" href="#" icon={<MailIcon />}>
              Contactformulier
            </LinkList.Link>
            <LinkList.Link color="inverse" href="#" icon={<PhoneIcon />}>
              14 020
            </LinkList.Link>
            <LinkList.Link color="inverse" href="#" icon={<ClockIcon />}>
              Adressen en openingstijden
            </LinkList.Link>
          </LinkList>
          <Heading
            className="ams-mb-s"
            color="inverse"
            level={2}
            size="level-3"
          >
            Vacatures
          </Heading>
          <StandaloneLink color="inverse" href="#">
            Werken bij Amsterdam
          </StandaloneLink>
        </Grid.Cell>
        <Grid.Cell span={4} start={{ narrow: 1, medium: 5, wide: 5 }}>
          <Heading
            className="ams-mb-s"
            color="inverse"
            level={2}
            size="level-3"
          >
            Volg ons
          </Heading>
          <LinkList>
            {followLinks.map(({ icon, text }) => (
              <LinkList.Link color="inverse" href="#" icon={icon} key={text}>
                {text}
              </LinkList.Link>
            ))}
          </LinkList>
        </Grid.Cell>
        <Grid.Cell span={4} start={{ narrow: 1, medium: 1, wide: 9 }}>
          <Heading
            className="ams-mb-s"
            color="inverse"
            level={2}
            size="level-3"
          >
            Doen in de stad
          </Heading>
          <LinkList>
            <LinkList.Link color="inverse" href="#">
              Bijeenkomsten en activiteiten
            </LinkList.Link>
            <LinkList.Link color="inverse" href="#">
              Uit in Amsterdam
            </LinkList.Link>
            <LinkList.Link color="inverse" href="#">
              Amsterdam 750 jaar
            </LinkList.Link>
          </LinkList>
        </Grid.Cell>
      </Grid>
    </PageFooter.Spotlight>
    <Heading className="ams-visually-hidden" key={2} level={2}>
      Over deze website
    </Heading>
    <PageFooter.Menu key={3}>
      <PageFooter.MenuLink href="#">Over deze site</PageFooter.MenuLink>
      <PageFooter.MenuLink href="#">Privacy</PageFooter.MenuLink>
      <PageFooter.MenuLink href="#">Cookies op deze site</PageFooter.MenuLink>
      <PageFooter.MenuLink href="#">Webarchief</PageFooter.MenuLink>
    </PageFooter.Menu>
  </>
);

export default AppFooter;
