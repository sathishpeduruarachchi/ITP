import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";

const EditPatientDetails = () => {
    
  const { id } = useParams();
  const [doctor, setDoctor] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [ward, setWard] = useState(""); // Default ward value is "1"
  const [prescription, setPrescription] = useState("");
  const [drugs, setDrugs] = useState("");

  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    axios
      .get(`http://localhost:8070/recordDetails/getDetail/${id}`)
      .then((res) => {
        const recordData = res.data.detail;
        setDoctor(recordData.doctor);
        setDiagnosis(recordData.diagnosis);
        setWard(recordData.ward);
        setPrescription(recordData.prescription);
        setDrugs(recordData.drugs);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateRecord = async (e) => {
    e.preventDefault();
    const updatedRecord = {
      doctor,
      diagnosis,
      ward,
      prescription,
      drugs,
    };

    axios
      .put(`http://localhost:8070/recordDetails/update/${id}`, updatedRecord)
      .then((res) => {
        alert("Record Updated");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
        <div className="nav-bar">
          <ul className="nav-list">
            <a href="/patientHome ">
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
          <div className="add-record-container">
            <h1>Update Records</h1>
            <label htmlFor="">Doctor</label> <br />
            <input
              className="add-doctor-inputs"
              placeholder="doctor"
              type="text"
              doctor
              defaultValue={doctor}
              onChange={(e) => {
                setDoctor(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Diagnosis</label> <br />
            <input
              className="add-doctor-inputs"
              type="text"
              placeholder="diagnosis"
              defaultValue={diagnosis}
              onChange={(e) => {
                setDiagnosis(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Ward</label> <br />
            <input
              className="add-doctor-inputs"
              type="text"
              placeholder="ward"
              defaultValue={ward}
              onChange={(e) => {
                setWard(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Prescription</label> <br />
            <input
              className="add-doctor-inputs"
              type="text"
              placeholder="prescription"
              defaultValue={prescription}
              onChange={(e) => {
                setPrescription(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Drugs</label> <br />
            <input
              className="add-doctor-inputs"
              type="text"
              placeholder="drugs"
              defaultValue={drugs}
              onChange={(e) => {
                setDrugs(e.target.value);
              }}
            />{" "}
            <br /> <br />

            <button className="btn-makeApt" onClick={updateRecord}>
              Update and Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPatientDetails;