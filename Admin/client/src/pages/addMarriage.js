import React, { useInsertionEffect, useState } from 'react';
import '../Css/addMarriage.css';
import  axios  from 'axios';
import { useNavigate } from "react-router-dom";

function AddMarriage() {
  const [message, setMessage] = useState("");
  const [errorMessage , setErrorMessage]=useState('');
  const regex = /^[a-zA-Z\s]*$/;
  const [bridegroom_Marriagedata, setBridegroom_Marriagedata] = useState({
  bridegroom_name:'',
  bridegroom_baptism_name:'',
  bridegroom_familyName:'',
  bridegroom_fatherName:'',
  bridegroom_motherName:'',
    bridegroom_age:'',

});
  const [bride_Marriagedata, setBride_Marriagedata] = useState({
  bride_Name:'',
  bride_baptismName:'',
  bride_familyName:'',
  bride_fatherName:'',
  bride_motherName:'',
  bride_age:'',

  });

  const [marriage_other_data, setMarriage_other_data] = useState({
    marriage_date:'',
   marriage_Celebrant:'',
marriage_witness:'',
marriage_witness2:'',
marriage_church:'',
   marriage_priest:'',
  });




  const handleChangeMarriagebridegroom = (e) => {
    console.log()
    const { name, value } = e.target;
    setBridegroom_Marriagedata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleChangeMarriage = (e) => {
  //   const { name, value } = e.target;
  //   setBridegroom_Marriagedata((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };


  const handleChangeMarriagebride = (e) => {
    const { name, value } = e.target;
    setBride_Marriagedata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeMarriage_other_data = (e) => {
    const { name, value } = e.target;
    setMarriage_other_data ((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // let navigate = useNavigate()
  
  

  
  const handleSave = () => {

    if (bridegroom_Marriagedata.bridegroom_name === '') {
      alert("please Enter a Bridegroom Name")
      setMessage('');
    }
    
    else if (!regex.test(bridegroom_Marriagedata.bridegroom_name)) {
      alert("The Bridegroom Name input contains numbers or special characters")
    }
    else if (bridegroom_Marriagedata.bridegroom_baptism_name === '') {
      alert("please Enter a Bridegroom baptism Name")
      setMessage('');
    }
    
    else if (!regex.test(bridegroom_Marriagedata.bridegroom_baptism_name)) {
      alert("The Bridegroom Baptism Name input contains numbers or special characters")
    }
    else if (bridegroom_Marriagedata.bridegroom_familyName === '') {
      alert("please Enter a Bridegroom house Name")
      setMessage('');
    }
    
    else if (!regex.test(bridegroom_Marriagedata.bridegroom_familyName)) {
      alert("The Bridegroom house Name input contains numbers or special characters")
    }
    
    else if (bridegroom_Marriagedata.bridegroom_fatherName === '') {
      alert("please Enter a Bridegrooms Father Name")
      setMessage('');
    }
    
    else if (!regex.test(bridegroom_Marriagedata.bridegroom_fatherName)) {
      alert("The Bridegrooms Father Name input contains numbers or special characters")
    }
    else if (bridegroom_Marriagedata.bridegroom_motherName === '') {
      alert("please Enter a Bridegrooms mother Name")
      setMessage('');
    }
    
    else if (!regex.test(bridegroom_Marriagedata.bridegroom_motherName)) {
      alert("The Bridegrooms mother Name input contains numbers or special characters")
    }
    else if (bridegroom_Marriagedata.bridegroom_age === '') {
      alert("please Enter Bridegrooms age")
      setMessage('');
    }


    else if(bride_Marriagedata.bride_Name === ''){
      alert("please Enter a Bride Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Marriagedata.bride_Name)){
      alert("The Bride  Name input contains numbers or special characters")
     }
     else if(bride_Marriagedata.bride_baptismName === ''){
      alert("please Enter a Bride baptism Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Marriagedata.bride_baptismName)){
      alert("The Bride  Baptism Name input contains numbers or special characters")
     }
     else if(bride_Marriagedata.bride_familyName === ''){
      alert("please Enter a Bride  house Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Marriagedata.bride_familyName)){
      alert("The Bride house Name input contains numbers or special characters")
     }
     else if(bride_Marriagedata.bride_fatherName === ''){
      alert("please Enter a Bride's Father Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Marriagedata.bride_fatherName)){
      alert("The Bride's Father  Name input contains numbers or special characters")
     }
     else if(bride_Marriagedata.bride_motherName === ''){
      alert("please Enter a Bride's Mother Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Marriagedata.bride_motherName)){
      alert("The Bride's Mother  Name input contains numbers or special characters")
     }
     else if(bride_Marriagedata.bride_age === ''){
      alert("please Enter a Bride's Age")
      setMessage('');
    }

    else if(marriage_other_data.marriage_date === ''){
      alert("please Enter a Engagement Date")
      setMessage('');
    }

    else if(marriage_other_data.marriage_Celebrant === ''){
      alert("please Enter a Celebrant Name")
      setMessage('');
    }
     else if(!regex.test(marriage_other_data.marriage_Celebrant)){
      alert("The  Celebrant Name input contains numbers or special characters")
     }
     else if(marriage_other_data.marriage_witness === ''){
      alert("please Enter a witness 1 Name")
      setMessage('');
    }
     else if(!regex.test(marriage_other_data.marriage_witness)){
      alert("The witness Name input contains numbers or special characters")
     }

     else if(marriage_other_data.marriage_witness2 === ''){
      alert("please Enter a witness 2 Name")
      setMessage('');
    }
     else if(!regex.test(marriage_other_data.marriage_witness2)){
      alert("The witness Name input contains numbers or special characters")
     }
     else if(marriage_other_data.marriage_church === ''){
      alert("please Enter church Name")
      setMessage('');
    }
     else if(!regex.test(marriage_other_data.marriage_church)){
      alert("The church Name input contains numbers or special characters")
     }
    else if(marriage_other_data.marriage_priest === ''){
      alert("please Enter a priest Name")
      setMessage('');
    }
     else if(!regex.test(marriage_other_data.marriage_priest)){
      alert("The priest Name input contains numbers or special characters")
     }
     else{
      setErrorMessage("")

      console.log(bridegroom_Marriagedata,11111111)
      console.log(bride_Marriagedata,2222222)
      console.log(marriage_other_data,333333333333)
    axios
        .post(' http://localhost:5000/api/addMarriage',{bridegroom_Marriagedata,bride_Marriagedata,marriage_other_data})
        .then(response => {
          if(response.data.success){

            setBridegroom_Marriagedata({
              bridegroom_name:'',
              bridegroom_baptism_name:'',
              bridegroom_familyName:'',
              bridegroom_fatherName:'',
              bridegroom_motherName:'',
                bridegroom_age:'',
              })

              setBride_Marriagedata({
                bride_Name:'',
                bride_baptismName:'',
                bride_familyName:'',
                bride_fatherName:'',
                bride_motherName:'',
                bride_age:'',
              })
              setMarriage_other_data({
                marriage_date:'',
                marriage_Celebrant:'',
             marriage_witness:'',
             marriage_witness2:'',
             marriage_church:'',
                marriage_priest:'',
              })
          alert("inserted successfull")
            // navigate('/')

          }
          

          
          setMessage('Saved successfully!');

        })
        .catch(error => {
          setMessage('Error occurred. Please try again.');
        });
    } 
  }


  return (
    <form>
               <div className='Marriage_Container'>
                     <div className='Marriage_heading'>
                            <h1>Marriage Registry</h1>
                       </div>
                              <div className='Marry_bridegroom'>
                                  <div className='marriage_formfill'>
                                    <div className='marraige_heading'>
                                      <h1>Bridegroom</h1>
                                    </div>
                                    </div>
                                    
                                     <div className='marriage_formfill'>
                                        <label className='marriage_entery'>Name</label>
                                            <input
                                              className='marriage_fill_entry'
                                              type='text'
                                              id='bridegroom_name'
                                              name='bridegroom_name'
                                              value={bridegroom_Marriagedata.bridegroom_name}
                                              onChange={handleChangeMarriagebridegroom}
                                              />
                                       </div>
               
       
         <div className='marriage_formfill'>
         <label className='marriage_entery'>Baptism Name</label>
              <input
                className='marriage_fill_entry'
                type='text'
                id='bridegroom_baptism_name'
                name='bridegroom_baptism_name'
                value={bridegroom_Marriagedata.bridegroom_baptism_name}
                onChange={handleChangeMarriagebridegroom}
                />
         </div>

        <div className='marriage_formfill'>
         <label className='marriage_entery'>Family Name</label>
              <input
                className='marriage_fill_entry'
                type='text'
                id='bridegroom_familyName'
                name='bridegroom_familyName'
                value={bridegroom_Marriagedata.bridegroom_familyName}
                onChange={handleChangeMarriagebridegroom}
                />
         </div>
         
         <div className='marriage_formfill'>
         <label className='marriage_entery'>Name of Father</label>
              <input
                className='marriage_fill_entry'
                type='text'
                id='bridegroom_fatherName'
                name='bridegroom_fatherName'
                value={bridegroom_Marriagedata.bridegroom_fatherName}
                onChange={handleChangeMarriagebridegroom}
                />
         </div>

         <div className='marriage_formfill'>
         <label className='marriage_entery'>Name of Mother</label>
              <input
                className='marriage_fill_entry'
                type='text'
                id='bridegroom_motherName'
                name='bridegroom_motherName'
                value={bridegroom_Marriagedata.bridegroom_motherName}
                onChange={handleChangeMarriagebridegroom}
                />
                 </div>

                 <div className='marriage_formfill'>
         <label className='marriage_entery'>Age</label>
              <input
                className='marriage_fill_entry'
                type='number'
                id='bridegroom_age'
                name='bridegroom_age'
                value={bridegroom_Marriagedata.bridegroom_age}
                onChange={handleChangeMarriagebridegroom}
                />
         </div>
        
      
        </div>







       
{/* bride_means_girl*/}
<div className='Marriage_bride'>
         <div className='Marriage_bride_formfill'>
                                    <div className='marriage_bride_heading'>
                                      <h1>Bride</h1>
                                    </div>
                                    </div>
         <div className='Marriage_bride_formfill'>
          <label className='_Marriage_bride_entery'>Name</label>
              <input
                className='marriage_bride_fill_entry'
                type='text'
                id='bride_Name'
                name='bride_Name'
                value={bride_Marriagedata.bride_Name}
                onChange={handleChangeMarriagebride}
                />
         </div>
         <div className='Marriage_bride_formfill'>
         <label className='_Marriage_bride_entery'>Baptism Name</label>
              <input
                className='marriage_bride_fill_entry'
                type='text'
                id='bride_baptismName'
                name='bride_baptismName'
                value={bride_Marriagedata.bride_baptismName}
               onChange={handleChangeMarriagebride}
                />
         </div>

        <div className='Marriage_bride_formfill'>
         <label className='_Marriage_bride_entery'>Family Name</label>
              <input
                className='marriage_bride_fill_entry'
                type='text'
                id='bride_FamilyName'
                name='bride_familyName'
                value={bride_Marriagedata.bride_familyName}
                onChange={handleChangeMarriagebride}
                />
         </div>
         
         <div className='Marriage_bride_formfill'>
         <label className='_Marriage_bride_entery'>Name of Father</label>
              <input
                className='marriage_bride_fill_entry'
                type='text'
                id='bride_fatherName'
                name='bride_fatherName'
                value={bride_Marriagedata.bride_fatherName}
                onChange={handleChangeMarriagebride}
                />
         </div>
         <div className='Marriage_bride_formfill'>
         <label className='_Marriage_bride_entery'>Name of Mother</label>
              <input
                className='marriage_bride_fill_entry'
                type='text'
                id='bride_motherName'
                name='bride_motherName'
                value={bride_Marriagedata.bride_motherName}
                onChange={handleChangeMarriagebride}
                />
                 </div>
                 <div className='Marriage_bride_formfill'>
         <label className='_Marriage_bride_entery'>Age</label>
              <input
                className='marriage_bride_fill_entry'
                type='number'
                id='bride_age'
                name='bride_age'
                value={bride_Marriagedata.bride_age}
                onChange={handleChangeMarriagebride}
                />
         </div>
    
</div>


<div className='Marriage_other_details'>
  <div className='Marriage_other_formfill'>
  <div className='Marriage_other_heading'>
    <h1>Other details </h1>
  </div>
        </div>
       
        <div className='Marriage_other_formfill'>
         <label className='marriage_other_entery'>Date</label>
              <input
                className='marriage_other_fill_entry'
                type='date'
                id='marriage_date'
                name='marriage_date'
                value={marriage_other_data.marriage_date}
                onChange={handleChangeMarriage_other_data}
                />
         </div>
         
         <div className='Marriage_other_formfill'>
         <label className='marriage_other_entery'>Celebrant</label>
              <input
                className='marriage_other_fill_entry'
                type='text'
                id='marriage_Celebrant'
                name='marriage_Celebrant'
                value={marriage_other_data.marriage_Celebrant}
                onChange={handleChangeMarriage_other_data}
                />
         </div>
         <div className='Marriage_other_formfill'>
         <label className='marriage_other_entery'>Witness 1</label>
              <input
                className='marriage_other_fill_entry'
                type='text'
                id='marriage_witness'
                name='marriage_witness'
                value={marriage_other_data.marriage_witness}
                onChange={handleChangeMarriage_other_data}
                />
         </div>
         <div className='Marriage_other_formfill'>
         <label className='marriage_other_entery'>Witness 2</label>
              <input
                className='marriage_other_fill_entry'
                type='text'
                id='marriage_witness2'
                name='marriage_witness2'
                value={marriage_other_data.marriage_witness2}
                onChange={handleChangeMarriage_other_data}
                />
         </div>
         <div className='Marriage_other_formfill'>
         <label className='marriage_other_entery'>Church Name</label>
              <input
                className='marriage_other_fill_entry'
                type='text'
                id='marriage_church'
                name='marriage_church'
                value={marriage_other_data.marriage_church}
                onChange={handleChangeMarriage_other_data}
                />
         </div>
         
         <div className='Marriage_other_formfill'>
         <label className='marriage_other_entery'> Parish Priest</label>
              <input
                className='marriage_other_fill_entry'
                type='text'
                id='marriage_priest'
                name='marriage_priest'
                value={marriage_other_data.marriage_priest}
                onChange={handleChangeMarriage_other_data}
                />
         </div>
 
 </div>



         <button type='button' className='marriage_add' onClick={handleSave} >
              Save
            </button>


            {/* onClick={handleSave} */}
         
            {/* <p className='Baptism-success_msg'>{message}</p> */}
            
</div>

    </form>
  );
}

export default AddMarriage;