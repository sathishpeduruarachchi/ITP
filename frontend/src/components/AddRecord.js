// AddRecord.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import RowRecords from "./RowRecords";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AddRecord = () => {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [bdate, setBdate] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pid, setPid] = useState("");
  const [records, setRecords] = useState([]); // State to store records
  const [searchText, setSearchText] = useState("");
  const [nameError, setNameError] = useState("");
  const [nicError, setNicError] = useState("");
  const [bdateError, setBdateError] = useState("");
  const [genderError, setGenderError] = useState("");

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    getUser();
    getRecords();
  }, []);

  const getRecords = async () => {
    axios
      .get(`http://localhost:8070/record/`)
      .then((res) => {
        setRecords(res.data); // Update the records state
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function getUser() {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPid(res.data.patient._id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  const validateName = (value) => {
    if (!value) {
      setNameError("Name is required");
    } else if (!/^[a-zA-Z\s]*$/.test(value)) {
      setNameError("Name should not contain numbers.");
    } else {
      setNameError("");
    }
  };

  const validateNIC = (value) => {
    if (!value) {
      setNicError("NIC is required");
    } else if (value.length !== 12 || !/^(?:\d{12}|\d{9}[0-9xX])$/.test(value)) {
      setNicError("NIC should have exactly 12 characters.");
    } else {
      setNicError("");
    }
  };

  const validateBdate = (value) => {
    if (!value) {
      setBdateError("Birth Date is required");
    } else {
      setBdateError("");
    }
  };

  const validateGender = (value) => {
    if (!value) {
      setGenderError("Gender is required");
    } else {
      setGenderError("");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleNICChange = (e) => {
    const value = e.target.value;
    setNic(value);
    validateNIC(value);
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    validateGender(value);
  };

  const addRecord = async (e) => {
    e.preventDefault();
    if (!name || !nic || !bdate || !gender) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (nameError || nicError || bdateError || genderError) {
      alert("Please correct the input errors.");
      return;
    }

    const newRecord = {
      name,
      nic,
      bdate,
      age,
      gender,
      pid,
    };

    axios
      .post(`http://localhost:8070/record/add`, newRecord)
      .then((res) => {
        alert("Record Created");
        // Clear the form inputs
        setName("");
        setNic("");
        setBdate(null);
        setAge("");
        setGender("");

        // Update the state to trigger a re-render
        getRecords();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const filterRecords = () => {
    const filteredRecords = records.filter((record) => {
      const recordText = `${record.name} ${record.nic} ${record.bdate} ${record.gender}`;
      const searchTextLower = searchText.toLowerCase();
      return recordText.toLowerCase().includes(searchTextLower);
    });

    return filteredRecords;
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    const pdfColumns = ['Patient Name', 'NIC', 'Birth Date', 'Age', 'Gender', 'Date'];
    const pdfData = filterRecords().map((record) => {
      const birthdate = new Date(record.bdate);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthdate.getFullYear();
      const formattedDate = new Date(record.date).toLocaleDateString();

      return [record.name, record.nic, record.bdate, age, record.gender, formattedDate];
    });

    doc.autoTable({
      head: [pdfColumns],
      body: pdfData,
    });

    doc.text('Patient Records Report', 10, 10);

    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 10, doc.autoTable.previous.finalY + 10);

    doc.save('patient_records_report.pdf');
  };

  return (
    <div className="add-record-container">
      <h1>Add Patient</h1>
      <label htmlFor="">Patient Name</label> <br />
      <form onSubmit={addRecord}>
        <input
          className="add-doctor-inputs"
          placeholder="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />{" "}
        <br />
        {nameError && <span style={{ color: "red" }}>{nameError}</span>}
        <br /> <br />
        <label htmlFor="">NIC Number</label> <br />
        <input
          className="add-doctor-inputs"
          type="text"
          placeholder="nic"
          value={nic}
          onChange={handleNICChange}
          required
        />{" "}
        <br />
        {nicError && <span style={{ color: "red" }}>{nicError}</span>}
        <br /> <br />
        <label htmlFor="">Birth Date</label> <br />
        <input
          type="date"
          id="date"
          placeholder="MM/DD/YYYY"
          className="add-doctor-inputs"
          selected={bdate}
          onChange={(e) => {
            setBdate(e.target.value);
          }}
          max={getCurrentDate()}
          required
        />
        {bdateError && <span style={{ color: "red" }}>{bdateError}</span>}
        <br /> <br />
        <label htmlFor="">Gender</label> <br />
        <select
          className="add-doctor-inputs"
          value={gender}
          onChange={handleGenderChange}
          required
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {genderError && <span style={{ color: "red" }}>{genderError}</span>}
        <br /> <br />
        <button className="btn-makeApt" type="submit">
          Add Patient
        </button>
      </form>

      <h1>My Records</h1>

      <div className="search-bar" style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search....."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: "7px",
            fontSize: "16px",
            border: "2px solid blue",
            borderRadius: "4px",
            width: "25%",
          }}
        />
        <button
          className="btn-generate-report"
          onClick={handleGenerateReport}
          style={{
            padding: "7px 10px",
            fontSize: "16px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginLeft: "50%",
            cursor: "pointer",
          }}
        >
          Generate Report
        </button>
      </div>

      <table className="tests-table">
        <tr className="th-tests">
          <th>Patient Name</th>
          <th>NIC</th>
          <th>Birth Date</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>

        <tbody>
          {filterRecords().map((record) => (
            <RowRecords
              item={record}
              key={record._id}
              updateRecords={setRecords} // Pass the function to update records
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddRecord;