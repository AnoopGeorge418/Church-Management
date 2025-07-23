import { useState,useEffect } from "react";
import { Sidebar, Menu, MenuItem,sidebarClasses,menuClasses } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/Announcement';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBox';
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearch';
import axios from "axios";
import Cookies from 'js-cookie';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleClick = () => {
    setSelected(title);
    navigate(to);
  };

  return (
    <MenuItem
    active={selected === title}
    className={selected === title ? "active" : ""}
    style={{
      color: selected === title ? "#6870fa" : colors.grey[100],
    }}
    onClick={handleClick}
    icon={icon}
  >
    <Typography>{title}</Typography>
  </MenuItem>
);
};

const SidebarFile = ({ isSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const[adminName,setAdminName] = useState('')
  const [logoutClicked, setLogoutClicked] = useState(false);
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
          setAdminName(userData.user.name);
        }
      } catch (error) {
        console.log('Token validation failed:', error);
      }
    };

    checkTokenValidity(); // Call the function here
  }, []);

  //logout
  const handleLogout = () => {
    setLogoutClicked(true);
    setTimeout(() => {
      // Perform the logout action here
      handelLogout();
    }, 300);
  };

  const handelLogout = () => {
    fetch(`http://localhost:5000/api/logout/admim`, {
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


  //logout
 
  return (
    <Box
      // sx={{
      //   "& .sidebarClasses-inner": {
      //     background: `${colors.primary[700]} !important`,
      //   },
      //   "& .pro-icon-wrapper": {
      //     backgroundColor: "transparent !important",
      //   },
      //   "& .pro-inner-item": {
      //     padding: "5px 35px 5px 20px !important",
      //   },
      //   "& .pro-inner-item:hover": {
      //     color: "#black !important",
      //   },
      //   "& .pro-menu-item.active": {
      //     color: "#6870fa !important",
      //   },
        
      // }}
    >
     
      <Sidebar collapsed={isCollapsed}
          rootStyles={{
          [`& .${sidebarClasses.container}`]: {
            background: `${colors.primary[400]} !important`,
          },
          [`& .${sidebarClasses.icon}`]: {
      backgroundColor: "transparent !important",
    },
    [`& .${sidebarClasses.icon} svg`]: {
      fill: "#fff", // Set the icon fill color to white (if required)
    },
          [`& .${sidebarClasses.menuItem}`]: {
            padding: "5px 35px 5px 20px !important",
            
          },
          [`& .${menuClasses.menuItem}::hover`]: {
            color: "#6870fa", // Hover color for the menu items
            backgroundColor: colors.grey[200], // Optional: Add a background color on hover
          },
          
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/Admin_profile.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 {adminName}
                </Typography>
                <Typography variant="h5" color={colors.blueAccent[500]}>
                  
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/contacts"
              icon={<PeopleOutlinedIcon />}
              selected={selected} 
              setSelected={setSelected}
            />
            <Item
              title="GenarateCertificate"
              to="/GenerateCertificate"
              icon={<SavedSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="AddFamily"
              to="/AddMembers"
              icon={<AddBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FamilySearchBar"
              to="FamilySearchBar"
              icon={<SavedSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="AddBaptisms"
              to="/Registries/baptismAdd"
              icon={<AddBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="BaptismSearch"
              to="/baptismSearch"
              icon={<SavedSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="AddEngagement"
              to="/Registries/engagementAdd"
              icon={<AddBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="EngagementSearch"
              to="/engagementSearch"
              icon={<SavedSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="AddMarriage"
              to="/addMarriage"
              icon={<AddBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="MarriageSearch"
              to="/marriageSearch"
              icon={<SavedSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="AddDeath"
              to="/Registries/addDeath"
              icon={<AddBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="DeathSearch"
              to="/deathSearch"
              icon={<SavedSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Annoncement"
              to="/Annoncement/Annoncements"
              icon={<AnnouncementOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="AnnouncementView"
              to="/Annoncement/AnnouncementListPage"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="ViewPrayerRequest"
              to="/PrayerRequestList"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            {/* <Item
              title="About"
              to="/AboutUs"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Create Accounts
            </Typography>
            <Item
              title="Signup"
              to="/Signup"
              icon={<PeopleOutlinedIcon />}
              selected={selected} 
              setSelected={setSelected}
            />
            {/* <Item
              title="Logout"
              to="/Signup"
              icon={<PeopleOutlinedIcon />}
              selected={selected} 
              setSelected={setSelected}
            /> */}
            <button
              className={`Homeprofile-settings-logoutbtn ${logoutClicked ? 'Homeprofile-settings-logoutbtn-fade' : ''}`}
              onClick={handleLogout}
              style={{
                backgroundColor: "red", 
                marginLeft: "1rem",
                width: '8rem', 
                margintop: '2rem',
                height: '2rem',
              }}
            >
               Log out <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarFile;
