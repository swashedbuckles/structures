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
}