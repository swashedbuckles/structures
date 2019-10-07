import Map from './map';

export class MultiMap {
  constructor(iterable) {
    this.keys = new Map();
    this.values = new Map();
  }

  get size() {
    return this.values.size;
  }

  clear() {
    this.values = new Map();
    this.keys = new Map();
    return this;
  }

  set(keys, value) {
    const lookupIds = [];
    const combined = keys.join(';');

    return this;
  }
}