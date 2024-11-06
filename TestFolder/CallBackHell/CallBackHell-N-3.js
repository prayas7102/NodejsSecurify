async.parallel([
    function(callback) {
        // Some async operation...
        callback(null, 'Operation 1');
    },
    function(callback) {
        // Some async operation...
        callback(null, 'Operation 2');
    },
    function(callback) {
        // Some async operation...
        callback(null, 'Operation 3');
    },
    function(callback) {
        // Some async operation...
        callback(null, 'Operation 4');
    },
    // More nested callbacks...
], function(err, results) {
    // Handle the final result...
});
