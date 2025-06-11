import React from 'react'
import { useLocation } from 'react-router-dom';

const WelcomePage = () => {
    const location = useLocation();
    const { name } = location.state || {};
    return (
        <h1>Welcome {name}!</h1>
    )
}
export default WelcomePage