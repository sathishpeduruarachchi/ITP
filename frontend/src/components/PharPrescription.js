import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/prescription.css';
import jsPDF from 'jspdf';

function PharPrescription() {
  const logo = new Image();
  logo.src = '/images/Hospital-logo-W.png';

  const [prescriptions, setPrescriptions] = useState([]);
  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    // Fetch prescription data from the backend
    axios
      .get('http://localhost:8070/prescription/')
      .then((response) => {
        setPrescriptions(response.data);
        fetchPatientData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching prescription data', error);
      });
  }, []);

  const fetchPatientData = (prescriptions) => {
    const uniquePatientIds = [...new Set(prescriptions.map((prescription) => prescription.patient))];

    const patientPromises = uniquePatientIds.map((patientId) => {
      // Fetch patient data for each patient ID
      return axios
        .get(`http://localhost:8070/patient/get/${patientId}`)
        .then((response) => {
          const patient = response.data.patient;
          return { [patientId]: patient };
        })
        .catch((error) => {
          console.error(`Error fetching patient data for ID ${patientId}`, error);
          return { [patientId]: { patient: 'N/A', guardianNIC: 'N/A' } };
        });
    });

    Promise.all(patientPromises).then((patientDataArray) => {
      const patientDataDict = {};

      patientDataArray.forEach((dataObj) => {
        const [patientId, patient] = Object.entries(dataObj)[0];
        patientDataDict[patientId] = patient;
      });

      console.log('Patient Data Dictionary:', patientDataDict);
      setPatientData(patientDataDict);
    });
  };

  // mark prescription as read
  const markAsRead = (prescriptionId) => {
    axios
      .put(`http://localhost:8070/prescription/markAsRead/${prescriptionId}`)
      .then(() => {
        // Mark the prescription as read in the UI
        setPrescriptions((prevPrescriptions) => {
          return prevPrescriptions.map((prescription) => {
            if (prescription._id === prescriptionId) {
              return { ...prescription, isRead: true };
            }
            return prescription;
          });
        });
      })
      .catch((error) => {
        console.error('Error marking prescription as read', error);
      });
  };

  function downloadPrescription(item) {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 5;

    const text = `\n\n
    Patient Name: ${patientData[item.patient]?.firstName || 'N/A'} ${patientData[item.patient]?.lastName || 'N/A'}\n
    Guardian NIC: ${patientData[item.patient]?.gaurdianNIC || 'N/A'}\n
    Date: ${new Date(item.date).toString()}\n
    Medications: ${item.text}`;

    const splitText = doc.splitTextToSize(text, doc.internal.pageSize.width - margin * 2);
    doc.text(splitText, 10, 60);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const canvas1 = document.createElement('canvas');
    canvas1.width = logo.width;
    canvas1.height = logo.height;
    const ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
    const dataURL1 = canvas1.toDataURL('image/png');

    doc.addImage(
      dataURL1,
      'PNG',
      5,
      5,
      pdfWidth / 4,
      (pdfWidth / 4) * (logo.height / logo.width)
    );

    doc.text(
      'Ceylon Health \nTel: 0771231231 \nAddress No: No:11,Kandy road,Malabe',
      pdfWidth / 4 + 15,
      20
    );

    doc.save(`${item._id}.pdf`);
  }

  return (
    <div>
      <h1>Prescriptions</h1>
      <div className="card-container">
        {prescriptions.map((prescription) => (
          <div key={prescription._id} className="card">
            <p>Patient Name: {patientData[prescription.patient]?.firstName || 'N/A'} {patientData[prescription.patient]?.lastName || 'N/A'}</p>
            <p>Guardian NIC: {patientData[prescription.patient]?.gaurdianNIC || 'N/A'}</p>
            <p>Date: {prescription.date}</p>
            <p>Medications: {prescription.text}</p>
            {!prescription.isRead && (
              <button onClick={() => markAsRead(prescription._id)}>Mark as Read</button>
            )}
            <button onClick={() => downloadPrescription(prescription)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PharPrescription;