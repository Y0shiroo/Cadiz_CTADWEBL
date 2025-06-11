import React, { useState } from 'react';
import Button from '../components/Button';
import "../styles/Register.css";
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Simulate registration logic
        console.log('Registration submitted:', {
            name,
            email,
            password,
        });

        // Redirect to login after "registration"
        navigate('/login');
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                {error && <div className="register-error">{error}</div>}
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="register-input-group">
                        <label htmlFor="name" className="register-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="register-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="register-input-group">
                        <label htmlFor="email" className="register-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="register-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="register-input-group">
                        <label htmlFor="password" className="register-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="register-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="register-input-group">
                        <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="register-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;