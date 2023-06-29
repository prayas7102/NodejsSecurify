import React from "react";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import DateTimePicker from 'react-datetime-picker';
import Toast from "../Toast";
import "./CkEditor.css";

const CkeEditor = () => {

  const [body, setbody] = useState("");
  const [toast, setToast] = useState(null);
  const [value, onChange] = useState(null);
  // console.log(String(value));

  const submitHandler = async () => {
    try {
      if (body && value) {
        setToast(null);
        const { data } = await axios.post(
          "https://bulk-email-sender-nodejs.onrender.com/api/user/send-email",
          { msg: body, time: value },
        );
        onChange(null);
      }
      else {
        console.log('enter both date and messgae');
        setToast('enter both date and messgae');
      }
    }
    catch (err) {
      console.log(err);
      setToast(err);
    }
  }

  return (
    <div className="home">
      <div className="ck-content pen-green">
        <h2>Generic Notification System</h2>
        <CKEditor
          editor={ClassicEditor}
          data="<p></p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            setbody(data)
          }}
          onBlur={(event, editor) => {
            console.log("Blur.")
          }}
          onFocus={(event, editor) => {
            console.log("Focus.")
          }}
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "color",
                "red",
                editor.editing.view.document.getRoot()
              );
              writer.setStyle(
                "height",
                "200px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
        />
      </div>

      <div className="react-datepicker">
        <DateTimePicker onChange={onChange} value={value} locale="sv-sv"/>
      </div>

      <button className="submitButton" variant="warning" type="submit" onClick={submitHandler}>
        Submit
      </button>

      <div className="Toast">{toast && <Toast messg={toast} />}</div>

      <strong className="imp">REFRESH PAGE AFTER SENDING MAIL TO SEE THIER DETAILS</strong>

    </div>
  );
};

export default CkeEditor;