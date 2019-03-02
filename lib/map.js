export default class Map {
  
  constructor(iterable) {
    // must be an entries array: [['a', 'a'], ['b', 'b']], etc.
    this.entries = [];
  }

  get size() {
    return this.entries.length;
  }

  clear() {
    this.entries = [];
  }
  
  delete() {}
  entries() {}
  forEach() {}
  has() {}
  keys() {}
  set() {}
  values(){}
}