import {describe} from 'ava-spec';

describe('Graph', it => {
  it.todo('should add nodes to a graph');
  it.todo('should ignore adding an existing node');
  it.todo('should add edges between nodes on an undirected graph');
  it.todo('should add edges between nodes on a directed graph');
  it.todo('should associated edges with their connecting nodes');
  it.todo('should ignore adding an existing edge');
  it.todo('should find all edges connected to a node on an undirected graph')
  it.todo('should find all edges connected to a node on a directed graph')
  it.todo('should find neighbors of a node');
  it.todo('should return all edges');
  it.todo('should return all nodes');
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