class GraphNode {
  constructor(name, data) {
    this.name = name;
    this.data = data;
    this.edges = {};
  }
}

class GraphEdge {
  constructor(source, target) {
    this.source = source;
    this.target = target;
  }
}

class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(name, data) {
    if(!this.nodes[name]) {
      this.nodes[name] = new GraphNode(name, data);
    }
  }

  getNode(name) {
    return this.nodes[name] || null;
  }

  addEdge(source, target) {
    if(this.nodes[source] && this.nodes[target]) {
      const edge = new GraphEdge(this.nodes[source], this.nodes[target]);
      this.nodes[source].edges[target] = edge;
      this.nodes[target].edges[source] = edge;
    }
  }
}