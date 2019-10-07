export default class MultiKeyTable {
  constructor() {
    this.entries = {};
    this.catalog = {};
  }

  /**
   * retrieve values assigned to a key or keys
   * @param {string | string[]} key
   * @return {any[]}
   */
  get(key) {
    if(key == null) {
      return [];
    }

    const masterKey = key.toString();
    
    const indexes = [].concat(this.catalog[masterKey]);
    const values  = indexes
      .reduce((acc, idx) => acc.concat(this.entries[idx]), [])
      .filter(x => x != null);
    
    return values
  }

  /**
   * @param {string|string[]} key
   * @param {any|any[]} value
   * @return {this}
   */
  set(key, value) {
    if(key == null) {
      return this;
    }

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

  /**
   * @param {string|string[]} key
   * @param {any|any[]} values
   * @return {this}
   */
  replace(key, values) {
    if(key == null) {
      return this;
    }

    return this.clear(key)
      .set(key, values);
  }

  /**
   * @param {string|string[]} key
   * @return {this}
   */
  clear(key) {
    if(key == null) {
      return this;
    }

    const entry = key.toString();
    const index = hash(entry);
    delete this.entries[index];
    // const indexes = [].concat(this.catalog[entry]);
    // indexes.forEach(idx => delete this.entries[idx]);
    
    return this;
  }

  /**
   * @param {string|string[]} key
   * @param {any} value
   * @return {this}
   */
  remove(key, value) {
    if(key == null) {
      return this;
    }

    /** @type {Array} */
    const index = hash(key.toString());
    const values = this.entries[index];
    const location = values.indexOf(value);

    if(location > -1) {
      values.splice(location, 1);
    }

    return this;
  }

  /**
   * @param {string} key
   * @param {number|string} index (hashed key)
   * @return {this}
   */
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

  /**
   * @param {string} key
   * @param {any|any[]} values
   * @return {this}
   */
  _addValues(key, values) {
    const entryKey = hash(key);
    if(this.entries[entryKey] == null) {
      this.entries[entryKey] = [];
    }

    this.entries[entryKey].push(...values);

    return this;
  }
}

/**
 * Java-like hashing function for a string
 * 
 * @param {string} string
 * @return {number}
 */
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