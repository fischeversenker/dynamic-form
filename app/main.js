document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form');
  const rowsContainer = document.querySelector('#rows');

  const addInput = (element) => {
    const row = element.closest('.row');
    const inputs = Array.from(row.querySelectorAll('input'));

    let lastInputId = 0;
    if (inputs.length) {
      lastInputId = getIndex(inputs.reverse()[0]);
    }

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.id = `input-${lastInputId+1}`;

    const inputsName = `inputs-${row.dataset.rowId}`;
    newInput.name = inputsName;

    row.appendChild(newInput);
  }

  const getIndex = (element) => {
    const index = element.id.replace(/^.*?-/, '');
    return parseInt(index);
  }

  const addRow = () => {
    const rows = Array.from(rowsContainer.querySelectorAll('.row'));
    let lastRowIndex = 0;
    if (rows.length) {
      lastRowIndex = getIndex(rows.reverse()[0]);
    }

    const newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.id = `row-${lastRowIndex+1}`;
    newRow.dataset.rowId = lastRowIndex+1;

    const button = document.createElement('button');
    button.classList.add('add-cell');
    button.innerHTML = '+ cell';
    button.type = 'button';

    button.addEventListener('click', () => {
      addInput(button);
    });

    newRow.appendChild(button);

    addInput(button);

    rowsContainer.appendChild(newRow);
  };

  const init = () => {
    // fetch last request and display
    fetch('request.json')
      .then(res => res.json())
      .then(res => {
        window.request.innerHTML = JSON.stringify(res, null, 2);
      });

    window['add-row'].addEventListener('click', () => {
      addRow();
    });

    addRow();
  }

  init();

});
