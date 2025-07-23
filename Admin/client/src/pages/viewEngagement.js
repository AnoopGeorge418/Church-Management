import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Css/viewEngagement.css';
function EngagementDetails() {
  const { id } = useParams();
  const [engagement, SetEngagement] = useState(null);

  useEffect(() => {
    const fetchEngagementDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/engagement/${id}`);
        SetEngagement(response.data);
      } catch (error) {
        console.error('Error fetching engagement details:', error);
        // Handle error
      }
    };

    fetchEngagementDetails();
  }, [id]);

  if (!engagement) {
    return <div>Loading...</div>;
  }

  return (
    <div className='engagement_view_box' >
      <div className='engagement_view_container'>

      <div className='engagement_groom_headinh' >
      <h1>Groom : {engagement.bridegroom_Data.bridegroom_name}</h1>
      </div>

      <div className='engagement_groom_detail'>
      <p>Baptism Name :--- {engagement.bridegroom_Data.bridegroom_baptism_name}</p>
      <p>Family Name :--- {engagement.bridegroom_Data.bridegroom_familyName}</p>
      <p> Father Name :--- {engagement.bridegroom_Data.bridegroom_fatherName}</p>
      <p> Mother Name :--- {engagement.bridegroom_Data.bridegroom_motherName}</p>
      <p> Date-of-Birth :--- {engagement.bridegroom_Data.bridegroom_dob}</p>
      <p>Date-of-Baptism :---{engagement.bridegroom_Data.bridegroom_dateofbaptism}</p>
      <p>Birth place :--- {engagement.bridegroom_Data.bridegroom_birthplace}</p>
     </div>

      <div className='engagement_bride_headinh' >
        <h1>Bride : {engagement.bride_Data.bride_Name}</h1>
      </div>

      <div className='engage_bride_data'>
      <p>Baptism Name:---{engagement.bride_Data.bride_baptismName}</p>
      <p>Family Name :---{engagement.bride_Data.bride_familyName}</p>
      <p>Father Name :---{engagement.bride_Data.bride_fatherName}</p>
      <p>Mother Name :--- {engagement.bride_Data.bride_motherName}</p>
      <p>Date-of-Birth:---{engagement.bride_Data.bride_dob}</p>
      <p>Date-of-Baptism :---{engagement.bride_Data.bride_dateofbaptism}</p>
      <p>Birth place :---{engagement.bride_Data.bride_Birth_place}</p>
  </div>


      <div className='engaement_other_data_detlis' >
   <h1>Other details</h1>
      </div>
      <div className='engaement_other_data__'>
      <p>Engagement Date :---{engagement.engagement_other_data.engagement_date}</p>
      <p>Celebrant :---{engagement.engagement_other_data.engagement_Celebrant}</p>
      <p>priest :---{engagement.engagement_other_data.engagement_priest}</p>
      </div>
      </div>
      {/* Render other */}
    </div>
  );
}

export default EngagementDetails;