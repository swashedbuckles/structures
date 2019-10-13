/**
 * @template T
 */
export default class Map {

  /**
   * @param {iterable}
   */
  constructor() {
    this.values = {};
  }

  static fromEntries(iterable) {
    if(iterable != null && iterableIsEntries(iterable)) {
      const map = new Map();
      iterable.forEach(entry => map.set(entry[0], entry[1]));
    }
  }

  /**
   * @return {Number}
   */
  get size() {
    return Object.keys(this.values).length;
  }

  /**
   * @return {this}
   */
  clear() {
    this.values = {};

    return this;
  }
  
  /**
   * @param {string} key
   * @return {boolean}
   */
  delete(key) {
    return delete this.entries[key];
  }

  /**
   * @return {Array.<[string, T]>}
   */
  entries() {
    const keys = Object.keys(this.values);

    return keys.map(key => [key, this.values[key]]);
  }

  /**
   * @param {function} fn
   * @param {object} [ctx=]
   */
  forEach(fn, ctx = {}) {
    if(typeof fn !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    Object.keys(this.values).forEach(key => {
      const val = this.values[key];
      fn.call(ctx, val, key, this.values);
    });

    return this;
  }
  
  /**
   * @param {string} key
   * @return {T}
   */
  get(key) {
    return this.values[key];
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return this.values.hasOwnProperty(key);
  }

  /**
   * @return {string[]}
   */
  keys() {
    return Object.keys(this.values);
  }
  
  /**
   * @param {string} key
   * @param {T} value;
   * @return {this}
   */
  set(key, value) {
    this.values[key] = value;
    return this;
  }

  /**
   * @return {T[]}
   */
  values(){
    const keys = Object.keys(this.values);
    return keys.map(key => this.values[key]);
  }
}

function iterableIsEntries(iterable) {
  return Array.from(iterable).every(val => Array.isArray(val) && val.length === 2);
}