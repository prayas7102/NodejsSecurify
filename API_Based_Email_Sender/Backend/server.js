const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors());

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({
        path: 'Backend/.env'
    });
}

const { databaseConnect } = require('./config/database');
databaseConnect();

app.use(express.json());
const port = process.env.PORT || 5000;

const EmailRouter = require('./routes/EmailRouter');
app.use('/api/user/', EmailRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});