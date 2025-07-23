import { React, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import AvatarEditor from 'react-avatar-editor';
import profil from "../Img/user_Img.png";
// import Camera from '../Img/camera.png'
import '../Css/Homeprofile.css'
import axios from 'axios';
import Loading from './Loading';

function Homeprofile() {
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [responceData, setresponceData] = useState("");
  const editorRef = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [hasReloaded, setHasReloaded] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const[loadingProfile,setloadingProfile]=useState(false);
  const [familydata, setfamilyData] = useState('');

  useEffect(() => {
    const token = Cookies.get('loggedIn');
    const accessToken = Cookies.get('token');
    
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
        setLoading(false); // Set loading state to false after data is loaded
      } catch (error) {
        setProfileImage(profil);
        setLoggedIn(true);
        setLoading(false); // Set loading state to false if there's an error
      }
    };

    if (token && accessToken) {
      fetchProfilePicture();
    } else {
      setLoggedIn(false);
      setProfileImage(profil);
      setLoading(false); // Set loading state to false if there's no token or access token
    }
  }, [setLoggedIn, setProfileImage]);

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

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile-data`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        });
        setresponceData(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
      setLoading(false); // Set loading state to false after data is loaded
    };
    getProfileData();
  }, []);

  //profile email and name api ends

  // profile uplode api starts
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setShowEditor(true);
  };

  const handleUpload = async () => {
    if (!image) {
      return;
    }

    setloadingProfile(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('profilePicture', image);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // window.location.reload();
        setSuccessMessage(data.message);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setError('Image upload failed');
    } finally {
      setloadingProfile(false);
    }
  };

   const handleSave = () => {
    const canvas = editorRef.current.getImage();
    canvas.toBlob((blob) => {
      const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
      setImage(file);
      setShowEditor(false);
    }, 'image/jpeg', 1);
    
  };
  // profile uplode ends

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

// family database retrieves

// family database retrieves
useEffect(() => {
  const fetchDatafamily = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ADMIN_API_URL}/api/families/token`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        // Process the data
        setfamilyData(data)
        console.log(data)
        setChecked(data.active)
      } else {
        // Handle error response
        <p>Your Family Details Not Found In Database</p>
      }
      if(response.status===404){
        <p>Your Family Details Not Found In Database</p>
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  fetchDatafamily();
}, []);


// family database retrieves endpoints

// family database retrieves endpoints


const [checked, setChecked] = useState(null);

const handleToggle = async () => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_ADMIN_API_URL}/api/families/togglebutton`,
      { active: !checked },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );

    if (response.status === 200) {
      // Update the checked state
      setChecked(!checked);
    } else {
      // Handle error response
      console.error('Toggle request failed');
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Toggle request error:', error);
  }
};


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
   
    <div className='Homeprofile-container'>

      <div className='Homeprofile-background_color'>
      </div>
      <div className='Homeprofile-contents'>

        <h3 className='Homeprofile-name'>
          Profile
        </h3>

        <p className='Homeprofile-paragraph'>
          Update your photo and personal details.
        </p>
        {/* profile */}
        <div className='Homeprofile-main_image' >
          {profileImage ? (
            <div >
              <img src={profileImage} alt="profile" style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '50%' }} />
            </div>
          ) : (
            <div className="profile-image">
              <img src={profil} alt="default" style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '50%' }} />
            </div>
          )}
        </div>
        {/* end */}
        <input className='Homeprofile-file' type="file" accept="image/*" onChange={handleFileChange} alt="Profile picture" />

        {error && <div className='Homeprofile-error' style={{ color: 'red' }}>{error}</div>}

        {successMessage && <div className='Homeprofile-success' style={{ color: 'green' }}>{successMessage}</div>}

        {/* <button className='Homeprofile-Cancelbtn'>
          Cancel
        </button>*/}

        {/* <button className='Homeprofile-Savebtn'>
          Save
        </button>  */}

        <label className='Homeprofile-label1'>
          Username
        </label>

        <label className='Homeprofile-label_of_1' >
        {/* {responceData.name} */}
        </label>

        <hr className='Homeprofile-horizontal_line1'></hr>

        <label className='Homeprofile-label2'>
          Email_id
        </label>

        <label className='Homeprofile-label_of_2' >
         {responceData.email}
        </label>

        <hr className='Homeprofile-horizontal_line2'></hr>

        <label className='Homeprofile-label3'>
          Phone_no
        </label>

        <label className='Homeprofile-label_of_3' >
        {responceData.phone}
        </label>

        <hr className='Homeprofile-horizontal_line3'></hr>

        <label className='Homeprofile-label4'>
          Your photo
        </label>

        <p className='Homeprofile-paragraph2'>
          This will be displayed on your profile.
        </p>

        <AvatarEditor className='Homeprofile-crop_box'
          ref={editorRef}
          image={image}
          width={130}
          height={130}
          border={40}
          borderRadius={100}
          color={[255, 255, 255, 0.6]}
          scale={1}
          rotate={0}
        />

        {showEditor && (
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', alignItems: 'center', }}>
            <button className='Homeprofile-btn-save' onClick={handleSave}>Save</button>
          </div>
        )}

        <button className='Homeprofile-Updatebtn' onClick={handleUpload} disabled={!image || loadingProfile}>
          {loadingProfile ? 'Uploading...' : 'Upload'}
        </button>

        {/* <button className='Homeprofile-Deletebtn'>
          Delete
        </button> */}

        <hr className='Homeprofile-horizontal_line4'></hr>

        {/* <h3 className='Homeprofile-updation'>
            Updation
         </h3> */}
 

        <label className='Homeprofile-email_update'>
         <h3 className='Father-heading'>Father Details</h3>
          {familydata ? (
  <div>
     <label className='fam-father'>Name</label>
     <p className='Father-details'>{familydata.father.name}</p>
     <label className='fam-father'>Baptism Name</label>
     <p className='Father-details'>{familydata.father.baptism_name}</p>
     <label className='fam-father'>D.O.B</label>
     <p className='Father-details'>{familydata.father.dob}</p>
     <label className='fam-father'>Age</label>
     <p className='Father-details'>{familydata.father.age}</p>
     <label className='fam-father'>Ph.no</label>
     <p className='Father-details'>{familydata.father.phoneNumber}</p>
     <label className='fam-father'>Email</label>
     <p className='Father-details'>{familydata.father.email}</p>
     <label className='fam-father'>Situation</label>
     <p className='Father-details'>{familydata.father.situation}</p>
  </div>
 ) : (
  <p className='Father-details'>Father Details not found</p>
)} 

<label className='mother-details'>
 <h3 className='Mother-heading'>Mother Details</h3>
          {familydata && familydata.father ? (
  <div>
     <label className='fam-mother'>Name</label>
     <p className='Mother-details'>{familydata.mother.name}</p>
     <label className='fam-mother'>Baptism Name</label>
     <p className='Mother-details'>{familydata.mother.baptism_name}</p>
     <label className='fam-mother'>D.O.B</label>
     <p className='Mother-details'>{familydata.mother.dob}</p>
     <label className='fam-mother'>Age</label>
     <p className='Mother-details'>{familydata.mother.age}</p>
     <label className='fam-mother'>Ph.no</label>
     <p className='Mother-details'>{familydata.mother.phoneNumber}</p>
     <label className='fam-mother'>Email</label>
     <p className='Mother-details'>{familydata.mother.email}</p>
     <label className='fam-mother'>Situation</label>
     <p className='Mother-details'>{familydata.mother.situation}</p>
  </div>
 ) : (
  <p className='Father-details'>Mother Deatils not found</p>
)} 
</label>
<label className='childfam-details'>
  <h3 className='DetailsofRegistry'>Child Details</h3>
  {familydata && familydata.children && familydata.children.length > 0 ? (
    familydata.children.map((child, index) => (
      <div key={index}>
        <h3>{`${index + 1} Child`}</h3> {/* Generate the appropriate heading */}
        <label className='fam-child'>Name</label>
        <p className='Child-details'>{child.name}</p>
        <label className='fam-child'>Baptism Name</label>
        <p className='Child-details'>{child.baptism_name}</p>
        {child.gender && (
          <>
            <label className='fam-child'>Gender</label>
            <p className='Child-details'>{child.gender}</p>
          </>
        )}
        {child.dob && (
          <>
            <label className='fam-child'>D.O.B</label>
            <p className='Child-details'>{child.dob}</p>
          </>
        )}
        {child.age && (
          <>
            <label className='fam-child'>Age</label>
            <p className='Child-details'>{child.age}</p>
          </>
        )}
        {child.phoneNumber && (
          <>
            <label className='fam-child'>Phone Number</label>
            <p className='Child-details'>{child.phoneNumber}</p>
          </>
        )}
        {child.email && (
          <>
            <label className='fam-child'>Email</label>
            <p className='Child-details'>{child.email}</p>
          </>
        )}
        {child.status && (
          <>
            <label className='fam-child'>Status</label>
            <p className='Child-details'>{child.status}</p>
          </>
        )}
      </div>
    ))
  ) : (
    <p className='Father-details'>Child details not found</p>
  )}
</label>

<label className='wifefam-details'>
  <h3 className='DetailsofRegistry'>Wife Details</h3>
  {familydata && familydata.children && familydata.children.length > 0 ? (
    <div>
      {familydata.children.map((child, index) => (
        <div key={index}>
          {child.wife ? (
            <>
              <h3>{`${index + 1} Child`}</h3>
              <label className='fam-wife'>Name</label>
              <p className='Wife-details'>{child.wife.name}</p>
              <label className='fam-wife'>Baptism Name</label>
              <p className='Wife-details'>{child.wife.baptism_name}</p>
              {child.wife.dob && (
                <>
                  <label className='fam-wife'>D.O.B</label>
                  <p className='Wife-details'>{child.wife.dob}</p>
                </>
              )}
              {child.wife.age && (
                <>
                  <label className='fam-wife'>Age</label>
                  <p className='Wife-details'>{child.wife.age}</p>
                </>
              )}
              {child.wife.phoneNumber && (
                <>
                  <label className='fam-wife'>Ph.no</label>
                  <p className='Wife-details'>{child.wife.phoneNumber}</p>
                </>
              )}
              {child.wife.email && (
                <>
                  <label className='fam-wife'>Email</label>
                  <p className='Wife-details'>{child.wife.email}</p>
                </>
              )}
              {child.wife.situation && (
                <>
                  <label className='fam-wife'>Situation</label>
                  <p className='Wife-details'>{child.wife.situation}</p>
                </>
              )}
            </>
          ) : (
            <p className='wifeeer-detailsr-details'>Wife Details not found</p>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className='Father-details'>Wife Details not found</p>
  )}
</label>


</label>
      </div>

      <div className='Homeprofile-settings'>

        <h2 className='Homeprofile-name2'>
          Settings
        </h2>

        <label className='Homeprofile-settings-labelname1'>
          My Profile
        </label>

        <button
      className={`Homeprofile-settings-logoutbtn ${logoutClicked ? 'Homeprofile-settings-logoutbtn-fade' : ''}`}
      onClick={handleLogout}
    >
      Log out <FontAwesomeIcon icon={faSignOutAlt} />
    </button>

    <div className={`toggle-button ${checked ? 'checked' : ''}`} onClick={handleToggle}>
      <div className="slider" />
    </div>

    <div className="toggle-notes">
    {checked ? (
      <p className="toggle-note">
        Turn this Off to Secure your Family details.
      </p>
    ) : (
      <p className="toggle-note">
        Turn this on to Publicly display your Family details.
      </p>
    )}
  </div>

      </div>
     
    </div>
      )}
     </>
  )
}

export default Homeprofile


