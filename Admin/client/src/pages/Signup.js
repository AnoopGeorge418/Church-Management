import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Css/register.css";
import Cookies from "js-cookie";
function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to be sent
    const userData = {
      name,
      email,
      password,
      confirmPassword,
      role, // Include the selected role value in the request
    };

    // Send the POST request to the server
    axios
      .post("http://localhost:5000/api/admimregister", userData)
      .then((response) => {
        // Handle the response from the server
        setSuccessMsg("Registration successful!");
        setErrorMsg("");

        // Perform any additional actions or navigate to a new page if needed
      })
      .catch((error) => {
        // Handle errors
        setSuccessMsg("");
        setErrorMsg("Registration failed. Please try again.");

        console.error(error);
      });
  };
  const [dataname, setdataname] = useState("");
  const [datarole, setdatrole] = useState("");
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAdmindata', {
          headers: {
            Authorization: `Bearer ${Cookies.get('admin_token')}`,
          },
        });
      

        if (response.status === 200) {
          const userData = response.data;
          setdataname(userData?.user.name);
          setdatrole(userData?.user.role); 
         
        }
      } catch (error) {
        console.log('Token validation failed:', error);
      }
    };

    checkTokenValidity(); // Call the function here
  }, []);

  return (
    <div className="SignIn_newSignup-Container">
      {datarole === "admin" ? (
        <div className="SignIn_newRegister-SignUp">
          <div className="SignIn_newRegister-Color1">
            <h1 className="SignIn_new_SignUp-heading">Create Account</h1>
          </div>
          <div className="SignIn_newRegister-Color2"></div>
          <div className="SignIn_newSignIn-Contents">
            <form onSubmit={handleSubmit}>
              <div className="SignIn_newRegister-inputs-container">
                <input
                  className="SignIn_newRegister-input"
                  type="text"
                  required
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="SignIn_newRegister-inputs-container">
                <input
                  className="SignIn_newRegister-input"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="SignIn_newRegister-inputs-container">
                <input
                  className="SignIn_newRegister-input"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="SignIn_newRegister-inputs-container">
                <input
                  className="SignIn_newRegister-input"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <div className="SignIn_newRegister-inputs-container">
                <select
                  className="SignIn_newRegister-input"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="">Select one</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div className="SignIn_signin-btn1">
                <button className="SignIn_newRegister-SignupBtn" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="SignIn_newRegister-Color3">
            {successMsg && <p className="SignIn_success-msg">{successMsg}</p>}
            {errorMsg && <p className="SignIn_error-msg">{errorMsg}</p>}
          </div>
        </div>
      ) : (
        // JSX content to be displayed when data is not "admin"
        <div>
          {/* Content for other cases */}
          <p>
            Hello,{" "}
            {dataname
              ? `${dataname} You Don't Have Right to Create Account!`
              : "You Don't Have Right to Create Account!"}
          </p>
        </div>
      )}
    </div>
  );
}

export default SignIn;
