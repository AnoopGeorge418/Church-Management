import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/deathSearch.css';
import Loading from './loadingPage';
import 'animate.css';
import { AnimatePresence, motion } from 'framer-motion';
function DeathSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSearch = async () => {
    if(searchTerm===""){
      alert("please enter some values")
    }
    if (searchTerm.trim() !== '') { // Check if searchTerm is not empty or whitespace
      try {
        const response = await axios.get(`http://localhost:5000/api/searchdeath?searchTerm=${searchTerm}`);
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
      response = await axios.get(`http://localhost:5000/api/searchdeath?searchTerm=${searchTerm}`);
    } else {
      response = await axios.get(`http://localhost:5000/api/searchdeath?searchTerm=${searchTerm}`);
    }
    setSearchResults(response.data.results);
  } catch (error) {
    console.error(error);
    setSearchResults(null);
  }
  setIsLoading(false);
};

  return (
    <div className="death_serach_box">
    <div className="death_serach">
      
      <input
        placeholder='Search...'
        className="death_searchinput"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="death_searchbutton" onClick={handleSearch}>Search</button>
      {isLoading && <Loading />}
      <AnimatePresence>
      {isSearchPerformed && (
        <div className="death_listbar">
          {searchResults==0||searchResults==null?<>No data</>:
          searchResults.map((result) => (
          <motion.div
        key={result._id}
        className="result-item animate__animated animate__fadeInUp"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >

<div key={result._id} className="death_listbar">
            <div key={result._id} className="death_box">
        
         
              <h3 className="death_peson_realname">Name : {result.name}</h3>
              <p className='death_peson_baptiname'>Baptism Name : {result.baptismname}</p>
              <p className='death_peson_familyname'>Family Name : {result.housename}</p>
              <Link className='death-viewDetails' to={`/death/${result._id}`}>View Details</Link>
              <Link className='death-editDetails' to={`/death/${result._id}/edit`}>Edit death</Link>
              <Link className='death-certificateDetails'  to={`/death/${result._id}/certificate`}>Certificate</Link>
      
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
