class TrieNode {
  /**
   * @param {string} [letter ='']
   */
  constructor(letter = '') {
    /** @type {string}  */this.value = letter;
    /** @type {object.<string, TrieNode> } */this.children = {};
    /** @type {boolean} */  this.completesString = false;
  } 
}

class Trie {
  constructor() {
    /** @type {TrieNode} */this.rootNode = new TrieNode();
  }

  /**
   * @param {string} word
   */
  insert(word) {
    const node = this.rootNode;
    const path = pathFromWord(word);
    
    const lastNode = path.reduce((obj, key) => {
      if(!obj[key] && key !== 'children') {
        obj[key] = new TrieNode(key);
        return obj[key];
      }
    }, node.children);

    lastNode.completesString = true;
  }
  
  /**
   * @param {string} word
   */
  find(word) {
    const node = this.rootNode;
    const path = pathFromWord(word);
    return getObj(node.children, path) ? true : false;
  }

  remove(){}
}

function hasChild(node, char) {
  return node.children[char] != null;
}

function getProp(obj, path) {
  return path.reduce((obj, key) => obj && obj[key] != null ? obj[key] : undefined , obj);
}

function pathFromWord(word) {
  return word.split('').join('.children.').split('.');
}