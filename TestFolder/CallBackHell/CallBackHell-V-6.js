getData(function(data) {
    process1(data, function(result1) {
        process2(result1, function(result2) {
            process3(result2, function(result3) {
                // More nested callbacks...
            });
        });
    });
});
