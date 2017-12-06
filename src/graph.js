const d3 = require('d3');

function graph(data){
  const width = 900;
  const height = 450;
  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
  }

  const x = d3.scaleTime()
        .range([0, width]);
  const y = d3.scaleLinear()
        .range([height, 0]);

  const xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y)

  const body = d3.select(document.body);
  const container = body.append('div')
    .attr('class', 'container');

  const svg = container.append('svg')
    .attr('class', 'graph-container')
    .attr('width', margin.left + width + margin.right)
    .attr('height', margin.top + height + margin.bottom)

  const g = svg.append('g')
    .attr('class', 'graph')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xExtent = d3.extent(data, d => d.date);
  x.domain(xExtent);

  const yExtent = d3.extent(data, d => d.value);
  const yMax = d3.max(data, d => d.value);
  y.domain([0, yMax]);

  g.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('transform', d => `translate(${x(d.date)}, ${y(d.value)})`)
    .attr('r', 2)

  const line = d3.line()
    .x( d => x(d.date) )
    .y( d => y(d.value) )

  const area = d3.area()
    .x( d => x(d.date) )
    .y0(height)
    .y1( d => y(d.value) )

  g.append('path')
    .datum(data)
    .attr('class', 'area')
    .attr('d', area)

  const delta = d3.pairs(data);

  g.selectAll('path')
    .data(delta)
    .enter().append('path')
    .attr('class', 'line')
    .attr('d', line)

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis)
}

module.exports = graph;
