import React from 'react';
import { LanguageContext, languages } from '../i18n';
import { Flag } from './flag';
import spainFlag from './images/spain-flag.png';
import englishFlag from './images/english-flag.png';
import * as s from './flag-container.styles';

export const FlagContainer: React.FunctionComponent = props => {
  const { language, setLanguage } = React.useContext(LanguageContext);
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
        onClick={() => setLanguage(languages.en)}
      />
      <Flag
        icon={spainFlag}
        selected={languages.es === language}
        onClick={() => setLanguage(languages.es)}
      />
    </s.Container>
  );
};
