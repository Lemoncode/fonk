import { formValidation } from './form-validation';
import { resolveProcessFromCache } from './api';
import { renderProcess, updateContent } from './helpers';

let processList = [];

const createNextProcess = index => {
  const cachedResult = resolveProcessFromCache();
  const process = {
    name: `Process ${index}`,
    cachedResult,
  };
  processList = [...processList, process];

  return process;
};

export const executeProcess = () => {
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
