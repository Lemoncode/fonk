import type { Choice } from 'prompts';
import fs from 'node:fs/promises';
import childProcess from 'node:child_process';

export const getDirectories = async path =>
  (await fs.readdir(path, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules')
    .map(dirent => dirent.name);

export const exec = command => {
  const child = childProcess.spawn(command, { shell: true, stdio: 'inherit' });
  child.on('close', (code: number) => {
    process.exit(code);
  });
};

export const filterChoices = (input: string, choices: Choice[]) =>
  Promise.resolve(choices.filter(choice => choice.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())));

export const formatPlaygroundName = (scope: string, subforlder: string, name: string) =>
  `${scope}/${subforlder}-${name}`;
