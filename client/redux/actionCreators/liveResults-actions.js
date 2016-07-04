import io from 'socket.io-client';
import { calculateAverage, percentCompletion } from './liveResults-helpers';

export const UPDATE_LINE_CHART = 'UPDATE_LINE_CHART';
export const UPDATE_CURRENT_ACTION = 'UPDATE_CURRENT_ACTION';
export const UPDATE_COMPUTED = 'UPDATE_COMPUTED';

const token = localStorage.getItem('id_token');
const socket = io({
  query: `token=${token}`,
});

// REMOVE COUNTER FOR PRODUCTION
let tempCounter = 0;

/* ******* Update Line Chart Data Actions ******* */
export const updateLineChartAction = spawnData => ({
  type: UPDATE_LINE_CHART,
  labels: spawnData.labels,
  series: spawnData.series,
});

export const updateCurrentAction = actionData => ({
  type: UPDATE_CURRENT_ACTION,
  index: actionData.index,
  httpVerb: actionData.httpVerb,
  statusCode: actionData.statusCode,
  elapsedTime: actionData.elapsedTime,
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

      const spawnData = data.spawn;
      const actionData = data.action;
      const elapsedTime = spawnData.series;
      const spawnLabel = spawnData.labels;

      dispatch(updateLineChartAction(spawnData));
      dispatch(updateCurrentAction(actionData));
      const calculated = {
        averageElapsedTime: Math.round(calculateAverage(elapsedTime) * 100) / 100,
        numberActions: actionData.httpVerb.length,
        currentSpawns: spawnLabel.length,
        percentComplete: percentCompletion(jobCount, spawnLabel.length),
        numberErrors: 0, // TODO with httpVerb arrays
      };
      dispatch(updateComputedData(
        calculated.averageElapsedTime,
        calculated.numberActions,
        calculated.currentSpawns,
        calculated.percentComplete,
        calculated.numberErrors,
      ));

      // REMOVE COUNTER FOR PRODUCTION
      tempCounter++;
      if (data.spawn.labels.length < jobCount && tempCounter < 10) {
        // REMOVE COUNTER FOR PRODUCTION
        // console.log('tempCounter count is', tempCounter);
        // REMOVE TEST SCENARIO FOR PRODUCTION
        dispatch(updateLineChartData(jobCount, scenarioID, calculated));
      } else {
        // Get all computed data and send over
        socket.emit('complete', { calculated, scenarioID: scenarioID });
      }
    });
  };
