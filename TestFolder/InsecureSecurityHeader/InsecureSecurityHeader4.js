app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src *");
    next();
  });
  