import io from 'socket.io-client';
import { calculateAverage, percentCompletion, errorCounter } from '../../lib/results-helpers';
import { storeRecentScenarioInfo } from './scenario-actions';
import _ from 'underscore';

export const UPDATE_ALL_CHART = 'UPDATE_ALL_CHART';

const token = localStorage.getItem('id_token');
const socket = io({
  query: `token=${token}`,
});

let maxRecurse = 0;
let setScenario = false;
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
    socket.emit('getResultsData', { currentScenarioID: scenarioID });
    console.log('Making an emit to web server');
    socket.on('receiveResultsData', (data) => {
      console.log('Got data from sockets', data);
      socket.removeAllListeners('receiveResultsData');

      const { spawn, action, scenario } = data;
      const { elapsedTimeSpawn, spawnLabel } = spawn;
      const { httpVerb, statusCode } = action;


      const { averageElapsedTime, numberActions, completion } = scenario;
      const calculated = {
        averageElapsedTime: averageElapsedTime || (Math.round(calculateAverage(elapsedTimeSpawn) * 100) / 100),
        numberActions: numberActions || httpVerb.length,
        currentSpawns: spawnLabel.length,
        percentComplete: completion ? 100 : percentCompletion(jobCount, spawnLabel.length),
        numberErrors: errorCounter(statusCode),
      };

      // Maybe this doesn't work...? It doesnt lol
      if (!setScenario) {
        maxRecurse = 0;
        setScenario = true;
        dispatch(storeRecentScenarioInfo(scenario));
        dispatch(updateAllChart(
          spawn,
          action,
          calculated.averageElapsedTime,
          calculated.numberActions,
          calculated.currentSpawns,
          calculated.percentComplete,
          calculated.numberErrors
        ));
      }

      if (!completion) {
        if (elapsedTimeSpawn.length < jobCount && maxRecurse < 500) {
          maxRecurse++;
          dispatch(updateAllChart(
            spawn,
            action,
            calculated.averageElapsedTime,
            calculated.numberActions,
            calculated.currentSpawns,
            calculated.percentComplete,
            calculated.numberErrors
          ));
          dispatch(updateLineChartData(jobCount, scenarioID));
        } else {
          // Get all computed data and send over
          maxRecurse = 0;
          // Saving data to database
          socket.emit('saveComplete', { calculated, scenarioID });
        }
      }
    });
  };
