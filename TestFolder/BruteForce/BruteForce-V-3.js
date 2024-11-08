const loginAttempts = {};

function login(req, res) {
    const { username, password } = req.body;
    if (!loginAttempts[username]) loginAttempts[username] = 0;

    if (loginAttempts[username] >= 10) {
        res.status(429).send('Too many login attempts. Try again later.');
        return;
    }

    if (username === 'admin' && password === 'adminPass') {
        loginAttempts[username] = 0;
        res.send('Login successful');
    } else {
        loginAttempts[username]++;
        res.status(401).send('Invalid username or password');
    }
}