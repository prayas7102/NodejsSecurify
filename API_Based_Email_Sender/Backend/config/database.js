const mongoose = require('mongoose');
exports.databaseConnect = async() => {
    console.log(typeof(process.env.MONGO_URI))
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (error) {
        console.log(`Error: ${error.message}`);

    }
}