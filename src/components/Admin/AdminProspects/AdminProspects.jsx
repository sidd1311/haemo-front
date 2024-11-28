// import React, { useState, useEffect } from 'react';
// import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';
// import Stack from '@mui/material/Stack';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import './AdminProspects.css';

// const AdminProspects = ({ onApprove }) => {
//   const [prospects, setProspects] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showForm, setShowForm] = useState(false);
//   const [editingProspect, setEditingProspect] = useState(null);
//   const prospectsPerPage = 8;

//   // Fetch unapproved donors from the backend
//   useEffect(() => {
//     const fetchUnapprovedDonors = async () => {
//       try {
//         const response = await fetch("http://localhost:3287/api/unapproved-donor");
//         if (!response.ok) throw new Error("Failed to fetch unapproved donors");
//         const data = await response.json();
//         setProspects(data);
//       } catch (error) {
//         console.error("Error fetching unapproved donors:", error);
//       }
//     };

//     fetchUnapprovedDonors();
//   }, []);

//   const indexOfLastProspect = currentPage * prospectsPerPage;
//   const indexOfFirstProspect = indexOfLastProspect - prospectsPerPage;
//   const currentProspects = prospects.slice(indexOfFirstProspect, indexOfLastProspect);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const handleApprove = (prospect) => {
//     onApprove(prospect);
//     setProspects((prevProspects) => prevProspects.filter((p) => p.id !== prospect.id));
//   };

//   return (
//     <div className="admin-prospects">
//       <div className="header">
//         <h1>All Prospects</h1>
//         <button className="add-prospect-button" onClick={() => setShowForm(!showForm)}>
//           {showForm ? 'Cancel' : 'New Prospect'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="prospect-form">
//           <h2>{editingProspect ? 'Edit Prospect' : 'Add New Prospect'}</h2>
//           <form>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={editingProspect?.name || ''}
//                 onChange={(e) => setEditingProspect({ ...editingProspect, name: e.target.value })}
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={editingProspect?.email || ''}
//                 onChange={(e) => setEditingProspect({ ...editingProspect, email: e.target.value })}
//               />
//             </label>
//             <button type="submit" className="submit-button">Submit</button>
//           </form>
//         </div>
//       )}

//       <table className="prospects-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Blood Type</th>
//             <th>Diseases</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProspects.map(prospect => (
//             <tr key={prospect._id}>
//               <td>{prospect._id}</td>
//               <td>{prospect.name}</td>
//               <td>{prospect.email}</td>
//               <td>{prospect.city}, {prospect.state}, {prospect.country}</td>
//               <td>{prospect.bloodGroup}</td>
//               <td>{prospect.disease}</td>
//               <td>
//                 <button className="approve-button" onClick={() => handleApprove(prospect)}>Approve</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Stack spacing={2} alignItems="center">
//         <Pagination
//           count={Math.ceil(prospects.length / prospectsPerPage)}
//           page={currentPage}
//           onChange={handlePageChange}
//           renderItem={(item) => (
//             <PaginationItem
//               slots={{
//                 previous: () => <FontAwesomeIcon icon={faChevronLeft} />,
//                 next: () => <FontAwesomeIcon icon={faChevronRight} />
//               }}
//               {...item}
//             />
//           )}
//         />
//       </Stack>
//     </div>
//   );
// };

// export default AdminProspects;


import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './AdminProspects.css';

const AdminProspects = ({ onApprove }) => {
  const [prospects, setProspects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProspect, setEditingProspect] = useState(null);
  const prospectsPerPage = 8;

  // Fetch unapproved donors from the backend
  useEffect(() => {
    const fetchUnapprovedDonors = async () => {
      try {
        const response = await fetch("http://localhost:3287/api/unapproved-donor");
        if (!response.ok) throw new Error("Failed to fetch unapproved donors");
        const data = await response.json();
        setProspects(data);
      } catch (error) {
        console.error("Error fetching unapproved donors:", error);
      }
    };

    fetchUnapprovedDonors();
  }, []);

  const indexOfLastProspect = currentPage * prospectsPerPage;
  const indexOfFirstProspect = indexOfLastProspect - prospectsPerPage;
  const currentProspects = prospects.slice(indexOfFirstProspect, indexOfLastProspect);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleApprove = async (prospect) => {
    try {
      const response = await fetch(`http://localhost:3287/api/approve-donor/${prospect._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the approved donor from the list
        setProspects((prevProspects) => prevProspects.filter((p) => p._id !== prospect._id));
        // Trigger any additional onApprove action, if needed
        if (onApprove) onApprove(prospect);
      } else {
        console.error("Failed to approve donor");
      }
    } catch (error) {
      console.error("Error approving donor:", error);
    }
  };

  return (
    <div className="admin-prospects">
      <div className="header">
        <h1>All Prospects</h1>
        <button className="add-prospect-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Prospect'}
        </button>
      </div>

      {showForm && (
        <div className="prospect-form">
          <h2>{editingProspect ? 'Edit Prospect' : 'Add New Prospect'}</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editingProspect?.name || ''}
                onChange={(e) => setEditingProspect({ ...editingProspect, name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editingProspect?.email || ''}
                onChange={(e) => setEditingProspect({ ...editingProspect, email: e.target.value })}
              />
            </label>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}

      <table className="prospects-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Blood Type</th>
            <th>Diseases</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProspects.map(prospect => (
            <tr key={prospect._id}>
              <td>{prospect._id}</td>
              <td>{prospect.name}</td>
              <td>{prospect.email}</td>
              <td>{prospect.city}, {prospect.state}, {prospect.country}</td>
              <td>{prospect.bloodGroup}</td>
              <td>{prospect.disease}</td>
              <td>
                <button className="approve-button" onClick={() => handleApprove(prospect)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Stack spacing={2} alignItems="center">
        <Pagination
          count={Math.ceil(prospects.length / prospectsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: () => <FontAwesomeIcon icon={faChevronLeft} />,
                next: () => <FontAwesomeIcon icon={faChevronRight} />
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default AdminProspects;
