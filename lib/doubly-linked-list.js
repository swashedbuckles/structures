// @ts-check

export class ListNode{
  /**
   * @param {any[]} value
   */
  constructor(value) {
    /** @type {any[]} */
    this.value = value instanceof ListNode
      ? value.value
      : value

    /** @type {ListNode} */
    this.next = null;
    this.previous = null;
  }
}

/** 
 * @class 
 * @property {ListNode} head
 * @property {ListNode} tail
 */
export default class List{
  constructor() {
    /** @type {ListNode} */
    this.head = null;
    
    /** @type {ListNode} */
    this.tail = null;
  }

  /**
   * determine if list is empty;
   * @return {boolean}
   */
  isEmpty() {
    return this.head === null;
  }
  
  /**
   * add a new ListNode at the end of the list.
   * @param  {any} value
   * @return {List}
   */
  add(value) {
    if(this.head == null) {
      return this.addHead(value);
    }
    
    const node = new ListNode(value);
    linkNode(this.tail, node);
    this.tail = node;
  
    return this;
  }

  /**
   * add a new ListNode to the head of the list.
   * @param  {any} value
   * @return {List}
   */
  addHead(value) {
    const node = new ListNode(value);
    linkNode(node, this.head);
  
    this.head = node;
    this.tail = node.next || node;
    return this;
  }

  /** 
   * find the first instance of value in the list.
   * @param {any} value
   * @param {ListNode} [start]
   * @return {ListNode|null}
   */
  find(value, start) {
    start = start || this.head;

    return value == null 
      ? value 
      : find(start, value);
  }

  /**
   * remove the head of the list.
   * @return {ListNode}
   */
  removeHead() {
    const head = this.head;
    this.head = this.head.next;

    if(this.head == null) {
      this.tail == null;
    }

    return head;
  }

  /**
   * @return {ListNode}
   */
  removeTail() {
    const tail = this.tail;
    if(tail == null) {
      return tail;
    }
    
    const previous = tail.previous;

    this.tail = previous;
    previous.next = null;

    return tail;
  }

  /**
   * @param {ListNode} node
   * @param {any | ListNode} toInsert
   */
  insertBefore(node, toInsert) {
    const head = node.previous;
    const insert = toInsert instanceof ListNode
      ? toInsert
      : new ListNode(toInsert);
    
    linkNode(head, insert);
    linkNode(insert, node);
  }

  /**
   * @param {ListNode} node
   * @param {any | ListNode} toInsert
   */
  insertAfter(node, toInsert) {
    const insert = toInsert instanceof ListNode
      ? toInsert
      : new ListNode(toInsert);
    
    linkNode(insert, node.next);
    linkNode(node, insert);
  }

  /**
   * remove any ListNode from the list.
   * @param {any} value
   * @return {boolean}
   */
  remove(value) {
    if(value == null) {
      return false;
    }

    const node = find(this.head, value);

    if(node === null) {
      return false;
    }

    if(is(node, this.head)) {
      this.removeHead();
      return true;
    }
    
    if(is(node, this.tail)) {
      this.removeTail();
      return true;
    }

    const antecedent = node.previous;
    const element = node;
    const subsequent = node.next;

    antecedent.next = subsequent.next;
    subsequent.previous = antecedent.previous;
  }

  /**
   * call a function with every value in the list.
   * @param {function} fn
   * @return {List}
   */
  each(fn) {
    each(this.head, fn);
    return this;
  }

  /**
   * call a function with every value in the list.
   * @param {function} fn
   * @return {List}
   */
  eachRight(fn) {
    eachRight(this.tail, fn);
    return this;
  }

  /**
   * create a new list from the results of a function
   * @param {function} fn
   * @return {List}
   */
  map(fn) {
    const list = new List();
    if(this.head == null) {
      return list;
    }

    return map(list, this.head, fn);
  }

  /**
   * @return {Array}
   */
  toArray() {
    const arr = [];
    
    this.each(val => arr.push(val));
    
    return arr;
  }
}

// ------ HELPERS

/**
 * map all values in a list unto a new one. 
 * 
 * @param {List} acc accumulator (new list)
 * @param {ListNode} node ListNode
 * @param {function} fn 
 * @return {List}
 */
function map(acc, node, fn) {
  if(node == null) {
    return acc;
  }
  
  const value = node.value;
  acc.add(fn(value));

  return map(acc, node.next, fn);
}

/**
 * recrusively run a function against every node in a list
 * 
 * @param {ListNode} start
 * @param {function} fn
 */
function each(start, fn) {
  if(start == null) {
    return;
  }

  fn(start.value);
  
  return each(start.next, fn);
}

/**
 * recrusively run a function against every node in a list
 * 
 * @param {ListNode} start
 * @param {function} fn
 */
function eachRight(start, fn) {
  if(start == null) {
    return;
  }

  fn(start.value);
  
  return each(start.previous, fn);
}

/**
 * recursive search for a value
 * @param {ListNode} node
 * @param {any} value
 * @return {ListNode|null}
 */
function find(node, value) {
  if(node == null) {
    return node;
  }

  return is(node, value) 
    ? node
    : find(node.next, value);
}

/**
 * link one node to another.
 * @param {ListNode} source
 * @param {ListNode} target
 */
function linkNode(source, target) {
  source.next = target;
  target.previous = source;
}

/**
 * Node.value is value
 * @param {ListNode} node
 * @param {any} value 
 * @return {boolean}
 */
function is(node, value) {
  if(value == null || node == null) {
    return false;
  }
  return value === node.value;
}

/**
 * @param {ListNode} node
 */
function print(node) {
  console.log('node', node.value);
}