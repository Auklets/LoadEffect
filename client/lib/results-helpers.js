export const calculateAverage = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  if (array.length === 0) {
    return 0;
  }
  return sum / array.length;
};

export const sumArray = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

export const percentCompletion = (totalUsers, currentUsers) =>
  Math.round(currentUsers / totalUsers * 1000) / 10;

export const errorCounter = (statusCodeArray) => {
  let count = 0;
  for (let i = 0; i < statusCodeArray.length; i++) {
    if (statusCodeArray[i] >= 400 && statusCodeArray[i] < 600) {
      count++;
    }
  }
  return count;
};
