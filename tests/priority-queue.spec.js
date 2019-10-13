import {describe} from 'ava-spec';
import Queue from '../lib/lists/priority-queue';
describe('Priority Queues', it => {
  it('should be a constructor', t => {
    t.is(typeof Queue, 'function');
  });
  
  it('should create an instance', t => {
    const q = new Queue();
    t.true(q instanceof Queue)
  });
  
  it('should have a method of adding elements', t => {
    const q = new Queue();
    t.is(typeof q.enqueue, 'function')
  });

  it('should have a method of removing elements', t => {
    const q = new Queue();
    t.is(typeof q.dequeue, 'function')
  });

  it('should have a method that tells if it is empty', t => {
    const q = new Queue();
    t.is(typeof q.isEmpty, 'function')
  });

  it('should have a method to peek without removing', t => {
    const q = new Queue();
    t.is(typeof q.peek, 'function')
  });

  it('should respect priority', t => {
    const samples = [['a', 2], ['c', 1], ['b', 5]];
    const q = new Queue();

    samples.forEach((x) => q.enqueue.apply(q, x));
    
    t.is(q.dequeue().value, 'b');
    t.is(q.dequeue().value, 'a');
    t.is(q.peek().value, 'c');
    t.is(q.dequeue().value, 'c');
    t.true(q.isEmpty());
  })
});