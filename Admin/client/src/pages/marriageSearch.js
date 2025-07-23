import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/marriageSearch.css';
import Loading from './loadingPage';
import 'animate.css';
import { AnimatePresence, motion } from 'framer-motion';

 function MarriageSearch() {
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
          const response = await axios.get(`http://localhost:5000/api/searchMarriage?searchTerm=${searchTerm}`);
          setSearchResults(response.data.results);
          setIsSearchPerformed(true);
        } catch (error) {
          console.error('Error searching marriage records:', error);
          // Handle error
        }
      }
    
  
  
    setIsLoading(true);
    try {
      let response;
      if (searchTerm.length === 1) {
        response = await axios.get(`http://localhost:5000/api/searchMarriage?searchTerm=${searchTerm}`);
      } else {
        response = await axios.get(`http://localhost:5000/api/searchMarriage?searchTerm=${searchTerm}`);
      }
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
      setSearchResults(null);
    }
    setIsLoading(false);
  };
  
    return (
      <div className="marraiage_serach_box">
      <div className="marraiage_serach">
        
        <input
          placeholder='Search...'
          className="marriage_searchinput"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="marriage_searchbutton" onClick={handleSearch}>Search</button>
        {isLoading && <Loading />}
        <AnimatePresence>
        {isSearchPerformed && (
          <div className="marriage_listbar">
                {searchResults==0||searchResults==null?<>No data</>:
            searchResults.map((result) => (
            <motion.div
          key={result._id}
          className="result-item animate__animated animate__fadeInUp"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
  
  <div key={result._id} className="marriage_listbar">
              <div key={result._id} className="marriage_box">
          
           
                <h3 className="marriage_peson_realname">Name : {result.bridegroom_Marriagedata.bridegroom_name}</h3>
                <p className='marriage_peson_baptiname'>Baptism Name : {result.bridegroom_Marriagedata.bridegroom_baptism_name}</p>
                <p className='marraige_peson_familyname'>Family Name : {result.bridegroom_Marriagedata.bridegroom_familyName}</p>

                <Link className='marri_search-viewDetails' to={`/marriage/${result._id}`}>View Details</Link>
                <Link className='marri_search-editDetails' to={`/marriage/${result._id}/edit`}>Edit marriage</Link>
                <Link className='marri_search-certificate'  to={`/marriage/${result._id}/certificate`}>Certificate</Link>
        
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
export default MarriageSearch