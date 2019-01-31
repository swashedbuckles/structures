// @ts-check

class Stack {
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
   * add an element to the stack
   * @param {any} value value to add
   */
  push(value) {
    this._values.push(value);
  }
  /**
   * remove the tail element of the stack
   * @return {any}
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
   * @return {any}
   */
  peek() {
    if (!this.isEmpty()) {
      const last = this._values.length - 1;
      return this._values[last];
    }
  }
}

export default Stack