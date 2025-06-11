import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/images/porsche.png';
import Button from './Button';
function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-left">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <ul className="navbar-center">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/articles">Articles</Link></li>
            </ul>

            <div className="navbar-right">
                <Link to="/login">
                    <Button>Login</Button>
                </Link>

            </div>
        </nav>
    );
}
export default Navbar;