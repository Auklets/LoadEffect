import React, { PropTypes } from 'react';
import { Panel, Col, Row } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import Plugin from './ChartistPlugin';
Plugin();
import createBarChart from './ChartHelper';

import { panelBackgroundColor, GraphsPadding } from '../ResultsCSS.jsx';

const lineChartOptions1 = {
  low: 0,
  showArea: true,
  chartPadding: {
    bottom: 25,
  },
  axisY: {
    onlyInteger: true
  },
  plugins: [
    Chartist.plugins.ctAxisTitle({
      axisX: {
        axisTitle: 'Action',
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
  ],
};

const lineChartOptions2 = {
  low: 0,
  showArea: true,
  chartPadding: {
    bottom: 25,
  },
  axisY: {
    onlyInteger: true
  },
  plugins: [
    Chartist.plugins.ctAxisTitle({
      axisX: {
        axisTitle: 'Path',
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
  ],
};

var options_responsive = [
  ["screen and (max-width: 640px)", {
    showLine: false,
    showArea: true
  }]
]

const DetailedGraphs = (props) => {
  const { actionTaken, path, elapsedTimeAction} = props;

  // Generate bar chart data
  const barChartByAction = createBarChart(actionTaken, elapsedTimeAction);
  const barChartByPath = createBarChart(path, elapsedTimeAction);

  return (
  <div>
    <Row>
      <Col xs={6} md={6}>
        <Panel bsStyle="primary" style={panelBackgroundColor} header={'Average Elapsed Time By Action'}>
            <ChartistGraph data={barChartByAction} style={GraphsPadding} options={lineChartOptions1}  type={'Bar'} responsive-options={options_responsive} />
        </Panel>
      </Col>
      <Col xs={6} md={6}>
        <Panel bsStyle="primary" style={panelBackgroundColor} header={'Average Elapsed Time By Path'}>
            <ChartistGraph data={barChartByPath} style={GraphsPadding} options={lineChartOptions2} type={'Bar'} />
        </Panel>
      </Col>
    </Row>
  </div>
  )
};

DetailedGraphs.propTypes = {
  actionTaken: PropTypes.array.isRequired,
  path: PropTypes.array.isRequired,
  elapsedTimeAction: PropTypes.array.isRequired,
};

export default DetailedGraphs;