function debounce(func, timeout = 300) {
  let timer = undefined;
  return (...arg) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, arg);
    }, timeout);
  };
}

function log() {
  console.log("yo");
}

const debouncedLog = debounce(() => log());

debouncedLog()
debouncedLog()
debouncedLog()
