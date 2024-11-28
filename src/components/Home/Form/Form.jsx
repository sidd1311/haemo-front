// import React, { useState } from 'react';
// import './Form.css';

// const Form = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         mobile: '',
//         email: '',
//         weight: '',
//         bloodGroup: '',
//         age: '',
//         disease: '',
//         country: '',    
//         state: '',
//         city: '',
//         district: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:3287/api/register-donor', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 alert(`Donor registered successfully. Donor ID: ${data.donorId}`);
//                 // Optionally reset the form after submission
//                 setFormData({
//                     name: '',
//                     mobile: '',
//                     email: '',
//                     weight: '',
//                     bloodGroup: '',
//                     age: '',
//                     disease: '',
//                     country: '',
//                     state: '',
//                     city: '',
//                     district: ''
//                 });
//             } else {
//                 alert(`Error: ${data.message}`);
//             }
//         } catch (error) {
//             console.error('Error during form submission:', error);
//             alert('An error occurred while submitting the form.');
//         }
//     };

//     return (
//         <div className="form-container">
//             <h2>Do you want to donate blood? Fill the information.</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-row">
//                     <div className="form-group">
//                         <label htmlFor="name">Full Name:</label>
//                         <input type="text" id="name" name="name" placeholder='Arav Sharma' value={formData.name} onChange={handleChange} required />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="mobile">Mobile No:</label>
//                         <input type="text" id="mobile" name="mobile" placeholder='+91 924532677' value={formData.mobile} onChange={handleChange} required />
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group">
//                         <label htmlFor="email">Email Address:</label>
//                         <input type="email" id="email" name="email" placeholder="arav21@gmail.com" value={formData.email} onChange={handleChange} required />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="weight">Weight:</label>
//                         <input type="text" id="weight" name="weight" placeholder='50kg' value={formData.weight} onChange={handleChange} required />
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group">
//                         <label htmlFor="bloodGroup">Blood Group:</label>
//                         <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
//                             <option value="">Select Blood Group</option>
//                             <option value="A+">A+</option>
//                             <option value="A-">A-</option>
//                             <option value="B+">B+</option>
//                             <option value="B-">B-</option>
//                             <option value="AB+">AB+</option>
//                             <option value="AB-">AB-</option>
//                             <option value="O+">O+</option>
//                             <option value="O-">O-</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="age">Age:</label>
//                         <input type="number" id="age" name="age" placeholder='30 years' value={formData.age} onChange={handleChange} required />
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group">
//                         <label htmlFor="country">Country:</label>
//                         <input
//                             type="text"
//                             id="country"
//                             name="country"
//                             placeholder="Enter your Country"
//                             value={formData.country}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="state">State:</label>
//                         <input
//                             type="text"
//                             id="state"
//                             name="state"
//                             placeholder="Enter your state"
//                             value={formData.state}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group">
//                         <label htmlFor="district">District:</label>
//                         <input
//                             type="text"
//                             id="district"
//                             name="district"
//                             placeholder="Enter your district"
//                             value={formData.district}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="city">City:</label>
//                         <input
//                             type="text"
//                             id="city"
//                             name="city"
//                             placeholder="Enter your city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group">
//                         <label htmlFor="disease">Do you have any disease?</label>
//                         <textarea id="disease" name="disease" placeholder='I have Hypertension' value={formData.disease} onChange={handleChange} rows="3" />
//                     </div>
//                 </div>
//                 <div className="submit-button-container">
//                     <button type="submit" className="submit-button">Submit</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Form;


import React, { useState, useEffect } from 'react';
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        weight: '',
        bloodGroup: '',
        age: '',
        disease: '',
        country: '',
        state: '',
        city: ''
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const apiKey = 'N0VzMmU3RUJ1RnJ2WkQ2Y1FHY3BKZjJnd1MxaktBbHVxMDNCTWE1Qw=='; 


    useEffect(() => {
        fetch('https://api.countrystatecity.in/v1/countries', {
            headers: { 'X-CSCAPI-KEY': apiKey }
        })
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(error => console.error('Error fetching countries:', error));
    }, []);

    
    const fetchStates = (countryCode) => {
        fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
            headers: { 'X-CSCAPI-KEY': apiKey }
        })
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
    };

    
    const fetchCities = (countryCode, stateCode) => {
        fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
            headers: { 'X-CSCAPI-KEY': apiKey }
        })
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'country') {
            fetchStates(value);
            setFormData(prevData => ({ ...prevData, state: '', city: '' }));
            setStates([]);
            setCities([]);
        } else if (name === 'state') {
            fetchCities(formData.country, value);
            setFormData(prevData => ({ ...prevData, city: '' }));
            setCities([]);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://haemo-backend.onrender.com/api/register-donor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Donor registered successfully. Donor ID: ${data.donorId}`);
                // Optionally reset the form after submission
                setFormData({
                    name: '',
                    mobile: '',
                    email: '',
                    weight: '',
                    bloodGroup: '',
                    age: '',
                    disease: '',
                    country: '',
                    state: '',
                    city: '',
                    district: ''
                });
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred while submitting the form.');
        }
    };
    return (
        <div className="form-container">
            <h2>Do you want to donate blood? Fill the information.</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input type="text" id="name" name="name" placeholder='Arav Sharma' value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile No:</label>
                        <input type="text" id="mobile" name="mobile" placeholder='+91 924532677' value={formData.mobile} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" id="email" name="email" placeholder="arav21@gmail.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input type="text" id="weight" name="weight" placeholder='50kg' value={formData.weight} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="bloodGroup">Blood Group:</label>
                        <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="text" id="age" name="age" placeholder='30 years' value={formData.age} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country.iso2} value={country.iso2}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <select id="state" name="state" value={formData.state} onChange={handleChange} required>
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <select id="city" name="city" value={formData.city} onChange={handleChange} required>
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city.name} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="disease">Do you have any disease?</label>
                        <textarea id="disease" name="disease" placeholder='I have Hypertension' value={formData.disease} onChange={handleChange} rows="3" />
                    </div>
                </div>
                <div className="submit-button-container">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Form;

