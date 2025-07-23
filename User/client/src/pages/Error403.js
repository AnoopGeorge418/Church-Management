import React from 'react';
import {useNavigate } from 'react-router-dom';
import '../Css/Error403.css';
import  Error from '../Img/403 Error.png'

function Error403(){
   const history=useNavigate();
   const handleSubmit =()=>{
      history("/login")
   }
    return(
      <div className='Error_container'>
        <div className='Error_image'>
           <img src={ Error} className="image" alt="403 Error" height={400} /> 
        </div>
       <div className='Error_msg'>
       <h1 >We are sorry.....</h1>
</div>
        <div className='Error_msg1'>
           <p>The page you're trying to access has restricted access </p>
        </div>
<div className='Error_msg2'>
        <p >Please Login and Refresh the page to continue...</p>
      </div>


       <div >
           <button className='Error_button403' onClick={handleSubmit}>⬅ Login</button>
       </div>
    
      </div>
        
    )
}
export default Error403;