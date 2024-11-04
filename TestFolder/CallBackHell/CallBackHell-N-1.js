http.createServer(function(req, res) {
    fs.readFile('index.html', 'utf8', function(err, data) {
        if (err) {
            res.writeHead(500);
            res.end('Error occurred!');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});
