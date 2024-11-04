setTimeout(function() {
    console.log('Timer 1');
    setTimeout(function() {
        console.log('Timer 2');
        setTimeout(function() {
            console.log('Timer 3');
            // More nested callbacks...
        }, 1000);
    }, 1000);
}, 1000);
