class QuickQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value) {
    this.values.unshift(value);
  }

  dequeue() {
    return this.values.pop();
  }

  peek() {
    return this.values[this.values.length -1];
  }

  contains(value) {
    return this.values.indexOf(value) > -1;
  }

  size() {
    return this.values.length;
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

const adjacencyMatrix = [
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0]
];

function bfsForLength(graph, root) {
  const lengths = Array.from({length: graph.length}, (val => Infinity));
  lengths[root] = 0;

  const queue = new QuickQueue();
  queue.enqueue(root);

  while(!queue.isEmpty()) {
    const currentNode = queue.dequeue();
    const connected   = graph[currentNode];
    const neighbors   = connected.reduce((neighbors, value, index) => {
      if(value === 1) {
        neighbors.push(index);
      }
    
      return neighbors;
    }, []);

    for(let neighbor of neighbors) {
      if(lengths[neighbor] === Infinity) {
        lengths[neighbor] = lengths[currentNode] + 1;
        queue.enqueue(neighbor);
      }
    }
  }

  return lengths;
}


console.log('yo', bfsForLength(adjacencyMatrix, 1));
