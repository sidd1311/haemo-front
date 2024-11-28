import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminOrder.css";
import { Select } from "@mui/material";

const initialOrders = [
  {
    id: 1,
    date: "2024-08-20",
    bloodType: "O+",
    quantity: 3,
    status: "Pending",
    hospital: "City Hospital",
  },
  {
    id: 2,
    date: "2024-08-18",
    bloodType: "A-",
    quantity: 2,
    status: "Completed",
    hospital: "General Hospital",
  },
  {
    id: 3,
    date: "2024-08-19",
    bloodType: "B+",
    quantity: 1,
    status: "Cancelled",
    hospital: "Clinic X",
  },
  {
    id: 4,
    date: "2024-08-22",
    bloodType: "O-",
    quantity: 4,
    status: "Pending",
    hospital: "Metro Hospital",
  },
  {
    id: 5,
    date: "2024-08-21",
    bloodType: "AB+",
    quantity: 5,
    status: "Completed",
    hospital: "Apollo Hospital",
  },
  {
    id: 6,
    date: "2024-08-23",
    bloodType: "B-",
    quantity: 2,
    status: "Pending",
    hospital: "Sunrise Clinic",
  },
  {
    id: 7,
    date: "2024-08-24",
    bloodType: "A+",
    quantity: 3,
    status: "Cancelled",
    hospital: "Care Hospital",
  },
  {
    id: 8,
    date: "2024-08-25",
    bloodType: "O+",
    quantity: 6,
    status: "Completed",
    hospital: "Narayana Health",
  },
  {
    id: 9,
    date: "2024-08-26",
    bloodType: "AB-",
    quantity: 1,
    status: "Pending",
    hospital: "Fortis Hospital",
  },
  {
    id: 10,
    date: "2024-08-27",
    bloodType: "B+",
    quantity: 4,
    status: "Completed",
    hospital: "Max Hospital",
  },
];


const AdminOrder = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);

  const ordersPerPage = 8;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders
    .filter(
      (order) =>
        (searchQuery === "" ||
          order.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toString().includes(searchQuery)) &&
        (statusFilter === "" || order.status === statusFilter) &&
        (bloodTypeFilter === "" || order.bloodType === bloodTypeFilter)
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOption === "bloodType") {
        return a.bloodType.localeCompare(b.bloodType);
      }
      return 0;
    })
    .slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleBloodTypeFilter = (event) => {
    setBloodTypeFilter(event.target.value);
  };

  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setEditedOrder({ ...order });
  };

  const handleSave = (orderId) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? editedOrder : order))
    );
    setEditingOrderId(null);
    setEditedOrder(null);
  };

  const handleDelete = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmed) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="admin-orders">
      <div className="header">
        <h1>Order List</h1>
        <div className="filter-sort-bar">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by Order ID, Hospital, or Blood Type"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={handleStatusFilter}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            className="filter-select"
            value={bloodTypeFilter}
            onChange={handleBloodTypeFilter}
          >
            <option value="">All Blood Types</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Blood Type</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Hospital</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {editingOrderId === order.id ? (
                  <input
                    type="date"
                    name="date"
                    value={editedOrder.date}
                    onChange={handleChange}
                  />
                ) : (
                  order.date
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <select
                    // type="text"
                    name="bloodType"
                    value={editedOrder.bloodType}
                    onChange={handleChange}
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                ) : (
                  order.bloodType
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editedOrder.quantity}
                    onChange={handleChange}
                  />
                ) : (
                  order.quantity
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <select
                    name="status"
                    value={editedOrder.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <input
                    type="text"
                    name="hospital"
                    value={editedOrder.hospital}
                    onChange={handleChange}
                  />
                ) : (
                  order.hospital
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <button
                    className="action-btn save-btn"
                    onClick={() => handleSave(order.id)}
                  >
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                ) : (
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(order)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(order.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Stack spacing={2} alignItems="center">
        <Pagination
          count={Math.ceil(orders.length / ordersPerPage)}
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

export default AdminOrder;
