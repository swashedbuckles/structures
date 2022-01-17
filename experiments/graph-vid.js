class Stack {
  constructor() {
    this.values = [];
  }

  push(value) {
    this.values.push(value);
  }

  pop() {
    const value = this.values.pop();
    return value;
  }

  size() {
    return this.values.length;
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

class Queue {
  constructor() {
    this.values = [];
  }

  enqueue(value) {
    this.values.unshift(value);
  }

  dequeue() {
    const value = this.values.pop();
    return value;
  }

  size() {
    return this.values.length;
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

const graph = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: [],
};

function depthFirstPrint(graph, root) {
  const result = [];

  const stack = new Stack();
  stack.push(root);

  while (!stack.isEmpty()) {
    const current = stack.pop();
    result.push(current);
    graph[current].forEach(neighbor => stack.push(neighbor));
  }
  console.log('DFS', result);
  return result;
}

function breadthFirstPrint(graph, root) {
  const result = [];
  const queue = new Queue();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    result.push(current);
    graph[current].forEach(neighbor => queue.enqueue(neighbor));
  }

  console.log('BFS', result);
  return result;
}

depthFirstPrint(graph, 'a');
breadthFirstPrint(graph, 'a');

// acyclic -- no cycles.
const graph2 = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

function hasPath2(graph, source, dest) {
  if (graph[source] && source === dest) {
    return true;
  }

  return graph[source].some(neighbor => hasPath2(graph, neighbor, dest));
}

function hasPath(graph, source, dest) {
  const q = new Queue();
  q.enqueue(source);
  while (!q.isEmpty()) {
    const node = q.dequeue();
    if (node === dest) {
      return true;
    }

    graph[node].forEach(neighbor => q.enqueue(neighbor));
  }
  return false;
}

console.log(hasPath2(graph2, 'f', 'k'));
console.log(hasPath2(graph2, 'j', 'f'));

const edgeList = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n'],
  ['k', 'j'],
];

function edgListToAdjacentyMatrix(list) {
  const graph = {};
  list.forEach(edge => {
    const [source, target] = edge;
    if (!graph[source]) {
      graph[source] = [];
    }

    if (!graph[target]) {
      graph[target] = [];
    }

    graph[source].push(target);
    graph[target].push(source);
  });

  return graph;
}

console.log('list', edgeList, edgListToAdjacentyMatrix(edgeList));

function hasPathUndirected(graph, source, dest) {
  const visited = {};
  const s = new Stack();
  s.push(source);
  while (!s.isEmpty()) {
    const current = s.pop();
    if (visited[current]) {
      continue;
    }

    visited[current] = true;

    if (current === dest) {
      return true;
    }

    graph[current].forEach(neighbor => {
      if (!visited[neighbor]) {
        s.push(neighbor);
      }
    });
  }

  return false;
}

const graph3 = edgListToAdjacentyMatrix(edgeList);

console.log(hasPathUndirected(graph3, 'i', 'l')); // true;
console.log(hasPathUndirected(graph3, 'k', 'o')); // false;

const graph4 = {
  3: [],
  4: [6],
  6: [4, 5, 7, 8],
  8: [6],
  7: [6],
  5: [6],
  1: [2],
  2: [1],
};

function countConnectedComponents(graph) {
  let count = 0;
  const visited = {};

  const visitor = new Stack();
  const nodes = Object.keys(graph);

  nodes.forEach(node => {
    if (visited[node]) {
      return;
    }

    visitor.push(node);
    while (!visitor.isEmpty()) {
      const current = visitor.pop();
      if (visited[current]) {
        continue;
      }

      visited[current] = true;
      graph[current].forEach(neighbor => {
        if (!visited[neighbor]) {
          visitor.push(neighbor);
        }
      });
    }

    count += 1;
  });

  return count;
}

const graph5 = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
};

console.log(countConnectedComponents(graph4));
console.log(countConnectedComponents(graph5));

function largestComponent(graph) {
  let result = [];
  let test = [];
  const visited = {};

  const visitor = new Stack();
  const nodes = Object.keys(graph).map(val => parseInt(val, 10));

  nodes.forEach(node => {
    if (visited[node]) {
      return;
    }

    visitor.push(node);
    while (!visitor.isEmpty()) {
      const current = visitor.pop();
      if (visited[current]) {
        continue;
      }

      visited[current] = true;
      test.push(current);
      graph[current].forEach(neighbor => {
        if (visited[neighbor]) {
          return;
        }

        visitor.push(neighbor);
      });
    }
    if (test.length > result.length) {
      result = test;
    }
    test = [];
  });

  return result;
}

function largestComponentSize(graph) {
  const visited = {};
  let largest = 0;

  const nodes = Object.keys(graph);
  const visitor = new Stack();

  nodes.forEach(node => {
    let size = 0;
    if (visited[node]) {
      return;
    }

    visitor.push(node);
    while (!visitor.isEmpty()) {
      const current = visitor.pop();
      if (visited[current]) {
        continue;
      }
      size++;
      visited[current] = true;
      graph[current].forEach(neighbor => {
        if (!visited[neighbor]) {
          visitor.push(neighbor);
        }
      });
    }

    if (largest < size) {
      largest = size;
    }
  });

  return largest;
}

console.log('largest', largestComponentSize(graph5));

const edges2 = [
  ['w', 'x'],
  ['x', 'y'],
  ['z', 'y'],
  ['z', 'v'],
  ['w', 'v'],
];

const graph6 = edgListToAdjacentyMatrix(edges2);

function shortestPath(graph, start, end) {
  const visited = new Set();
  const visitor = new Queue();

  visitor.enqueue([start, 0]);

  while (!visitor.isEmpty()) {
    const [current, pathLength] = visitor.dequeue();
    if (visited.has(current)) {
      continue;
    }

    if (current === end) {
      return pathLength;
    }

    visited.add(current);

    const neighbors = graph[current];
    neighbors.forEach(neighbor => {
      if (visited.has(neighbor)) {
        return;
      }

      visitor.enqueue([neighbor, pathLength + 1]);
    });
  }

  return -1;
}

console.log('shortestPath', shortestPath(graph6, 'w', 'z'));
console.log('no shortestPath', shortestPath(graph6, 'w', 'a'));

const grid = [
  [0, 1, 0, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0],
];

function islandCount(grid) {
  const visited = new Set();
  let count = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (exploreGrid(grid, row, col, visited)) {
        count += 1;
      }
    }
  }

  return count;
}

function exploreGrid(grid, row, col, visited) {
  const rowInBounds = 0 <= row && row < grid.length;
  const colInBounds = rowInBounds && 0 <= col && col <= grid[row].length;
  if (!rowInBounds || !colInBounds || grid[row][col] === 0) {
    return false;
  }

  const position = `${row},${col}`;
  if (visited.has(position)) {
    return false;
  }

  visited.add(position);

  exploreGrid(grid, row - 1, col, visited);
  exploreGrid(grid, row + 1, col, visited);
  exploreGrid(grid, row, col - 1, visited);
  exploreGrid(grid, row, col + 1, visited);

  return true;
}

function countIslands(grid) {
  let visitor = new Queue();
  let visited = new Set();
  let count = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (visited.has(`${row}.${col}`)) {
        continue;
      }

      visitor.enqueue([row, col]);
      while (!visitor.isEmpty()) {
        const [row, col] = visitor.dequeue();
        const position = `${row},${col}`;
        const rowInBounds = 0 <= row && row < grid.length;
        const colInBounds = rowInBounds && 0 <= col && col < grid[row].length;

        if (!rowInBounds || !colInBounds || visited.has(position)) {
          continue;
        }

        visited.add(position);

        if (grid[row][col]) {
          visitor.enqueue([row - 1, col]);
          visitor.enqueue([row + 1, col]);
          visitor.enqueue([row, col - 1]);
          visitor.enqueue([row, col + 1]);
        }
      }

      if (grid[row][col]) {
        count += 1;
      }
    }
  }

  return count;
}

console.log('island count?', countIslands(grid));
console.log('island count', islandCount(grid));

const grid2 = [
  [0, 1, 0, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0],
];

function findMinimumIsland(grid) {
  const visitor = new Stack();
  const visited = new Set();
  let smallest  = Infinity;

  for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid[row].length; col++) {
      if(visited.has(`${row},${col}`)) {
        continue;
      }

      visitor.push([row, col]);
      let size = 0;
      while(!visitor.isEmpty()) {
        const [cRow, cCol] = visitor.pop();
        const rowOOB   = cRow < 0 || cRow >= grid.length;
        const position = `${cRow},${cCol}`;
        const colOOB   = !rowOOB && (cCol < 0 || cCol >= grid[cRow].length);
        
        if(rowOOB || colOOB || visited.has(position)) {
          continue;
        }

        visited.add(position);

        if(grid[cRow][cCol]) {
          size++;
          visitor.push([cRow - 1, cCol]);
          visitor.push([cRow + 1, cCol]);
          visitor.push([cRow, cCol - 1]);
          visitor.push([cRow, cCol + 1]);
        }
      }
      
      if(size > 0 && size < smallest && grid[row][col]) {
        smallest = size;
      }
      
      size = 0;
    }
  }

  return smallest === Infinity ? 0 : smallest;
}

console.log('smallest island size ', findMinimumIsland(grid2));