import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './Buttons.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleLogin = async (name) => {
    if (!name) {
      setError('Name is required');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate a delay (replace with your actual login logic)
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    localStorage.setItem('user', name);
    setUser(name);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Fragment>
      <Helmet><title>Home - Test Your Knowledge</title></Helmet>
      <div id="home">
        <section> {/* The <section> now has flexbox styles in Buttons.css */}
          <h1>Test Your Knowledge</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            user ? (
              <div> 
                <h2>{getGreeting()}, {user}!</h2>
                <Link to="/play/instructions" className="button quiz-button">
                  Go to Quiz
                </Link>
                <button onClick={handleLogout} className="button logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <LoginForm onLogin={handleLogin} error={error} />
            )
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
