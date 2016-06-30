import { UPDATE_DATA } from '../actionCreators/liveResults-actions';

const initialState = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [1, 9, 7, 8, 5, 3, 5, 4],
};

export const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return Object.assign({}, state, {
        labels: state.labels.concat(action.labels),
        series: state.series.concat(action.series),
      });

    default:
      return state;
  }
};
