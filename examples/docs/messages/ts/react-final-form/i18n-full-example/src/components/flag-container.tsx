import React from 'react';
import { LanguageContext, languages, languageList } from '../i18n';
import { Flag } from './flag';
import spainFlag from './images/spain-flag.png';
import englishFlag from './images/english-flag.png';
import * as s from './flag-container.styles';

interface Props {
  onSelectLanguage: (language: string) => void;
}

export const FlagContainer: React.FunctionComponent<Props> = props => {
  const { onSelectLanguage } = props;
  const { language, setLanguage } = React.useContext(LanguageContext);

  const handleClick = (language: string) => () => {
    setLanguage(language);
    onSelectLanguage(language);
  };

  return (
    <s.Container
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
      }}
    >
      <Flag
        icon={englishFlag}
        selected={languages.en === language}
        onClick={handleClick(languages.en)}
      />
      <Flag
        icon={spainFlag}
        selected={languages.es === language}
        onClick={handleClick(languages.es)}
      />
    </s.Container>
  );
};
