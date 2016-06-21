// Logic to split jobs into divisible chunks for slaves / slave-children

const splitJobs = (jobCount, denominator) => {
  return jobCount / (denominator + 1);
};

module.exports = splitJobs;

