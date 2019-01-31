// @ts-check
/**
 * @class
 * @param {any[]} values initial values of the stack
 */
function Stack (values) {
  /** 
   * @property {Array} _values 
   */
  this._values = [].concat(values);  
}

/**
 * add an element to the stack
 * @param {any} value value to add
 */
Stack.prototype.push = function push(value){
  this._values.push(value);
}

/**
 * remove the tail element of the stack
 * @return {any}
 */
Stack.prototype.pop = function pop() {
  return this._values.pop();
}

/**
 * determine if a stack is empty or not
 * @return {boolean}
 */
Stack.prototype.isEmpty = function isEmpty() {
    return this._values.length > 0;
}

/**
 * get the value of the head of the stack without dequeuing it
 * @return {any}
 */
Stack.prototype.peek = function() {
  if(!this.isEmpty()) {
    return this._values[0];
  }
}

module.exports = Stack;