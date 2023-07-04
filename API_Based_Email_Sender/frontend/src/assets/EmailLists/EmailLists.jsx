import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./EmailLists.css";

const EmailLists = () => {
    const [emailFinalList, setemailFinalList] = useState([]);
    const modifyString = (str) => {
        const NoHTMLStr = str.replace(/(<([^>]+)>)/ig, '');
        const NoPACEStr = NoHTMLStr.replace("/&nbsp;/ig", "")
        const FinalStr = NoPACEStr.slice(0, 30).concat("...");
        return FinalStr;
    }
    useEffect(() => {
        async function getList() {
            const emailList = await axios.get("https://bulk-email-sender-nodejs.onrender.com/api/user/get-email");
            setemailFinalList(emailList.data.emailList);
        }
        getList();
    }, [])
    console.log(emailFinalList.length)
    return (
        <div className='EmailLists'>
            <div className='heading'>
                <strong>SENDER </strong>
                <strong>RECIVER</strong>
                <strong>MESSAGE</strong>
                <strong>DATE</strong>
            </div>
            {
                (emailFinalList.length > 0) && (emailFinalList.map((val, ind) => {
                    return (<div key={ind} className='SubEmailLists'>
                        <div className='sender'>{val.senderName.replace("@gmail.com", "")}</div>
                        <div className='reciver'>{val.recieverName.replace("@gmail.com", "")}</div>
                        <div className='body'>{modifyString(val.body)}</div>
                        <div className='time'>{val.time.slice(0, 10)}</div>
                    </div>)
                }))
            }
        </div>
    )
}

export default EmailLists