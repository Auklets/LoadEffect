import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';

import { panelBackgroundColor } from '../ResultsCSS.jsx';

// Axis Plugin
(function (window, document, Chartist) {
    'use strict';

    var axisDefaults = {
        axisTitle: '',
        axisClass: 'ct-axis-title',
        offset: {
            x: 0,
            y: 0
        },
        textAnchor: 'middle',
        flipText: false
    };
    
    var defaultOptions = {
        axisX:  Chartist.extend({}, axisDefaults),
        axisY:  Chartist.extend({}, axisDefaults)
    };

    //as axisX will usually be at the bottom, set it to be below the labels
    defaultOptions.axisX.offset.y = 40;
    
    //this will stop the title text being slightly cut off at the bottom.
    //TODO - implement a cleaner fix.
    defaultOptions.axisY.offset.y = -1;

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctAxisTitle = function (options) {

        options = Chartist.extend({}, defaultOptions, options);

        return function ctAxisTitle(chart) {

            chart.on('created', function (data) {

                if (!options.axisX.axisTitle && !options.axisY.axisTitle) {
                    throw new Error('ctAxisTitle plugin - You must provide at least one axis title');
                } else if (!data.axisX && !data.axisY) {
                    throw new Error('ctAxisTitle plugin can only be used on charts that have at least one axis');
                }

                var xPos;
                var yPos;
                var title;

                //position axis X title
                if (options.axisX.axisTitle && data.axisX) {

                    xPos = (data.axisX.axisLength / 2) + data.options.axisY.offset + data.options.chartPadding.left;

                    yPos = data.options.chartPadding.top;

                    if (data.options.axisY.position === 'end') {
                        xPos -= data.options.axisY.offset;
                    }

                    if (data.options.axisX.position === 'end') {
                        yPos += data.axisY.axisLength;
                    }

                    title = new Chartist.Svg("text");
                    title.addClass(options.axisX.axisClass);
                    title.text(options.axisX.axisTitle);
                    title.attr({
                        x: xPos + options.axisX.offset.x,
                        y: yPos + options.axisX.offset.y,
                        "text-anchor": options.axisX.textAnchor
                    });

                    data.svg.append(title, true);

                }

                //position axis Y title
                if (options.axisY.axisTitle && data.axisY) {
                    xPos = 0;


                    yPos = (data.axisY.axisLength / 2) + data.options.chartPadding.top;

                    if (data.options.axisX.position === 'start') {
                        yPos += data.options.axisX.offset;
                    }

                    if (data.options.axisY.position === 'end') {
                        xPos = data.axisX.axisLength;
                    }

                    var transform = 'rotate(' + (options.axisY.flipTitle ? -90 : 90) + ', ' + xPos + ', ' + yPos + ')';

                    title = new Chartist.Svg("text");
                    title.addClass(options.axisY.axisClass);
                    title.text(options.axisY.axisTitle);
                    title.attr({
                        x: xPos + options.axisY.offset.x,
                        y: yPos + options.axisY.offset.y,
                        transform: transform,
                        "text-anchor": options.axisY.textAnchor
                    });

                    data.svg.append(title, true);

                }

            });
        };
    };
}(window, document, Chartist));

// Threshold Plugin
// (function (window, document, Chartist) {
//   'use strict';

//   var defaultOptions = {
//     threshold: 0,
//     classNames: {
//       aboveThreshold: 'ct-threshold-above',
//       belowThreshold: 'ct-threshold-below'
//     },
//     maskNames: {
//       aboveThreshold: 'ct-threshold-mask-above',
//       belowThreshold: 'ct-threshold-mask-below'
//     }
//   };

//   function createMasks(data, options) {
//     // Select the defs element within the chart or create a new one
//     var defs = data.svg.querySelector('defs') || data.svg.elem('defs');
//     // Project the threshold value on the chart Y axis
//     var projectedThreshold = data.chartRect.height() - data.axisY.projectValue(options.threshold) + data.chartRect.y2;
//     var width = data.svg.width();
//     var height = data.svg.height();

//     // Create mask for upper part above threshold
//     defs
//       .elem('mask', {
//         x: 0,
//         y: 0,
//         width: width,
//         height: height,
//         id: options.maskNames.aboveThreshold
//       })
//       .elem('rect', {
//         x: 0,
//         y: 0,
//         width: width,
//         height: projectedThreshold,
//         fill: 'white'
//       });

//     // Create mask for lower part below threshold
//     defs
//       .elem('mask', {
//         x: 0,
//         y: 0,
//         width: width,
//         height: height,
//         id: options.maskNames.belowThreshold
//       })
//       .elem('rect', {
//         x: 0,
//         y: projectedThreshold,
//         width: width,
//         height: height - projectedThreshold,
//         fill: 'white'
//       });

//     return defs;
//   }

//   Chartist.plugins = Chartist.plugins || {};
//   Chartist.plugins.ctThreshold = function (options) {

//     options = Chartist.extend({}, defaultOptions, options);

//     return function ctThreshold(chart) {
//       if (chart instanceof Chartist.Line || chart instanceof Chartist.Bar) {
//         chart.on('draw', function (data) {
//           if (data.type === 'point') {
//             // For points we can just use the data value and compare against the threshold in order to determine
//             // the appropriate class
//             data.element.addClass(
//               data.value.y >= options.threshold ? options.classNames.aboveThreshold : options.classNames.belowThreshold
//             );
//           } else if (data.type === 'line' || data.type === 'bar' || data.type === 'area') {
//             // Cloning the original line path, mask it with the upper mask rect above the threshold and add the
//             // class for above threshold
//             data.element
//               .parent()
//               .elem(data.element._node.cloneNode(true))
//               .attr({
//                 mask: 'url(#' + options.maskNames.aboveThreshold + ')'
//               })
//               .addClass(options.classNames.aboveThreshold);

//             // Use the original line path, mask it with the lower mask rect below the threshold and add the class
//             // for blow threshold
//             data.element
//               .attr({
//                 mask: 'url(#' + options.maskNames.belowThreshold + ')'
//               })
//               .addClass(options.classNames.belowThreshold);
//           }
//         });

//         // On the created event, create the two mask definitions used to mask the line graphs
//         chart.on('created', function (data) {
//           createMasks(data, options);
//         });
//       }
//     };
//   }
// }(window, document, Chartist));

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
    // Chartist.plugins.ctThreshold({
    //   threshold: 4,
    // }),
  ],
};

const LineGraph = (props) => (
  <div>
    <Panel bsStyle="primary" style={panelBackgroundColor} header={'Spawn Elapsed Time'}>
      <div style={{ backgroundColor: 'white' }}>
        <ChartistGraph data={props.simpleLineChartData} options={lineChartOptions} type={'Line'} />
      </div>
    </Panel>
  </div>
);

LineGraph.propTypes = {
  simpleLineChartData: PropTypes.object.isRequired,
};

export default LineGraph;