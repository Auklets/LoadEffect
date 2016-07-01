import { UPDATE_LINE_CHART, UPDATE_CURRENT_ACTION } from '../actionCreators/liveResults-actions';

const initialStateChart = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [1, 9, 7, 8, 5, 3, 5, 4],
  index: [1, 2, 3, 4, 5, 6, 7, 8],
  httpVerb: ['GET', 'POST', 'GET', 'POST', 'GET', 'POST', 'GET', 'POST'],
  statusCode: [200, 300, 400, 200, 200, 200, 400, 200],
  elapsedTime: [2, 3, 4, 5, 3, 3, 2, 1],
};

export const chartReducer = (state = initialStateChart, action) => {
  switch (action.type) {
    case UPDATE_LINE_CHART:
      return Object.assign({}, state, {
        labels: action.labels,
        series: action.series,
      });

    case UPDATE_CURRENT_ACTION:
      return Object.assign({}, state, {
        index: action.index,
        httpVerb: action.httpVerb,
        statusCode: action.statusCode,
        elapsedTime: action.elapsedTime,
      });

    default:
      return state;
  }
};

