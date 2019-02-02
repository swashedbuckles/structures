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
    removeNode(this.root, something, this.comparator);
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

  if(node.value === value) {
    console.log('node matches value');
    if(node.left === null && node.right === null) {
      console.log('return null');
      return null;
    }

    if((node.left !== null && node.right === null) || (node.left === null && node.right !== null)) {
      console.log('one or the other');
      const reposition = node.left || node.right;
      return reposition;
    }

    if(node.left && node.right) {
      console.log('left AND right');
      
      addTo(node.right, node.left, comparator);
      node.left = null;
      return node.right;
    }
  }

  const direction = comparator(value, node.value) ? 'left' : 'right';
  if(node[direction]) {
    node[direction] = removeNode(node[direction], value, comparator);
    return node;
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