// @ts-check
/**
 * @class
 * @param {any[]} [values] initial values of the queue
 * @property {Array} _values
 */
function Queue (values) {
  this._values = [];
  if(values) {
    this._values = this._values.concat(values);  
  }
}

/**
 * add an element to the queue
 * @param {any} value value to enqueue
 */
Queue.prototype.enqueue = function enqueue(value){
  this._values.unshift(value);
}

/**
 * remove the head element of the queue
 * @return {any}
 */
Queue.prototype.dequeue = function dequeue() {
  if(!this.isEmpty()) {
    return this._values.pop();
  }
}

/**
 * determine if a queue is empty or not
 * @return {boolean}
 */
Queue.prototype.isEmpty = function isEmpty() {
    return this._values.length === 0;
}

/**
 * get the value of the head of the queue without dequeuing it
 * @return {any}
 */
Queue.prototype.peek = function() {
  if(!this.isEmpty()) {
    return this._values[this._values.length - 1];
  }
}

module.exports = Queue;