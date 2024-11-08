const MAX_ATTEMPTS = 5;
const loginAttempts = {};
const BACKOFF_FACTOR = 2;

function calculateCooldown(attempts) {
    return Math.pow(BACKOFF_FACTOR, attempts) * 1000;
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const attempts = loginAttempts[username] || 0;
    const cooldown = calculateCooldown(attempts);

    if (attempts >= MAX_ATTEMPTS) {
        return res.status(429).send(`Too many attempts. Try again after ${cooldown / 1000} seconds.`);
    }

    if (authenticateUser(username, password)) {
        loginAttempts[username] = 0; // Reset attempts on success
        res.send('Login successful');
    } else {
        loginAttempts[username] = attempts + 1;
        setTimeout(() => {
            loginAttempts[username]--;
        }, cooldown);
        res.status(401).send('Invalid credentials');
    }
});