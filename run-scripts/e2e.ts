import { VANILLA_PLAYGROUNDS, PLAYGROUNDS_SCOPE } from './constants';
import { formatPlaygroundName } from './helpers';

const getCommand = playground => `npm run e2e -w ${formatPlaygroundName(PLAYGROUNDS_SCOPE, 'vanilla', playground)}`;

export const command = `npm run build && cd ./playgrounds && ${VANILLA_PLAYGROUNDS.map(playground => `${getCommand(playground)}`).join(' && ')}`;
