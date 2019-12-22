import BST from '../lib/trees/binary-search-tree';
function createTree(arr) {
  const b = new BST()
  arr.forEach(x => b.insert(x));
  
  return b;
}

const values = [50, 30, 70, 20, 40, 10];
const tree = createTree(values);
tree.print();