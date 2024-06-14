import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; // Importing motion for animations

const User = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to navigate back to home page
    const goHome = () => {
        navigate('/github-finder');
    };

    const userUrl = `https://api.github.com/users/${username}`;
    const repoUrl = `https://api.github.com/users/${username}/repos`;

    // Fetching user data from GitHub API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(userUrl);
                console.log('User data:', data); // Debug log for user data
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Fetching user repositories from GitHub API
        const fetchUserRepos = async () => {
            try {
                const { data } = await axios.get(repoUrl);
                console.log('Repo data:', data); // Debug log for repository data
                setRepos(data);
            } catch (error) {
                console.error('Error fetching user repositories:', error);
            }
        };

        const fetchData = async () => {
            await fetchUserData();
            await fetchUserRepos();
            setLoading(false); // Set loading to false after fetching data
        };

        fetchData();
    }, [username]); // Dependency array to re-fetch data when username changes

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-CA', options);
    };

    // Displaying loading message until user data is fetched
    if (loading) return <div>Loading...</div>;

    return (
        <motion.main
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="profile">
                <figure>
                    <img src={user.avatar_url} alt="avatar" />
                </figure>
                <div className="username">
                    <p>{user.login}</p>
                </div>
                <div className="userDetails">
                    <div className="details">
                        <span className="count">{user.public_repos}</span>
                        <p>Repositories</p>
                    </div>
                    <div className="details">
                        <span className="count">{user.followers}</span>
                        <p>Followers</p>
                    </div>
                    <div className="details">
                        <span className="count">{user.following}</span>
                        <p>Following</p>
                    </div>
                </div>
                <div className="btn">
                    <button className="button" onClick={() => window.location.href = `https://github.com/${username}`}>
                        Go to Github
                    </button>
                </div>
            </div>

            <section className="repo-section">
                <h2>
                    {user.public_repos > 0 ? `My Repositor${user.public_repos === 1 ? "y" : "ies"}` : "No repositories found..."}
                </h2>
                {repos.map((repo) => (
                    <div className="repos" key={repo.id}>
                        <div className="repoInfo">
                            <p className="repoName">
                                <a href={`https://github.com/${repo.owner.login}/${repo.name}`}>
                                    {repo.name}
                                </a>
                            </p>
                            <p className="date">Updated at {formatDate(repo.updated_at)}</p>
                        </div>
                        <div className="description">
                            {repo.description || "No description"}
                        </div>
                    </div>
                ))}
            </section>
            <button className="home" onClick={goHome}>
                Home
            </button>
        </motion.main>
    );
};

export default User;
