import { VANILLA_PLAYGROUNDS, REACT_PLAYGROUNDS, PLAYGROUNDS_SCOPE } from './constants';
import { formatPlaygroundName } from './helpers';

const getCommand = (playground: string, subfolder: string) =>
  `npm run e2e -w ${formatPlaygroundName(PLAYGROUNDS_SCOPE, subfolder, playground)}`;

export const command = `npm run build && cd ./playgrounds && ${VANILLA_PLAYGROUNDS.map(playground => `${getCommand(playground, 'vanilla')}`).join(' && ')}
  && ${REACT_PLAYGROUNDS.map(playground => `${getCommand(playground, 'react')}`).join(' && ')}`;
