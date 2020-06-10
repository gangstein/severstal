import { TableRow } from './table-row';

export class Table {
  constructor(container) {
    this.container = document.querySelector(container);
  }

  init(data) {
    this.container.innerHTML = '';

    const rows = data
      .filter(d => d.parentId === 0)
      .map(d => new TableRow(d, data))

    rows.forEach((tableRow) => {
      this.container.appendChild(tableRow.rowWrapper)
    });
  }
}
