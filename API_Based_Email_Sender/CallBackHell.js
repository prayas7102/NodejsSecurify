// Function 1
function asyncOperation1(callback) {
    setTimeout(function () {
        console.log("Async Operation 1");
        callback();
    }, 1000);
}

// Function 2
function asyncOperation2(callback) {
    setTimeout(function () {
        console.log("Async Operation 2");
        callback();
    }, 1000);
}

// Function 3
function asyncOperation3(callback) {
    setTimeout(function () {
        console.log("Async Operation 3");
        callback();
    }, 1000);
}

// Function 4
function asyncOperation4(callback) {
    setTimeout(function () {
        console.log("Async Operation 4");
        callback();
    }, 1000);
}

// Execute the functions with nested callbacks
asyncOperation1(function () {
    asyncOperation2(function () {
        asyncOperation3(function () {
            asyncOperation4(function () {
                console.log("All operations completed");
            });
        });
    });
});
