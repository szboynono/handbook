const arr = [1, 2, [3, 4, [5, 6]]];

function flatDeep(arr, d) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
}

console.log(flatDeep(arr, Infinity));
