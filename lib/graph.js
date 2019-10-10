import Queue from './queue';
import Stack from './stack';
import Map from './simple-map';
const DIRECTED = "DIRECTED";
const UNDIRECTED = "UNDIRECTED";
export class GraphNode {
  /**
   * @param {string} name node name
   * @param {any} [data] additional node data
   */
  constructor(name, data) {
    if(!name || typeof name !== 'string') {
      throw new TypeError('Nodes require name to be a string');
    }

    this.name = name;
    this.data = data;
    
    /** @type {Map.<GraphEdge>} */
    this.edges = new Map();
  }
}

export class GraphEdge {
  /**
   * @param {GraphNode} source
   * @param {GraphNode} target
   * @param {any} [data]
   */
  constructor(source, target, data) {
    /** @type {GraphNode}*/ this.source = source;
    /** @type {GraphNode}*/ this.target = target;
    /** @type {any}*/       this.data   = data;
  }

  toString() {
    return `${this.source.name}-${this.target.name}`;
  }

  reverse() {
    const source = this.source;
    const target = this.target;
    this.target = source;
    this.source = target;
  }
}

export default class Graph {
  constructor(type = DIRECTED) {
    if(type !== DIRECTED && type !== UNDIRECTED) {
      throw new TypeError("Graph type must be DIRECTED or UNDIRECTED");
    }
    /** @type {Object.<string, GraphNode} */
    this.nodes = {};
    this.type = type;
  }

  /**
   * @param {string} name node name
   * @param {any} [data]
   * @return {GraphNode}
   */
  addNode(name, data) {
    if(typeof name !== 'string') {
      throw new TypeError('Node name must be a string');
    }
    
    if(!this.nodes[name]) {
      this.nodes[name] = new GraphNode(name, data);

      return this.nodes[name];
    }

    this.nodes[name].data = data || this.nodes[name].data;
    return this.nodes[name];
  }

  /**
   * @param {string} name node name
   * @return {GraphNode|null}
   */
  getNode(name) {
    return this.nodes[name] || null;
  }

  /**
   * @param {string} name node name
   * @return {boolean}
   */
  removeNode(name) {
    const node = this.nodes[name];
    if(node == null) {
      return false;
    }

    delete this.nodes[name];
    return true;
  }

  /**
   * @param {string} source
   * @param {string} target
   * @return {boolean} 
   */
  isAdjacent(source, target) {
    const sourceNode = this.getNode(source);
    const targetNode = this.getNode(target);

    if(sourceNode == null || targetNode == null) {
      return false;
    }

    return sourceNode.edges.get(target) != null 
      || targetNode.edges.get(source) != null;
  }

  /**
   * @param {string} source
   * @param {string} target
   * @return {GraphEdge}
   */
  addEdge(source, target) {
    if(typeof source !== 'string' || typeof target !== 'string') {
      const which = typeof source === 'string' ? 'Source' : 'Target';
      throw new TypeError(`${which} must be a string`);
    }
  
    source = this.addNode(source);
    target = this.addNode(target);

    const edge = new GraphEdge(source, target);
    source.edges.set(target.name, edge);

    if(this.type === UNDIRECTED) {
      const edge = new GraphEdge(target, source)
      target.edges.set(source.name, edge);
    }

    return edge;
  }

  /**
   * @param {string} source
   * @param {string} target
   * @return {GraphEdge | null}
   */
  getEdge(source, target) {
    if(this.isAdjacent(source, target)) {
      return this.getNode(source).edges.get(target);
    }

    return null;
  }

  removeEdge(edge) {

  }
}

Graph.DIRECTED = DIRECTED;
Graph.UNDIRECTED = UNDIRECTED;