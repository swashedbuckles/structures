import {describe} from 'ava-spec';
import Queue from '../lib/lists/queue';
describe('Queues', it => {
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

  it('should be FIFO', t => {
    const samples = ['a', 'b', 'c'];
    const q = new Queue();

    samples.forEach(x => q.enqueue(x));
    t.is(q.dequeue(), 'a');
    t.is(q.dequeue(), 'b');
    t.is(q.peek(), 'c');
    t.is(q.dequeue(), 'c');
    t.true(q.isEmpty());
  });

  it('should have an each function', t => {
    const samples = ['a', 'b', 'c'];
    const q = new Queue();
    let index = 0;
    
    samples.forEach(x => q.enqueue(x));

    q.each((x, i) => {
      t.is(x, samples[index]);
      index++;
    });
  });

  it('should have a map function', t => {
    const double = x => x * 2;
    const samples = [1, 2, 3];
    const test    = samples.map(double);
    const q = new Queue;
    samples.forEach(x => q.enqueue(x))
    const r = q.map(double);

    t.is(r.dequeue(), test[0]);
    t.is(r.dequeue(), test[1]);
    t.is(r.dequeue(), test[2]);
  });
});