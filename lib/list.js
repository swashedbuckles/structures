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
    var ListNode = new ListNode(value);
    if(this.head == null) {
      return void addHead(this, ListNode);
    }
    
    linkNode(this.tail, ListNode);
    this.tail = ListNode;
  
    return this;
  }

  /**
   * add a new ListNode to the head of the list.
   * @param  {any} value
   * @return {List}
   */
  addHead(value) {
    var ListNode = new ListNode(value);
    addHead(this, ListNode);
    return this;
  }

  /** 
   * find any ListNode in the list.
   * @param {any} value
   * @return {ListNode|null}
   */
  find(value) {
    return value == null 
      ? value 
      : find(this.head, value);
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
}

/**
 * @param {List} acc accumulator (new list)
 * @param {ListNode} start ListNode
 * @param {function} fn 
 * @return {List}
 */
function map(acc, start, fn) {
  if(start == null) {
    return acc;
  }
  var ListNode = new ListNode(fn(start));

  return map(acc, start.next, fn);
}

function each(start, fn) {
  if(start == null) {
    return;
  }

  fn(start.value);
  
  return each(start.next, fn);
}

/**
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
 * @param {ListNode} start 
 * @param {ListNode} ListNode comparison.
 * @return {ListNode}
 */
function findAntecedent(start, ListNode) {
  if(start.next == null || ListNode == null) {
    return start;
  }

  return start.next === ListNode
    ? start
    : findAntecedent(start.next, ListNode);
}

/**
 * recursive search for a value
 * @param {ListNode} ListNode
 * @param {any} value
 * @return {ListNode|null}
 */
function find(ListNode, value) {
  if(ListNode == null) {
    return ListNode;
  }

  return is(ListNode, value) 
    ? ListNode
    : find(ListNode.next, value);
}

/**
 * @param {ListNode} source
 * @param {ListNode} target
 */
function linkNode(source, target) {
  if(source.next !== null) {
    return void linkNode(source.next, target);
  }

  source.next = target;
}

/**
 * @param {List} list
 * @param {ListNode} ListNode
 */
function addHead(list, ListNode) {
  var old = list.head;
  
  ListNode.next = old;
  list.head = ListNode;

  list.tail = ListNode.next || ListNode;
}

/**
 * @param {ListNode} ListNode
 * @param {any} value 
 * @return {boolean}
 */
function is(ListNode, value) {
  if(value == null || ListNode == null) {
    return false;
  }
  return value === ListNode.value;
}