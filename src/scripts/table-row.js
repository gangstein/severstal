export class TableRow {
  constructor({ id, name, balance, email }, data) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.email = email;
    this.data = data;

    this.children = null;
    this.fallback = null;
    this.expanded = false;
    this.expand = this._expand.bind(this);

    this.rowWrapper = document.createElement('div');
    this.rowWrapper.className = 'table__row-wrapper';

    this.row = document.createElement('div');
    this.row.className = 'table__row';
    this.row.innerHTML = `
        <div class="table__cell">${this.name}</div>
        <div class="table__cell">${this.balance}</div>
        <div class="table__cell">${this.email}</div>
      `;

    this.button = document.createElement('button');
    this.button.className = 'table__btn';
    this.button.addEventListener('click', this.expand);
    this.button.innerText = 'open';

    this.row.prepend(this.button);
    this.rowWrapper.append(this.row);
  }

  removeChildren() {
    if (this.children && this.children.length) {
      this.children.forEach(e => {
        e.button.removeEventListener('click', e.expand)
        e.rowWrapper.remove()
        e.removeChildren()
      })
    }

    if (this.fallback) {
      this.fallback.remove();
    }
  }

  async _expand() {
    this.expanded = !this.expanded;
    this.button.innerText = this.expanded ? 'close' : 'open';

    if (this.expanded) {
      const data = this.data.filter(d => d.parentId === this.id)

      this.children = data.map(d => new TableRow(d, this.data));

      if (this.children.length) {
        this.children.reverse().map(eE => this.rowWrapper.appendChild(eE.rowWrapper));
      } else {
        this.fallback = document.createElement('div');
        this.fallback.innerHTML = '<span>здесь пусто =(</span>';
        this.fallback.className = 'table__row table__row--empty';

        this.rowWrapper.appendChild(this.fallback)
      }
    } else {
      this.removeChildren();
    }
  }
}
