export class N {
  constructor(value) {
    /** @type {any} */ this.value = value;
    /** @type {N} */   this.left  = null;
    /** @type {N} */   this.right = null;
    
    if(value instanceof N) {
      Object.assign(this, value);
  }
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
      return setRoot(this, value);
    }

    return addTo(this.root, value, this.comparator);
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
    return removeNode(node[direction], value, comparator);
  }
}

/**
 * @param {BST} tree
 * @param {any} value
 * @return {N}  inserted value.
 */
function setRoot(tree, value) {
  tree.root = new N(value);
  return tree.root;
}

/**
 * @param {N} node node to compare against
 * @param {any} value value to insert
 * @param {fn} comparator method to compare with 
 * @return {N} the inserted node
 */
function addTo(node, something, comparator) {
  const value     = something instanceof N ? something.value : something;
  const direction = comparator(value, node.value) ? 'left' : 'right';
  
  if(node[direction]) {
    return addTo(node[direction], something, comparator)
  }

  node[direction] = new N(something);
  return node[direction];
}