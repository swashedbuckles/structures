export class N {
  constructor(value) {
    /** @type {any} */ this.value = value;
    /** @type {N} */   this.left  = null;
    /** @type {N} */   this.right = null;
  }
}

export default class BST {
  /**
   * @param {any} value
   * @param {function} [comparator]
   */
  constructor(value, comparator = (x, y) => x < y) {
    /**@type {N} */
    this.root = null;
    /**@type {function} */
    this.comparator = comparator;

    if(value) {
      this.insert(value)
    }
  }


  /**
   * @param {any} something 
   */
  insert(something) {
    const value = something instanceof N
      ? something.value
      : something;

    if(!this.root){
      setRoot(this, value);
      return;
    }

    addTo(this.root, value, this.comparator);
  }

  /** 
   * @param {any} something
   */
  remove(something) {
    this.root = removeNode(this.root, something, this.comparator);
  }
}

/**
 * @param {N} node
 * @param {any} value
 * @param {fn} comparator
 */
function removeNode(node, value, comparator){
  if(node === null) {
    return null;
  }

  if(node.value === value && node.left == null && node.right == null) {
    return null;
  }

  const direction = comparator(value, node.value) ? 'left' : 'right';
  if(node[direction]) {
    return removeNode(node[direction], value, direction);
  }
}

/**
 * @param {BST} tree
 * @param {any} value
 */
function setRoot(tree, value) {
  tree.root = new N(value);
}

/**
 * @param {N} node
 * @param {any} value
 * @param {fn} comparator
 */
function addTo(node, value, comparator) {
  const direction = comparator(value, node.value) ? 'left' : 'right';
  if(node[direction]) {
    return addTo(node[direction], value, comparator)
  }

  node[direction] = new N(value);
}