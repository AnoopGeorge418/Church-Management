import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Css/familySearchBar.css';
import 'animate.css';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from './loadingPage';
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
   
    const query = searchQuery.trim();
    if (query === '') {
      setSearchResult(null);
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (query.length === 1) {
        response = await axios.get(`http://localhost:5000/api/searchFamily?q=${query}`);
      } else {
        response = await axios.get(`http://localhost:5000/api/searchFamily?q=${query}`);
      }
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
      setSearchResult(null);
    }
    setIsLoading(false);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button animate__animated animate__fadeInRight">
        Search
      </button>

      {isLoading && <Loading />}

      <AnimatePresence>
        {searchResult && (
          <motion.div
            className="search-result animate__animated animate__fadeIn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {searchResult.length > 0 ? (
              <ul className="result-list">
                {searchResult.map((person) => (
                  <motion.li
                    key={person._id}
                    className="result-item animate__animated animate__fadeInUp"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="card">
                      <div className="card-header">
                        <p className="father-name">Father: {person.father.name}</p>
                        <p className="mother-name">Mother: {person.mother.name}</p>
                      </div>
                      <div className="card-body">
                        {person.children.length > 0 && (
                          <ul className="children-list">
                            Children:
                            {person.children.map((child) => (
                              <li key={child._id}>
                                {child.name}
                                {child.wife && <span className="child-wife">(Wife: {child.wife.name})</span>}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="card-footer">
                        <Link to={`/familySearchBar/${person._id}`} className="details-link">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.p
                className="no-results-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No results found.
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



export default SearchBar;