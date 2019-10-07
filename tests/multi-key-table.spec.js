import {describe} from 'ava-spec';
import Table from '../lib/multi-key-table';

describe('Multi-Key Table', it => {
  it('should be a class', t => {
    t.is(typeof Table, 'function');
  });

  it('should generate an instance', t => {
    const x = new Table();
    t.true(x instanceof Table);
  });

  describe('basic entries', it => {
    it('should return an empty array if retrieving yields no entries', t => {
      const x = new Table();
      t.deepEqual(x.get('key'), []);
    });

    it('should add an entry', t => {
      const x = new Table();
      const key = 'key';
      t.is(x.catalog[key], undefined);
      x.set(key, 'value');
      t.false(x.catalog[key] === undefined);
    });

    it('should return itself after adding an entry', t => {
      const x = new Table();
      const ret = x.set('key', 'value');
      t.is(ret, x);
    });
    
    it('should be able to retrieve an entry', t => {
      const x = new Table();
      const value = 'value';
      const ret = x.set('key', 'value').get('key');
      t.deepEqual(ret, [value]);
    });

    it('should add multiple entries', t => {
      const x = new Table();
      const values = ['value', 1234];

      const ret = x.set('key', values).get('key');
      t.deepEqual(values, ret);
    });

    it('should append additional entries to the same key', t => {
      const x = new Table();
      const key = 'key';
      const v1 = 'value';
      const v2 = 1234;
      x.set(key, v1);
      x.set(key, v2);
      const vals = x.get(key);
      
      t.is(vals[0], v1);
      t.is(vals[1], v2);
    });

    it.skip('should be able to remove an entry from a key', t => {
      const x = new Table();
      const key = 'key';
      const value = 'value';
      const rm = 'remove';
      x.set(key, [value, rm]);
      
      t.deepEqual(x.get(key), [value, rm]);
      x.remove(key, rm);
      t.deepEqual(x.get(key), [value]);
    });
    
    it.skip('should be able to remove all entries from a key', t => {
      const x = new Table();
      const key = 'key';
      x.set(key, [1, 2, 3, 4, 5]);
      t.is(x.get(key).length, 5);
      x.clear(key);
      t.is(x.get(key), undefined);
    });
    
    it.skip('should be able to replace entries from a key', t => {
      const x = new Table();
      const key = 'key';
      const v1 = [1,2,3,4,5];
      const v2 = ['a', 'b', 'c'];
      x.set(key, v1);
      t.deepEqual(x.get(key), v1);

      x.replace(key, v2);
      t.deepEqual(x.get(key), v2);
    });
    
    // it('should be able to find an entry in a key', t => {});
    // it('should return how many entries are on a key', t => {});    
  });

  describe('multi-key entries', it => {
    it('should assign value to multiple keys', t => {
      const x = new Table();
      const val = 'value';
      x.set(['1', '2'], val);
      
      t.false(x.get('1') == null);
      t.false(x.get('2') == null);
      t.deepEqual(x.get('1'), x.get('2'));
    });

    it('should allow same, separate content', t => {
      const x = new Table();
      x.set(['k1', 'k2'], 'val');
      x.set('k1', 'x');
      x.set('k2', 'y');

      const val1 = x.get('k1');
      const val2 = x.get('k2');

      t.is(val1.length, 2);
      t.is(val2.length, 2);

      t.true(val1.indexOf('val') > -1);
      t.true(val1.indexOf('x') > -1);
      t.true(val2.indexOf('val') > -1);
      t.true(val2.indexOf('y') > -1);
    });

    it('should fetch common values', t => {
      const x = new Table();
      x.set(['k1', 'k2'], 'val');
      x.set('k1', 'x');
      x.set('k2', 'y');

      t.deepEqual(x.get(['k1', 'k2']), ['val']);
    });

    it.skip('should replace only common values', t => {
      const x = new Table();
      x.set(['k1', 'k2'], 'val');
      x.set('k1', 'x');
      x.set('k2', 'y');
      x.replace(['k1', 'k2'], 'value');
      t.deepEqual(x.get(['k1', 'k2']), ['value']);
    });
  });
});