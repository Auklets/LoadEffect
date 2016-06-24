// Logic to split jobs into divisible chunks for worker / worker-children

const splitJobs = (jobCount, denominator) => {
  return jobCount / denominator;
};

module.exports = splitJobs;

