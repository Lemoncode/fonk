import { RecordValidationFunctionAsync } from "@lemoncode/fonk";
import { resolveProcessFromBackend } from "./api";

export const processValidator: RecordValidationFunctionAsync = ({ values }) =>
  resolveProcessFromBackend().then(data => {
    const succeeded = values.cachedResult === data;
    return {
      succeeded,
      message: succeeded
        ? ""
        : `Please, review the process. The real result was ${data}`,
      type: "RECORD_PROCESS"
    };
  });
