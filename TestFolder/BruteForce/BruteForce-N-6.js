const bruteForceMiddleware = require('express-brute');
const store = new bruteForceMiddleware.MemoryStore();
const bruteForce = new bruteForceMiddleware(store, {
    freeRetries: 3,
    minWait: 5000, // 5 seconds
    maxWait: 60000, // 1 minute
    lifetime: 60 * 15 // 15 minutes
});

app.post('/login', bruteForce.prevent, (req, res) => {
    const { username, password } = req.body;

    if (authenticateUser(username, password)) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});