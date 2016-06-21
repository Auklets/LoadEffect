// Matching algorithm to distribute work, write to database


// HELPER FUNCTION TO MATCH SLAVES WITH JOBS and CALLS CALLBACK ON EACH JOB
exports.matchMaker = (jobsQueue, slaveQueue, callback) => {

};

exports.createPrimeJobs = (jobCount) => {
  const result = [];
  for (let i = 0; i < jobCount; i++) {
    // Create arbitrary prime numbers
    result.push(Math.floor(Math.random() * 100000));
  }
  return result;
};
