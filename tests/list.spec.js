import {describe} from 'ava-spec';
import List from '../lib/list';
import {ListNode} from '../lib/list';

describe('Linked List', it => {
  it('should be a class', t => {
    t.is(typeof List, 'function');
  });

  it('should generate instances', t => {
    const l = new List();
    t.true(l instanceof List);
  });

  it('can tell you when it is empty', t => {
    const l = new List();
    t.true(l.isEmpty());
  });

  it('should contain nodes', t => {
    const l = new List();
    l.add('first');
    t.true(l.head instanceof ListNode);
  });

  it('can add a node to the start', t => {
    const l = new List();
    l.addHead('hi');
    t.is(l.head.value, 'hi');
  });
  
  it('can add a node to the end', t => {
    const l = new List();
    
    l.addHead('head');
    t.is(l.head.value, 'head');
    
    l.add('tail');
    t.is(l.tail.value, 'tail');

    l.add('newtail');
    t.is(l.tail.value, 'newtail');
  });
  
  it('can add a node _after_ a node', t => {
    const l = new List();
    
    l.addHead('head');
    t.is(l.head.value, 'head');
    
    l.add('tail');
    t.is(l.tail.value, 'tail');
    
    l.insertAfter(l.head, 'middle');
    
    const inserted = l.head.next;
    t.is(inserted.value, 'middle');
  });
  
  it('can add a node _before_ a node', t => {
    const l = new List();
    
    l.addHead('head');
    t.is(l.head.value, 'head');
    
    l.add('tail');
    t.is(l.tail.value, 'tail');
    
    l.insertBefore(l.tail, 'middle');
    
    const inserted = l.head.next;
    t.is(inserted.value, 'middle');
  });

  it('can remove the head node', t => {
    const l = new List();
    l.add('head');
    t.false(l.isEmpty());
    
    l.removeHead();
    t.true(l.isEmpty());
  });
  
  it('can remove any node by value', t => {
    const l = new List();
    l.add('head');
    l.add('middle');
    const middle = l.tail;
    l.add('tail');
    
    l.remove('middle');
    t.is(l.tail.value, 'tail');
  });

  it('can find nodes by value', t => {
    const l = new List();
    l.add('head');
    l.add('two');
    l.add('three');
    l.add('four');
    l.add('tail');

    const three = l.find('three');
    t.true(three instanceof ListNode);
    t.is(three.value, 'three');
  });  
  
  it('can iterate over all nodes', t => {
    const list = [1, 2, 3, 'a', 'b', 'c'];
    const l = new List();
    let index = 0;

    list.forEach(x => l.add(x));

    l.each(val => {
      t.is(list[index], val);
      index++;
    });
  });
  
  it('can map over all nodes', t => {
    const list = [1, 2, 3, 4, 5, 6];
    const doubled = list.map(val => val * 2);

    const l = new List();
    
    list.forEach(x => l.add(x));
    const mapped = l.map(val => val * 2);
    t.true(mapped instanceof List);
    let index = 0;
    
    mapped.each(val => {
      t.is(doubled[index], val);
      index++;
    });
  });

  it('can convert to an array', t => {
    const list = [1,2,3,'a','b','c'];
    const l = new List();
    list.forEach(x => l.add(x));
    const arr = l.toArray();
    
    arr.forEach((val, i) => {
      t.is(val, list[i]);      
    });

    let index = 0;
    l.each(val => {
      t.is(val, arr[index]);
      index++;
    });
  });
}); 