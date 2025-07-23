import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Css/Register_Login.css";
import register from "../../Img/intro.png";



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

const Login = () => {


  const [emailorPhoneNumber,setemailorPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const history=useNavigate();


  const RegisterButtonhandler =()=>{
    history("/Register")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailorPhoneNumber === "") {
      setErrorMessage("Please enter the email");
      return;
    } else if (password === "") {
      setErrorMessage("Please enter a password");
      return;
    } 
    try {
      axios.defaults.withCredentials=true;
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        emailorPhoneNumber,
        password,

      });
    
      if (response.status === 200) {
        toast.success(`User logged in successfully`, { autoClose: 10000 });
        // Redirect to otp page
        // history(`/OtpVerification?emailorPhoneNumber=${emailorPhoneNumber}`);
        history('/Landing');
        
        return;
      } 
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Invalid email or password");
          return;
        } else if (error.response.status === 404) {
          setErrorMessage("User not found");
          return;
        } else {
          setErrorMessage("Internal server error");
          return;
        }
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
              <h2 className="title">Sign In</h2>


              <div className="input-field">
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} className="faf_icon" />
                </label>
                <input
                  type="text"
                  id="emailorPhoneNumber"
                  placeholder="Enter Email or Phone Number"
                  value={emailorPhoneNumber}
                  onChange={(e) => setemailorPhoneNumber(e.target.value)}
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

              <p style={{ color: "red" }}>{ErrorMessage}</p>
              <button className="btn solid" type="submit">
              Sign In
              </button>
              <p  class="social-text" >Forgot Username/Password?</p>
              <a  class="social-text" href="/ResetPassword">Click Me</a>
              
              <ToastContainer toastStyle={customToastStyle} />
            </form>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Join our community today and discover endless possibilities!
              Create your account now and become a part of the ever-growing
              network of like-minded individuals.
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={RegisterButtonhandler}>
             Sign up
            </button>

          </div>
          <img src={register}className="image" alt="" />
        </div>

      </div>

    </>
  );
};

export default Login ;