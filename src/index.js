import { Table } from './scripts/table';
import { dataService } from './services';
import './styles/main.css';

const table = new Table('.table');
const checkerBox = document.querySelector('.main__checker');

(async () => {
  checkerBox.addEventListener('input', async (e) => {
    await getData(e.target.value)
  });

  await getData();
})();

async function getData(param) {
  const data = (await dataService.fetchData(param));
  table.init(data);
}
