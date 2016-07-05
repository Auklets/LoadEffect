export const calculateAverage = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
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
  currentUsers / totalUsers * 100;

export const errorCounter = (statusCodeArray) => {
  console.log(statusCodeArray);
  let count = 0;
  for (let i = 0; i < statusCodeArray.length; i++) {
    if (statusCodeArray[i] >= 400 && statusCodeArray[i] < 600) {
      count++;
    }
  }
  return count;
};

