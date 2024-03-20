import React from "react";
import jsPDF from "jspdf";
import axios from "axios";

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }

  return age;
};

const RowRecords = ({ item, updateRecords }) => {
  const img = new Image();
  const logo = new Image();
  const date = new Date();

  logo.src = "/images/Hospital-logo-W.png";

  const deleteRecord = async () => {
    axios
      .delete(`http://localhost:8070/record/delete/${item._id}`)
      .then((res) => {
        alert("Record Deleted");
        // Call the function to refresh the records after a successful deletion
        updateRecords((prevRecords) => prevRecords.filter(record => record._id !== item._id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  function downloadRecord() {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 5;

    const text = `\n\nDate :${new Date(item.date).toString()} \n\n\n Title :${
      item.title
    }\n Reason :${item.reason}\n\n Prescriptions : ${
      item.prescriptions
    } \n Reports : ${item.reports} \n Appointments : ${
      item.appointments
    } \n Tests :${item.tests}`;
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
      "Ceyloan Health \nTel: 0771231231 \nAddress No: No:11,Kandy road,Malabe",
      pdfWidth / 4 + 15,
      20
    );

    doc.save(`${item._id}.pdf`);
  }

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.nic}</td>
      <td>{new Date(item.bdate).toLocaleDateString()}</td>
      <td>{calculateAge(item.bdate)}</td> 
      <td>{item.gender}</td>
      <td>{new Date(item.date).toLocaleDateString()}</td>
      <td>
        <button className="download-records-btn" onClick={downloadRecord}>
          Download
        </button>
        <button className="delete-records-btn" onClick={deleteRecord}>
          Delete
        </button>
        <a href={"editRecord/" + item._id}>
          <button className="edit-records-btn">Update</button>
        </a>
        <a href={"addPatientDetails/" + item._id}>
          <button className="edit-records-btn">Add Record</button>
        </a>
      </td>
    </tr>
  );
};

export default RowRecords;