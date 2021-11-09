function throttle(func, timeFrame) {
    let lastTime = 0;
    return (...arg) => {
        const now = Date.now();
        if (now - lastTime >= timeFrame) {
            func.apply(this, arg);
            lastTime = now;
        }
    }
}

function log(msg) {
    console.log(msg);
}

const throttledLog = throttle(() => log('haha'), 300);

throttledLog();
throttledLog();
throttledLog();
