import css from './css/index.css';
const graph = require('./graph.js');


const byDate = (a, b) =>
  a.date.valueOf() - b.date.valueOf();

const hasValue = a => !Number.isNaN(a.value);

const data = require('./json/library-metrics.json');

const totalCardHoldersPerMonth = data.map(d => ({
  date: new Date(d.date),
  value: parseInt(d.total_cardholders)
}))
.sort(byDate)
.filter(hasValue)


graph(totalCardHoldersPerMonth);
