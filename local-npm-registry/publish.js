import childProcess from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const [...publishCommandArgs] = process.argv.slice(2);
const npmrcContent = `registry=http://localhost:4873
//localhost:4873/:_authToken="local-token"
@content-island:registry=http://localhost:4873
`;
const publishCommand = publishCommandArgs.join(' ');

const FILE_PATH = path.resolve(process.cwd(), '.npmrc');
try {
  await fs.writeFile(FILE_PATH, npmrcContent);
  childProcess.execSync(`${publishCommand}`, { stdio: 'inherit', shell: true });
} finally {
  await fs.rm(FILE_PATH, { recursive: true });
}
