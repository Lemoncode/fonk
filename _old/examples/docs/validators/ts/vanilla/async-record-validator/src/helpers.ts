import { Process } from './model';

export const renderProcess = (process: Process, index: number) => {
  const li = document.createElement('li');
  li.textContent = `${process.name}: -> Result from cache: ${process.cachedResult}`;
  li.id = `process-${index}`;

  document.getElementById('processList').appendChild(li);
};

export const updateContent = (text: string, index: number) => {
  const process = document.getElementById(`process-${index}`);
  process.textContent = `${process.textContent} ${text}`;
};
