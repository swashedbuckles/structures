export default class Set {
  constructor(iterable) {
    this._values = [];
    
    if(Array.isArray(iterable)) {
      this._values = iterable.filter((val, idx, self) => self.indexOf(val) === idx);
    }
  }

  get size() {
    return this._values.length;
  }

  add(value) {
    if(!this.has(value)){
      this._values.push(value);
    }

    return this;
  }

  clear(){
    this._values = [];
    return this;
  }

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

  forEach(fn, ctx){
    this._values.forEach(fn, ctx);
    
    return this;
  }

  has(value){
    return this._values.indexOf(value) > -1;
  }

  keys(){
    return this.values();
  }

  values(){
    return [].slice.call(this.values);
  }
}