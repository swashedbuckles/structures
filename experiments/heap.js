class MaxHeap {
  // Arr[(i-1)/2]	Returns the parent node
  // Arr[(2*i)+1]	Returns the left child node
  // Arr[(2*i)+2]	Returns the right child node
  constructor() {
    this.heap = [null];
  }

  insert(value) {
    console.log('heap before insert', this.heap, value);
    this.heap.push(value);
    if(this.heap.length <= 1) {
      return;
    }
    
    let currentIndex = this.heap.length - 1;
    let parentIndex  = Math.floor(currentIndex / 2);
    let current      = this.heap[currentIndex];
    let parent       = this.heap[parentIndex];
    
    while(currentIndex > 1 && parentIndex >= 1 && parent < current) {
      console.log('heapifyUp');
      this.heap[parentIndex]  = current;
      this.heap[currentIndex] = parent;
      
      currentIndex = parentIndex;
      parentIndex  = Math.floor(currentIndex / 2);
      current      = this.heap[currentIndex];
      parent       = this.heap[parentIndex];
    }
    console.log('heap after insert', this.heap);
  }

  remove() {
    console.log('removing ', this.heap[1]);
    if(this.heap.length < 2) {
      return null; 
    }

    if(this.heap.length === 2) {
      return this.heap.pop();
    }

    let smallest = this.heap[1];
    this.heap[1] = this.heap.pop();

    if(this.heap.length === 3 && this.heap[1] < this.heap[2]) {
      swapArrayLocation(this.heap, 1, 2)
      return smallest;
    }

    let index = 1;
    let leftIndex = index * 2;
    let rightIndex = index * 2 + 1;

    let current = this.heap[index];
    let left    = this.heap[leftIndex];
    let right   = this.heap[rightIndex];

    while(current <= left || current <= right) {
      console.log('heapify down');
      if(left > right) {
        swapArrayLocation(this.heap, index, leftIndex);
        index = leftIndex;
      } else {
        swapArrayLocation(this.heap, index, rightIndex)
        index = rightIndex
      }

      leftIndex  = index * 2;
      rightIndex = index * 2 + 1;

      current = this.heap[index];
      left    = this.heap[leftIndex];
      right   = this.heap[rightIndex];

      if(left == null || right == null) {
        break;
      }
    }

    return smallest;
  }

  sort() {
    const result = [];
    while(this.heap.length > 1) {
      result.push(this.remove());
    }

    return result;
  }
}

class MinHeap {
  // Arr[(i-1)/2]	Returns the parent node
  // Arr[(2*i)+1]	Returns the left child node
  // Arr[(2*i)+2]	Returns the right child node
  constructor() {
    this.heap = [null];
  }

  insert(value) {
    console.log('heap before insert', this.heap, value);
    this.heap.push(value);
    if(this.heap.length <= 1) {
      return;
    }
    
    let currentIndex = this.heap.length - 1;
    let parentIndex  = Math.floor(currentIndex / 2);
    let current      = this.heap[currentIndex];
    let parent       = this.heap[parentIndex];
    
    while(currentIndex > 1 && parentIndex >= 1 && parent > current) {
      console.log('heapifyUp');
      this.heap[parentIndex]  = current;
      this.heap[currentIndex] = parent;
      
      currentIndex = parentIndex;
      parentIndex  = Math.floor(currentIndex / 2);
      current      = this.heap[currentIndex];
      parent       = this.heap[parentIndex];
    }
    console.log('heap after insert', this.heap);
  }

  remove() {
    console.log('removing ', this.heap[1]);
    if(this.heap.length < 2) {
      return null; 
    }

    if(this.heap.length === 2) {
      return this.heap.pop();
    }

    let smallest = this.heap[1];
    this.heap[1] = this.heap.pop();

    if(this.heap.length === 3 && this.heap[1] > this.heap[2]) {
      swapArrayLocation(this.heap, 1, 2)
      return smallest;
    }

    let index = 1;
    let leftIndex = index * 2;
    let rightIndex = index * 2 + 1;

    let current = this.heap[index];
    let left    = this.heap[leftIndex];
    let right   = this.heap[rightIndex];

    while(current >= left || current >= right) {
      console.log('heapify down');
      if(left < right) {
        swapArrayLocation(this.heap, index, leftIndex);
        index = leftIndex;
      } else {
        swapArrayLocation(this.heap, index, rightIndex)
        index = rightIndex
      }

      leftIndex  = index * 2;
      rightIndex = index * 2 + 1;

      current = this.heap[index];
      left    = this.heap[leftIndex];
      right   = this.heap[rightIndex];

      if(left == null || right == null) {
        break;
      }
    }

    return smallest;
  }

  sort() {
    const result = [];
    while(this.heap.length > 1) {
      result.push(this.remove());
    }

    return result;
  }
}

/**
 * 
 * @param {any[]} array 
 * @param {number} locationOne 
 * @param {number} locationTwo 
 */
function swapArrayLocation(array, locationOne, locationTwo) {
  const temp = array[locationTwo];
  array[locationTwo] = array[locationOne];
  array[locationOne] = temp;
}


const min = new MinHeap();
[4, 6, 8, 10, 5, 16, 3, 1].forEach(val => min.insert(val));
console.log(min.heap);

min.remove();
console.log(min.heap);

console.log('-----');

const max = new MaxHeap();
[4, 6, 8, 10, 5, 16, 3, 1].forEach(val => max.insert(val));
console.log(max.heap);

max.remove();
console.log(max.heap);