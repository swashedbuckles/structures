// @ts-check
import List from './doubly-linked-list';

export default class Queue {
  constructor() {
    this.queue = new List();
  }

  /**
   * add a value to the top of the queue
   * @param {any} value
   * @return {Queue}
   */
  enqueue(value) {
    this.queue.addHead(value);
    return this;
  }

  /**
   * pop the top-most value off the queue
   * @return {any} value
   */
  dequeue() {
    const value = this.queue.removeTail();

    return value;
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return this.queue.isEmpty();
  }

  /**
   * get the value at the top of the queue w/out dequeuing
   * @return {any}
   */
  peek() {
    const head = this.queue.head;
    if(head) {
      return head.value;
    }
  }

  /**
   * iterate over the queue
   * @param {function} fn
   */
  each(fn) {
    this.queue.each(fn);
  }

  /**
   * map the queue to a new queue
   * @param {function} fn
   * @return {Queue}
   */
  map(fn) {
    const newQueue = new Queue();

    this.queue.eachRight(val => newQueue.enqueue(fn(val)));
    
    return newQueue;
  }
}