const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('circular'));
  }

  let called = false;

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      const then = x.then;
      if (typeof then === 'function') {
        try {
          then.call(x, y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          }, e => {
            if (called) return;
            called = true;
            reject(e);
          })
        } catch(e) {
          if (called) return;
          called = true;
          reject(e)
        }
      } else {
        resolve(x)
      }
  } else {
    resolve(x)
  }
}

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value;
        this.onResolveCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    const onRejectedFn = typeof onRejected === 'function' ? onRejected : err => { throw Error(err) }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilledFn(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      }
      
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejectedFn(this.reason);
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.state === PENDING) {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilledFn(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })

        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejectedFn(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('chenggong');
  }, 3000)
}).then().then().then(data=>{
  console.log(data);
},err=>{
  console.log('err',err);
})
