export class TrieNode {
  /**
   * @param {string} [letter ='']
   */
  constructor(letter = '') {
    /** @type {string}  */this.value = letter;
    /** @type {object.<string, TrieNode> } */this.children = {};
    /** @type {boolean} */  this.completesString = false;
  } 

  /**
   * @param {string} letter
   * @return {TrieNode}
   */
  getChild(letter) {
    return this.children[letter] || null;
  }

  /**
   * @param {string} letter
   * @return {TrieNode}
   */
  addChild(letter) {
    if(!this.hasChild(letter)) {
      this.children[letter] = new TrieNode(letter);
    }

    return this.children[letter]
  }

  removeChild(letter) {
    const node = this.getChild(letter);
    const exists = node !== null;
    const nokids = exists && !node.hasChildren();
    const isdone = exists && node.completesString;

    if(nokids && isdone) {
      this.children[letter] = null;
    }

    return this;
  }

  /**
   * @param {string}
   * @return {boolean}
   */
  hasChild(letter) {
    return this.children[letter] != null;
  }

  /**
   * @return {boolean}
   */
  hasChildren() {
    const kids = Object.keys(this.children);
    return kids.length > 0;
  }
}

export default class Trie {
  constructor() {
    /** @type {TrieNode} */this.root = new TrieNode();
  }

  /**
   * @param {string} word
   * @return {Trie}
   */
  insert(word) {
    const root = this.root;
    const path = word.split('');
    const lastNode = path.reduce((node, letter) => node.addChild(letter), root);
    lastNode.completesString = true;

    return this;
  }
  
  /**
   * @param {string} word
   */
  contains(word) {
    const root = this.root;
    const path = word.split('');
    const lastNode = path.reduce((node, letter) => node && node.getChild(letter), root);
    return lastNode && lastNode.completesString ? true : false;
  }

  /**
   * @param {string} word
   * @return {Trie} 
   */
  remove(word){
    const root = this.root;
    remove(root, word);
    return this;
  }
}

/**
 * @param {TrieNode} node
 * @param {string} word
 * @param {number} [index = 0]
 */
function remove(node, word, index = 0){
  if(index >= word.length) {
    return
  }
  
  const letter = word[index];
  const next = node.getChild(letter);
  if(next === null) {
    return; 
  }

  remove(next, word, index + 1);

  if(index === word.length - 1){
    next.completesString = false;
  }

  node.removeChild(letter);
}