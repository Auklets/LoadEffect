// Matching algorithm to distribute work, write to database

// HELPER FUNCTION TO MATCH WORKER WITH JOBS and CALLS CALLBACK ON EACH JOB
const bundleTasks = (tasks, jobsPerBundle) => {
  const bundle = [];
  for (let task = 0; task < jobsPerBundle; task++) {
    bundle.push(tasks);
  }
  return bundle;
};

const createPrimeJobs = (jobCount) => {
  const result = [];
  for (let i = 0; i < jobCount; i++) {
    // Create arbitrary prime numbers
    result.push(Math.floor(Math.random() * 1000));
  }
  return result;
};

module.exports = { bundleTasks, createPrimeJobs };
