import AdminItem from "./AdminItem";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "../App.css";
import { io } from "socket.io-client";

function AdminMenu() {
  const [items, setItems] = useState([]);
  const fileInput = React.useRef();
  const [validation_Errors, setValidationErrors] = useState({
    itemName: "",
    itemType: "",
    itemDescription: "",
    itemPrice: "",
    itemImage: "",
  });
  const [new_Item_Data, setNewItemData] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: 0,
    itemImage: "",
    itemType: "",
  });

  var grabitems = async () => {
    try {
      axios
        .get("http://localhost:3001/menu/data")
        .then((response) => {
          const data = response.data;
          setItems(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    grabitems();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("product changes", () => {
      grabitems();
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData((prev_data) => ({
      ...prev_data,
      [name]: value,
    }));
    setValidationErrors((prev_errors) => ({
      ...prev_errors,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewItemData((prev_data) => ({
          ...prev_data,
          itemImage: reader.result,
        }));
      };

      reader.readAsDataURL(file);

      setValidationErrors((prev_errors) => ({
        ...prev_errors,
        itemImage: "",
      }));
    } else {
      setNewItemData((prev_data) => ({
        ...prev_data,
        itemImage: null,
      }));
    }
  };

  const addNewItem = async (event) => {
    event.preventDefault();
    const errors = {};

    if (!new_Item_Data.itemName) {
      errors.itemName = "*Item Name is required.";
    }

    if (!new_Item_Data.itemType) {
      errors.itemType = "*Item Type is required.";
    }

    if (!new_Item_Data.itemDescription) {
      errors.itemDescription = "*Item Description is required.";
    }

    if (!new_Item_Data.itemPrice || new_Item_Data.itemPrice <= 0) {
      errors.itemPrice = "*Item Price must be greater than zero.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const newItem = {
        itemName: new_Item_Data.itemName,
        itemDescription: new_Item_Data.itemDescription,
        itemPrice: new_Item_Data.itemPrice,
        itemImage: new_Item_Data.itemImage,
        itemType: new_Item_Data.itemType,
        itemAvailability: "in-stock",
      };

      await axios.post("http://localhost:3001/menu/add", newItem);

      const updatedItemsResponse = await axios.get(
        "http://localhost:3001/menu/data"
      );
      setItems(updatedItemsResponse.data);

      setNewItemData({
        itemName: "",
        itemDescription: "",
        itemPrice: 0,
        itemImage: "",
        itemType: "",
        itemAvailability: "",
      });
      setValidationErrors({
        itemName: "",
        itemDescription: "",
        itemPrice: "",
        itemImage: "",
        itemType: "",
      });
      fileInput.current.value = "";

      const socket = io("http://localhost:3001");
      socket.emit("product changes");

    } catch (error) {
      console.error(error);
    }
  };
  const deleteItem = async (itemName) => {
    try {
      const encodedItemName = encodeURIComponent(itemName);

      await axios.delete(
        `http://localhost:3001/menu/delete/${encodedItemName}`
      );

      const updatedItemsResponse = await axios.get(
        "http://localhost:3001/menu/data"
      );
      setItems(updatedItemsResponse.data);
      const socket = io("http://localhost:3001");
      socket.emit("product changes");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="menu-everything"
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5%",
        }}
      >
        <style>
          {`
          body {
            margin: 0;
            padding: 0;
            background-image: url("/images/MenuBackground.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
          h1, h2 {
            color: white;
          }
        `}
        </style>

        <h2 className="form-title" align="center">
          Add New Item
        </h2>
        <div
          className="item-form-container"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={addNewItem} className="item-form">
            <table>
              <tbody>
                <tr className="add-item-field">
                  <td className="form-label">Item Name:</td>
                  <td>
                    <input
                      type="text"
                      name="itemName"
                      data-testid="item-name-input"
                      value={new_Item_Data.itemName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <div className="validation-error">
                      {validation_Errors.itemName}
                    </div>
                  </td>
                </tr>
                <tr className="add-item-field">
                  <td className="form-label">Item Type:</td>
                  <td>
                    <select
                      name="itemType"
                      data-testid="item-type-select"
                      value={new_Item_Data.itemType}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select Item Type</option>
                      <option value="starter">Starter</option>
                      <option value="mainCourse">Main Course</option>
                      <option value="dessert">Dessert</option>
                    </select>
                    <div className="validation-error">
                      {validation_Errors.itemType}
                    </div>
                  </td>
                </tr>
                <tr className="add-item-field">
                  <td className="form-label">Item Description:</td>
                  <td>
                    <textarea
                      name="itemDescription"
                      data-testid="item-description-input"
                      value={new_Item_Data.itemDescription}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <div className="validation-error">
                      {validation_Errors.itemDescription}
                    </div>
                  </td>
                </tr>
                <tr className="add-item-field">
                  <td className="form-label">Item Price:</td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      name="itemPrice"
                      data-testid="item-price-input"
                      value={new_Item_Data.itemPrice}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <div className="validation-error">
                      {validation_Errors.itemPrice}
                    </div>
                  </td>
                </tr>
                <tr className="add-item-field">
                  <td className="form-label">Item Image:</td>
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      data-testid="item-image-input"
                      ref={fileInput}
                      onChange={handleFileChange}
                      className="form-input"
                    />
                    <div className="validation-error">
                      {validation_Errors.itemImage}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              className="form-button"
              data-testid="add-item-button"
            >
              Add To Menu
            </button>
          </form>
        </div>
        <h2>Starters</h2>

        <div className="menu-item-div">
          {items
            .filter((item) => item.itemType === "starter")
            .map((item) => (
              <AdminItem
                key={item.itemName}
                item={item}
                onDelete={() => deleteItem(item.itemName)}
              />
            ))}
        </div>
        <h2>Main Courses</h2>

        <div className="menu-item-div">
          {items
            .filter((item) => item.itemType === "mainCourse")
            .map((item) => (
              <AdminItem
                key={item.itemName}
                item={item}
                onDelete={() => deleteItem(item.itemName)}
              />
            ))}
        </div>
        <h2>Desserts</h2>

        <div className="menu-item-div">
          {items
            .filter((item) => item.itemType === "dessert")
            .map((item) => (
              <AdminItem
                key={item.itemName}
                item={item}
                onDelete={() => deleteItem(item.itemName)}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
