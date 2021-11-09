const arr = ['a', 'b', 'a', 'c', 'b']

function dedup (arr) {
  return arr.filter((val, index) => arr.indexOf(val) === index);
}

console.log(dedup(arr));