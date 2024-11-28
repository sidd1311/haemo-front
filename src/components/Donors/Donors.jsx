// import React, { useState, useEffect } from 'react';
// import './Donors.css';
// import Pagination from '@mui/material/Pagination';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';

// const Donors = () => {
//   const [page, setPage] = useState(1);
//   const [donorsData, setDonorsData] = useState([]); // State to hold fetched donors data
//   const [bloodGroupFilter, setBloodGroupFilter] = useState('');
//   const [countryFilter, setCountryFilter] = useState('');
//   const [stateFilter, setStateFilter] = useState('');
//   const [districtFilter, setDistrictFilter] = useState('');
//   const [cityFilter, setCityFilter] = useState('');
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedDonor, setSelectedDonor] = useState(null);
//   const donorsPerPage = 4;

//   // Fetch donors data when component mounts
//   useEffect(() => {
//     const fetchDonors = async () => {
//       try {
//         const response = await fetch('http://localhost:3287/api/donors');
//         const data = await response.json();
//         setDonorsData(data); // Set the fetched data to state
//       } catch (error) {
//         console.error('Error fetching donors:', error);
//       }
//     };
//     fetchDonors();
//   }, []);

//   const handleChange = (event, value) => {
//     setPage(value);
//   };

//   const handleConnect = (donor) => {
//     setSelectedDonor(donor);
//     setOpenModal(true);
//   };

//   const filteredDonors = donorsData.filter(donor => {
//     return (
//       (bloodGroupFilter === '' || donor.bloodGroup === bloodGroupFilter) &&
//       (countryFilter === '' || donor.country === countryFilter) &&
//       (stateFilter === '' || donor.state === stateFilter) &&
//       (districtFilter === '' || donor.district === districtFilter) &&
//       (cityFilter === '' || donor.city === cityFilter)
//     );
//   });

//   const startIndex = (page - 1) * donorsPerPage;
//   const selectedDonors = filteredDonors.slice(startIndex, startIndex + donorsPerPage);

//   return (
//     <div className="donors-container">
//       <div className="banner">
//         <h2>Find Blood Donor</h2>
//         <div className="filters">
//           {/* Filters remain unchanged */}
//           <select value={bloodGroupFilter} onChange={(e) => setBloodGroupFilter(e.target.value)}>
//             <option value="">Blood Group</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//           </select>
//           <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
//             <option value="">Country</option>
//             <option value="India">India</option>
//             <option value="USA">USA</option>
//             {/* Add more countries as needed */}
//           </select>
//           <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
//             <option value="">State</option>
//             <option value="Maharashtra">Maharashtra</option>
//             <option value="California">California</option>
//             {/* Add more states */}
//           </select>
//           {/* More filters */}
//           <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)}>
//             <option value="">District</option>
//             <option value="Mumbai">Mumbai</option>
//             {/* More districts */}
//           </select>
//           <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
//             <option value="">City</option>
//             <option value="Mumbai">Mumbai</option>
//             {/* More cities */}
//           </select>
//           <button>Search</button>
//         </div>
//       </div>
//       <div className="table-container">
//         <table className="donors-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Availability</th>
//               <th>Mobile Number</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedDonors.map(donor => (
//               <tr key={donor._id}>
//                 <td>{donor.name}</td>
//                 <td>{donor.available ? 'Available' : 'Unavailable'}</td>
//                 <td>{donor.mobile}</td>
//                 <td>
//                   <button className="connect-button" onClick={() => handleConnect(donor)}>Connect</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Pagination
//           count={Math.ceil(filteredDonors.length / donorsPerPage)}
//           page={page}
//           onChange={handleChange}
//           className="pagination"
//         />
//       </div>

//       {/* Modal for donor details */}
//       <Modal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
        
//       </Modal>
//     </div>
//   );
// };

// export default Donors;


import React, { useState, useEffect } from 'react';
import './Donors.css';
import Pagination from '@mui/material/Pagination';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Donors = () => {
  const [page, setPage] = useState(1);
  const [donorsData, setDonorsData] = useState([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  // New states for dynamic data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const apiKey = 'N0VzMmU3RUJ1RnJ2WkQ2Y1FHY3BKZjJnd1MxaktBbHVxMDNCTWE1Qw=='; 
  const donorsPerPage = 4;

  // Fetch countries on component mount
  useEffect(() => {
    fetch('https://api.countrystatecity.in/v1/countries', {
      headers: { 'X-CSCAPI-KEY': apiKey }
    })
    .then(response => response.json())
    .then(data => setCountries(data))
    .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Fetch states based on selected country
  const fetchStates = (countryCode) => {
    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
      headers: { 'X-CSCAPI-KEY': apiKey }
    })
    .then(response => response.json())
    .then(data => setStates(data))
    .catch(error => console.error('Error fetching states:', error));
  };

  // Fetch cities based on selected state
  const fetchCities = (countryCode, stateCode) => {
    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
      headers: { 'X-CSCAPI-KEY': apiKey }
    })
    .then(response => response.json())
    .then(data => setCities(data))
    .catch(error => console.error('Error fetching cities:', error));
  };

  // Handle country, state, and city filter change
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setCountryFilter(country);
    setStateFilter('');
    setCityFilter('');
    fetchStates(country);
    setCities([]); // Reset cities when a new country is selected
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setStateFilter(state);
    setCityFilter('');
    fetchCities(countryFilter, state);
  };

  // Fetch donors data
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch(`https://haemo-backend.onrender.com/api/donors`);
        const data = await response.json();
        console.log(data);
        setDonorsData(data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };
    fetchDonors();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleConnect = (donor) => {
    setSelectedDonor(donor);
    setOpenModal(true);
  };

  const filteredDonors = donorsData.filter(donor => {
    return (
      (bloodGroupFilter === '' || donor.bloodGroup === bloodGroupFilter) &&
      (countryFilter === '' || donor.country === countryFilter) &&
      (stateFilter === '' || donor.state === stateFilter) &&
      (districtFilter === '' || donor.district === districtFilter) &&
      (cityFilter === '' || donor.city === cityFilter)
    );
  });

  const startIndex = (page - 1) * donorsPerPage;
  const selectedDonors = filteredDonors.slice(startIndex, startIndex + donorsPerPage);

  return (
    <div className="donors-container">
      <div className="banner">
        <h2>Find Blood Donor</h2>
        <div className="filters">
          <select value={bloodGroupFilter} onChange={(e) => setBloodGroupFilter(e.target.value)}>
            <option value="">Blood Group</option>
            {/* Blood group options */}
            <option value="">Blood Group</option>
             <option value="A+">A+</option>
             <option value="A-">A-</option>
            <option value="B+">B+</option>
             <option value="B-">B-</option>
             <option value="O+">O+</option>
             <option value="O-">O-</option>
             <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          </select>
          <select value={countryFilter} onChange={handleCountryChange}>
            <option value="">Country</option>
            {countries.map(country => (
              <option key={country.iso2} value={country.iso2}>{country.name}</option>
            ))}
          </select>
          <select value={stateFilter} onChange={handleStateChange}>
            <option value="">State</option>
            {states.map(state => (
              <option key={state.iso2} value={state.iso2}>{state.name}</option>
            ))}
          </select>
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="">City</option>
            {cities.map(city => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
          </select>
          <button>Search</button>
        </div>
      </div>
      <div className="table-container">
        <table className="donors-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Availability</th>
              <th>Mobile Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedDonors.map(donor => (
              <tr key={donor._id}>
                <td>{donor.name}</td>
                <td>{donor.available ? 'Available' : 'Unavailable'}</td>
                <td>{donor.mobile}</td>
                <td>
                  <button className="connect-button" onClick={() => handleConnect(donor)}>Connect</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(filteredDonors.length / donorsPerPage)}
          page={page}
          onChange={handleChange}
          className="pagination"
        />
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-box">
          {selectedDonor && (
            <div>
              <h3 id="modal-title">Donor Details</h3>
              <p><strong>Full Name:</strong> {selectedDonor.name}</p>
              <p><strong>Blood Group:</strong> {selectedDonor.bloodGroup}</p>
              <p><strong>Age:</strong> {selectedDonor.age}</p>
              <p><strong>Mobile No:</strong> {selectedDonor.mobile}</p>
              <p><strong>Weight:</strong> {selectedDonor.weight}</p>
              <p><strong>Email:</strong> {selectedDonor.email}</p>
              <p><strong>City:</strong> {selectedDonor.city}</p>
              <p><strong>State:</strong> {selectedDonor.state}</p>
              {/* <p><strong>District:</strong> {selectedDonor.district}</p> */}
              <p><strong>Country:</strong> {selectedDonor.country}</p>
              <p><strong>Disease:</strong> {selectedDonor.disease}</p>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Donors;
