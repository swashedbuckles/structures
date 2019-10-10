import {describe} from 'ava-spec';
import Graph from '../lib/graph';

describe('Graph construction', it => {
  it('should default to a directed graph', t => {
    const x = new Graph();
    t.is(x.type, Graph.DIRECTED);
  });

  it('should allow directed or undirect graphs', t => {
    const x = new Graph(Graph.DIRECTED);
    const y = new Graph(Graph.UNDIRECTED);
    
    t.is(x.type, Graph.DIRECTED);
    t.is(y.type, Graph.UNDIRECTED);

    try {
      const z = new Graph("banana");
    } catch (error) {
      t.true(error instanceof TypeError);
    }
  });
});

describe('Graph', it => {
  it('should add nodes to a graph', t => {
    const x = new Graph();
    
    t.true(x.nodes['node'] === undefined);
    x.addNode('node');
    t.false(x.nodes['node'] === undefined);
  });

  it('should add edges between nodes on an undirected graph', t => {
    const x = new Graph(Graph.UNDIRECTED);
    const a = x.addNode('a');
    const b = x.addNode('b');
    const e = x.addEdge('a', 'b');
    

    t.is(a.edges.get(b.name), e);
    t.true(b.edges.get(a.name) != null);
  });

  it('should add edges between nodes on a directed graph', t => {
    const x = new Graph();
    const a = x.addNode('a');
    const b = x.addNode('b');
    const e = x.addEdge('a', 'b');
    
    t.is(a.edges.get(b.name), e);
    t.false(b.edges.get(a.name) != null);
  });
  
  it('should return a node', t => {
    const x = new Graph();
    const a = x.addNode('a');
    const b = x.getNode('a');
    t.is(a, b);  
  });

  it('should return an edge', t => {
    const x = new Graph();
    const a = x.addNode('a');
    const b = x.addNode('b');
    
    const e = x.addEdge('a', 'b');
    const y = x.getEdge('a', 'b');
    t.is(e, y);
  });

  it.todo('should associated edges with their connecting nodes');
  it.todo('should ignore adding an existing edge');
  it.todo('should find all edges connected to a node on an undirected graph')
  it.todo('should find all edges connected to a node on a directed graph')
  it.todo('should find neighbors of a node');
  it.todo('should be able to remove nodes');
  it.todo('should remove all edges associated with a node, when removing the node');
  it.todo('should be able to remove edges');
});

describe('Edges', it => {
  it.todo('should create an edge');
  it.todo('should be able to specify a weight on the edge');
  it.todo('should be able to assign data to an edge');
})

describe('Nodes', it => {
  it.todo('should be an instance');
  it.todo('should allow data to be assocaited with the node');
});

describe('Graph Traversal', it => {
  it.todo('should be able to generate routes from a given node');
  it.todo('should be able to determine if a route is possible on a graph');
  it.todo('should be able to do a depth first search');
  it.todo('should be able to do a breadth-first search');
});