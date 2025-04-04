import prompts from 'prompts';
import fs from 'node:fs';
import { PACKAGES, PACKAGES_SCOPE } from './constants';
import { filterChoices } from './helpers';

const { selected } = await prompts({
  type: 'autocomplete',
  name: 'selected',
  message: '[test:watch]',
  choices: [...PACKAGES.map(pkg => ({ title: `packages/${pkg}`, value: `${PACKAGES_SCOPE}/${pkg}` }))],
  suggest: filterChoices,
});

export const command = selected && `npm run test:watch -w ${selected}`;
