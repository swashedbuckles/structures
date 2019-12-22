/**
 * @template T
 */
export default class Set {
  constructor(iterable) {
    /** @type {Object.<string, T> */
    this.values = {};
    this.size = 0;
    
    if(Array.isArray(iterable)) {
      this.values = iterable.filter((val, idx, self) => self.indexOf(val) === idx);
    }
  }

  /**
   * @return {number}
   */
  get size() {
    return this.size;
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * @param {T} value
   * @return {this}
   */
  add(value) {
    if(value == null) {
      return this;
    }
    
    const key = value.toString();
    if(!this.values[key]){
      this.values[key] = value;
      this.size++;
    }

    return this;
  }

  /**
   * @param {T} value
   */
  clear(){
    this.values = {};
    this.size = 0;

    return this;
  }

  /**
   * @param {T} value
   * @return {this}
   */
  delete(value){
    const deleted = delete this.values[value];
    if(deleted) {
      this.size--;
    }
    
    return this;
  }
  
  /**
   * @param {T} value
   * @return {boolean}
   */
  has(value){
    if(value == null) {
      return false;
    }

    const key = value.toString();
    return this.values[key] != null;
  }

  entries(){
    return Object.keys(this.values).map(val => [val, val]);
  }

  forEach(fn, ctx){
    const values = Object.keys(values);
    values.forEach(fn, ctx);
    
    return this;
  }

  keys(){
    return Object.keys(this.values);
  }
}