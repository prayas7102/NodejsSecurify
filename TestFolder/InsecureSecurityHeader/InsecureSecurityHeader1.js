app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nope');
    next();
  });
  