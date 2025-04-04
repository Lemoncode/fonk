import { getDirectories } from './helpers';

export const PLAYGROUNDS_SCOPE = '@playgrounds';
export const VANILLA_PLAYGROUNDS = await getDirectories('./playgrounds/vanilla');

export const PACKAGES_SCOPE = '@lemoncode';
export const PACKAGES = await getDirectories('./packages');
