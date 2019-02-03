import {describe} from 'ava-spec';
import {N, default as BST} from '../lib/binary-search-tree';

function createTree(arr) {
  const b = new BST()
  arr.forEach(x => b.insert(x));
  
  return b;
}

describe('Binary Search Tree Node', it => {
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

    it('ensures any node value is greater than left child but lesser than right child', t => {
      const b = new BST()
      const root  = b.insert(50);
      const right = b.insert(76);
      const left  = b.insert(21);

      t.true(root.value < right.value);
      t.true(root.value > left.value);
    });

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
    it('can delete a node with two children by moving the smaller sibling to a child of the larger', t => {
      const tree = [50, 30, 70, 20, 40];
      const b = createTree(tree);
      b.remove(30);

      t.is(b.root.value, 50);
      t.is(b.root.left.value, 40);
      t.is(b.root.left.right, null);
      t.is(b.root.left.left.value, 20);
      t.is(b.root.right.value, 70);
    });

    /* 
             50                           60
            /  \         delete(50)      /  \
          40    70       --------->    40    70 
               /  \                            \ 
             60   80                           80
     
     */
    it('correctly orders tree when deleting a node with two children', t => {
      const values = [50, 40, 70, 60, 80];
      const b = createTree(values);
      
      b.remove(50);
      
      const zero = b.getLevel(0);
      const one  = b.getLevel(1);
      const two  = b.getLevel(2);

      t.deepEqual(zero, [60])
      t.deepEqual(one,  [40, 70])
      t.deepEqual(two,  [80]);
    });

    /*
                   |50|     
                 /      \   
               |30|     |70|
              /    \        \ 
            |20|   |40|     |100|
           /
        |10|
    */
    it('correctly orders tree when deleting any node from the tree', t => {
      const values = [50, 30, 70, 20, 40, 100, 10];

      const fulltree = createTree(values);
      const fullvalues = [[50], [30, 70], [20, 40, 100], [10]];
      fullvalues.forEach((values, index) => {
        const level = fulltree.getLevel(index);
        t.deepEqual(level, values);
      });

      const tests = [
        {
          remove: 50,
          tree: createTree(values),
          correct: [[70], [30, 100], [20, 40], [10]]
        }, 
        {
          remove: 30,
          tree: createTree(values),
          correct: [[50], [40, 70], [20, 100], [10]]
        }, 
        {
          remove: 70,
          tree: createTree(values),
          correct: [[50], [30, 100], [20, 40], [10]]
        }, 
        {
          remove: 20,
          tree: createTree(values),
          correct: [[50], [30, 70], [10, 40, 100]]
        }, 
        {
          remove: 40,
          tree: createTree(values),
          correct: [[50], [30, 70], [20, 100], [10]]
        }, 
        {
          remove: 100,
          tree: createTree(values),
          correct: [[50], [30, 70], [20, 40], [10]]
        }, 
        {
          remove: 10,
          tree: createTree(values),
          correct: [[50], [30, 70], [20, 40, 100]]
        }, 
      ];

      tests.forEach(x => {
        const {tree, correct} = x;
        tree.remove(x.remove);
        correct.forEach((values, index) => {
          const level = tree.getLevel(index);
          t.deepEqual(level, values, `Removed ${x.remove}; Level ${index} is incorrect`);
        });
      });
    });

    
    /*
                   |50|     
                 /      \   
               |30|     |70|
              /    \        \ 
            |20|   |40|     |100|
    */
   it('getLevel returns the first level', t => {
    const tree = [50, 30, 70, 20, 40];
    const b = createTree(tree);
    const values = b.getLevel(0);
    t.is(values[0], 50);
  });

  it('getLevel returns the any level', t => {
    const tree = [50, 30, 70, 20, 40, 100];
    const b = createTree(tree);
    const values = b.getLevel(1);
    t.is(values[0], 30);
    t.is(values[1], 70);

    const third = b.getLevel(2);
    t.is(third[0], 20)
    t.is(third[1], 40)
    t.is(third[2], 100)
  });

  it('has a method to find a value in the tree', t => {
    const tree = [50, 30, 70, 20, 40, 100];
    const b = createTree(tree);
    const n = b.find(30);
    t.true(n instanceof N);
    const notfound = b.find(1000);
    t.is(notfound, null);
  });

  it('can explore in an in-order', t => {
    const values  = [50, 30, 70, 20, 40, 100];
    const ordered = [20, 30, 40, 50, 70, 100];
    const tree    = createTree(values);
    let index = 0;
    
    tree.each(n => {
      t.is(n.value, ordered[index]);
      index++;
    });
  });

  it('can explore in a pre-order', t => {
    const values  = [50, 30, 70, 20, 40, 100];
    const ordered = [50, 30, 20, 40, 70, 100];
    const tree    = createTree(values);
    let index = 0;
    
    tree.each(n => {
      t.is(n.value, ordered[index]);
      index++;
    }, 'pre');
  });

  it('can explore in a post-order', t => {
    const values  = [50, 30, 70, 20, 40, 100];
    const ordered = [20, 40, 30, 100, 70, 50];
    const tree    = createTree(values);
    let index = 0;
    
    tree.each(n => {
      t.is(n.value, ordered[index]);
      index++;
    }, 'post');
  });
});