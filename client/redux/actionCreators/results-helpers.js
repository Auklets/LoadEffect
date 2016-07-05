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

export const errorCounter = (httpVerbsArray) => {
  let count = 0;
  for (let i = 0; i < httpVerbsArray.length; i++) {
    if (httpVerbsArray[i] >= 400 && httpVerbsArray[i] < 600) {
      count++;
    }
  }
  return count;
};

console.log(errorCounter([400, 450, 600]));
