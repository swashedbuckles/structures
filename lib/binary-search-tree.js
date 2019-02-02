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
    /**@type {N} */        this.root = null;
    /**@type {function} */ this.comparator = comparator;

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

  /**
   * @param {number} level
   */
   getLevel(level) {
     const levels = getValues(this.root, [], level);
     
     return levels[level];
   }
}

/**
 * return the values to a given depth (max) of a tree.
 * @param {N} node
 * @param {Array} acc
 * @param {number} max
 * @param {number} [level=0]
 * @return {Array} acc
 */
function getValues(node, acc, max, level=0) {
  acc[level] = acc[level] || [];
  acc[level].push(node.value);

  if(level < max && node.left) {
    getValues(node.left, acc, max, level + 1);
  }

  if(level < max && node.right) {
    getValues(node.right, acc, max, level + 1);
  }

  return acc;
}

/**
 * find the node with minimum value in its right subtree 
 * and replace this node with the minimum valued node
 * remove the minimum valued node from the tree
 * 
 * @param {N} node
 * @param {any} value
 * @param {function} comparator
 */
function removeNode(node, value, comparator){
  if(node === null) {
    return null;
  }

  if(node.value !== value) {
    const direction = comparator(value, node.value) ? 'left' : 'right';
    console.log('--- NO MATCH, MOVING ', direction);
    node[direction] = removeNode(node[direction], value, comparator);
    return node;
  }

  if(node.value === value) {
    console.log('--- VALUE MATCH');
    const leftChild    = node.left  !== null;
    const rightChild   = node.right !== null;
    const noChildren   = !leftChild && !rightChild;
    const oneChild     = (leftChild && !rightChild) || (rightChild && !leftChild)
    const bothChildren = leftChild && rightChild;

    if(noChildren) {
      return null;
    }

    if(oneChild) {
      const reposition = node.left || node.right;
      return reposition;
    }

    if(bothChildren) {
      node.value = findSmallestValue(node.right);
      node.right = removeNode(node.right, node.value, comparator);
      return node;
    } 
  }
}

/**
 * @param {N} node
 * @return {boolean}
 */
function isLeaf(node) {
  return node && node.left === null && node.right === null;
}

function findSmallestValue(node) {
  if(!node.left) {
    return node.value;
  }

  return findSmallestValue(node.left);
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
 * @param {function} comparator method to compare with 
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