/**
 * @template T
 */
export default class Set {
  constructor(iterable) {
    /**@type {T[]} */
    this._values = [];
    
    if(Array.isArray(iterable)) {
      this._values = iterable.filter((val, idx, self) => self.indexOf(val) === idx);
    }
  }

  /**
   * return the number of items in the set
   * @return {number}
   */
  get size() {
    return this._values.length;
  }

  /** 
   * add a value to the set
   * @param {T} value
   * @return {this}
   */
  add(value) {
    if(!this.has(value)){
      this._values.push(value);
    }

    return this;
  }

  /**
   * clear all internal values of the set
   * @return {this}
   */
  clear(){
    this._values = [];
    return this;
  }

  /**
   * remove a value from the set
   * @param {T} value
   * @return {this}
   */
  delete(value){
    const index = this._values.indexOf(value);
    
    if(index > -1) {
      this._values.splice(index, 1);
    }
    
    return this;
  }

  entries(){
    return this._values.map(val => [val, val]);
  }

  /**
   * @param {function} fn callback function
   * @param {object} ctx thisArg; execution context
   * @return {this}
   */
  forEach(fn, ctx){
    this._values.forEach(fn, ctx);
    
    return this;
  }

  /**
   * @param {T} value
   * @return {boolean}
   */
  has(value){
    return this._values.indexOf(value) > -1;
  }

  /**
   * retrieve all values in the set
   * @return {T[]}
   */
  keys(){
    return this.values();
  }

  /**
   * @return {T[]}
   */
  values(){
    return [].slice.call(this._values);
  }
}