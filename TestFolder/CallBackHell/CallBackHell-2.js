$.ajax({
    url: 'data1.json',
    success: function (data1) {
        $.ajax({
            url: 'data2.json',
            success: function (data2) {
                $.ajax({
                    url: 'data3.json',
                    success: function (data2) {
                        $.ajax({
                            url: 'data4.json',
                            success: function (data2) {
                                // More nested callbacks...
                            }
                        })
                    }
                })
            },
            error: function (err) {
                console.error(err);
            }
        });
    },
    error: function (err) {
        console.error(err);
    }
});
