export default class MultiKeyTable {
  constructor() {
    this.entries = {};
    this.catalog = {};
  }

  get(key) {
    const masterKey = key.toString();
    
    const indexes = [].concat(this.catalog[masterKey]);
    const values  = indexes
      .reduce((acc, idx) => acc.concat(this.entries[idx]), [])
      .filter(x => x != null);
    
    return values
  }

  set(key, value) {
    const keys   = [].concat(key);
    const values = [].concat(value);

    const masterKey = keys.toString();
    const index     = hash(masterKey);

    if(masterKey !== key) {
      keys.push(masterKey);
    }

    this._addValues(masterKey, values);
    keys.forEach(key => this._register(key, index));
    
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

  _register(key, index) {
    if(this.catalog[key] == null) {
      this.catalog[key] = [];
    }

    const catalog = this.catalog[key];

    if(catalog.indexOf(index) < 0) {
      catalog.push(index);
    }

    return this;
  }

  _addValues(key, values) {
    const entryKey = hash(key);
    if(this.entries[entryKey] == null) {
      this.entries[entryKey] = [];
    }

    this.entries[entryKey].push(...values);

    return this;
  }
}

function hash(string) {
  let hash = 0;
  
  if (string.length === 0) {
      return hash;
  }

  for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}