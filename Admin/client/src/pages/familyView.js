import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../Css/familyView.css";
import printLogo from '../Images/Annoncement.jpg'

const PersonPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/searchFamily?q=${id}`
        );
        setSearchResult(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!searchResult) {
    return <div className="no-results">No results found.</div>;
  }
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="person-page">
    <div className="logo">
        <img src={printLogo} alt="Logo" />
      </div>
      {searchResult.map((details) => (
        <div key={details._id} className="form-group-container">
          <h3 className="family-details">Family details</h3>
          <p className="house-name">House Name: {details.houseName}</p>
          <p className="address">Address: {details.address}</p>
          <p className="house-pincode">House Pincode: {details.housepincode}</p>
          <h4 className="father-details">Father details</h4>
          {details.father && (
            <React.Fragment>
              <Link
                to={`/edit/${details.father.name}/${details._id}`}
                className="edit-link"
              >
                Edit Father
              </Link>
              <p className="father-name">Father: {details.father.name}</p>
              <p className="baptism-name">
                Baptism Name: {details.father.baptism_name}
              </p>
              <p className="age">Age: {details.father.age}</p>
              <p className="dob">DOB: {details.father.dob}</p>
              <p className="phone-number">
                Phone Number: {details.father.phoneNumber}
              </p>
              <p className="email">Email: {details.father.email}</p>
              {details.father.status === 'Divorced' && (
  <p className="status">Status: {details.father.status}</p>
)}
{details.father.status !== 'Divorced' && details.mother.status==="Divorced" && (
  <p className="status">Faild to update Father's status ,Mother's status  updated to Divorced</p>
)}

              <p className="situation">Situation: {details.father.situation}</p>
             
              <Link to={`/add-child/${id}`} className="add-child-link">
                ADD child
              </Link>
            </React.Fragment>
          )}
          {details.mother && (
            <React.Fragment>
              <h4 className="mother-details">Mother details</h4>
              <Link
                to={`/edit/${details.mother.name}/${details._id}`}
                className="edit-link"
              >
                Edit Mother
              </Link>
              <p className="mother-name">Mother: {details.mother.name}</p>
              <p className="baptism-name">
                Baptism Name: {details.mother.baptism_name}
              </p>
              <p className="age">Age: {details.mother.age}</p>
              <p className="dob">DOB: {details.mother.dob}</p>
              <p className="phone-number">
                Phone Number: {details.mother.phoneNumber}
              </p>
              {details.father.status === 'Divorced' && details.mother.status!=="Divorced" && (
  <p className="status">Faild to update mother's status Father status updated to Divorced</p>
)}
{details.mother.status === 'Divorced' && (
  <p className="status">Status: {details.mother.status}</p>
)}
              <p className="email">Email: {details.mother.email}</p>
              <p className="situation">Situation: {details.mother.situation}</p>
            </React.Fragment>
          )}
          {/* Children details */}
          {details.children.length > 0 && (
            <React.Fragment>
              <h4 className="children-details">Children details</h4>
              <ul className="children-list">
                {details.children.map((child) => (
                  <li key={child._id} className="child-item">
                    <Link
                      to={`/edit/${child.name}/${details._id}/${child._id}`}
                      className="edit-link"
                    >
                      Edit Child
                    </Link>
                    <p className="child-name">Name: {child.name}</p>
                    <p className="baptism-name">
                      Baptism Name: {child.baptism_name}
                    </p>
                    <p className="dob">DOB: {child.dob}</p>
                    <p className="age">Age: {child.age}</p>
                    <p className="phoneNumber">
                      phoneNumber: {child.phoneNumber}
                    </p>
                    <p className="email">Email: {child.email}</p>
                    <p className="gender">Gender: {child.gender}</p>
                    <p className="status">Status: {child.status}</p>
                    <p className="situation">Situation: {child.situation}</p>
                    {/* Wife details */}
                    {child.status === "Married" && child.gender==="male"&&child.wife && (
                      <React.Fragment>
                        <h4 className="wife-details">Wife Details</h4>
                        <Link
                          to={`/edit/${child.wife.name}/${details._id}`}
                          className="edit-link"
                        >
                          Edit Wife
                        </Link>
                        <p className="child-wife-name">
                          Wife: {child.wife.name}
                        </p>
                        <p className="baptism-name">
                          Baptism Name: {child.wife.baptism_name}
                        </p>
                        <p className="dob">DOB: {child.wife.dob}</p>
                        <p className="age">Age: {child.wife.age}</p>
                        <p className="phone-number">
                          Phone Number: {child.wife.phoneNumber}
                        </p>
                        <p className="email">Email: {child.wife.email}</p>
                        <p className="situation">
                          Situation: {child.wife.situation}
                        </p>
                      </React.Fragment>
                    )}
                    {child.status === "Divorced" && child.wife && (
                      <React.Fragment>
                        <h4 className="wife-details">Wife Details</h4>
                        <Link
                          to={`/edit/${child.wife.name}/${details._id}`}
                          className="edit-link"
                        >
                          Edit Wife
                        </Link>
                        <p className="child-wife-name">
                          Wife: {child.wife.name}
                        </p>
                        <p className="baptism-name">
                          Baptism Name: {child.wife.baptism_name}
                        </p>
                        <p className="dob">DOB: {child.wife.dob}</p>
                        <p className="age">Age: {child.wife.age}</p>
                        <p className="phone-number">
                          Phone Number: {child.wife.phoneNumber}
                        </p>
                        <p className="email">Email: {child.wife.email}</p>
                        <p className="situation">
                          Situation: {child.wife.situation}
                        </p>
                      </React.Fragment>
                    )}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}
        </div>
      ))}
      {/* <button className="print-button" onClick={handlePrint}>Print</button> */}
    </div>
  );
};

export default PersonPage;
