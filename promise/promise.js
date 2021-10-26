const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  // state of the promise
  state = 'pending'
  // store success value
  value = undefined
  // store failing reason
  reason = undefined

  fulfilledCallbacks = [];
  rejectedCallbacks = [];

  constructor(executor) {
    const resolve = (value) => {
      this.state = FULFILLED;
      this.value = value
      this.fulfilledCallbacks.forEach(fn => fn())
    }

    const reject = (reason) => {
      this.state = REJECTED;
      this.reason = reason
      this.rejectedCallbacks.forEach(fn => fn())
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    this.fulfilledCallbacks.push(() => onFulfilled(this.value))
    this.rejectedCallbacks.push(() => onRejected(this.reason))
  }
}


const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  },1000);
}).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)