import prompts from 'prompts';
import { VANILLA_PLAYGROUNDS, REACT_PLAYGROUNDS, PLAYGROUNDS_SCOPE } from './constants';
import { filterChoices, formatPlaygroundName } from './helpers';

const { selected } = await prompts({
  type: 'autocomplete',
  name: 'selected',
  message: '[e2e:watch]',
  choices: [
    ...VANILLA_PLAYGROUNDS.map(playground => ({
      title: `vanilla/${playground}`,
      value: formatPlaygroundName(PLAYGROUNDS_SCOPE, 'vanilla', playground),
    })),
    ...REACT_PLAYGROUNDS.map(playground => ({
      title: `react/${playground}`,
      value: formatPlaygroundName(PLAYGROUNDS_SCOPE, 'react', playground),
    })),
  ],
  suggest: filterChoices,
});

export const command = selected && `turbo watch e2e:watch --filter=${selected}`;
