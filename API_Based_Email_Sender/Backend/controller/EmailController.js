const emailModel = require('../models/emailModel');
const nodemailer = require('nodemailer');
const nodeCron = require("node-cron");

const StringFilter = (str) => {
    const date = new Date(str).toLocaleDateString();
    const time = new Date(str).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
    let strArr = date.split("/");
    strArr = strArr.concat(time.split(":"));
    strArr[strArr.length - 1] = strArr[strArr.length - 1].replace(/\D/g, '');
    return strArr;
}

const SendEmail = async (req, res) => {

    const { msg, time } = req.body;
    const EMAIL = process.env.EMAIL;
    const [day, month, year, hour, minute] = StringFilter(Object(time));
    const recieverArr = ["prayas.prithvirajpratap7@gmail.com", "prayas7102@gmail.com", "prayas.stingkumar777@gmail.com", "sonu.patna0808@gmail.com", "samarmahato2505@gmail.com", "swajeetg768@gmail.com", "kumarmithu2021@gmail.com"];

    //     *    *    *    *    *    *
    //     ┬    ┬    ┬    ┬    ┬    ┬
    //     │    │    │    │    │    │
    //     │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    //     │    │    │    │    └───── month (1 - 12)
    //     │    │    │    └────────── day of month (1 - 31)
    //     │    │    └─────────────── hour (0 - 23)
    //     │    └──────────────────── minute (0 - 59)
    //     └───────────────────────── second (0 - 59, OPTIONAL)

    const dateString = String(`${minute} ${hour} ${day} ${month} *`)
    console.log(dateString)
    const job = nodeCron.schedule(dateString, function jobYouNeedToExecute() {

        let transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: true,
            auth: {
                user: EMAIL,
                pass: process.env.PASSWORD,
            },
            service: process.env.SMPT_SERVICE
        });

        let message = {
            from: EMAIL, // sender address
            to: recieverArr, // list of receivers
            subject: "From bulk email sender", // Subject line
            text: msg, // plain text body
            html: msg
        }

        transporter.sendMail(message)
            .then(async (info) => {

                for (let recv of recieverArr) {
                    const email = await emailModel.create({ senderName: EMAIL, recieverName: recv, body: msg, time });
                    await email.save();
                    // console.log(email)
                }

                return res.status(200)
                    .json({
                        msg: msg,
                        info: info.messageId,
                        preview: nodemailer.getTestMessageUrl(info)
                    });
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error })
            });
    },
        {
            scheduled: true,
            timezone: "Asia/Kolkata"
        }
    );
}

const GetEmail = async (req, res) => {
    const emailList = await emailModel.find({});
    if (emailList.length) {
        return res.status(200).json({
            success: false,
            "emailList": emailList
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: []
        });
    }
}

module.exports = { SendEmail, GetEmail };