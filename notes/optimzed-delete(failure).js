
/* 
  deleteNode fails this test. 
          50                           60
        /  \         delete(50)      /  \
      40    70       --------->    40    70 
            /  \                            \ 
          60   80                           80
  
  */
function deleteNode(root, value, comparator) {
  if(root === null) { 
    return root;
  }

  if(root.value !== value) {
    const direction = comparator(value, root.value) ? 'left' : 'right';
    root[direction] = deleteNode(root[direction], value, comparator);
    return root;
  }

  if(root.left === null) {
    return root.right;
  } else if (root.right === null) {
    return root.left;
  } else {
    let parent = root;
    let successor = root.right;

    while(successor.left !== null) {
      parent = successor;
      successor = successor.left;
    }

    parent.right = successor.right;
    root.value = successor.value;
    return root;
  }
}

function findSmallest(node, parent) {
  if(!node.left) {
    return {
      parent,
      node
    }
  }

  return findSmallest(node.left, node);
}