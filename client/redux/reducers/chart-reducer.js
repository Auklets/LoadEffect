import { UPDATE_LINE_CHART, UPDATE_CURRENT_ACTION, UPDATE_COMPUTED } from '../actionCreators/liveResults-actions';

const initialStateChart = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [1, 9, 7, 8, 5, 3, 5, 4],
  index: [1, 2, 3, 4, 5, 6, 7, 8],
  httpVerb: ['GET', 'POST', 'GET', 'POST', 'GET', 'POST', 'GET', 'POST'],
  statusCode: [200, 300, 400, 200, 200, 200, 400, 200],
  elapsedTime: [2, 3, 4, 5, 3, 3, 2, 1],
  averageElapsedTime: 0,
  numberErrors: 0,
  numberActions: 0,
  currentSpawns: 0,
  percentComplete: 0,
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

    case UPDATE_COMPUTED:
      return Object.assign({}, state, {
        averageElapsedTime: action.averageElapsedTime,
        numberErrors: action.numberErrors,
        numberActions: action.numberActions,
        currentSpawns: action.currentSpawns,
        percentComplete: action.percentComplete,
      });

    default:
      return state;
  }
};

