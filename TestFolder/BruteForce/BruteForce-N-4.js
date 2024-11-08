const MAX_ATTEMPTS = 3;
const LOCKOUT_PERIOD = 60000; // 1 minute in milliseconds
const loginAttempts = {};

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (loginAttempts[username].attempts >= MAX_ATTEMPTS && 
        Date.now() - loginAttempts[username].lastAttempt < LOCKOUT_PERIOD) {
        return res.status(429).send('Account temporarily locked due to multiple failed attempts.');
    }

    if (authenticateUser(username, password)) {
        loginAttempts[username] = { attempts: 0, lastAttempt: Date.now() };
        res.send('Login successful');
    } else {
        const attempts = loginAttempts[username].attempts || 0;
        loginAttempts[username] = { attempts: attempts + 1, lastAttempt: Date.now() };
        res.status(401).send('Invalid credentials');
    }
});