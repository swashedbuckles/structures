import {describe} from 'ava-spec';
import {default as Trie, TrieNode} from '../lib/trees/trie';

describe('a trie', it => {
  it('should be a constructor', t => {
    t.is(typeof Trie, 'function');
    const trie = new Trie();
    t.true(trie instanceof Trie);
  });

  it('should contain TrieNodes', t => {
    const trie = new Trie();
    t.true(trie.root instanceof TrieNode);
  });

  it('should generate one node per letter of word inserted', t => {
    const trie = new Trie();
    trie.insert('hello');

    t.true(trie.root.children.h instanceof TrieNode);
    t.truthy(trie.root.children.h.children.e);
    t.truthy(trie.root.children.h.children.e.children.l);
    t.truthy(trie.root.children.h.children.e.children.l.children.l);
    t.truthy(trie.root.children.h.children.e.children.l.children.l.children.o);
  });

  it('should not generate duplicate nodes if another word overlaps', t => {
    const trie = new Trie();
    trie.insert('hi');
    trie.insert('hit');
    
    const rootKids = Object.keys(trie.root.children);
    const hKids = Object.keys(trie.root.children.h.children);
    const iKids = Object.keys(trie.root.children.h.children.i.children);

    t.deepEqual(rootKids, ['h']);
    t.deepEqual(hKids, ['i'])
    t.deepEqual(iKids, ['t'])
  });

  it('should have a find method to return if a word is in the trie', t => {
    const trie = new Trie();
    trie.insert('triangle');
    t.true(trie.contains('triangle'));
    t.false(trie.contains('taco'));
  });

  it('should (not) remove a word when the last node has children', t => {
    const trie = new Trie();
    trie.insert('hi');
    trie.insert('hit');
    trie.insert('hello');
    trie.remove('hi');
    
    t.true(trie.contains('hit'));
    t.true(trie.contains('hello'));
    t.false(trie.contains('hi'));
  });

  it('should remove phil only after philadelphia', t => {
    const trie = new Trie();
    trie.insert('phil');
    trie.insert('philadelphia');
    trie.remove('phil');
    t.true(trie.contains('philadelphia'));
    trie.remove('philadelphia');
    t.false(trie.contains('philadelphia'));
  })

  it('should remove a word when characters other than the last have children', t => {
    const trie = new Trie();
    trie.insert('robotic');
    trie.insert('robust');
    trie.insert('rose');
    trie.remove('robotic');
    
    t.true(trie.contains('robust'));
    t.true(trie.contains('rose'));
    t.false(trie.contains('robotic'));
  });

  it('should remove a word when no characters have children', t => {
    const trie = new Trie();
    trie.insert('dracula');
    trie.insert('wolfman');
    trie.remove('wolfman');
    t.true(trie.contains('dracula'));
    t.false(trie.contains('wolfman'));
  });
});