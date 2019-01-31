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
    var node = new ListNode(value);
    if(this.head == null) {
      return void addHead(this, node);
    }
    
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
    var node = new ListNode(value);
    addHead(this, node);
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
   * @return {List}
   */
  removeHead() {
    this.head = this.head.next;
    if(this.head == null) {
      this.tail == null;
    }
    return this;
  }

  /**
   * @param {ListNode} node
   * @param {any[] | ListNode} toInsert
   */
  insertBefore(node, toInsert) {
    const head = findAntecedent(this.head, node);
    const insert = toInsert instanceof ListNode
      ? toInsert
      : new ListNode(toInsert);
    
    linkNode(head, insert);
    linkNode(insert, node);
  }

  /**
   * @param {ListNode} node
   * @param {any[] | ListNode} toInsert
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
   * @return {List}
   */
  remove(value) {
    if(value == null) {
      return this;
    }

    var nodes = findSet(this.head, value);
    
    if(nodes.length === 1) {
      return this.removeHead();
    }

    var antecedent = nodes[0];
    var element = nodes[1]
    var subsequent = element.next;

    antecedent.next = subsequent.next;

    return this;
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
   * create a new list from the results of a function
   * @param {function} fn
   * @return {List}
   */
  map(fn) {
    var list = new List();
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
 * find a node (containing a value) and the node that links to it. 
 * @param {ListNode} start
 * @param {any} value
 * @return {Array<ListNode>} 
 */
function findSet(start, value) {
  if(start == null || value == null) {
    return [];
  }
  
  if(is(start, value)) {
    return [start];
  }

  if(is(start.next, value)) {
    return [start, start.next];
  } 

  return findSet(start.next, value);
}

/**
 * find which node links to this one in a given list. 
 * @param {ListNode} start 
 * @param {ListNode} node comparison.
 * @return {ListNode}
 */
function findAntecedent(start, node) {
  if(start.next == null || ListNode == null) {
    return start;
  }

  return start.next === node
    ? start
    : findAntecedent(start.next, node);
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
}

/**
 * add a head to a list.
 * @param {List} list
 * @param {ListNode} node
 */
function addHead(list, node) {
  linkNode(node, list.head);
  
  list.head = node;
  list.tail = node.next || node;
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