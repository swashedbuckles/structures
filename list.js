// @ts-check

/** 
 * @class
 */
function Node(value) {
  /** @property {any} value */
  this.value = value;
  
  /** @property {Node} next */
  this.next  = null;
}

/** 
 * @class 
 */
function List() {
  /** @property {Node} head */
  this.head = null;
  
  /** @property {Node} tail */
  this.tail = null;
}

/**
 * @return {boolean}
 */
List.prototype.isEmpty = function() {
  return this.head === null;
}

/**
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
 * @param {any} value
 * @return {Node|null}
 */
List.prototype.find = function(value) {
  return value == null 
    ? value 
    : find(this.head, value);
}

/**
 * @param {any} value
 * @return {List}
 */
List.prototype.remove = function(value) {
  if(value == null) {
    return this;
  }
  var nodes = findSet(this.head, value);
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