import { createFormikValidation } from "@lemoncode/fonk-formik";
import { freeShippingRecordValidator } from "./custom-validators";

const validationSchema = {
  record: {
    freeShipping: [freeShippingRecordValidator]
  }
};

export const formValidation = createFormikValidation(validationSchema);
