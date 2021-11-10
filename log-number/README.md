```js
setTimeout(function() {
    console.log('setTimeout1');    //8
    new Promise(function(resolve) {
        console.log('promise0');    //9
        resolve()
    }).then(function() {
        console.log('settimeout promise resolveed');    //10
    })
});

setTimeout(function() {
    console.log('setTimeout2');    //11
});

const P = new Promise(function(resolve) {
    console.log('promise'); //1
    for (var i = 0; i < 10000; i++) {
        if(i === 10) {
            console.log('for');    //2
        }
        if (i === 9999) {
            resolve('resolve');
        }
    }
}).then(function(val) {
    console.log('resolve1');    //5
}).then(function(val) {
    console.log('resolve2');    //7
});

new Promise(function(resolve) {
    console.log('promise2');    //3
    resolve('resolve');
}).then(function(val) {
    console.log('resolve3');    //6
})

console.log('console');    //4
```

从上到下， `setTimeout()` 留到后面， 有`promise`的话`then`一层一层来， 先所有then的第一层