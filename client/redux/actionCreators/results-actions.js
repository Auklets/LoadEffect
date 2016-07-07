import io from 'socket.io-client';
import { calculateAverage, percentCompletion, errorCounter } from '../../lib/results-helpers';
import { storeRecentScenarioInfo } from './scenario-actions';

export const UPDATE_ALL_CHART = 'UPDATE_ALL_CHART';

const token = localStorage.getItem('id_token');
const socket = io({
  query: `token=${token}`,
});

let maxRecurse = 0;
let emitCount = 0;
/* ******* Update Line Chart Data Actions ******* */

export const updateAllChart = (spawnData, actionData, averageElapsedTime, numberActions, currentSpawns, percentComplete, numberErrors) => ({
  type: UPDATE_ALL_CHART,
  averageElapsedTime,
  numberErrors,
  numberActions,
  currentSpawns,
  percentComplete,
  index: actionData.index,
  httpVerb: actionData.httpVerb,
  statusCode: actionData.statusCode,
  elapsedTimeAction: actionData.elapsedTimeAction,
  actionTaken: actionData.actionTaken,
  path: actionData.path,
  spawnLabel: spawnData.spawnLabel,
  elapsedTimeSpawn: spawnData.elapsedTimeSpawn,
});

export const updateLineChartData = (jobCount, scenarioID) =>
  dispatch => {
    if (emitCount > 10) {
      return;
    }

    socket.emit('getResultsData', { currentScenarioID: scenarioID });
    emitCount++;
    console.log('Making an emit to web server', emitCount);
    socket.on('receiveResultsData', (data) => {
      console.log('Got data from sockets', data);
      socket.removeAllListeners('receiveResultsData');

      const { spawn, action, scenario } = data;
      const { elapsedTimeSpawn, spawnLabel } = spawn;
      const { httpVerb, statusCode } = action;


      const { averageElapsedTime, numberActions } = scenario;
      const calculated = {
        averageElapsedTime: averageElapsedTime || (Math.round(calculateAverage(elapsedTimeSpawn) * 100) / 100),
        numberActions: numberActions || httpVerb.length,
        currentSpawns: spawnLabel.length,
        percentComplete: percentCompletion(jobCount, spawnLabel.length),
        numberErrors: errorCounter(statusCode),
      };
      console.log('receive statusCode from socket', statusCode);
      dispatch(updateAllChart(
        spawn,
        action,
        calculated.averageElapsedTime,
        calculated.numberActions,
        calculated.currentSpawns,
        calculated.percentComplete,
        calculated.numberErrors
      ));
      dispatch(storeRecentScenarioInfo(scenario));

      if (!scenario.completion) {
        if (elapsedTimeSpawn.length < jobCount && maxRecurse < 3) {
          console.log('maxRecurse', maxRecurse);
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
