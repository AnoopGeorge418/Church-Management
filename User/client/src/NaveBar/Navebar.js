import React, { useState, useEffect } from 'react';
import '../Css/Navebar.css';
import logo from '../Img/logo.png';
import profil from "../Img/user_Img.png";
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navebar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [hasReloaded, setHasReloaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  useEffect(() => {
    const token = Cookies.get('loggedIn');
    const accessToken = Cookies.get('token');
    console.log('Access Token:', accessToken);

 
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile-picture`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          responseType: 'arraybuffer'
        });
        if (response.status === 200) {
          const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(imageBlob);
          setProfileImage(imageUrl);
          setLoggedIn(true);
        } else {
          setLoggedIn(true);
          setProfileImage(profil);
        }
      
      } catch (error) {
        setProfileImage(profil);
        setLoggedIn(true);
       
      }
    };
      
    if (token && accessToken) {
      fetchProfilePicture();
    } else {
      setLoggedIn(false);
      setProfileImage(profil);
    }
  }, [setLoggedIn, setProfileImage, navigate]);

  useEffect(() => {
    if (loggedIn && !hasReloaded) {
      setHasReloaded(true);
      const timeoutId = setTimeout(() => {
        window.location.reload();
      }, 1);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [loggedIn, hasReloaded]);
  

  const handleLogin = () => {
    navigate('/login');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

 //handel logout
 const handleLogout = () => {
  setLogoutClicked(true);
  setTimeout(() => {
    // Perform the logout action here
    handelLogout();
  }, 300);
};

const handelLogout = () => {
  fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('Error occurred during logout:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error occurred during logout:', error);
    });
};
//logout ends


  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav_logo">
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
        </div>

        <ul className="nav-links">
        
        {loggedIn ? (
            <div className="user-info">
              <div
                className="profile-image"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img src={profileImage || profil} alt="profile" className="profile-image rounded" />
                {isHovered && (
                  <div className="subnavbar">

                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')}to="/homeprofile">Profile</NavLink>          
               <button
                 className={`navebar-settings-logoutbtn ${logoutClicked ? 'navebar-settings-logoutbtn-fade' : ''}`}
                 onClick={handleLogout}
               >
                 Log out <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
                </div>
                )}
              </div>
            </div>
          ) : (
          <div>
            <button className="nav_button" onClick={handleLogin}>
              Login
            </button>
            
          </div>
        )}

          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/certificate">
              Download Certificate
            </NavLink>
            <ul className="certificate-subnav">
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Certificaterequest">
                  Request certificate
                </NavLink>

            </ul>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Announcement">
              Announcement
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/FamilySearchBar">
              FamilySearchBar
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/prayerRequest">
              Prayer Request
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/">
              Home
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );

          }
export default Navebar;
