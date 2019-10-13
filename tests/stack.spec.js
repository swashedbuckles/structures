import {describe} from 'ava-spec';
import Stack from '../lib/lists/stack';
describe('Stacks', it => {
  it('should be a constructor', t => {
    t.is(typeof Stack, 'function');
  });
  
  it('should create an instance', t => {
    const s = new Stack();
    t.true(s instanceof Stack)
  });
  
  it('should have a method of adding elements', t => {
    const s = new Stack();
    t.is(typeof s.push, 'function')
  });

  it('should have a method of removing elements', t => {
    const s = new Stack();
    t.is(typeof s.pop, 'function')
  });

  it('should have a method that tells if it is empty', t => {
    const s = new Stack();
    t.is(typeof s.isEmpty, 'function')
  });

  it('should have a method to peek without removing', t => {
    const s = new Stack();
    t.is(typeof s.peek, 'function')
  });

  it('should be FILO', t => {
    const samples = ['a', 'b', 'c'];
    const s = new Stack();

    samples.forEach(x => s.push(x));
    t.is(s.pop(), 'c');
    t.is(s.pop(), 'b');
    t.is(s.peek(), 'a');
    t.is(s.pop(), 'a');
    t.true(s.isEmpty());
  });
});