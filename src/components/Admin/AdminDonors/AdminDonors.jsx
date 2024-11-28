import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AdminProspects from "../AdminProspects/AdminProspects";
import "./AdminDonors.css";

const AdminDonors = () => {
  const [donors, setDonors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const donorsPerPage = 8;

  // Fetch donors from the backend API
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch(
          `https://haemo-backend.onrender.com/api/approved-donors`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch donors");
        const data = await response.json();
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleAddDonor = () => {
    setEditingDonor(null);
    setShowForm(!showForm);
  };

  const handleEdit = (donor) => {
    setEditingDonor(donor);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://haemo-backend.onrender.com/api/delete-donor/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete donor");

      setDonors(donors.filter((donor) => donor._id !== id));
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingDonor((prevDonor) => ({
      ...prevDonor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingDonor?._id ? "PUT" : "POST";
      const url = editingDonor?._id
        ? `https://haemo-backend.onrender.com/api/edit-donor/${editingDonor._id}`
        : `https://haemo-backend.onrender.com/api/add-donor`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingDonor),
      });

      if (!response.ok) throw new Error("Failed to save donor");

      const updatedDonor = await response.json();
      setDonors((prevDonors) => {
        if (editingDonor?._id) {
          return prevDonors.map((donor) =>
            donor._id === editingDonor._id ? updatedDonor : donor
          );
        } else {
          return [...prevDonors, updatedDonor];
        }
      });

      setEditingDonor(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving donor:", error);
    }
  };

  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = donors.slice(indexOfFirstDonor, indexOfLastDonor);

  return (
    <div className="admin-donors">
      <div className="header">
        <h1>All Donors</h1>
        <button className="add-donor-button" onClick={handleAddDonor}>
          {showForm ? "Cancel" : "New Donor"}
        </button>
      </div>
      <AdminProspects onApprove={(prospect) => setDonors([...donors, prospect])} />
      {showForm && (
        <div className="donor-form">
          <h2>{editingDonor ? "Edit Donor" : "Add New Donor"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editingDonor?.name || ""}
              onChange={handleFormChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editingDonor?.email || ""}
              onChange={handleFormChange}
              required
            />
            {/* Additional fields for donor details */}
            <button type="submit" className="submit-button">
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
          </form>
        </div>
      )}
      <table className="donors-table">
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
          {currentDonors.map((donor) => (
            <tr key={donor._id}>
              <td>{donor._id}</td>
              <td>{donor.name}</td>
              <td>{donor.email}</td>
              <td>
                {donor.city}, {donor.state}, {donor.country}
              </td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.disease}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(donor)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(donor._id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={Math.ceil(donors.length / donorsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: () => <FontAwesomeIcon icon={faChevronLeft} />,
                next: () => <FontAwesomeIcon icon={faChevronRight} />,
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default AdminDonors;
