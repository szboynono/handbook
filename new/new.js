function myNew(Func, ...args) {
  const obj = {};
  obj.__proto__ = Func.prototype
  let result = Func.apply(obj, args)
  return result instanceof Object ? result : obj
}

function Person (name) {
  this.name = name
  return {
    name
  }
}

const tony = myNew(Person, 'Tony');

console.log(tony.name)