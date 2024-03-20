import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import { useParams } from "react-router-dom";
import RowRecordDetails from "./RowRecordDetails.js";
import { Link } from "react-router-dom";

const AddPatientDetails = () => {
  const { id } = useParams();
  const [record, setRecord] = useState({});
  const [result, setResult] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [ward, setWard] = useState(""); // Default ward value is "1"
  const [prescription, setPrescription] = useState("");
  const [drugs, setDrugs] = useState("");
  const [username, setUsername] = useState("");

  // Input validation states
  const [diagnosisError, setDiagnosisError] = useState("");
  const [wardError, setWardError] = useState("");
  const [prescriptionError, setPrescriptionError] = useState("");
  const [drugsError, setDrugsError] = useState("");
  const [doctorError, setDoctorError] = useState("");

  const [Doctors, setorgDoctor] = useState([]);

  const validateDoctor = (value) => {
    if (!value) {
      setDoctorError("Doctor selection is required");
    } else {
      setDoctorError("");
    }
  };

  const validateDiagnosis = (value) => {
    if (!value) {
      setDiagnosisError("Diagnosis is required");
    } else {
      setDiagnosisError("");
    }
  };

  const validateWard = (value) => {
    if (!value) {
      setWardError("Ward is required");
    } else {
      setWardError("");
    }
  };

  const validatePrescription = (value) => {
    if (!value) {
      setPrescriptionError("Prescription is required");
    } else {
      setPrescriptionError("");
    }
  };

  const validateDrugs = (value) => {
    if (!value) {
      setDrugsError("Drugs are required");
    } else {
      setDrugsError("");
    }
  };

  useEffect(() => {
    function getSupplier() {
      axios
        .get("http://localhost:8070/doctor/all")
        .then((res) => {
          const formattedSuppliers = res.data.map((doctor) => {
            return `${doctor.name}`;
          });
          setorgDoctor(formattedSuppliers);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getSupplier();
  }, []);

  const validateForm = () => {
    let isValid = true;
    setDiagnosisError("");
    setWardError("");
    setPrescriptionError("");
    setDrugsError("");
    setDoctorError("");

    if (diagnosis.trim() === "") {
      setDiagnosisError("Diagnosis is required");
      isValid = false;
    }

    if (ward.trim() === "") {
      setWardError("Ward is required");
      isValid = false;
    }

    if (prescription.trim() === "") {
      setPrescriptionError("Prescription is required");
      isValid = false;
    }

    if (drugs.trim() === "") {
      setDrugsError("Drugs are required");
      isValid = false;
    }

    if (doctor.trim() === "") {
      setDoctorError("Doctor selection is required");
      isValid = false;
    }

    return isValid;
  };

  const createRecordOnBackend = (newRecordData) => {
    axios
      .post(`http://localhost:8070/recordDetails/add`, newRecordData)
      .then((res) => {
        alert("Record Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const createReport = (e) => {
    e.preventDefault();
  
    if (validateForm()) {

      const currentDate = new Date().toLocaleDateString();

      const newRecord = {
        record: record, // Assuming `record` is a variable from your state
        doctor: doctor,
        diagnosis: diagnosis,
        ward: ward,
        prescription: prescription,
        drugs: drugs,
        date: currentDate,
      };

      localStorage.setItem('currentRecordDate', currentDate);
  
      createRecordOnBackend(newRecord);
  
      // After successfully creating the record, update the state with the newly created record
      setAllResults((prevResults) => (prevResults ? [...prevResults, newRecord] : [newRecord]));
  
      // Clear the form fields
      setDoctor("");
      setDiagnosis("");
      setWard(""); // Reset the ward to "1"
      setPrescription("");
      setDrugs("");
    }
  };
  
  const deleteRecord = (recordId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:8070/recordDetails/delete/${recordId}`)
        .then(() => {
          // After successfully deleting the record, update the state to remove the deleted record
          setAllResults((prevResults) => prevResults.filter((result) => result._id !== recordId));
          alert("Record Deleted");
        })
        .catch((error) => {
          console.log(error);
          console.log("Error deleting the record");
        });
    }
  };


  useEffect(() => {
    getPatient();
    getAllResults();
  }, []);

  const getPatient = async () => {
    axios
      .get(`http://localhost:8070/record/get/${id}`)
      .then((res) => {
        console.log(res.data.record);
        setRecord(res.data.record);
        setUsername(res.data.record.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  const getAllResults = async () => {
    axios
      .get(`http://localhost:8070/recordDetails/get/${id}`)
      .then((res) => {
        console.log("this is id: " + id);
        console.log(res.data);
        setAllResults(res.data.details); // Updated to set details from the response
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderDetails = () => {
    if (allResults.length === 0) {
      return (
        <tr>
          <td colSpan="6">No records available</td>
        </tr>
      );
    }

    const savedDate = localStorage.getItem('currentRecordDate');

    return allResults.map((result) => (
      <tr key={result._id}>
        <td>{result.doctor}</td>
        <td>{result.diagnosis}</td>
        <td>{result.ward}</td>
        <td>{result.prescription}</td>
        <td>{result.drugs}</td>
        <td>{savedDate}</td>
        <td>
        <button className="download-records-btn" type="button">
          <Link to={`/editPatientDetails/${id}`} style={{ color: 'white' }}>
            Update
          </Link>
        </button>

        <button className="delete-records-btn" onClick={() => deleteRecord(result._id)}>
          Delete
        </button>
      </td>
      </tr>
    ));
  };


  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
        <div className="nav-bar">
          <ul className="nav-list">
            <a href="/patientHome">
              <li className="nav-element">Home</li>
            </a>
            <a href="/myAppointments">
              <li className="nav-element">My Appointments</li>
            </a>
            <a href="/patientProfile">
              <li className="nav-element">Profile</li>
            </a>
            <a href="/records">
              <li className="nav-element active-element">My Records</li>
            </a>
          </ul>
        </div>

        <div className="content-container">
          <div className="add-patient-report-container">
            <h1 style={{ fontSize: '30px', fontWeight:"bold", color: 'blue' }}>Add New Record</h1>

            <form action="" onSubmit={createReport}>
              

              <h4 style={{ fontSize: '20px' }}>Patient Name : {record.name}</h4>
              <h4 style={{ fontSize: '20px' }}>Patient Gender : {record.gender}</h4>

              <br />
              <label style={{ fontSize: '20px', color:"black", fontweight: "bold" }}>Doctor Name</label>
              <br />
              <select
                className="patient-report-inputs"
                value={doctor}
                onChange={(e) => {
                  setDoctor(e.target.value);
                  validateDoctor(e.target.value);
                }}
                style={{ borderColor: doctorError ? 'red' : 'initial' , fontSize: '16px', color: 'black'}}
              >
                <option value="" disabled  >
                  Select a Doctor
                </option>
                {Doctors.map((supplier, index) => (
                  <option key={index} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
              <span style={{ color: 'red', fontSize: '14px' }} className="error">
                <br/>
                {doctorError}
              </span>
              <br /><br />

              <label style={{ fontSize: '20px', color:"black", fontweight: "bold" }}>Diagnosis</label>
              <br />
              <textarea
                className="patient-report-inputs"
                value={diagnosis}
                onChange={(e) => {
                  setDiagnosis(e.target.value);
                  validateDiagnosis(e.target.value);
                }}
                style={{ color: 'black', fontSize: '20px' }}
              ></textarea>
              <span style={{ color: 'red', fontSize: '14px' }} className="error">
                {diagnosisError}
              </span>
              <br /><br />

              <label style={{ fontSize: '20px', color:"black", fontweight: "bold" }}>Ward</label>
              <br />
              <select
                className="patient-report-inputs"
                value={ward}
                onChange={(e) => {
                  setWard(e.target.value);
                  validateWard(e.target.value);
                }}
                style={{ fontSize: '16px', color: 'black' }}
              >
                <option value="" disabled>
                  Select Ward
                </option>
                <option value="OPD">OPD</option>
                <option value="W1">W1</option>
                <option value="W2">W2</option>
                <option value="W3">W3</option>
                <option value="W4">W4</option>
              </select>
              <span style={{ color: 'red', fontSize: '14px' }} className="error">
                <br/>
                {wardError}
              </span>
              <br /><br />

              <label style={{ fontSize: '20px', color:"black", fontweight: "bold" }}>Prescription</label>
              <br />
              <input
                type="text"
                className="patient-report-inputs"
                value={prescription}
                onChange={(e) => {
                  setPrescription(e.target.value);
                  validatePrescription(e.target.value);
                }}
                style={{ color: 'black', fontSize: '20px' }}
              />
              <span style={{ color: 'red', fontSize: '14px' }} className="error">
                {prescriptionError}
              </span>
              <br /><br />

              <label style={{ fontSize: '20px', color:"black", fontweight: "bold" }}>Drugs</label>
              <br />
              <input
                type="text"
                className="patient-report-inputs"
                value={drugs}
                onChange={(e) => {
                  setDrugs(e.target.value);
                  validateDrugs(e.target.value);
                }}
                style={{ color: 'black', fontSize: '20px' }}
              />
              <span style={{ color: 'red', fontSize: '14px' }} className="error">
                <br/>
                {drugsError}
              </span>
              <br/>
              <button id="create-patient-report-btn" type="submit" style={{ fontSize: '16px' }}>
                Create Record
              </button>
            </form>

            <table className="tests-table">
        <thead>
          <tr className="th-tests">
            <th>Doctor</th>
            <th>Diagnosis</th>
            <th>Ward</th>
            <th>Prescription</th>
            <th>Drugs</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderDetails()}</tbody>
      </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatientDetails;