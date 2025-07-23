// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
// import Navebar from './pages/Navebar'
// import AddMember from './pages/addFamily';
// import OtpVerification from './pages/otpForm'
// import Annoncement from './pages/announcementEntry';
// import AnnouncementListPage from './pages/announcementListPage';
// import EditAnnouncementPage from './pages/announcementEditPage';
// import FamilySearchBar from './pages/familySearchBar';
// import FamilyView from './pages/familyView';
// import EditPage from './pages/familyEdit';
// import BaptismAdd from './pages/addBaptism'
// import EngagementAdd from './pages/addEngagement'
// import PrayerRequestList from './pages/prayerRequestList';
// import AddChildPage from './pages/addChildPage';
// import BaptismSearch from './pages/baptismSearch'
// import BaptismDetails from './pages/viewBaptism';
// import AddMarriage from './pages/addMarriage'
// import AddDeath from './pages/addDeath';
// import DeathDetails from './pages/viewDeath';
// import DeathSearch from './pages/deathSearch';
// import EditDeath from './pages/editDeath';
// import DeathCertificate from './pages/deathCertificate';
// import EditBaptism from './pages/editBaptism'
// import BaptismCertificate from './pages/baptismCertificate'
// import EngagementDetails from './pages/viewEngagement';
// import EngagementSearch from './pages/engagementSearch'
// import EditEngagement from './pages/editEngagement'
// import AdminAboutUs from './pages/adminAboutUs';
// import NewRegister from './pages/newRegister';
// import Signup from './pages/Signup';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import  ResetPassword from './pages/resetpassword';
// import NewPassword from './pages/newPassword';
// import Resetotp from './pages/resetOtp';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const[IsLoggedInOtpCookie, setIsLoggedInOtpCookie] = useState(false);

//   useEffect(() => {
//     const checkTokenValidity = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/check-token', {
//           headers: {
//             Authorization: `Bearer ${Cookies.get('admin_token')}`,
//           },
//         });

//         if (response.status === 200) {
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.log('Token validation failed:', error);
//       }
//     };

//     if (Cookies.get('admin_token')) {
//       checkTokenValidity();
//     }
//     if(Cookies.get('AdminloggedIn')) {
//       setIsLoggedInOtpCookie(true);
//     }
//   }, []);
// useEffect(()=>{
//   if(Cookies.get('AdminloggedIn')) {
//     setIsLoggedInOtpCookie(true);
//   }
// },[])

//   return (
//     <Router>
//       <Navebar/>
//       <Routes>
//         {isLoggedIn && IsLoggedInOtpCookie ? (
//           <>
//             <Route path="/" element={<AddMember />} />
//             {/* <Route path="/Signup" element={<Signup />} /> */}
//             {/* <Route path="/Registries/AddMember" element={<AddMember />} /> */}
//             {/* <Route path="/Register" element={<Register />} />
//             <Route path="/Login" element={<Login />} /> */}
           
//             <Route path="/Annoncement/Annoncements" element={<Annoncement />} />
//             <Route path="/Annoncement/AnnouncementListPage" element={<AnnouncementListPage />} />
//             <Route path="/Annoncement/edit/:id" element={<EditAnnouncementPage />} />
//             <Route path="/FamilySearchBar" element={<FamilySearchBar />} />
//             <Route path="/FamilySearchBar/:id" element={<FamilyView />} />
//             <Route path="/edit/:name/:familyId/:childId" element={<EditPage />} />
//             <Route path="/edit/:name/:familyId" element={<EditPage />} />
//             <Route path="/add-child/:id" element={<AddChildPage />} />
//             {/* baptism */}
//             <Route path="/Registries/baptismAdd" element={<BaptismAdd />} />
//             <Route path="/baptismSearch" element={<BaptismSearch />} />
//             <Route path="/baptism/:id" element={<BaptismDetails />} />
//             <Route path="/baptism/:id/edit" element={<EditBaptism />} />
//             <Route path="/baptism/:id/certificate" element={<BaptismCertificate />} />
//             <Route path="/Registries/engagementAdd" element={<EngagementAdd />} />
//             <Route path="/engagementSearch" element={<EngagementSearch/>} />
//             <Route path="/engagement/:id" element={<EngagementDetails/>} />
//             <Route path="/engagement/:id/edit" element={<EditEngagement/>} />
//             {/* <Route path="/Gallery" element={<Gallery/>} /> */}
//             <Route path="/PrayerRequestList" element={<PrayerRequestList />} />
//             <Route path="/addMarriage" element={<AddMarriage />} />


//         <Route path="/Registries/addDeath" element={<AddDeath/>}/>
//         <Route path="/death/:id" element={<DeathDetails/>} />
//         <Route path="/death/:id/edit" element={<EditDeath/>} />
//         <Route path="/death/:id/certificate" element={<DeathCertificate/>}/>
//         <Route path="/deathSearch" element={<DeathSearch/>} />




//             <Route path="/AboutUs" element={<AdminAboutUs />} />
//             <Route path="/Signup" element={<Signup />} />
//           </>
//         ) : ( 
//           <>
//             <Route path="/" element={<NewRegister />} />
//              <Route path="/ResetPassword" element={<ResetPassword/>} />
//             <Route path="/NewPassword" element={<NewPassword/>} />
//             <Route path="/Resetotp" element={<Resetotp/>} />
//             <Route path="/OtpVerification" element={<OtpVerification />} />
//             {/* <Route path="/Signup" element={<Signup />} /> */}
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navebar from './pages/Navebar';
import AddMember from './pages/addFamily';
import OtpVerification from './pages/otpForm';
import Annoncement from './pages/announcementEntry';
import AnnouncementListPage from './pages/announcementListPage';
import EditAnnouncementPage from './pages/announcementEditPage';
import FamilySearchBar from './pages/familySearchBar';
import FamilyView from './pages/familyView';
import EditPage from './pages/familyEdit';
import BaptismAdd from './pages/addBaptism';
import EngagementAdd from './pages/addEngagement';
import PrayerRequestList from './pages/prayerRequestList';
import AddChildPage from './pages/addChildPage';
import BaptismSearch from './pages/baptismSearch';
import BaptismDetails from './pages/viewBaptism';
import AddMarriage from './pages/addMarriage';
import AddDeath from './pages/addDeath';
import DeathDetails from './pages/viewDeath';
import DeathSearch from './pages/deathSearch';
import EditDeath from './pages/editDeath';
import DeathCertificate from './pages/deathCertificate';
import EditBaptism from './pages/editBaptism';
import BaptismCertificate from './pages/baptismCertificate';
import EngagementDetails from './pages/viewEngagement';
import EngagementSearch from './pages/engagementSearch'
import EditEngagement from './pages/editEngagement'
import AdminAboutUs from './pages/adminAboutUs';
import NewRegister from './pages/newRegister';
import Signup from './pages/Signup';
import axios from 'axios';
import Cookies from 'js-cookie';
import  ResetPassword from './pages/resetpassword';
import NewPassword from './pages/newPassword';
import Resetotp from './pages/resetOtp';
import Profile from './pages/Profile';
import Topbar from './Dashboard/scenes/global/Topbar';
import Sidebar from './Dashboard/scenes/global/Sidebar';
import Dashboard from './Dashboard/scenes/dashboard';
import Team from './Dashboard/scenes/team';
import Invoices from './Dashboard/scenes/invoices';
import Contacts from './Dashboard/scenes/contacts';
import Bar from './Dashboard/scenes/bar';
import Form from './Dashboard/scenes/form';
import Line from './Dashboard/scenes/line';
import Pie from './Dashboard/scenes/pie';
import FAQ from './Dashboard/scenes/faq';
import Geography from './Dashboard/scenes/geography';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Calendar from './Dashboard/scenes/calendar/calendar';
import MarriageCertificate from './pages/marriageCertificate';
import MarriageSearch from './pages/marriageSearch';
import MarriageDetails from './pages/viewMarriage';
import EditMarriage from './pages/editMarriage';
import GenerateCertificate from './pages/generateCertificate';
import BaptismCertificatePage from './pages/baptismCertificates';
import DeathCertificatePage from './pages/deathCertificateData';
import MarriageDataCertificate from './pages/marriageDataCertificate';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[IsLoggedInOtpCookie, setIsLoggedInOtpCookie] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/check-token', {
          headers: {
            Authorization: `Bearer ${Cookies.get('admin_token')}`,
          },
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Token validation failed:', error);
      }
    };

    if (Cookies.get('admin_token')) {
      checkTokenValidity();
    }
    if(Cookies.get('AdminloggedIn')) {
      setIsLoggedInOtpCookie(true);
    }
  }, []);
useEffect(()=>{
  if(Cookies.get('AdminloggedIn')) {
    setIsLoggedInOtpCookie(true);
  }
},[])

  return (
  <Router>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className={`content ${isSidebar ? "sidebar-open" : "sidebar-closed"}`}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            {/* {isLoggedIn && IsLoggedInOtpCookie ?  ( */}
              <>
              <Route path="/" element={isLoggedIn && IsLoggedInOtpCookie ?<Dashboard/>:<NewRegister/>} />
              <Route path="/Dashbord" element={<Dashboard/>}/>
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />

              <Route path="/AddMembers" element={<AddMember />} />
              <Route path="/Annoncement/Annoncements" element={<Annoncement />} />
              <Route path="/Annoncement/AnnouncementListPage" element={<AnnouncementListPage />} />
              <Route path="/Annoncement/edit/:id" element={<EditAnnouncementPage />} />
              <Route path="/FamilySearchBar" element={<FamilySearchBar />} />
              <Route path="/FamilySearchBar/:id" element={<FamilyView />} />
              <Route path="/edit/:name/:familyId/:childId" element={<EditPage />} />
              <Route path="/edit/:name/:familyId" element={<EditPage />} />
              <Route path="/add-child/:id" element={<AddChildPage />} />
              {/* baptism */}
              <Route path="/Registries/baptismAdd" element={<BaptismAdd />} />
              <Route path="/baptismSearch" element={<BaptismSearch />} />
              <Route path="/baptism/:id" element={<BaptismDetails />} />
              <Route path="/baptism/:id/edit" element={<EditBaptism />} />
              <Route path="/baptism/:id/certificate" element={<BaptismCertificate />} />
              <Route path="/Registries/engagementAdd" element={<EngagementAdd />} />
              <Route path="/engagementSearch" element={<EngagementSearch/>} />
              <Route path="/engagement/:id" element={<EngagementDetails/>} />
              <Route path="/engagement/:id/edit" element={<EditEngagement/>} />
              {/* <Route path="/Gallery" element={<Gallery/>} /> */}
              <Route path="/PrayerRequestList" element={<PrayerRequestList />} />
              <Route path="/addMarriage" element={<AddMarriage />} />
              <Route path="/Registries/addDeath" element={<AddDeath/>}/>
              <Route path="/death/:id" element={<DeathDetails/>} />
              <Route path="/death/:id/edit" element={<EditDeath/>} />
              <Route path="/death/:id/certificate" element={<DeathCertificate/>}/>
              <Route path="/deathSearch" element={<DeathSearch/>} />
              <Route path="/AboutUs" element={<AdminAboutUs />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Profile" element={<Profile/>} />
              <Route path="/marriageSearch" element={<MarriageSearch/>} />
              <Route path="/marriage/:id" element={<MarriageDetails/>} />
              <Route path="/marriage/:id/edit" element={<EditMarriage/>} />
              <Route path="/marriage/:id/certificate" element={<MarriageCertificate/>} />
              <Route path="/GenerateCertificate" element={<GenerateCertificate/>} />
              <Route path="/baptism/:id/certificates" element={<BaptismCertificatePage/>} />
 <Route path="/DeathCertificatePage/:id/certificates" element={<DeathCertificatePage/>} />   
 <Route path="/MarriageDataCertificate/:id/certificates" element={<MarriageDataCertificate/>} /> 


              </>
                {/* ) : ( */}
                <>
                  <Route path="/" element={<NewRegister />} />
                  <Route path="/ResetPassword" element={<ResetPassword/>} />
                  <Route path="/NewPassword" element={<NewPassword/>} />
                  <Route path="/Resetotp" element={<Resetotp/>} />
                  <Route path="/OtpVerification" element={<OtpVerification />} />
                  <Route path="/Signup" element={<Signup />} />
                </>
                {/* )} */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  </Router>
  );
}

export default App;