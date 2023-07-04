const mongoose = require('mongoose');
const emailModel = mongoose.Schema(
    {
        senderName: { type: String },
        recieverName: { type: String },
        body: { type: String },
        time: { type: Date },
    },
    {
        timestamps: true
    }
);

const Email = mongoose.model("Email", emailModel);
module.exports = Email;