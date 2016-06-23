/* eslint-disable */

const expect = require('chai').expect;
const Queue = require('../queue');

describe('Queue', () => {
  // Adds item to queue
  it('should add items to the queue', () => {
    const testQueue = new Queue();
    testQueue.addToQueue(1);
    testQueue.addToQueue(2);
    testQueue.addToQueue(3);

    expect(testQueue.checkLength()).to.equal(3);
  });

  // Checks items in queue after additions and removals
  it('should return next item when takeNext is called', () => {
    const testQueue = new Queue();
    testQueue.addToQueue(1);
    testQueue.addToQueue(2);
    testQueue.addToQueue(3);

    expect(testQueue.takeNext()).to.equal(1);
    expect(testQueue.checkLength()).to.equal(2);
  });
});