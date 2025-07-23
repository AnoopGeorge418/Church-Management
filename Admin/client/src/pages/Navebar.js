import React, { useState, useEffect } from 'react';
import '../Css/Navebar.css';
// import logo from '../Images/logo.png';
// import profil from "../Images/user_Img.png";
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navebar=()=> {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [hasReloaded, setHasReloaded] = useState(false);


  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav_logo">
          <NavLink to="/">
            {/* <img src={logo} alt="logo" className="logo" /> */}
          </NavLink>
        </div>

        <ul className="nav-links">
        {loggedIn ? (
          <div className="user-info">
            {profileImage ? (
              <div className="profile-image">
                <img src={profileImage} alt="profile" className="profile-image rounded" />
              </div>
            ) : (
              <div className="profile-image">
                {/* <img src={profil} alt="default" className="profile-image rounded" /> */}
              </div>
            )}
            {/* <span>{username}</span>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleUpload}>Upload</button> */}
          </div>
        ) : (
          <div>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Signup">
              Register
            </NavLink>
          </li>
          </div>
        )}

          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/">
              Generate Certificates
            </NavLink>
            <ul className="subnav_certificate">
           <div className='navbar_flowcolor'>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/baptismSearch">
              Baptism Certificate
            </NavLink></div>
            <div className='navbar_flowcolor'>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Marriagecertificate">
              Marriage Certificate
            </NavLink>
            </div>
            <div className='navbar_flowcolor'>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Marriagecertificate">
              Death Certificate
            </NavLink>
            </div>
            </ul>
          </li>

          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/PrayerRequestList">
              Prayer Request
            </NavLink>
          </li>
          <li>
          <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/">
              Announcement
            </NavLink>
            <ul className="subnav-Announce">
            <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Annoncement/Annoncements">
                  Publish Announcement
                </NavLink>
                </div>
                <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Annoncement/AnnouncementListPage">
                  Edit/View Announcement
                </NavLink>
                </div>
            </ul>
          </li>
          <li>
          <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/">
              Registries
            </NavLink>
            <ul className="subnav">
            <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Registries/AddMember">
                  Family  Registries
                </NavLink>
               </div>
               <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Registries/baptismAdd">
                  Baptism Registries
                </NavLink></div>
                <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Registries/engagementAdd">
                  Engagement Registries
                </NavLink>
                </div>
                <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/addMarriage">
                  Marriage Registries
                </NavLink>
                </div>
                <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/Registries/addDeath">
                  Death Registries
                </NavLink>
                </div>
            </ul>
           
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/">
              Overview
            </NavLink>
            <ul className="subnav_overview">
            <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/FamilySearchBar">
                  Family Search_Bar
                </NavLink>
            </div>
            <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/baptismSearch">
                  Baptisam Search_Bar
                </NavLink>
            </div>
            <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/EngagementSearch">
                Engagement Search_Bar
                </NavLink>
                </div>
                <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/DeathSearch">
                Death Search_Bar
                </NavLink>
            </div>
            <div className='navbar_flowcolor'>
                <NavLink className={({ isActive }) => (isActive ? 'on' : 'textcolor')} to="/AboutUs">
                  About
                </NavLink>
            </div>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navebar;