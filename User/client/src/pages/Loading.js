import React from 'react';
import '../Css/Loading.css';

function Loading() {
  return (
    <div className='Loading-container'>
      <div className='Loading-circle'>
        <div className='Loading-animation'></div>
      </div>
    </div>
  );
}

export default Loading;
