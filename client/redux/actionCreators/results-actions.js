import io from 'socket.io-client';
import { calculateAverage, percentCompletion, errorCounter } from '../../lib/results-helpers';
import { storeRecentScenarioInfo } from './scenario-actions';

export const UPDATE_LINE_CHART = 'UPDATE_LINE_CHART';
export const UPDATE_CURRENT_ACTION = 'UPDATE_CURRENT_ACTION';
export const UPDATE_COMPUTED = 'UPDATE_COMPUTED';

const token = localStorage.getItem('id_token');
const socket = io({
  query: `token=${token}`,
});

let maxRecurse = 0;
/* ******* Update Line Chart Data Actions ******* */

export const updateLineChartAction = spawnData => ({
  type: UPDATE_LINE_CHART,
  spawnLabel: spawnData.spawnLabel,
  elapsedTimeSpawn: spawnData.elapsedTimeSpawn,
});

export const updateCurrentAction = actionData => ({
  type: UPDATE_CURRENT_ACTION,
  index: actionData.index,
  httpVerb: actionData.httpVerb,
  statusCode: actionData.statusCode,
  elapsedTimeAction: actionData.elapsedTimeAction,
});

export const updateComputedData = (averageElapsedTime, numberActions, currentSpawns, percentComplete, numberErrors) => ({
  type: UPDATE_COMPUTED,
  averageElapsedTime,
  numberErrors,
  numberActions,
  currentSpawns,
  percentComplete,
});

export const updateLineChartData = (jobCount, scenarioID) =>
  dispatch => {
    socket.emit('getResultsData', { currentScenarioID: scenarioID });
    socket.on('receiveResultsData', (data) => {
      console.log('Got data from sockets', data);
      socket.removeAllListeners('receiveResultsData');

      const { spawn, action, scenario } = data;
      const { elapsedTimeSpawn, spawnLabel } = spawn;
      const { httpVerb, statusCode } = action;

      // TODO DRY - put into one function

      dispatch(storeRecentScenarioInfo(scenario));
      dispatch(updateLineChartAction(spawn));
      dispatch(updateCurrentAction(action));

      // Pull from scenario
      // console.log('Scenario ', data.scenario);
      const { averageElapsedTime, numberActions, numberErrors } = scenario;
      const calculated = {
        averageElapsedTime: averageElapsedTime || (Math.round(calculateAverage(elapsedTimeSpawn) * 100) / 100),
        numberActions: numberActions || httpVerb.length,
        currentSpawns: spawnLabel.length,
        percentComplete: percentCompletion(jobCount, spawnLabel.length),
        numberErrors: numberErrors === 0 ? errorCounter(statusCode) : numberErrors,
      };
      dispatch(updateComputedData(
        calculated.averageElapsedTime,
        calculated.numberActions,
        calculated.currentSpawns,
        calculated.percentComplete,
        calculated.numberErrors,
      ));

      if (!scenario.completion) {
        if (elapsedTimeSpawn.length < jobCount && maxRecurse < 1000) {
          maxRecurse++;
          dispatch(updateLineChartData(jobCount, scenarioID, calculated));
        } else {
          // Get all computed data and send over
          maxRecurse = 0;
          socket.emit('saveComplete', { calculated, scenarioID });
        }
      }
    });
  };
