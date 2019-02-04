# Some thoughts and stuff

I really like the implementation of [Trie](https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/trie/Trie.js) here; not just because of the clarity of code, but the delegation of 
responsibility across node/structure. The structure is responsible for setting up
the word to be deleted, but the actual deletion of the node happens in the node.

Should re-evaluate the implementation of BST and see if I can optimize delete
using this separation of concerns.