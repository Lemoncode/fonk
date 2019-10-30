import { Input, Form, Button } from './components';

let state = {
  value: '',
};

const userInput = Input({
  value: state.value,
  onChange: e => (state = { ...state, value: e.target.value }),
  label: 'User',
});

const button = Button({
  label: 'Submit',
  type: 'submit',
});

const form = Form({
  onSubmit: () => console.log({ state }),
  children: [userInput, button],
});

const app = document.getElementById('app');
app.appendChild(form);
