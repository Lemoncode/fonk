import React from "react";
import { render } from "react-dom";
import Styles from "./styles";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { formValidation } from "./form-validation";
import { resolveProcessFromCache } from "./api";

const onSubmit = values => {
  window.alert(JSON.stringify(values, null, 2));
};

const Label = props => {
  const { process, errorPromise } = props;
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    errorPromise.then(error => setError(error.message));
  }, []);

  return (
    <label>{`${process.name}: -> Result from cache: ${
      process.cachedResult
    } ${error}`}</label>
  );
};

const App = () => (
  <Styles>
    <h1>Form Validation with Fonk and React Final Form Example</h1>
    <h2>Async record validator</h2>
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators
      }}
      render={({ handleSubmit, form, values }) => {
        const createNextProcess = index => {
          const cachedResult = resolveProcessFromCache();
          const process = {
            name: `Process ${index}`,
            cachedResult
          };

          return process;
        };

        const handleClick = () => {
          const nextIndex = Array.isArray(values.processList)
            ? values.processList.length
            : 0;
          const process = createNextProcess(nextIndex);
          form.mutators.push("processList", process);
        };

        const handleValidate = processList => {
          const index = Array.isArray(processList) ? processList.length - 1 : 0;

          return (
            processList &&
            formValidation
              .validateRecord(processList[index])
              .then(({ recordErrors }) => recordErrors.process)
          );
        };

        return (
          <form onSubmit={handleSubmit}>
            <div className="buttons">
              <button type="button" onClick={handleClick}>
                Execute next process
              </button>
              <button type="button" onClick={form.reset}>
                Reset
              </button>
            </div>
            <FieldArray name="processList" validate={handleValidate}>
              {({ fields, meta }) =>
                fields.map((field, index) => {
                  const process = fields.value[index];
                  return (
                    <div key={process.name}>
                      <Label process={process} errorPromise={meta.error} />
                    </div>
                  );
                })
              }
            </FieldArray>
          </form>
        );
      }}
    />
  </Styles>
);

render(<App />, document.getElementById("root"));
