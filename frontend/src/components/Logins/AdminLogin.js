import React, { useEffect, useState } from "react";
import axios from "axios";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");

    if (token != null && type == "admin") {
      window.location.href = "/laboratory";
    }
  }, []);

  function login(e) {
    e.preventDefault();

    const admin = {
      email,
      password,
    };

    axios
      .post("http://localhost:8070/admin/login", admin)
      .then((res) => {
        if (res.data.rst === "success") {
         
          console.log(res.data.data._id);
          console.log(res.data.tok);
          localStorage.setItem("type", "admin");
          localStorage.setItem("token", res.data.tok);
          alert("login successfull");
          //console.log("successfull") ;

          window.location = "/laboratory";
        } else if (res.data.rst === "incorrect password") {
          alert("incorrect password");
          console.log("unsuccessfull");
        } else if (res.data.rst === "invalid admin") {
          alert("invalid user");
          console.log("unsuccessfull");
        }
        //console.log(res)
        //alert("heyyy")
        //window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div id="login-whole">
      <center>
        <div id="login-container">
          <div id="login-form-container">
            <form action="" id="login-form" onSubmit={login}>
              <h1>Admin Login</h1> <br /> <br />
              <input
                className="input-fields"
                type="text"
                name=""
                id=""
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />{" "}
              <br /> <br />
              <input
                className="input-fields"
                type="password"
                name=""
                id=""
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />{" "}
              <br /> <br />
              <button id="login-button">Login</button> <br /> <br />
              <p>
                Don't have an account? <a href="/">Go Back</a>
              </p>
            </form>
          </div>
          <div id="login-message">
            <img
              className="login-image"
              src="/images/Hospital logo B.png"
              alt=""
            />
          </div>
        </div>
      </center>
    </div>
  );
};

export default AdminLogin;
