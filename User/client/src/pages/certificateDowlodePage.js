import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Css/CertificateDownlode.css'

const CertificateDownlode = () => {
  const componentRef = useRef();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const otp = queryParams.get('otp');
  const issuedBy = queryParams.get('issuedBy');
  const issuedTo = queryParams.get('issuedTo');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/certificateBaptism/to/user/verification', { issuedTo, issuedBy, otp });
        console.log('API response:', response.data.seal);
        setData(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false once data is fetched or error occurred
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, [issuedTo, issuedBy, otp]);

  const [loader, setLoader] = useState(false);

  const downloadPDF = () =>{
    const capture = document.querySelector('.baptism_certificate_box');
    setLoader(true);
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      const customName = data?.name ? `${data.name}_certificate.pdf` : 'certificate.pdf';
      doc.save(customName);
    })
  }
  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }

    const dateObject = new Date(dateString);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${day}-${month}-${year}`;
  };
   
  const handleInputChange = (e) => {};
  
 
  ;
  return (
    <div className='download-container'>
    {data?.certificateName==="baptism" &&  (



   
     <div  className="a4_sheet">
      <div ref={componentRef} className="baptism_certificate_box">
        {isLoading ? (
          <div>Loading data...</div>
        ) : (
          <>
            <div className="baptism_certificate_box">
              <div  className="baptism_card">
                <div className="baptismcertifiace_container">
                  <div className="baptism_box_to_move">
                    <h1 className="baptism_cert_heading">DIOCESE OF BELTHANGADY</h1>
                    <p className="baptism_cert_bapt">CERTIFICATE OF BAPTISM</p>


                    <div>
                        <label className="baptism_certificate_details">
                          Name{" "}
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="name"
                          value={data?.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Baptism Name
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="baptismName"
                          value={data?.baptismName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="baptism_certificate_details">
                          Family Name
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="familyName"
                          value={data?.familyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Father Name
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="fatherName"
                          value={data?.fatherName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Mother Name
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="motherName"
                          value={data?.motherName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Date of Birth
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="dob"
                          value={formatDate(
                            data?.dob
                              ? new Date(data.dob)
                                  .toISOString()
                                  .substring(0, 10)
                              : ""
                          )}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Date of Baptism
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="dateofbaptism"
                          value={formatDate(
                            data?.dateofbaptism
                              ? new Date(data?.dateofbaptism)
                                  .toISOString()
                                  .substring(0, 10)
                              : ""
                          )}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Place of Birth
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="birthplace"
                          value={data?.birthplace}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="baptism_certificate_details">
                          Date of Confirmation
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="confirmationdate"
                          value={formatDate(
                            data?.confirmationdate
                              ? new Date(data?.confirmationdate)
                                  .toISOString()
                                  .substring(0, 10)
                              : ""
                          )}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Name of GodFather
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="godfather"
                          value={data?.godfather}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="baptism_certificate_details">
                          Name of GodMother
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="godmother"
                          value={data?.godmother}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Parish of GodFather
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="godfatherparish"
                          value={data?.godfatherparish}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Parish of GodMother
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="godmotherparish"
                          value={data?.godmotherparish}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Name of Minister
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="ministername"
                          value={data?.ministername}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Parish of Minister
                        </label>
                        {/* <p className="detalis">:</p> */}
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="parishminister"
                          value={data?.parishminister}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* <button onClick={Click}>next</button>  */}
                      <p className="baptism_overall">
                        Certified the above is a true extract from the Baptism
                        Register maintained in this church
                      </p>
                       <div className="Seal_Image"></div>
                       <div className="Sign_Image"></div>
                      <p className="baptism_seal">(seal)</p>
                      <p className="baptism_sign">(singature of the Parish Priest)</p>
                      
                  
                  
                  </div>
                </div>
              </div>
            </div>
            {/* Your existing component code goes here */}
           
          </>
        )}
      </div>
      <button
              className='download_buttonbap'
                onClick={downloadPDF}
                disabled={!(loader===false)}
              >
                {loader?(
                  <span>Downloading</span>
                ):(
                  <span>Download</span>
                )}

              </button>
              </div> 
              )}
              {data?.certificateName==="death" &&(
                <div ref={componentRef} className="baptism_certificate_box">
                <div className='death-ContainerPEACE'>
        <div className='death_co_position'>
         <div  >
        
      <div className='death-box'>
       
        <div className='death-heading'>
           DEATH CERTIFICATE
        </div> 
        <div className='death-image'></div>
        <div className='death-sub'>
            This is certiy that the following information has been taken from 
        </div>
        <div className='death-sub2'>
            The original record of death is register in the Name of
        </div>
        <input className='death_input1' 
        type='text' 
       readOnly
        name="name"
        value={data?.name}
        onChange={handleInputChange}
        />
 <div className='death-sub3'>
           Baptism Name
           </div>
           <input className='death_baptismname' 
        type='text' 
       readOnly
        name="baptismname"
        value={data?.baptismname}
        onChange={handleInputChange}
        />
     <div className='death-sub4'>
           House Name
           </div>
           <input className='death_housename' 
        type='text' 
       readOnly
        name="housename"
        value={data?.housename}
        onChange={handleInputChange}
        />
      
      <div className='death_sub5'>
            The above certifited Person died on
        </div>
        <input className='death_date' 
        type='text' 
       readOnly
        name="date_of_death"
        value={formatDate(
          data?.date_of_death
                              ? new Date(data?.date_of_death)
                                  .toISOString()
                                  .substring(0, 10)
                              : ""
                          )}
        onChange={handleInputChange}
        />
         <div className='death_sub6'>
          Cause of death
        </div>
        <input className='death_reason' 
        type='text' 
       readOnly
        name="sickness"
        value={data?.sickness}
        onChange={handleInputChange}
        />

      <div className='death_sub7'>
          The person belongs to 
        </div>
        <input className='death_church' 
        type='text' 
       readOnly
        name="Parish_name"
        value={data?.Parish_name}
        onChange={handleInputChange}
        
        />
        <div className='death_sub8'>
          And
        </div>
        <div className='death_sub9'>
          Burial on
        </div>
        <input className='death_burial' 
        type='text' 
       readOnly
        name="date_of_Burial"
        
        value={formatDate(
          data?.date_of_Burial
                              ? new Date(data?.date_of_Burial)
                                  .toISOString()
                                  .substring(0, 10)
                              : ""
                          )}
        onChange={handleInputChange}
        
        />
<div className='death_seal'>
<div className="Seal_Image00"></div>
                       <div className="Sign_Image00"></div>
          Seal
        </div>
        <div className='death_sign'>
          Signature
        </div>
        </div>
       
     

      </div>
      </div>
      {/* <button onClick={handlePrint} className='oooo'>  Print </button> */}
    </div>
    <button
              className='download_buttondeath'
                onClick={downloadPDF}
                disabled={!(loader===false)}
              >
                {loader?(
                  <span>Downloading</span>
                ):(
                  <span>Download</span>
                )}

              </button>
     
</div>

              )}


              {data?.certificateName === "marriage" && (
  <div className="a4_sheet">
    <div ref={componentRef} className="baptism_certificate_box">
      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <>
        <div>

<div className='marriage-Container'>
<div className='marriage-box'>
<div ref={componentRef} >
<div className='marriage-InnerBorder'>
  <div className='marriage-heading'>
     Marriage Certificate
  </div>
  <div className='marriage-image'></div>
  <div className='marriage-sub'>
      Church of
  </div>
  <input className='marriage-input1' 
  type='text'
   readOnly
   name="marriage_church"
   value={ data?.marriage_other_data.marriage_church}>

   </input>
  {/* <br/>
  <input className='marriage-input1' type='text' required></input> */}
  <div className='marriage-2nd_heading'>
      This is to Certify
  </div>
  <div className='marriage-labels_and_inputs'>
    <div className='marriage-labels_and_inputs'>
        <label className='marriage-label'>That</label>
        <input 
          className='marriage-input2' 
          type='text' 
          readOnly
          name="bridegroom_name"
      value={  data?.bridegroom_Marriagedata.bridegroom_name}
    >
         </input>
         <label className='marriage-label'>and</label>
         <input 
          className='marriage-input3' 
          type='text' 
          readOnly
          name="bride_Name"
          value={  data?.bride_Marriagedata.bride_Name}
          >
         </input>
    </div>
    <div className='marriage-labels_and_inputs'>
       <label className='marriage-label7'>were lawfully</label>
       <label className='marriage-label8'>Married</label>
    </div>
      <div lassName='marriage-labels_and_inputs1'>
         <label className='marriage-label1'>on the</label>
        <input 
          className='marriage-input5'
          required
          type='date'
          readOnly
          name="marriage_date"
          value={  data?.marriage_other_data.marriage_date}
        
          >
        </input>
          {/* <label className='marriage-label2'>day of</label>
        <input 
          className='marriage-input6'
          required
          type='text'
          ></input> */}
      </div>
      <h3 className='marriage-para'>
          According to the Rite of the Roman Cathlic Church
      </h3>
      <h3 className='marriage-h3'>
          and the confirmity with the laws of the State of Karnataka
      </h3>
       <div className='marriage-labels_and_inputs'>
      {/* <label className='marriage-label6'>the State of</label>
        <input 
          className='marriage-input10'
          required
          type='text'
          ></input> */}
           <label className='marriage-label'>Rev,</label>
        <input 
          className='marriage-input14'
          required
          type='text'
          readOnly
          name="marriage_Celebrant"
      value={  data?.marriage_other_data.marriage_Celebrant}
   


          ></input>
          <label className='marriage-label9'>officiating,</label>
          <label className='marriage-label'>in the presence of</label>
        <input 
          className='marriage-input15'
          required
          type='text'
          readOnly
          name="marriage_witness"
          value={  data?.marriage_other_data.marriage_witness}
         
          ></input>
          <label className='marriage-label'>and</label>
        <input 
          className='marriage-input16'
         required
          type='text'
          readOnly
          name="marriage_witness2"
          value={  data?.marriage_other_data.marriage_witness2}
          
          ></input>
          <label className='marriage-label10'>witnesses.</label>
          <p className='marriage-para2'>
              as appears from the Marriage Register of this Church.
          </p>
      </div>
      {/* <div className='marriage-rev'>
           <label className='revDetail'>Dated</label>
           <input
             className='marriage-input12'
             type='text'
             required
             ></input>
      </div> */}
      <div className='marriage-labels_and_inputs'>
      <div className="Seal_Image33"></div>
                       <div className="Sign_Image33"></div>
          <label className='revDetail2f'>Signature of the Priest</label>
          {/* <input
             className='marriage-input13'
             type='text'
            readOnly
            name="marriage_priest"
            value={formData.marriage_other_data.marriage_priest}
            onChange={handleInputChangeotherdetails}

             ></input> */}
      </div>
      <div className='marriage-labels_and_inputs'>
          <label className='revDetail3g'>Seal</label>
          {/* <input
             className='marriage-input13'
             type='text'
            readOnly
            name="marriage_priest"
            value={formData.marriage_other_data.marriage_priest}
            onChange={handleInputChangeotherdetails}

             ></input> */}
      </div>
  </div> 
  </div>
 
</div>
<button
              className='download_buttonmarraiage'
                onClick={downloadPDF}
                disabled={!(loader===false)}
              >
                {loader?(
                  <span>Downloading</span>
                ):(
                  <span>Download</span>
                )}

              </button>
</div>
</div>
</div>





















        </>
      )}
    </div>
  </div>
)}
















              {data?.certificateName === "baptism" && (
  <div className="a4_sheet">
    <div ref={componentRef} className="baptism_certificate_box">
      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <>
          {/* Code to display when isLoading is false */}
        </>
      )}
    </div>
  </div>
)}

   
    </div>
    
  );
};

export default CertificateDownlode;
