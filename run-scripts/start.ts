import prompts from 'prompts';
import { VANILLA_PLAYGROUNDS, PLAYGROUNDS_SCOPE } from './constants';
import { filterChoices, formatPlaygroundName } from './helpers';

const length = VANILLA_PLAYGROUNDS.length;

let selected: string;
if (length > 1) {
  const response: { selected: string } = await prompts({
    type: 'autocomplete',
    name: 'selected',
    message: '[start]',
    choices: VANILLA_PLAYGROUNDS.map(playground => ({
      title: playground,
      value: formatPlaygroundName(PLAYGROUNDS_SCOPE, 'vanilla', playground),
      selected: true,
    })),
    suggest: filterChoices,
  });
  selected = response.selected;
} else {
  selected = formatPlaygroundName(PLAYGROUNDS_SCOPE, 'vanilla', VANILLA_PLAYGROUNDS[0]);
}

export const command = selected && `turbo watch start --env-mode=loose --filter=${selected}`;
