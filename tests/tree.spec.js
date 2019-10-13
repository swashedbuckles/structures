import {describe} from 'ava-spec';
import Tree from '../lib/trees/tree';

describe('Trees', it => {
  it.todo('is a constructor');
  it.todo('creates instances');
  it.todo('is a collection of nodes');
  it.todo('has nodes connected by edges');
  it.todo('has a root node');
  
  describe('a tree node', it => {
    it.todo('may contain data');
    it.todo('may contain child node(s)');
    it.todo('may not have any child nodes');
  });
  
  describe('abilities', it => {
    it.todo('may calculate the height -- longest path to a leaf (childless node)');
    it.todo('may calculate the depth (length to root) of any node');
  });

  describe('binary trees', it => {
    it.todo("has nodes with at most two children");
    describe('insert left', it => {
      it.todo('will add a child if no left child exists');
      it.todo('will set the current child as the new node\'s child if a current left node exists');
    });
    describe('insert right', it => {
      it.todo('will add a child if no right child exists');
      it.todo('will set the current child as the new node\'s child if a current right node exists');
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