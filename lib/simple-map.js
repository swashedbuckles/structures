export default class Map {
  constructor(iterable) {
    // must be an entries array: [['a', 'a'], ['b', 'b']], etc.
    this.values = {};
    if(Array.isArray(iterable)) {
      iterable.forEach(entry => this.values[entry[0]] = entry[1]);
    }
  }

  get size() {
    return Object.keys(this.values).length;
  }

  clear() {
    this.values = {};
  }
  
  delete(key) {
    return delete this.entries[key];
  }

  entries() {
    
  }

  forEach(fn, ctx = {}) {
    if(typeof fn !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    Object.keys(this.values).forEach(key => {
      const val = this.values[key];
      fn.call(ctx, val, key, this.values);
    });
  }
  
  get(key) {
    return this.values[key];
  }

  has(key) {
    return this.values.hasOwnProperty(key);
  }

  keys() {
    return Object.keys(this.values);
  }
  
  set(key, value) {
    this.values[key] = value;
  }

  values(){}
}