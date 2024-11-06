document.getElementById('btn1').addEventListener('click', function() {
    document.getElementById('btn2').addEventListener('click', function() {
        document.getElementById('btn3').addEventListener('click', function() {
            document.getElementById('btn4').addEventListener('click', function() {
                // More nested callbacks...
            });
        });
    });
});
