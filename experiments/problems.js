function generateParens(n) {
  const result = [];
  if(n < 1) {
    return result;
  } 

  generate(result, '', 0, 0, n);

  return result;
}

/**
 * 
 * @param {string[]} result 
 * @param {string} current 
 * @param {number} openParens 
 * @param {number} closeParens 
 * @param {number} maxParen 
 * @returns 
 */
function generate(result, current, openParens, closeParens, maxParen) {
  if(current.length === maxParen * 2) {
    result.push(current);
  } 

  if(openParens < maxParen) {
    generate(result, `${current}(`, openParens + 1, closeParens, maxParen);
  }

  if(closeParens < openParens) {
    generate(result, `${current})`, openParens, closeParens + 1, maxParen);
  }
}

console.log('hi', generateParens(3));

function findStartingStation(gas, cost) {
  let remaining = 0;
  let candidate = 0;
  let total = 0;
  for(let x = 0; x < gas.length; x++) {
    remaining += gas[x] - cost[x];
    if(remaining < 0) {
      candidate = x + 1;
      total += remaining;
      remaining = 0;
    }
  }

  return remaining + total >= 0 ? candidate : -1;
}

const gas =  [1, 5, 3, 3, 5, 3, 1, 3, 4, 5]
const cost = [5, 2, 2, 8, 2, 4, 2, 5, 1, 2]

function mergeSort(array) {
  const length = array.length;
  if(length < 2) {
    return array;
  }

  const mid   = Math.floor(length / 2);
  const left  = array.slice(0, mid);
  const right = array.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  const leftLength = left.length;
  const rightLength = right.length;
  const leftIndex = 0;
  const rightIndex = 0;

  while (leftIndex < leftLength && rightIndex < rightLength) {
    if(left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex])
      rightIndex++;
    }

    return result
      .concat(left.slice(leftIndex), right.slice(rightIndex));
  }
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = array[i];
}

function quickSort(array, left, right) {
  if(left == null) {
    left = 0;
  }

  if(right == null) {
    right = array.length -1;
  }

  if(left < right) {
    pivotIndex = pivot(array, left, right);
    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);
  }

  return array;
}

function pivot(array, left, right) {
  let pivot = right;
  let j = left;
  let i = left - 1;

  while(j <= pivot) {
    if(array[j] < nums[pivot]) {
      i++;
      [array[i], array[j]] = [array[j], array[i]]
      j++;
    } else {
      j++;
    }
  }
  i++;
  swap(array, i, pivot);
  return i;
}

const nums = [5, 1, 1, 2, 0, 8, 0, 2, 13, 7];
console.log(quickSort(nums));