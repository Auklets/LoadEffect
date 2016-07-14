import { UPDATE_ALL_CHART } from '../actionCreators/results-actions';

const initialStateChart = {
  spawnLabel: [],
  elapsedTimeSpawn: [],
  index: [],
  httpVerb: [],
  actionTaken: [],
  path: [],
  statusCode: [],
  elapsedTimeAction: [],
  averageElapsedTime: 786,
  numberErrors: 0,
  numberActions: 1000,
  currentSpawns: 7600,
  percentComplete: 100,
};

export const chartReducer = (state = initialStateChart, action) => {
  switch (action.type) {
    case UPDATE_ALL_CHART:
      return Object.assign({}, state, {
        averageElapsedTime: action.averageElapsedTime,
        numberErrors: action.numberErrors,
        numberActions: action.numberActions,
        currentSpawns: action.currentSpawns,
        percentComplete: action.percentComplete,
        index: action.index,
        httpVerb: action.httpVerb,
        statusCode: action.statusCode,
        elapsedTimeAction: action.elapsedTimeAction,
        actionTaken: action.actionTaken,
        path: action.path,
        spawnLabel: action.spawnLabel,
        elapsedTimeSpawn: action.elapsedTimeSpawn,
      });

    default:
      return state;
  }
};

