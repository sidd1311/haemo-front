import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import backgroundImage from '../../../assets/2.avif';
import Form from '../Form/Form';

const Hero = () => {
    const navigate = useNavigate(); 

    const handleDonateNowClick = () => {
        navigate(<Form/>); 
    };

    return (
        <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="hero-content">
                <h1 className="hero-title">Donate Blood,<br /> Save Life!</h1>
                <h2 className='hero-line'>Your Blood Can Bring Smile in Other Person's Life!</h2>
                <button className="hero-button" onClick={handleDonateNowClick}>Donate Now</button>
            </div>
        </div>
    );
}

export default Hero;
