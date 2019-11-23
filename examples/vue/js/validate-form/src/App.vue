<template>
  <div class="app">
    <h1>Form Validation with Fonk and Vue.js 2 Example</h1>
    <h2>Password / Confirm Validation</h2>
    <form>
      <div>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          :value="values.username"
          @input="handleInputChange('username')"
          @blur="handleInputChange('username')"
        />
        <span>{{ errors.username.message }}</span>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          :value="values.password"
          @input="handleInputChange('password')"
          @blur="handleInputChange('password')"
        />
        <span>{{ errors.password.message }}</span>
      </div>
      <div>
        <label>Confirm</label>
        <input
          type="password"
          placeholder="Confirm"
          :value="values.confirm"
          @input="handleInputChange('confirm')"
          @blur="handleInputChange('confirm')"
        />
        <span>{{ errors.confirm.message }}</span>
      </div>
      <div class="buttons">
        <button type="submit" @click.prevent="onValidateForm">Submit</button>
        <button type="button" @click="resetButton">Reset</button>
      </div>
      <pre>{{ values }}</pre>
    </form>
  </div>
</template>

<script>
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';

const createEmptyValues = () => ({
  username: '',
  password: '',
  confirm: '',
});

const createEmptyErrors = () => ({
  username: createDefaultValidationResult(),
  password: createDefaultValidationResult(),
  confirm: createDefaultValidationResult(),
});

export default {
  name: 'app',
  data() {
    return {
      values: createEmptyValues(),
      errors: createEmptyErrors(),
    };
  },
  methods: {
    handleInputChange(fieldName) {
      const { value } = event.target;
      this.values[fieldName] = value;

      formValidation
        .validateField(fieldName, value, this.values)
        .then(validationResult => (this.errors[fieldName] = validationResult));
    },
    async onValidateForm() {
      try {
        const validationResult = await formValidation.validateForm(this.values);
        this.errors = { ...validationResult.fieldErrors };
        if (validationResult.succeeded) {
          window.alert(JSON.stringify(this.values, null, 2));
        }
      } catch (error) {
        console.error('onValidateForm -> error', error);
      }
    },
    resetButton() {
      this.values = createEmptyValues();
      this.errors = createEmptyErrors();
    },
  },
};
</script>

<style lang="scss">
@mixin btn($light, $dark) {
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  color: white;
  &:visited {
    color: white;
  }
  background-image: linear-gradient($light, $dark);
  border: 1px solid $dark;
  &:hover {
    background-image: linear-gradient($light, $dark);
    &[disabled] {
      background-image: linear-gradient($light, $dark);
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.app {
  font-family: sans-serif;

  h1 {
    text-align: center;
    color: #222;
  }

  h2 {
    text-align: center;
    color: #222;
  }

  & > div {
    text-align: center;
  }

  a {
    display: block;
    text-align: center;
    color: #222;
  }

  form {
    max-width: 500px;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;

    & > div {
      display: flex;
      flex-flow: row nowrap;
      line-height: 2em;
      margin: 5px;
      & > label {
        color: #333;
        width: 110px;
        font-size: 1em;
        line-height: 32px;
      }
      & > input,
      & > select,
      & > textarea {
        flex: 1;
        padding: 3px 5px;
        font-size: 1em;
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      & > input[type='checkbox'] {
        margin-top: 7px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
      & > span {
        line-height: 32px;
        margin-left: 10px;
        color: #800;
        font-weight: bold;
      }
    }
    .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 15px;
    }
    button {
      margin: 0 10px;
      &[type='submit'] {
        @include btn(#4f93ce, #285f8f);
      }
      &[type='button'] {
        @include btn(#ffffff, #d5d5d5);
        color: #555;
      }
    }
    pre {
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
    span {
      line-height: 32px;
      margin-left: 10px;
      color: #800;
      font-weight: bold;
    }
  }
}
</style>
