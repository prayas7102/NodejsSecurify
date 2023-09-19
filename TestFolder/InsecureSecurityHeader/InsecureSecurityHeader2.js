app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'ALLOW-FROM https://example.com/');
    next();
  });
  