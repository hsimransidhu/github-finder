import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Search = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

       // Function to check if the entered GitHub user exists
    const checkUserExists = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${input}`);
            navigate(`/github-finder/user/${input}`);
            setError('');
            setInput('');
        } catch (err) {
            setError('User not found :(');
            setInput('');
        }
    };

     // Function to handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        checkUserExists();
    };

    return (
        <section className="search">
            <h1>Github Finder</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Search user"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="search-button">Find user</button>
            </form>
            {error && <p className='error'>{error}</p>}
        </section>
    );
};

export default Search;
