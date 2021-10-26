# Promise

手撕Promise

## Promise解决了什么问题 ？
  - 嵌套调用
  - 处理多个异步请求并发

## Promise 基本特征
- 有 `pending`, `fulfilled` 或者 `rejected` 三个状态
- new一个promise的时候， 需要传递一个`executor`，立即执行
- promise的默认状态是`pending`
- promise有一个`value`保存成功的值， 可以是`undefined`, `thenable` 或者 `promise`
- promise 有一个`reason`保存失败状态的值；
- promise 只能从`pending`到`rejected`, 或者从`pending`到`fulfilled`，状态一旦确认，就不会再改变
- promise必须有一个`then`方法，`then` 接收两个参数，分别是 promise 成功的回调 `onFulfilled`, 和 promise 失败的回调 `onRejected`;
- 如果调用 `then` 时，promise 已经成功，则执行`onFulfilled`，参数是promise的`value`；
- 如果调用 `then` 时，promise 已经失败，那么执行`onRejected`, 参数是promise的`reason`
- 如果 `then` 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 `then` 的失败的回调`onRejected`

## then 的链式调用
- 当 `then` 函数中 `return` 了一个值，不管是什么值，我们都能在下一个 `then` 中获取到

## Final Promise 思路
- then 的参数 `onFulfilled` 和 `onRejected` 可以缺省，如果 `onFulfilled` 或者 `onRejected` 不是函数，将其忽略，且依旧可以在下面的 `then` 中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
- promise 可以 `then` 多次，每次执行完 `promise.then` 方法后返回的都是一个“新的promise"；「规范 Promise/A+ 2.2.7」
- 如果 `then` 的返回值 `x` 是一个普通值，那么就会把这个结果作为参数，传递给下一个 `then` 的成功的回调中；
- 如果 `then` 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 `then` 的失败的回调中；「规范 Promise/A+ 2.2.7.2」
- 如果 `then` 的返回值 `x` 是一个 promise ，那么会等这个 promise 执行完，promise 如果成功，就走下一个 `then` 的成功；如果失败，就走下一个 `then` 的失败；如果抛出异常，就走下一个 `then` 的失败；「规范 Promise/A+ 2.2.7.3、2.2.7.4」
- 如果 `then` 的返回值 `x` 和 `promise` 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个 `then` 的失败的回调中；「规范 Promise/A+ 2.3.1」
- 如果 `then` 的返回值 `x` 是一个 promise，且 `x` 同时调用 `resolve` 函数和 `reject` 函数，则第一次调用优先，其他所有调用被忽略；「规范 Promise/A+ 2.3.3.3.3」
