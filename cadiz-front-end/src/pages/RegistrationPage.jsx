import React, { useState } from 'react';
import Button from '../components/Button';
import "../styles/Register.css";
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/UserService';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        address: '',
        type: 'viewer',
        isActive: true
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        console.log('Register button clicked');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            setLoading(false);
            return;
        }

        try {
            // Remove confirmPassword before sending to API
            const { confirmPassword, ...userData } = formData;
            await createUser(userData);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                {error && <div className="register-error">{error}</div>}
                <form className="register-form" onSubmit={handleRegister}>
                    {/* First Name and Last Name side by side */}
                    <div style={{ display: 'flex', gap: '0.7rem' }}>
                        <div className="register-input-group" style={{ flex: 1 }}>
                            <label htmlFor="firstName" className="register-label">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="register-input"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="register-input-group" style={{ flex: 1 }}>
                            <label htmlFor="lastName" className="register-label">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="register-input"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Age and Gender side by side */}
                    <div style={{ display: 'flex', gap: '0.7rem' }}>
                        <div className="register-input-group" style={{ flex: 1 }}>
                            <label htmlFor="age" className="register-label">Age</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                className="register-input"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="register-input-group" style={{ flex: 1 }}>
                            <label htmlFor="gender" className="register-label">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                className="register-input"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* The rest of the fields stacked */}
                    <div className="register-input-group">
                        <label htmlFor="contactNumber" className="register-label">Contact Number</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            className="register-input"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="email" className="register-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="register-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="username" className="register-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="register-input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="password" className="register-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="register-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="register-input"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="address" className="register-label">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            className="register-input"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows="3"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="/login" style={{ color: '#646cff', textDecoration: 'underline', cursor: 'pointer' }}>
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;