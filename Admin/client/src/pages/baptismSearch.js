import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/baptismSearch.css';
import Loading from './loadingPage';
import 'animate.css';
import { AnimatePresence, motion } from 'framer-motion';
function DeathSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const regex = /^[a-zA-Z\s]*$/;
 const handleSearch = async () => {
    if(searchTerm==""){
      alert("please enter some values")
    }
    else if(!regex.test(searchTerm)){
      alert("should not contains numbers or special characters")
     
    }
    if (searchTerm.trim() !== '') { // Check if searchTerm is not empty or whitespace
      try {
        const response = await axios.get(`http://localhost:5000/api/searchBaptism?searchTerm=${searchTerm}`);
        setSearchResults(response.data.results);
        setIsSearchPerformed(true);
      } catch (error) {
        console.error('Error searching baptism records:', error);
        // Handle error
      }
      
    }
  


  setIsLoading(true);
  try {
    let response;
    if (searchTerm.length === 1) {
      response = await axios.get(`http://localhost:5000/api/searchBaptism?searchTerm=${searchTerm}`);
    } else {
      response = await axios.get(`http://localhost:5000/api/searchBaptism?searchTerm=${searchTerm}`);
    }
    setSearchResults(response.data.results);
  } catch (error) {
    console.error(error);
    setSearchResults(null);
  }
  setIsLoading(false);
};

  return (
    <div className="baptism_serach_box">
    <div className="baptism_serach">
      
      <input
        placeholder='Search...'
        className="Baptism_searchinput"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="Baptism_searchbutton" onClick={handleSearch}>Search</button>
      {isLoading && <Loading />}
      <AnimatePresence>
      {isSearchPerformed && (
        <div className="baptism_listbar">
         
          {searchResults==0||searchResults==null?<>No data</>:
          searchResults.map((result) => (
          <motion.div
        key={result._id}
        className="result-item animate_animated animate_fadeInUp"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >

<div key={result._id} className="baptism_listbar">
            <div key={result._id} className="baptism_box">
        
         
              <h3 className="Baptism_peson_realname">Name : {result.name}</h3>
              <p className='Baptism_peson_baptiname'>Baptism Name : {result.baptismName}</p>
              <p className='Baptism_peson_familyname'>Family Name : {result.familyName}</p>
              <Link className='search-viewDetails' to={`/baptism/${result._id}`}>View Details</Link>
              <Link className='search-editDetails' to={`/baptism/${result._id}/edit`}>Edit Baptism</Link>
              <Link className='search-certificateDetails'  to={`/baptism/${result._id}/certificate`}>Certificate</Link>
      
            </div>
        
        </div>
        </motion.div>  
            // </motion.div>
          ))}
      
        </div>

   
      )}
      
       </AnimatePresence>
    </div>
   
    </div>
    
  );
}

export default DeathSearch;