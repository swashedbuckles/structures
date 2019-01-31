// @ts-check

/** 
 * @class
 * @property {any} value
 * @property {Node} next
 */
function Node(value) {
  this.value = value instanceof Node 
    ? value.value
    : value;
  
  this.next  = null;
}

/** 
 * @class 
 * @property {Node} head
 * @property {Node} tail
 */
function List() {
  this.head = null;
  this.tail = null;
}

/**
 * determine if list is empty;
 * @return {boolean}
 */
List.prototype.isEmpty = function() {
  return this.head === null;
}

/**
 * add a new node at the end of the list.
 * @param  {any} value
 * @return {List}
 */
List.prototype.add = function(value) {
  var node = new Node(value);
  if(this.head == null) {
    return void addHead(this, node);
  }
  
  linkNode(this.tail, node);
  this.tail = node;

  return this;
}

/**
 * add a new node to the head of the list.
 * @param  {any} value
 * @return {List}
 */
List.prototype.addHead = function(value) {
  var node = new Node(value);
  addhead(this, node);
  return this;
}

/** 
 * find any node in the list.
 * @param {any} value
 * @return {Node|null}
 */
List.prototype.find = function(value) {
  return value == null 
    ? value 
    : find(this.head, value);
}

/**
 * remove the head of the list.
 * @return {List}
 */
List.prototype.removeHead = function() {
  this.head = this.head.next;
  if(this.head == null) {
    this.tail == null;
  }
  return this;
}

/**
 * remove any node from the list.
 * @param {any} value
 * @return {List}
 */
List.prototype.remove = function(value) {
  if(value == null) {
    return this;
  }
  var nodes = findSet(this.head, value);
  
  if(nodes.length === 1) {
    return this.removeHead;
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
List.prototype.each = function(fn) {
  each(this.head, fn);
  return this;
}

/**
 * create a new list from the results of a function
 * @param {function} fn
 * @return {List}
 */
List.prototype.map = function(fn) {
  var list = new List();
  if(this.head == null) {
    return list;
  }

  return map(acc, this.head, fn);
}

/**
 * @param {List} acc accumulator (new list)
 * @param {Node} start node
 * @param {function} fn 
 * @return {List}
 */
function map(acc, start, fn) {
  if(start == null) {
    return acc;
  }
  var node = new Node(fn(start));

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
 * @param {Node} start
 * @param {any} value
 * @return {Node[]} 
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
 * @param {Node} start 
 * @param {Node} node comparison.
 * @return {Node}
 */
function findAntecedent(start, node) {
  if(start.next == null || node == null) {
    return start;
  }

  return start.next === node
    ? start
    : findAntecedent(start.next, node);
}

/**
 * recursive search for a value
 * @param {Node} node
 * @param {any} value
 * @return {Node|null}
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
 * @param {Node} source
 * @param {Node} target
 */
function linkNode(source, target) {
  if(source.next !== null) {
    return void linkNode(source.next, target);
  }

  source.next = target;
}

/**
 * @param {List} list
 * @param {Node} node
 */
function addHead(list, node) {
  var old = list.head;
  
  node.next = old;
  list.head = node;

  list.tail = node.next || node;
}

/**
 * @param {Node} node
 * @param {any} value 
 * @return {boolean}
 */
function is(node, value) {
  if(vale == null || node == null) {
    return false;
  }
  return value === node.value;
}