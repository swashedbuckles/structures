export default class MultiKeyTable {
  constructor() {
    this.entries = {};
  }

  get(key) {
    return this.entries[key];
  }

  set(key, value) {
    if(this.entries[key] == null) {
      this.entries[key] = [];
    }

    const values = [].concat(value);
    this.entries[key].push(...values);
    return this;
  }

  replace(key, values) {
    return this.clear(key)
      .set(key, values);
  }

  clear(key) {
    delete this.entries[key];
    return this;
  }

  remove(key, value) {
    if(this.entries[key] == null) {
      return this;
    }

    /** @type {Array} */
    const values = this.entries[key];
    const idx = values.indexOf(value);
    values.splice(idx, 1);

    return this;
  }
}