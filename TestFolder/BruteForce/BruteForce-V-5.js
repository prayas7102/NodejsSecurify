const requestLimits = {};

app.post('/login', (req, res) => {
    const ip = req.ip;
    if (!requestLimits[ip]) requestLimits[ip] = 0;

    if (requestLimits[ip] >= 150) {
        return res.status(429).send('Too many requests from this IP');
    }

    const { username, password } = req.body;
    if (username === 'user' && password === 'password123') {
        requestLimits[ip] = 0;
        res.send('Login successful');
    } else {
        requestLimits[ip]++;
        res.status(401).send('Invalid credentials');
    }
});