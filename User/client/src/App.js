import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navebar from './NaveBar/Navebar';
import Register from './pages/Register_login/Register';
import Login from './pages/Register_login/Login';
import Verification from './components/verifycertificate'
import UploadImage from './pages/upLoding'
import Homeprofile from './pages/Homeprofile'
import OtpVerification from './pages/otpForm'
import Error403 from './pages/Error403';
import Error404 from './pages/Error404';
import ResetPassword from './pages/Register_login/ResetPassword';
import Loading from './pages/Loading';
import Certificaterequest from './pages/Certificaterequest';
import Resetotp from './pages/resetOtpform';
import NewPassword from './pages/newPassword';
import AnnouncementListPage from'./pages/AnnouncementListPage';
import Contact from './pages/Contact';
import Ministry from './pages/Ministry'
import Gallery from './pages/Gallery'
import Landing from './pages/Landing.js';
import Contact_us from './pages/Contact_us.js'
import Aboutus from './pages/Aboutus.js'
import PrayerRequest from './pages/prayerRequest'
import FamilySearchBar from './pages/familySearchBar';
import  CertificateDownlode from './pages/certificateDowlodePage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Navebar  />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/OtpVerification" element={<OtpVerification/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>} />
        <Route path="/resetOtp" element={<Resetotp/>} />
        <Route path="/newPassword" element={<NewPassword/>} />
        {isLoggedIn ? (
          <>
       
          {/* <Route path="/Announcement" element={<Ot/>} /> */}
            <Route path="/certificate" element={<Verification />} />
            <Route path="/about" element={<UploadImage />} />
            <Route path="/homeprofile" element={<Homeprofile />} />
            <Route path="/Announcement" element={<AnnouncementListPage/>} />
            <Route path="/Certificaterequest" element={<Certificaterequest/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/About_us" element={<Aboutus />} />
            <Route path="/Ministry" element={<Ministry />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/PrayerRequest" element={<PrayerRequest />} />
            <Route path="/FamilySearchBar" element={<FamilySearchBar />} />
            <Route path="/Aboutus" element={<Aboutus/>} />
            <Route path="/CertificateDownlode" element={<CertificateDownlode/>} />
             
           
          </>
        ) : (
          <Route path="*" element={<Error403/>} />
        )}
        <Route path="*" element={<Error404/>} />
      </Routes>
    </Router>
  );
}


export default App;