export default class Map {
  
  constructor(iterable) {
    // must be an entries array: [['a', 'a'], ['b', 'b']], etc.
    /** @typedef {Array.<key:*, value:*>} entries */
    /** @type Array.<entries> */
    this.values = [];

    if(iterableIsEntries(iterable)) {
      this.values = Array.from(iterable);
    }
  }

  get size() {
    return this.values.length;
  }

  clear() {
    this.values = [];
    return this;
  }

  delete(key) {
    const index = this.values.findIndex(entry => entry[0] === key);
    this.values.splice(index, 1);

    return this;
  }
  
  entries() {
    return this.values;
  }

  forEach(fn, ctx) {
    if(typeof fn !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    this.values.forEach(pair => {
      const [key, val] = pair;
      fn.call(ctx, val, key, this.values);
    });

    return this;
  }

  get(key) {
    return this.values.find(entry => entry[0] === key);
  }

  has(key) {
    return this.keys().indexOf(key) > -1;
  }

  keys() {
    return this.values.map(pair => pair[0]);
  }

  set(key, value) {
    const entry = this.get(key);
    if(entry) {
      entry[1] = value;
      return this;
    } 

    this.values.push([key, value]);
    return this;
  }

  values(){
    return this.values.map(pair => pair[1]);
  }
}

function iterableIsEntries(iterable) {
  return Array.from(iterable).every(val => Array.isArray(val) && val.length === 2);
}