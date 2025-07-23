import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Css/viewMarriage.css';
function MarriageDetails() {
  const { id } = useParams();
  const [marriage, SetMarriage] = useState(null);

  useEffect(() => {
    const fetchMarriageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/marriage/${id}`);
        SetMarriage(response.data);
      } catch (error) {
        console.error('Error fetching marriage details:', error);
        // Handle error
      }
    };

    fetchMarriageDetails();
  }, [id]);

  if (!marriage) {
    return <div>Loading...</div>;
  }

  return (
    <div className='marriage_view_box' >
      <div className='marriage_view_container'>

      <div className='marriage_groom_headinh' >
      <h1>Groom : {marriage.bridegroom_Marriagedata.bridegroom_name}</h1>
      </div>

      <div className='marriage_groom_detail'>
      <p>Baptism Name :--- {marriage.bridegroom_Marriagedata.bridegroom_baptism_name}</p>
      <p>Family Name :--- {marriage.bridegroom_Marriagedata.bridegroom_familyName}</p>
      <p> Father Name :--- {marriage.bridegroom_Marriagedata.bridegroom_fatherName}</p>
      <p> Mother Name :--- {marriage.bridegroom_Marriagedata.bridegroom_motherName}</p>
      <p> Age :--- {marriage.bridegroom_Marriagedata.bridegroom_age}</p>
   
     </div>

      <div className='marriage_bride_headinh' >
        <h1>Bride : {marriage.bride_Marriagedata.bride_Name}</h1>
      </div>

      <div className='marriage_bride_data'>
      <p>Baptism Name:---{marriage.bride_Marriagedata.bride_baptismName}</p>
      <p>Family Name :---{marriage.bride_Marriagedata.bride_familyName}</p>
      <p>Father Name :---{marriage.bride_Marriagedata.bride_fatherName}</p>
      <p>Mother Name :--- {marriage.bride_Marriagedata.bride_motherName}</p>
      <p>Age:---{marriage.bride_Marriagedata.bride_age}</p>

  </div>


      <div className='marriage_other_data_detlis' >
   <h1>Other details</h1>
      </div>
      <div className='marriage_other_data__'>
      <p>Engagement Date :---{marriage.marriage_other_data.marriage_date}</p>
      <p>Celebrant :---{marriage.marriage_other_data.marriage_Celebrant}</p>
      <p>priest :---{marriage.marriage_other_data.marriage_priest}</p>
      <p>witness 1 :---{marriage.marriage_other_data.marriage_witness}</p>
      <p>witness 2 :---{marriage.marriage_other_data.marriage_witness2}</p>
      <p>Church Name :---{marriage.marriage_other_data.marriage_church}</p>
      </div>
      </div>
      {/* Render other */}
    </div>
  );
}

export default MarriageDetails;