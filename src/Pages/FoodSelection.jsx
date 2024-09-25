import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodSelection.css";

const FoodSelection = () => {
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVeg, setShowVeg] = useState(true); // State to toggle between veg and non-veg
  const [selectedItems, setSelectedItems] = useState({}); // Track selected items
  const [totalAmount, setTotalAmount] = useState(0); // Track total amount
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/catering/get"); // Update with your actual API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFoodData(data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  const handleVegClick = () => {
    setShowVeg(true);
  };

  const handleNonVegClick = () => {
    setShowVeg(false);
  };

  const handleCheckboxChange = (optionId, price, label) => {
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[optionId]) {
        // If already selected, remove it
        delete updatedItems[optionId];
        setTotalAmount((prevTotal) => prevTotal - price); // Subtract price directly
      } else {
        // If not selected, add it
        updatedItems[optionId] = { label, price };
        setTotalAmount((prevTotal) => prevTotal + price); // Add price directly
      }
      return updatedItems;
    });
  };

  const handleSubmit = () => {
    navigate("/", { state: { selectedItems, totalAmount } }); // Pass selected items and total amount to Dashboard
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!foodData) {
    return <div>No food options available.</div>;
  }
  console.log(foodData);
  return (
    <div>
      <h2>Food Selection</h2>
      <div>
        <button onClick={handleVegClick}>Vegetarian Options</button>
        <button onClick={handleNonVegClick}>Non-Vegetarian Options</button>
      </div>

      {showVeg ? (
        <>
          <h3>Vegetarian Options</h3>
          {foodData.veg && foodData.veg.length > 0 ? (
            foodData.veg.map((item) => (
              <div key={item._id}>
                <h4>{item.name}</h4>
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  style={{ width: "150px", height: "auto" }}
                />
                <h5>Options:</h5>
                <ul>
                  {item.options.map((option) => (
                    <li key={option.label}>
                      {" "}
                      {/* Changed to option.label for uniqueness */}
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              option.label, // Using label for option ID
                              option.price,
                              option.label
                            )
                          }
                          checked={!!selectedItems[option.label]} // Using label for checking
                        />
                        {option.label} - Price: ₹{option.price}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div>No vegetarian options available.</div>
          )}
        </>
      ) : (
        <>
          <h3>Non-Vegetarian Options</h3>
          {foodData.nonVeg && foodData.nonVeg.length > 0 ? (
            foodData.nonVeg.map((item) => (
              <div key={item._id}>
                <h4>{item.name}</h4>
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  style={{ width: "150px", height: "auto" }}
                />
                <h5>Options:</h5>
                <ul>
                  {item.options.map((option) => (
                    <li key={option.label}>
                      {" "}
                      {/* Changed to option.label for uniqueness */}
                      <label>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              option.label, // Using label for option ID
                              option.price,
                              option.label
                            )
                          }
                          checked={!!selectedItems[option.label]} // Using label for checking
                        />
                        {option.label} - Price: ₹{option.price}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div>No non-vegetarian options available.</div>
          )}
        </>
      )}

      <h3>Total Amount: ₹{totalAmount / 2}</h3>
      <button onClick={handleSubmit} disabled={totalAmount === 0}>
        Submit
      </button>
    </div>
  );
};

export default FoodSelection;
