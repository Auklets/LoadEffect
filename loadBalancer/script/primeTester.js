/**
 * A prime number is a whole number that has no other divisors other than
 * itself and 1. Write a function that accepts a number and returns true if it's
 * a prime number, false if it's not.
 */

const primeTester = function(n) {
  if(typeof n !== 'number' || n < 1 || n % 1 !== 0){
    // n isn't a number or n is less than 1 or n is not an integer
    return false;
  }
  // retrun true if n is prime
  for (var i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  // otherwise return false
  return true;
};


/* Extra credit: Write a function that generates a list of all prime numbers
 * in a user-specified range (inclusive). If you're not quite sure where to start,
 * check out the Sieve of Eratosthenes on Wikipedia. (And if you're feeling
 * saucy, check out the Sieve of Atkin.)
 */

const primeSieve = function (start, end) {
  var result = [];
  var counter = start
  while (counter <= end) {
    if (primeTester(counter) === true) {
      result.push(counter);
    }
    counter++;
  }
  return result;
  // Return a list of prime numbers in a user-specified range
};

module.exports = primeTester;

