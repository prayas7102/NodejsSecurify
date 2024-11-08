const loginAttempts = {};
const IP_ATTEMPT_LIMIT = 3;
const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const ip = req.ip;
    const key = `${username}-${ip}`;

    if (!loginAttempts[key]) loginAttempts[key] = { count: 0, timestamp: Date.now() };

    if (loginAttempts[key].count >= IP_ATTEMPT_LIMIT && 
        Date.now() - loginAttempts[key].timestamp < TIME_WINDOW) {
        return res.status(429).send('Too many attempts. Try again later.');
    }

    if (authenticateUser(username, password)) {
        loginAttempts[key] = { count: 0, timestamp: Date.now() }; // Reset on success
        res.send('Login successful');
    } else {
        loginAttempts[key].count++;
        loginAttempts[key].timestamp = Date.now();
        res.status(401).send('Invalid credentials');
    }
});