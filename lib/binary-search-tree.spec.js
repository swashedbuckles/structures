import {test, describe} from 'ava-spec';
import {N, default as BST} from './binary-search-tree';

describe('Binary Search Tree', it => {
  it('is a constructor', t => {
    t.is(typeof BST, 'function');
    const b = new BST();
    t.true(b instanceof BST);
  });

  it('has a root node', t => {
    const b = new BST('root');
    t.is(b.root.value, 'root');
    t.true(b.root instanceof N);
  });
  
  describe('a tree node', it => {
    it('may contain data', t => {
      const n = new N('data');
      t.is(n.value, 'data');
    });

    it('may not have any child nodes', t => {
      const n = new N('data');
      t.is(n.left, null);
      t.is(n.right, null);
    });

    it('may contain child node(s)', t => {
      const b = new BST();
      b.insert(5);
      b.insert(3);
      t.true(b.root instanceof N);
      t.true(b.root.left instanceof N);
    });
  });
  
  describe('abilities', it => {
    it.todo('may calculate the height -- longest path to a leaf (childless node)');
    it.todo('may calculate the depth (length to root) of any node');
  });

  describe('binary search tree', it => {
    function createTree(arr) {
      const b = new BST()
      arr.forEach(x => b.insert(x));
      
      return b;
    }
    /*
      50, 76, 21, 4, 32, 100, 64, 52.
      
                  50 
                /    \
               /      \
              21      76
             /  \    /  \
            4   32  64   100
                   /
                 52   
     */
    it('keeps its values in a sorted order', t => {
      const tree = [50, 76 ,21, 4, 32, 100, 64, 52];
      const b = createTree(tree);
      
      t.is(b.root.value, 50);
      t.is(b.root.left.value, 21)
      t.is(b.root.left.left.value, 4);
      t.is(b.root.left.right.value, 32);
      t.is(b.root.right.value, 76);
      t.is(b.root.right.left.value, 64);
      t.is(b.root.right.left.left.value, 52);
      t.is(b.root.right.right.value, 100);
    }); 

    it('node value is greater than left child but lesser than right child', t => {
      const b = new BST()
      const root  = b.insert(50);
      const right = b.insert(76);
      const left  = b.insert(21);

      t.true(root.value < right.value);
      t.true(root.value > left.value);
    });

    it.todo('has a method to find a value in the tree');
    /*
                   |50|                              |50|
                 /      \                           /    \
               |30|     |70|   (DELETE 20) --->   |30|   |70|
              /    \                                \
            |20|   |40|                             |40|
    */
    it('can simply delete a node (leaf) with no children (no changes to tree)', t => {
      const tree = [50, 30, 70, 20, 40];
      const b = createTree(tree);
      b.remove(20);

      t.is(b.root.value, 50);
      t.is(b.root.left.value, 30);
      t.is(b.root.left.left, null);
      t.is(b.root.left.right.value, 40);
      t.is(b.root.right.value, 70);
    });
    /*
                   |50|                              |50|
                 /      \                           /    \
               |30|     |70|   (DELETE 30) --->   |20|   |70|
              /            
            |20|
    */
    it('can delete a node with one child by linking said child to grandparent', t => {
      const tree = [50, 30, 70, 20];
      const b = createTree(tree);
      b.remove(30);

      t.is(b.root.value, 50);
      t.is(b.root.left.value, 20);
      t.is(b.root.right.value, 70);
    });
    /*
                  |50|                              |50|
                /      \                           /    \
              |30|     |70|   (DELETE 30) --->   |40|   |70|
             /    \                             /
           |20|   |40|                        |20|
    */
    it('cand delete a node with two children by moving the smaller sibling to a child of the larger', t => {
      const tree = [50, 30, 70, 20, 40];
      const b = createTree(tree);
      b.remove(30);

      t.is(b.root.value, 50);
      t.is(b.root.left.value, 40);
      t.is(b.root.left.right, null);
      t.is(b.root.left.left.value, 20);
      t.is(b.root.right.value, 70);
    });
  });

  describe('search algorithms', it => {
    describe('depth first search', it => {
      /*
              1
            /   \
          2       5
         / \     / \
        3   4   6   7
        
        pre-order
        1 > 2 > 3 > 4 > 5 > 6 > 7

        in-order   (left, middle, right)
        3 > 2 > 4 > 1 > 6 > 5 > 7

        post-order (left, right, middle)
        3 > 4 > 2 > 6 > 7 > 5 > 1
      */
      it.todo('explores from root to leaf before back tracking and exploring neighbors');
      it.todo('can explore in a pre-order');
      it.todo('can explore in an in-order');
      it.todo('can explore in a post-order');
    });

    describe('breadth first search', it => {
            /*
              1
            /   \
          2       5
         / \     / \
        3   4   6   7
        
       level 0 - 1
       level 1 - 2, 5
       level 2 - 3, 4, 6, 7
      */
     it.todo('explores each level before moving down in depth');
    });
  });
});