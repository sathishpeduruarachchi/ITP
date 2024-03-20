import React, { useState } from "react";

function EmailPopup({ sendEmail, closePopup }) {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    sendEmail({ recipient, subject, message });
    closePopup();
  };

  return (
    <div className="email-popup">
      <h2>Create Email</h2>
      <label htmlFor="recipient">Recipient:</label>
      <input
        type="email"
        id="recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <label htmlFor="subject">Subject:</label>
      <input
        type="text"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
}

export default EmailPopup;
