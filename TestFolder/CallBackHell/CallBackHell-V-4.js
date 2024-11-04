app.post('/upload', function(req, res) {
    uploadFile(req, function(err, success) {
        if (err) {
            res.status(500).send('Upload failed!');
        } else {
            saveToDatabase(success, function(err, result) {
                if (err) {
                    res.status(500).send('Database error!');
                } else {
                    res.status(200).send('Upload successful!');
                }
            });
        }
    });
});
