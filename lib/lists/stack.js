// @ts-check
/**
 * @template T
 */
class Stack {
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
   * add an element to the stack
   * @param {T} value value to add
   */
  push(value) {
    this._values.push(value);
  }
  /**
   * remove the tail element of the stack
   * @return {T}
   */
  pop() {
    if (!this.isEmpty()) {
      return this._values.pop();
    }
  }
  /**
   * determine if a stack is empty or not
   * @return {boolean}
   */
  isEmpty() {
    return this._values.length === 0;
  }
  /**
   * get the value of the head of the stack without dequeuing it
   * @return {T}
   */
  peek() {
    if (!this.isEmpty()) {
      const last = this._values.length - 1;
      return this._values[last];
    }
  }
}

export default Stack