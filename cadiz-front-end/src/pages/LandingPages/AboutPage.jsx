import pic from '../../assets/images/porsche3.jpg';
import React from 'react';
const AboutPage = () => {
    return (
<div className="aboutpage">
<h1>ABOUT PAGE TO</h1>
<img src={pic} alt="pic" className="pic" />
<p>Lighter than before and featuring increased downforce, the performance of the new 911 GT3 RS has been raised to levels which make it an aerodynamic wonder</p>
   </div>
    );
};
export default AboutPage;