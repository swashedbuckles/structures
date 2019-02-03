export class N {
  /**
   * @param {any | N} value;
   */
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
   * @param {any} [value]
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

   /**
    * @param {any} value
    * @return {N | null} node
    */
   find(value) {
     return find(this.root, value, this.comparator);
   }

   /**
    * @param {function} fn
    * @param {string} [order = 'in']
    * @param {N} [node]
    */
  each(fn, order='in', node) {
    if(node === null) {
      return;
    }

    if(typeof node === 'undefined') {
      node = this.root;
    }


    const operations = buildOrder(node, order);
    operations.forEach(val => {
      val === node 
        ? fn(val)
        : this.each(fn, order, val);
    });
  }

  /**
   * reduce functionality for tree traversal
   * 
   * @param {function} fn
   * @param {any} acc accumulator
   * @param {string} [order = 'in']
   * @param {N} [node]
   * 
   * @return {any} accumulator
   */
  reduce(fn, acc, order = 'in', node) {
    if(node === null) {
      return;
    }

    if(typeof node === 'undefined') {
      node = this.root;
    }

    const operations = buildOrder(node, order);
    operations.forEach(val => {
      val === node 
        ? fn(acc, val)
        : this.reduce(fn, acc, order, val);
    });

    return acc;
  }

  /**
   * map current tree into a new tree. 
   * @param {function} fn
   * @param {string} [order = 'in']
   * @param {N} [node]
   * @return {BST}
   */
  map(fn, order = 'in', node) {
    const callback = (acc, n) => {
      const value = fn(n);
      acc.insert(value);
      return acc;
    };

    return this.reduce(callback, new BST(), order, node);
  }
}

/**
 * @param {N} node
 * @param {string} [order = 'in']
 * @return {Array<N | null>}
 */
function buildOrder(node, order = 'in') {
  switch(order) {
    case 'pre':  return [node, node.left, node.right];
    case 'post': return [node.left, node.right, node];
    case 'in': 
    default:     return [node.left, node, node.right];
  }
}

/**
 * @param {N} node
 * @param {any} value
 * @param {function} comparator
 *
 * @return {N | null}
 */
function find(node, value, comparator) {
  if(node === null || node.value === value) {
    return node;
  }

  const direction = comparator(value, node.value) ? 'left' : 'right';
  return find(node[direction], value, comparator);
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
    node[direction] = removeNode(node[direction], value, comparator);
    return node;
  }

  if(node.value === value) {
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
 * returns the lowest value of a given node/tree.
 * @param {N} node
 * @return {any}
 */
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