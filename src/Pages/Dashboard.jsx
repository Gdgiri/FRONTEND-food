import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import your CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems, totalAmount } = location.state || {
    selectedItems: {},
    totalAmount: 0,
  };

  const handleClick = () => {
    navigate("/data");
  };

  return (
    <div className="dashboard-container text-center m-5 pt-5 ">
      <h1>Your Selected Food</h1>

      <button className="btn btn-primary" onClick={handleClick}>
        Back to Food Selection
      </button>
      {Object.keys(selectedItems).length === 0 ? (
        <p>No items selected.</p>
      ) : (
        <ul>
          {Object.entries(selectedItems).map(([optionId, option]) => (
            <li key={optionId}>
              {option.label} - Price: ₹{option.price}
            </li>
          ))}
        </ul>
      )}
      <h2>Total Amount: ₹{totalAmount/2}</h2>
    </div>
  );
};

export default Dashboard;
