import React from 'react';
import './Home.css';
import logo from '../images/logo.png';

const Home = () => {
   return <> 
        <div className='homeLogoContainer'><img src={logo} alt='Logo' className='homeLogo' /></div>
       </> 
}
export default Home;