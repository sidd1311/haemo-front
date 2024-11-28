import React from 'react';
import './Who.css';
import video from "../../../assets/vedio.mp4";

const Who = () => {
    return (
        <div className="who-section">
            
            <div className="text-container">
                <h2>Who We Are?</h2>
                <p>HaemoShare is for public donation center with blood donation members in the changing health care system.</p>
                <ul>
                    <li>Specialist blood donors and clinical supervision.</li>
                    <li>Increasing communication with our members.</li>
                    <li>High quality assessment, diagnosis, and treatment.</li>
                    <li>Examine critically to ensure alignment.</li>
                    <li>The extra care of a multi-disciplinary team.</li>
                </ul>
            </div>
            <div className="video-container">
                <video autoPlay loop muted className="background-video">
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}

export default Who;
