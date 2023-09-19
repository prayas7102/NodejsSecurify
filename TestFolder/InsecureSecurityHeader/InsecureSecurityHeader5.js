app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'origin');
    next();
  });
  