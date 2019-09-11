export default class Set {
  constructor(iterable) {
    this.values = [];
    
    if(Array.isArray(iterable)) {
      this.values = iterable.filter((val, idx, self) => self.indexOf(val) === idx);
    }
  }

  get size() {
    return this.values.length;
  }

  add(value) {
    if(!this.has(value)){
      this.values.push(value);
    }

    return this;
  }

  clear(){
    this.values = [];
    return this;
  }

  delete(value){
    const index = this.values.indexOf(value);
    
    if(index > -1) {
      this.values.splice(index, 1);
    }
    
    return this;
  }

  entries(){
    return this.values.map(val => [val, val]);
  }

  forEach(fn, ctx){
    this.values.forEach(fn, ctx);
    
    return this;
  }

  has(value){
    return this.values.indexOf(value) > -1;
  }

  keys(){
    return this.values();
  }

  values(){
    return [].slice.call(this.values);
  }
}