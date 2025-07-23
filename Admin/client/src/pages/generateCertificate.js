import React, { useState, useEffect } from 'react';
import '../Css/generateCertificate.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GenerateCertificate = () => {
  const [certificateRequests, setCertificateRequests] = useState([]);

  useEffect(() => {
    // Fetch the data from the backend API when the component mounts
    fetchCertificateRequests();
  }, []);

  const fetchCertificateRequests = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/getAllCertificateRequests');
      const data = await response.json();
      setCertificateRequests(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleGenerateCertificate = async (certificateName, requestId, name, baptismName, dob, fatherName, motherName) => {
    try {
      if (certificateName === 'baptism') {
        const response = await axios.get('http://localhost:8000/api/generate/baptism', {
          params: {
            name,
            baptismName,
            dob,
            fatherName,
            motherName,
          },
        });
        console.log(response.data); // This will log the response from the API
      } else if (certificateName === 'marriage') {
        const response = await axios.get(`http://localhost:8000/api/generate/marriage/${requestId}`, {
          params: {
            name,
            spouseName: baptismName,
            marriageDate: dob,
            fatherName,
            motherName,
          },
        });
        console.log(response.data); // This will log the response from the API
      } else if (certificateName === 'death') {
        const response = await axios.get(`http://localhost:8000/api/generate/death/${requestId}`, {
          params: {
            name,
            deceasedName: baptismName,
            deathDate: dob,
            fatherName,
            motherName,
          },
        });
        console.log(response.data); // This will log the response from the API
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  return (
    <div className="GenerateCertificate-certificate-requests">
      <h1 className="GenerateCertificate-heading">All Certificate Requests</h1>
      {certificateRequests.length === 0 ? (
        <p className="GenerateCertificate-no-requests">No certificate requests found.</p>
      ) : (
        <ul className="GenerateCertificate-requests-list">
          {certificateRequests.map((request) => (
            <li key={request._id} className="GenerateCertificate-request-item">
              {request.certificateName === 'baptism' && (
                <React.Fragment>
                  <p className="GenerateCertificate-user-name">UserName: {request.u_name}</p>
                  <p className="GenerateCertificate-user-email">UserEmail: {request.u_email}</p>
                  <p className="GenerateCertificate-certificate-name">CertificateName: {request.certificateName}</p>
                  <p className="GenerateCertificate-name">Name: {request.name}</p>
                  <p className="GenerateCertificate-baptism-name">BaptismName: {request.baptismName}</p>
                  <p className="GenerateCertificate-dob">Dob: {formatDate(request.dob)}</p>
                  <p className="GenerateCertificate-father-name">FatherName: {request.fatherName}</p>
                  <p className="GenerateCertificate-mother-name">MotherName: {request.motherName}</p>
                  <Link  className="GenerateCertificate-generate-link" to={`/baptism/${request._id}/certificates`}>
                  Baptism Certificate
      </Link>

                </React.Fragment>
              )}
              {request.certificateName === 'marriage' && (
                <React.Fragment>
                  <p className="GenerateCertificate-user-name">UserName: {request.u_name}</p>
                  <p className="GenerateCertificate-user-email">UserEmail: {request.u_email}</p>
                  <p className="GenerateCertificate-certificate-name">CertificateName: {request.certificateName}</p>
                  <p className="GenerateCertificate-name">Name: {request.name}</p>
                  <p className="GenerateCertificate-spouse-name">SpouseName: {request.marriageSpouseName}</p>
                  <p className="GenerateCertificate-marriage-date">MarriageDate: {formatDate(request.marriageDate)}</p>
                  <Link  className="GenerateCertificate-generate-link" to={`/MarriageDataCertificate/${request._id}/certificates`}>
                  Marriage Certificate
      </Link>
                </React.Fragment>
              )}
              {request.certificateName === 'death' && (
                <React.Fragment>
                  <p className="GenerateCertificate-user-name">UserName: {request.u_name}</p>
                  <p className="GenerateCertificate-user-email">UserEmail: {request.u_email}</p>
                  <p className="GenerateCertificate-certificate-name">CertificateName: {request.certificateName}</p>
                  <p className="GenerateCertificate-name">Name: {request.name}</p>
                  <p className="GenerateCertificate-deceased-name">DeceasedName: {request.causeOfDeath}</p>
                  <p className="GenerateCertificate-death-date">DeathDate: {formatDate(request.deathDate)}</p>
                  <Link  className="GenerateCertificate-generate-link" to={`/DeathCertificatePage/${request._id}/certificates`}>
                  Death Certificate
      </Link>

                </React.Fragment>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenerateCertificate;
