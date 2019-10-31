import './styles.scss';
import { formValidation } from './form-validation';
import { resolveProcessFromCache } from './api';
import { renderProcess, updateContent } from './helpers';

const createEmptyValues = () => [];

let processList = createEmptyValues();

const createNextProcess = index => {
  const cachedResult = resolveProcessFromCache();
  const process = {
    name: `Process ${index}`,
    cachedResult,
  };
  processList = [...processList, process];

  return process;
};

document.getElementById('next-process-button').onclick = () => {
  const index = processList.length;
  const process = createNextProcess(index);
  renderProcess(process, index);

  formValidation.validateRecord(process).then(validationResult => {
    if (!validationResult.succeeded) {
      const message = validationResult.recordErrors.process.message;
      updateContent(message, index);
    }
  });
};

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  processList = createEmptyValues();
  document.getElementById('processList').innerHTML = '';
};
