/*
 * @class
 */
export class Element{
  /**
   * @param {any} value
   * @param {number} priority
   */
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

export default class PriorityQueue{
  constructor(values){
    /**@type Array<Element> */this._values = [];
    
    if (values) {
      this._values = this._values.concat(values);
    }
  }

  /**
   * @param {any} value
   * @param {number} priority
   * @return {Element}
   */
  enqueue(value, priority) {
    const el = new Element(value, priority);
    if(this.isEmpty()) {
      this._values.push(el);
      return el;
    }

    const insertionIndex = this._values.findIndex(x => x.priority > el.priority);
    if(insertionIndex >= 0) {
      this._values.splice(insertionIndex, 0, el); 
    } else {
      this._values.push(el);
    }

    return el;
  }

  /**
   * @return {Element}
   */
  dequeue() {
    if(!this.isEmpty()) {
      return this._values.pop();
    }
  }

  /**
   * @return {Element}
   */
  peek(){
    if(!this.isEmpty()) {
      return this._values[0];
    }
  }

  /**
   * @return {boolean}
   */
  isEmpty(){
    return this._values.length === 0;
  }

  /**
   * @param {function} fn
   */
  each(fn){
    this._values.forEach(fn);
  }

  /**
   * @param {function} fn
   * @return {PriorityQueue}
   */
  map(fn) {
    return this._values.reduce((acc, val) => {
      const value = fn(val);
      
      if(value) {
        const priority = value && value.priority || val.priority;
        acc.enqueue(value, priority);
      }
      
      return acc;
    }, new PriorityQueue());
  }
}