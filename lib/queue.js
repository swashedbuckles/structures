// @ts-check

export default class Queue {
  /**
   * @param {any[]} [values]
   */
  constructor(values) {
    /** @type {any[]} */
    this._values = [];
    if (values) {
      this._values = this._values.concat(values);
    }
  }
  /**
   * add an element to the queue
   * @param {any} value value to enqueue
   */
  enqueue(value) {
    this._values.unshift(value);
  }
  /**
   * remove the head element of the queue
   * @return {any}
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
   * @return {any}
   */
  peek() {
    if (!this.isEmpty()) {
      return this._values[this._values.length - 1];
    }
  }
}