/* eslint-disable */

const expect = require('chai').expect;
const Queue = require('../queue');

// Queue
describe('Queue', () => {
  // Adds item to queue
  it('should add items to the queue', () => {
    const test = new Queue();
    test.addToQueue(1);
    test.addToQueue(2);
    test.addToQueue(3);

    expect(test.checkLength()).to.equal(3);
  });

  // Checks items in queue after additions and removals
  it('should return next item when takeNext is called', () => {

  });
  // Returns next item in queue when takeNext is called
  it('should return next item when takeNext is called', () => {

  });
});