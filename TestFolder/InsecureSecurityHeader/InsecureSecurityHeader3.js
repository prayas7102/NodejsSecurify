app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '0');
    next();
  });
  