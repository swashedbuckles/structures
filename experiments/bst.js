class BstNode {
  constructor(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
  }

  toString() {
    return `${this.value}\nL ${this.left} | R ${this.right}\n`
  }
}

class BST {
  constructor (value) {
    this.root = null;
    if(value) {
      this.root = new BstNode(value);
    }
  }

  add(value) {
    if(this.root == null) {
      console.log('add new root for value', value);
      this.root = new BstNode(value);
      return;
    }

    const addNode = function(value, node) {
      console.log('add value', value, node);
      if(value == node.value || value == null) {
        console.log('value already in tree');
        return;
      }

      if(value < node.value && !node.left) {
        console.log('value smaller, insert');
        node.left = new BstNode(value);
      } else if (value < node.value && node.left != null) {
        console.log('keep searching for smaller');
        addNode(value, node.left);
      } 

      if(value > node.value && !node.right)  {
        console.log('value larger, insert');
        node.right = new BstNode(value);
      } else if (value > node.value && node.right !== null) {
        console.log('keep searching for larger');
        addNode(value, node.right)
      }
    }

    addNode(value, this.root);
  }

  remove(value) {
    if(this.root == null) {
      return;
    }

    const removeValue = function(value, node) {
      if(node == null) {
        return null;
      }

      if(node.value !== value) {
        const direction = value < node.value ? 'left' : 'right';
        node[direction] = removeValue(value, node[direction]);
        return node;
      }

      const hasLeft = node.left != null;
      const hasRight = node.right != null;
      const isLeaf = !hasLeft && !hasRight;
      const oneChild = (hasLeft && !hasRight) || (hasRight && !hasLeft);

      if(isLeaf) {
        return null;
      }

      if(oneChild) {
        return node.left || node.right;
      }

      node.value = findSmallestValue(node.right);
      node.right = removeValue(node.value, node.right);
    }

    this.root = removeValue(value, this.root);
  }

  inOrder() {
    const result = [];
    const search = function(node) {
      if(node == null) {
        return;
      }
      
      search(node.left);
      result.push(node.value);
      search(node.right);
    }

    search(this.root);
    return result;
  }

  preOrder() {
    const result = [];
    const search = function(node) {
      if(node == null) {
        return;
      }

      result.push(node.value);
      search(node.left);
      search(node.right);
    }

    search(this.root);
    return result;
  }

  postOrder() {
    const result = [];
    const search = function(node) {
      if(node == null) {
        return;
      }
      search(node.left);
      search(node.right);
      result.push(node.value);
    }

    search(this.root);
    return result;
  }

  levelOrder() {
    const result = [];
    const q = new Queue();
    if(this.root != null) {
      q.enqueue(this.root);

      while(q.size() > 0) {
        let node = q.dequeue();
        result.push(node.value);
        
        if(node.left) {
          q.enqueue(node.left);
        }

        if(node.right) {
          q.enqueue(node.right);
        }
      }
    }
    return result;
  }
}

function findSmallestValue(node) {
  const value = node.value;

  while(node.left != null) {
    node  = node.left
    value = node.value;
  }

  return value;
}

class Queue {
  constructor() {
    this.values = [];
  }

  size() {
    return this.values.length;
  }

  enqueue(val) {
    this.values.push(val);
  }

  dequeue() {
    const val = this.values[0];
    this.values.shift();
    return val;
  }

  peek() {
    return this.values[0];
  }

  contains() {
    return this.values.indexOf(value) > -1;
  }
}

const b = new BST();

b.add(9);
console.log('---');
b.add(4);
console.log('---');
b.add(6);
console.log('---');
b.add(5);
console.log('---');
b.add(3);
b.add(7);
b.add(20);
b.add(17);
b.add(22);
b.add(10);

console.log('in: ', b.inOrder());
console.log('pre: ', b.preOrder());
console.log('post: ', b.postOrder());
console.log('bst: ', b.levelOrder());
