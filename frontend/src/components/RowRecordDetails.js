import React from "react";
import jsPDF from "jspdf";
import axios from "axios";

const RowRecordDetails = ({ item }) => {
  const img = new Image();
  const logo = new Image();
  const date = new Date();

  logo.src = "/images/Hospital-logo-W.png";

  const deleteRecord = async () => {
    axios
      .delete(`http://localhost:8070/record/delete/${item._id}`)
      .then((res) => {
        alert("Record Deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function downloadRecord() {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 5;

    const text = `\n\nDate: ${new Date(item.date).toString()} \n\n\nTitle: ${
      item.title
    }\nReason: ${item.reason}\n\nPrescriptions: ${
      item.prescriptions
    } \nReports: ${item.reports} \nAppointments: ${
      item.appointments
    } \nTests: ${item.tests}`;
    const splitText = doc.splitTextToSize(
      text,
      doc.internal.pageSize.width - margin * 2
    );
    doc.text(splitText, 10, 60);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const canvas1 = document.createElement("canvas");
    canvas1.width = logo.width;
    canvas1.height = logo.height;
    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
    const dataURL1 = canvas1.toDataURL("image/png");

    doc.addImage(
      dataURL1,
      "PNG",
      5,
      5,
      pdfWidth / 4,
      (pdfWidth / 4) * (logo.height / logo.width)
    );

    doc.text(
      "Ceylon Health \nTel: 0771231231 \nAddress No: No:11, Kandy road, Malabe",
      pdfWidth / 4 + 15,
      20
    );

    doc.save(`${item._id}.pdf`);
  }

  return (
    <tr>
      <td>{item.doctor}</td>
      <td>{item.diagnosis}</td>
      <td>{item.ward}</td>
      <td>{item.prescription}</td>
      <td>{item.drugs}</td>
      <td>{new Date(item.date).toLocaleDateString()}</td>
      <td>
        <button className="download-records-btn" onClick={downloadRecord}>
          Download
        </button>
        <button className="delete-records-btn" onClick={deleteRecord}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default RowRecordDetails;
