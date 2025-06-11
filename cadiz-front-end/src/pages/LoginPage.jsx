import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/UserService';
import '../styles/LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser({ email, password });
            const data = response.data;
            console.log('Login successful:', data);

            // Store user data in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('userType', data.type);
            localStorage.setItem('isAuthenticated', 'true');

            // Redirect based on user type
            if (data.type === 'admin') {
                navigate('/dashboard/users');
            } else if (data.type === 'editor') {
                navigate('/dashboard/articles');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.status === 404) {
                setError('User not found. Please check your email.');
            } else if (err.response?.status === 401) {
                setError('Invalid password. Please try again.');
            } else if (err.response?.status === 403) {
                setError('Your account is inactive. Please contact an administrator.');
            } else {
                setError(err.response?.data?.message || 'Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginpage-container">
            <div className="loginpage-card">
                <h2 className="loginpage-title">Login</h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <form className="loginpage-form" onSubmit={handleLogin}>
                    <div className="loginpage-input-group">
                        <label htmlFor="email" className="loginpage-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="loginpage-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="loginpage-input-group">
                        <label htmlFor="password" className="loginpage-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="loginpage-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="loginpage-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <Link to="/register" className="loginpage-register">
                        Don't have an account? Register here.
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;