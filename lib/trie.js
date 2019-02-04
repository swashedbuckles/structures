export class TrieNode {
  /**
   * @param {string} [letter ='']
   */
  constructor(letter = '') {
    /** @type {string}  */this.value = letter;
    /** @type {object.<string, TrieNode> } */this.children = {};
    /** @type {boolean} */  this.completesString = false;
  } 
}

export default class Trie {
  constructor() {
    /** @type {TrieNode} */this.root = new TrieNode();
  }

  /**
   * @param {string} word
   */
  insert(word) {
    const node = this.root;
    const path = pathFromWord(word);

    const lastNode = path.reduce((obj, key) => {
      if(obj && !obj[key] && key !== 'children') {
        obj[key] = new TrieNode(key);
        return obj[key];
      }

      return obj[key];
    }, node.children);

    lastNode.completesString = true;
  }
  
  /**
   * @param {string} word
   */
  find(word) {
    const node = this.root;
    const path = pathFromWord(word);
    return getProp(node.children, path) ? true : false;
  }

  /**
   * @param {string} word
   */
  remove(word){

  }
}

function getProp(obj, path) {
  return path.reduce((obj, key) => obj && obj[key] != null ? obj[key] : undefined , obj);
}

function pathFromWord(word) {
  return word.split('').join('.children.').split('.');
}