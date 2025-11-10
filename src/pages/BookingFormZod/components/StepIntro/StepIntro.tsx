import {
  Heading,
  Paragraph,
  OrderedList,
  CallToActionLink,
} from '@amsterdam/design-system-react';

interface StepIntroProps {
  onButtonClick: () => void;
}

const StepIntro = ({ onButtonClick }: StepIntroProps) => (
  <>
    <Heading className="ams-mb-m" level={1}>
      Waar u dit formulier voor gebruikt
    </Heading>
    <Paragraph className="ams-mb-xl" size="large">
      Met dit formulier maakt u een afspraak bij een Stadsloket in Amsterdam of
      Weesp.
    </Paragraph>

    <Heading className="ams-mb-s" level={2}>
      De stappen in dit formulier
    </Heading>
    <OrderedList className="ams-mb-l">
      <OrderedList.Item>
        <strong>Uw gegevens</strong> - Vul uw contactgegevens in.
      </OrderedList.Item>
      <OrderedList.Item>
        <strong>Afspraak</strong> - Kies waarvoor u een afspraak wilt maken.
        Kies ook waar u de afspraak wilt hebben. En wanneer.
      </OrderedList.Item>
      <OrderedList.Item>
        <strong>Controleren</strong> - Controleer de gegevens die u heeft
        ingevuld. Verstuur de aanvraag.
      </OrderedList.Item>
    </OrderedList>
    <CallToActionLink
      href="#"
      onClick={e => {
        e.preventDefault();
        onButtonClick();
      }}
    >
      Start het formulier
    </CallToActionLink>
  </>
);

export default StepIntro;
