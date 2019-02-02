class N {
  constructor(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
  }
}

class BST {
  constructor(value, comparator = (x, y) => x < y) {
    this.root = null;
    this.comparator = comparator;

    if(value) {
      this.insert(value)
    }
  }


  insert(something) {
    const value = something instanceof N
      ? something.value
      : something;

    if(!this.root){
      setRoot(this, value);
      return;
    }

    const direction = this.comparator(value, this.root.value) ? 'left' : 'right';
    addTo(this.root, value, direction);
  }

  remove(something) {
    const direction = this.comparator(value, this.root.value) ? 'left' : 'right';
    this.root = removeNode(this.root, something, direction);
  }
}

function removeNode(node, value, direction){
  if(node === null) {
    return null;
  }

  if(node.value === value && node.left == null && node.right == null) {
    return null;
  }

  if(node[direction]) {
    return removeNode(node[direction], value, direction);
  }
}

function setRoot(tree, value) {
  tree.root = new N(value);
}

function addTo(node, value, direction) {
  if(node[direction]) {
    return addTo(node[direction], value, direction)
  }

  node[direction] = new N(value);
}