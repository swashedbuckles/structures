// @ts-check
/**
 * @template T
 */
export default class Queue {
  /**
   * @param {T[]} [values]
   */
  constructor(values) {
    /** @type {T[]} */
    this._values = [];
    if (values) {
      this._values = this._values.concat(values);
    }
  }
  /**
   * add an element to the queue
   * @param {T} value value to enqueue
   */
  enqueue(value) {
    this._values.unshift(value);
  }
  /**
   * remove the head element of the queue
   * @return {T}
   */
  dequeue() {
    if (!this.isEmpty()) {
      return this._values.pop();
    }
  }
  /**
   * determine if a queue is empty or not
   * @return {boolean}
   */
  isEmpty() {
    return this._values.length === 0;
  }
  /**
   * get the value of the head of the queue without dequeuing it
   * @return {T}
   */
  peek() {
    if (!this.isEmpty()) {
      return this._values[this._values.length - 1];
    }
  }

  /**
   * @param {function} fn
   */
  each(fn) {
    if(typeof fn !== 'function') {
      throw new TypeError ('Callback must be a function');
    }

    if(this.isEmpty()) {
      return;
    }

    this._values.reduceRight((prev, curr, index) => fn(curr), []);
  }
  
  /**
   * @param {function} fn
   */
  map(fn) {
    if(typeof fn !== 'function') {
      throw new TypeError ('Callback must be a function');
    }

    if(this.isEmpty()) {
      return;
    }

    return this._values.reduceRight((acc, x) => {
      acc.enqueue(fn(x));
      return acc;
    }, new Queue());
  }

  /**
   * @param {function} fn
   * @param {T} accumulator
   */
  reduce(fn, accumulator) {
    if(typeof fn !== 'function') {
      throw new TypeError ('Callback must be a function');
    }

    if(this.isEmpty()) {
      return;
    }

    return this._values.reduceRight((acc, x) => {
      return fn(acc, x);
    }, accumulator);
  }
}