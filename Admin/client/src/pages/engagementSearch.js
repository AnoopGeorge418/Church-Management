import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/engagementSearch.css';
import Loading from './loadingPage';
import 'animate.css';
import { AnimatePresence, motion } from 'framer-motion';

 function EngagementSearch() {
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
          const response = await axios.get(`http://localhost:5000/api/searchengagement?searchTerm=${searchTerm}`);
          setSearchResults(response.data.results);
          setIsSearchPerformed(true);
        } catch (error) {
          console.error('Error searching engagement records:', error);
          // Handle error
        }
      }
    
  
  
    setIsLoading(true);
    try {
      let response;
      if (searchTerm.length === 1) {
        response = await axios.get(`http://localhost:5000/api/searchengagement?searchTerm=${searchTerm}`);
      } else {
        response = await axios.get(`http://localhost:5000/api/searchengagement?searchTerm=${searchTerm}`);
      }
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
      setSearchResults(null);
    }
    setIsLoading(false);
  };
  
    return (
      <div className="engagement_serach_box">
      <div className="engagement_serach">
        
        <input
          placeholder='Search...'
          className="engagement_searchinput"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="engagement_searchbutton" onClick={handleSearch}>Search</button>
        {isLoading && <Loading />}
        <AnimatePresence>
        {isSearchPerformed && (
          <div className="engagement_listbar">
           
            {searchResults.map((result) => (
            <motion.div
          key={result._id}
          className="result-item animate__animated animate__fadeInUp"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
  
  <div key={result._id} className="engagement_listbar">
              <div key={result._id} className="engagement_box">
          
           
                <h3 className="engagem_peson_realname">Name : {result.bridegroom_Data.bridegroom_name}</h3>
                <p className='engagem_peson_baptiname'>Baptism Name : {result.bridegroom_Data.bridegroom_baptism_name}</p>
                <p className='engagem_peson_familyname'>Family Name : {result.bridegroom_Data.bridegroom_familyName}</p>

                <Link className='enga_search-viewDetails' to={`/engagement/${result._id}`}>View Details</Link>
                <Link className='eng_search-editDetails' to={`/engagement/${result._id}/edit`}>Edit Engagement</Link>
                {/* <Link className='search-certificateDetails'  to={`/engagement/${result._id}/certificate`}>Certificate</Link> */}
        
              </div>
          
          </div>
          </motion.div>  
              // {/* </motion.div> */}
            ))}
        
          </div>
  
     
        )}
        
         </AnimatePresence>
      </div>
     
      </div>
      
    );
  }
export default EngagementSearch