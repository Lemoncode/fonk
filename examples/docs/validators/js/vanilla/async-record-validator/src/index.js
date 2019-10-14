import { executeProcess } from './playground';
const app = document.getElementById('app');

app.innerHTML = `
<div style="flex-grow: 1;margin-left:2rem;">
  <button id="nextProcessButton">Execute next process</button>
  <ul id="processList">
  </ul>
</div>
`;

document.getElementById('nextProcessButton').onclick = executeProcess;
