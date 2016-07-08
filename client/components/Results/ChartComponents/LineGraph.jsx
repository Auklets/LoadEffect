import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import Plugin from './ChartistPlugin';
Plugin();

import { panelBackgroundColor } from '../ResultsCSS.jsx';

const lineChartOptions = {
  low: 0,
  showArea: true,
  height: 250,
  chartPadding: {
    bottom: 25,
  },
  // Build so that there will always only be 5 labels
  axisX: {
    labelInterpolationFnc: function(value, index) {
      return index % 2 === 0 ? value : null;
    },
  },
  axisY: {
    onlyInteger: true,
  },
  plugins: [
    Chartist.plugins.ctAxisTitle({
      axisX: {
        axisTitle: 'User Count',
        axisClass: 'ct-axis-title',
        offset: {
          x: 0,
          y: 50,
        },
        textAnchor: 'middle',
      },
      axisY: {
        axisTitle: 'Time [ms]',
        axisClass: 'ct-axis-title',
        offset: {
          x: 0,
          y: 0,
        },
        textAnchor: 'middle',
        flipTitle: false,
      },
    }),
    Chartist.plugins.tooltip(),
  ],
};

const LineGraph = (props) => {
  const toolTipSeries = (labels, series) => {
    const result = [];
    for (let i = 0; i < labels.length; i++) {
      const item = {};
      item.meta = `User Count ${labels[i]}:`;
      item.value = series[i];
      result.push(item);
    }
    return result;
  };

  const simpleLineChartData = {
    labels: props.labels,
    series: [toolTipSeries(props.labels, props.series)],
  };

  return (
    <div>
      <Panel bsStyle="primary" style={panelBackgroundColor} header={'Spawn Elapsed Time'}>
        <div style={{ backgroundColor: 'white' }}>
          <ChartistGraph data={simpleLineChartData} options={lineChartOptions} type={'Line'} />
        </div>
      </Panel>
    </div>
  );
};

LineGraph.propTypes = {
  labels: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
};

export default LineGraph;
