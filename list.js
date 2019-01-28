// @ts-check

function Node(value) {
  this.value = value;
  this.next  = null;
}

function List(value) {
  this.head = null;
  this.tail = null;
}

List.prototype.isEmpty = function() {
  return this.head === null;
}

List.prototype.add = function(value) {
  var node = new Node(value);
  if(this.head == null) {
    return void addHead(this, node);
  }
  
  linkNode(this.tail, node);
  this.tail = node;
}

function linkNode(source, target) {
  if(source.next !== null) {
    return void linkNode(source.next, target);
  }

  source.next = target;
}

function addHead(list, node) {
  list.head = node;
  list.tail = node;
}