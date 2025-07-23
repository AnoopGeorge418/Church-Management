import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Css/familySearchBar.css';

const FamilySearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    // Check for special characters and numbers
    if (/[^a-zA-Z\s]/.test(value)) {
      alert('No special characters or numbers allowed.');
      return;
    }
    
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await axios.post(
        'http://localhost:5000/api/families/user/searchfamily',
        { searchQuery },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = response.data;
      console.log(data);
      if (data.searchResult) {
        setSearchResult(data.searchResult);
        setErrorMessage('');
        setSuccessMessage('Search result found!');
      } else if (data.searchResult === null) {
        setSearchResult(null);
        setErrorMessage(data.message);
        setSuccessMessage('');
      } else if (!data.searchResult && data.message === 'Family found but not active') {
        setSearchResult(null);
        setErrorMessage('');
        setSuccessMessage('Family found but not active');
      } else {
        setSearchResult(null);
        setErrorMessage(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      // Handle error if the request fails
      console.error('Error:', error);
      setErrorMessage('An error occurred while searching.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="FamilySearchBar_continar">
      <form className="FamilySearchBar_search-form" onSubmit={handleSubmit}>
        <input
          className="FamilySearchBar_searchforfam-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button type="submit" className='FamilySearchBar_button'>Search</button>
        
      </form>
      {errorMessage && !searchResult && <p className="FamilySearchBarerror-message">{errorMessage}</p>}
      {successMessage && searchResult && <p className="FamilySearchBarsuccess-message">{successMessage}</p>}
      {searchResult && (
  <div className="FamilySearchBarsearch-result">
    <p>Search Result:</p>
    <ul>
      <li>
        <strong>House Name: </strong>
        {searchResult.houseName}
      </li>
      <li>
        <strong>Address: </strong>
        {searchResult.address}
      </li>
      <li>
        <strong>House Pincode: </strong>
        {searchResult.housepincode}
      </li>
      <li>
        <strong>Father's Name: </strong>
        {searchResult.father.name}
      </li>
      <li>
        <strong>Mother's Name: </strong>
        {searchResult.mother.name}
      </li>
      <li>
        <strong>Children: </strong>
        {searchResult.children.length > 0 ? (
          <ul>
            {searchResult.children.map((child) => (
              <li key={child._id}>
                <strong>Name: </strong>
                {child.name}
                {child.wife && (
                  <>
                    <br />
                    <strong>Wife's Name: </strong>
                    {child.wife.name}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No children found.</p>
        )}
      </li>
    </ul>
  </div>
)}
{!searchResult ? (
  <ul>
    <li>Please Login with the Email or Phone number</li>
    <li>Make sure while registering that Email address matches with the Email you provided to the church</li>
    <li>You can only view other family details if your family details are available in the database</li>
  </ul>
) : null}

        </div>
  );
};

export default FamilySearchBar;
