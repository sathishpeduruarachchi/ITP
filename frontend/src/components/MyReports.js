import React, { useEffect, useState } from "react";
import axios from "axios";
import RowPrescription from "./RowPrescription";
import RowReports from "./RowReports";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pid, setPid] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {
    // getUser() ;
    getPrescriptions();
  }, []);

  const getSearch = async () => {
    axios
      .get(`http://localhost:8070/report/patient/search/${pid}?query=${query}`)
      .then((res) => {
        console.log(res.data);
        setReports(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPrescriptions = async () => {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmail(res.data.patient.email);
        setPassword(res.data.patient.password);
        setPid(res.data.patient._id);
        console.log(res.data.patient._id);

        axios
          .get(
            `http://localhost:8070/report/patient/search/${res.data.patient._id}?query=${query}`
          )
          .then((res) => {
            console.log(res.data);
            setReports(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };
  return (
    <div>
      
    </div>
  );
};

export default MyReports;