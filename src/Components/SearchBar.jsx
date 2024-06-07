import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SearchBar = ({ value, onChange, onClearSearch, setNotes }) => {
    const handleSearch = async () => {
        try {
            const query = value;
            const accessToken = localStorage.getItem("token");

            // Correct axios call for a POST request with headers
            if(accessToken){
            const response = await axios.post(`https://server-sudarsanamg-sudarsanam-gs-projects.vercel.app/search-note?query=${query}`,{},{
                headers: {
      Authorization: `Bearer ${accessToken}`
    }}
  
);
            console.log(response.data)
            setNotes(response.data.matchingNotes);}
        } catch (error) {
            console.error("Error fetching notes:", error);
            if (error.response && error.response.status === 401) {
                alert('Unauthorized: Please log in.');
            }
        }
    };

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
            <input 
                type="text" 
                value={value}
                placeholder='Search a note'
                onChange={onChange}
                style={{ width: '100%', padding: '0.5rem', paddingRight: '2.5rem', boxSizing: 'border-box' }}
            />
            <div style={{ position: 'absolute', right: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon 
                    icon={faSearch} 
                    style={{ cursor: 'pointer', marginRight: value ? '0.5rem' : '0' }} 
                    onClick={handleSearch}
                />
                {value && (
                    <FontAwesomeIcon 
                        icon={faTimes} 
                        onClick={onClearSearch}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </div>
        </div>
    );
}

export default SearchBar;
