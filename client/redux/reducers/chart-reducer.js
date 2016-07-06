import { UPDATE_LINE_CHART, UPDATE_CURRENT_ACTION, UPDATE_COMPUTED } from '../actionCreators/results-actions';

const initialStateChart = {
  spawnLabel: [1, 2, 3, 4, 5, 6, 7, 8],
  elapsedTimeSpawn: [1, 9, 7, 8, 5, 3, 5, 4],
  index: [1, 2, 3, 4, 5, 6, 7, 8],
  httpVerb: ['GET', 'POST', 'GET', 'POST', 'GET', 'POST', 'GET', 'POST'],
  actionTaken: ['action1', 'action2', 'action3', 'action2', 'action2', 'action3', 'action4', 'action2'],
  path: ['pathA', 'pathB', 'pathA', 'pathB', 'pathC', 'pathA', 'pathB', 'pathC'],
  statusCode: [200, 300, 400, 200, 200, 200, 400, 200],
  elapsedTimeAction: [2, 3, 4, 5, 3, 3, 2, 1],
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
        spawnLabel: action.spawnLabel,
        elapsedTimeSpawn: action.elapsedTimeSpawn,
      });

    case UPDATE_CURRENT_ACTION:
      return Object.assign({}, state, {
        index: action.index,
        httpVerb: action.httpVerb,
        statusCode: action.statusCode,
        elapsedTimeAction: action.elapsedTimeAction,
        actionTaken: action.elapsedTimeAction,
        path: action.elapsedTimeAction,
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

