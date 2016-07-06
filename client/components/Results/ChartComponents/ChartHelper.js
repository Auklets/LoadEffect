import { calculateAverage } from '../../../lib/results-helpers';

const createBarChartData = (xAxisData, yAxisData) => {
  const categorized = {};
  const result = {
    labels: [],
    series: [[]],
  };

  // Loop through x Axis Data
  for (let i = 0; i < xAxisData.length; i++) {
    const xDataPoint = xAxisData[i];
    const yDataPoint = yAxisData[i];
    if (!categorized[xDataPoint]) {
      categorized[xDataPoint] = [];
    }
    categorized[xDataPoint].push(yDataPoint);
  }

  // Calculate average of each property and push into results
  for (const key in categorized) {
    if (!categorized.hasOwnProperty(key)) {
      // The current property is not a direct property of p
      continue;
    }
    // Calculate the average of all the numbers in the value
    result.labels.push(key);
    result.series[0].push(calculateAverage(categorized[key]));
  }

  // Return simpleLineChartData
  return result;
};

module.exports = createBarChartData;

// console.log(createBarChartData(['a', 'a', 'a', 'b'], [1, 2, 3, 4]));
// console.log(createBarChartData(['b', 'd', 'b', 'b'], [1.5, 2.3, 4.5, 5.5]));
