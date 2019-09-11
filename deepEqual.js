function doesntHaveKey (object, key) {
  return !Object.keys(object).filter(k => k === key).length;
}

function arraysEqual (arr1, arr2) {
  const comparisons = [];
  for (let i = 0; i < arr1.length; i++) {
    if (typeof arr1[i] === 'object' && arr1[i] !== null) {
      comparisons.push(deepEqual(arr1[i], arr2[i]));
    } else {
      comparisons.push(arr1[i] === arr2[i])
    }
  }
  return comparisons.every(comparison => comparison);
}

function deepEqual (o1, o2) {
  if (arguments.length < 2) throw TypeError('deepEqual requires 2 arguments');
  if (!o1 || !o2) return o1 === o2;

  const comparisons = [];
  for (key in o1) {
    if (doesntHaveKey(o2, key)) {
      return false;
    } else if (Array.isArray(o1[key])) {
      comparisons.push(arraysEqual(o1[key], o2[key]))
    } else if (typeof o1[key] === 'object'
        && o1[key] !== null && o2[key] !== null) {
      comparisons.push(deepEqual(o1[key], o2[key]));
    } else {
      comparisons.push(o1[key] === o2[key])
    }
  }
  return comparisons.every(comparison => comparison);
}

module.exports = deepEqual;