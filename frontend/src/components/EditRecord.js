import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";

const EditRecord = () => {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [bdate, setBdate] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [record, setRecord] = useState([]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    console.log(id);
    axios
      .get(`http://localhost:8070/record/get/${id}`)
      .then((res) => {
        console.log(res.data.record);
        setRecord(res.data.record);
        setName(res.data.record.name) ;
        setNic(res.data.record.nic) ;
        setBdate(res.data.record.bdate) ;
        setAge(res.data.record.age) ;
        setGender(res.data.record.gender) ;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateRecord = async (e) => {
    e.preventDefault();
    const updatedRecord = {
      name,
      nic,
      bdate,
      gender,
    };

    axios
      .put(`http://localhost:8070/record/update/${id}`, updatedRecord)
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
            <label htmlFor="">Name</label> <br />
            <input
              className="add-doctor-inputs"
              placeholder="name"
              type="text"
              name
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">NIC</label> <br />
            <input
              className="add-doctor-inputs"
              type="text"
              placeholder="nic"
              defaultValue={nic}
              onChange={(e) => {
                setNic(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Birthdate</label> <br />
            <input
              className="add-doctor-inputs"
              type="date"
              id="date"
              placeholder="MM/DD/YYYY"
              defaultValue={bdate}
              max={getCurrentDate()}
              onChange={(e) => {
                setBdate(e.target.value);
              }}
            />{" "}
            <br /> <br />
            <label htmlFor="">Gender</label> <br />
            <input
              className="add-doctor-inputs"
              type="text"
              placeholder="gender"
              defaultValue={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />{" "}
            <br /> <br />
            
           
            <button className="btn-makeApt" onClick={updateRecord}>Update and Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecord;