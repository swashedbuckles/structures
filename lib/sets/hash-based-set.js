export default class Set {
  constructor(iterable) {
    this.values = {};
    this.size = 0;
    
    if(Array.isArray(iterable)) {
      this.values = iterable.filter((val, idx, self) => self.indexOf(val) === idx);
    }
  }

  get size() {
    return this.size;
  }

  add(value) {
    if(!this.values[value]){
      this.values[value] = true;
      this.size++;
    }

    return this;
  }

  clear(){
    this.values = {};
    this.size = 0;

    return this;
  }

  delete(value){
    const deleted = delete this.values[value];
    if(deleted) {
      this.size--;
    }
    
    return this;
  }
  
  has(value){
    return this.values[value];
  }

  entries(){
    return Object.keys(this.values).map(val => [val, val]);
  }

  forEach(fn, ctx){
    const values = Object.keys(values);
    values.forEach(fn, ctx);
    
    return this;
  }


  keys(){
    return Object.keys(this.values);
  }
}