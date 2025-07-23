import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../Css/Register_login.css";
// import logo from "../Images/logo.png";
import {
  faUser,
  faLock,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const customToastStyle = {
  fontSize: "16px",
  padding: "16px",
  borderRadius: "8px",
  width: "200px",
  color: "#fff",
  backgroundColor: "#333",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease-in-out",
};

const Register = () => {

  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const history=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setErrorMessage("Please enter the name");
      return;
    } else if(phone===""){
      setErrorMessage("Please enter the Lastname");
      return;
    }else if (email === "") {
      setErrorMessage("Please enter the email");
      return;
    } else if (password === "") {
      setErrorMessage("Please enter a password");
      return;
    } else if (!password.match(/^(?=.*[A-Z])/)) {
      setErrorMessage("Password must contain at least one uppercase letter");
      return;
    }
    else if (!password.match(/^(?=.*[a-z])/)) {
      setErrorMessage("Password must contain at least one lowercase letter");
      return;
    }
    else if (!password.match(/^(?=.*\d)/)) {
      setErrorMessage("Password must contain at least one number");
      return;
    }
    else if (!password.match(/^(?=.*[@$!%*#?&])/)) {
      setErrorMessage("Password must contain at least one special character");
      return;
    }
    else if (!password.match(/^(?=.{8,}$)/)) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }else if (confirmPassword === "") {
      setErrorMessage("Please confirm a password");
      return;
      
    } else if (password !== confirmPassword) {
      setErrorMessage("Password mismatch");
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8000/register", {
          name,
          phone,
          email,
          password,
        });

        if (response.data === "User created successfully") {
          toast.success("User created successfully", { autoClose: 10000 });
          setTimeout(() => {
            history("/Login")
          }, 1000); // redirect to login page
        } else if (response.data === "User already exists with this email or phone number") {
          toast.error("User already exists with this email or phone number", { autoClose: 10000 });
        } else if (response.data === "Error creating user") {
          toast.error("404 error found", { autoClose: 10000 });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    //form handling.....
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmit} className="sign-in-form">
              <h2 className="title">Let's get started! Sign up now</h2>

              <div className="input-field">
                <label htmlFor="name">
                  <FontAwesomeIcon icon={faUser} className="faf_icon" />
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="lastname">
                  <FontAwesomeIcon icon={faUser} className="faf_icon" />
                </label>
                <input
  type="text"
  id="phoneNumber"
  placeholder="XXX-XXX-XXXX"
  value={phone}
  onChange={(e) => {setphone(e.target.value);
  }}
/>

              </div>
              <div className="input-field">
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} className="faf_icon" />
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} className="faf_icon" />
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="password-icon"
              />
              <div className="input-field">
                <label htmlFor="confirmPassword">
                  <FontAwesomeIcon icon={faLock} className="faf_icon" />
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="confirm-Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="password-icon"
              />
              <p style={{ color: "red" }}>{ErrorMessage}</p>
              <button className="btn solid" type="submit">
                Register
              </button>
              {/* <a  class="social-text">Forgot Username/Password?</a>
               */}

              <ToastContainer toastStyle={customToastStyle} />
            </form>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Log in now!</h3>
            <p>
              Welcome back to our thriving community! Log in to explore all the
              exciting opportunities and connect with like-minded individuals.
            </p>
            <button className="btn transparent" id="sign-up-btn">

              <Link className="Link_btn" to="/Login"> Sign in</Link>
            </button>
          </div>
          {/* <img src={logo}className="image" alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default Register;