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
 * @param {N} node
 * @param {any} value
 * @param {function} comparator
 */
function removeNode(node, value, comparator){
  if(node === null) {
    return null;
  }

  if(node.value === value) {
    if(node.left === null && node.right === null) {
      return null;
    }

    if((node.left !== null && node.right === null) || (node.left === null && node.right !== null)) {
      const reposition = node.left || node.right;
      return reposition;
    }

    if(node.left && node.right) {
      const smallestRoot = findSmallestRoot(node.right);
      
      if(smallestRoot) {
        const newNode = new N(smallestRoot.left);
        addTo(newNode, node.left, comparator);
        addTo(newNode, node.right, comparator);
        
        
        return newNode;
      }
      
      addTo(node.right, node.left, comparator);
      node.left = null;
      return node.right;
    } 

    node.left  = removeNode(node.left, value, comparator);
    node.right = removeNode(node.right, value, comparator);
    return node;
  }

  const direction = comparator(value, node.value) ? 'left' : 'right';
  if(node[direction]) {
    node[direction] = removeNode(node[direction], value, comparator);
    return node;
  }
}

function findSmallestRoot(node) {
  if(!node.left) {
    return null;
  }

  if(node.left && !node.left.left) {
    return node;
  }

  if(node.left && node.left.left) {
    return findSmallestRoot(node.left);
  }
}

function findSmallest(node) {
  if(!node.left) {
    return node.value
  }

  return 
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