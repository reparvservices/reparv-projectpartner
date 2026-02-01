import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import LocationPicker from "./LocationPicker";
import TagsInput from "./TagsInput";

const StepOneForAdd = ({ newProperty, setPropertyData, states, cities }) => {
  const { URI } = useAuth();

  // For Property Name Checking
  const [isSame, setIsSame] = useState(true);
  const [message, setMessage] = useState("");

  const checkPropertyName = async () => {
    try {
      const res = await fetch(`${URI}/admin/properties/check-property-name`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProperty),
      });

      const data = await res.json();
      setIsSame(data.unique);
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong");
    }
  };

  useEffect(() => {
    if (!newProperty.propertyid) {
      checkPropertyName();
    }
  }, [newProperty.propertyName]);

  return (
    <div className="bg-white max-h-[65vh] sm:max-h-[50vh] overflow-scroll scrollbar-x-hidden p-2">
      <h2 className="text-base font-semibold mb-4">Step 1: Property Details</h2>
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <label
            className={`${
              newProperty.propertyCategory
                ? "text-green-600"
                : "text-[#00000066]"
            } block text-sm leading-4 font-medium`}
          >
            Property Category <span className="text-red-600">*</span>
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-transparent placeholder:text-black"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyCategory}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyCategory: e.target.value,
              })
            }
          >
            <option value="">Select Property Category</option>
            <option value="NewFlat">New Flat</option>
            <option value="NewPlot">New Plot</option>
            <option value="NewShop">New Shop</option>
            <option value="RentalFlat">Rental Flat</option>
            <option value="RentalShop">Rental Shop</option>
            <option value="RentalOffice">Rental Office</option>
            <option value="Resale">Resale</option>
            <option value="RowHouse">Row House</option>
            <option value="Lease">Lease</option>
            <option value="FarmLand">Farm Land</option>
            <option value="FarmHouse">Farm House</option>
            <option value="CommercialFlat">Commercial Flat</option>
            <option value="CommercialPlot">Commercial Plot</option>
            <option value="IndustrialSpace">Industrial Space</option>
          </select>
        </div>

        <div className="w-full ">
          <label
            className={`${
              isSame === true
                ? "text-green-600"
                : isSame === false
                ? "text-red-600"
                : "text-[#00000066]"
            } ${
              newProperty.propertyid && newProperty.propertyName
                ? "text-green-600"
                : "text-[#00000066]"
            } block text-sm leading-4 font-medium`}
          >
            {message || "Property Name"} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Property Name"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:text-black"
            value={newProperty.propertyName}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyName: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <label
            className={`${
              newProperty.totalSalesPrice
                ? "text-green-600"
                : "text-[#00000066]"
            } block text-sm leading-4 font-medium`}
          >
            Total Sales Price <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            min="0"
            required
            placeholder="Enter Sales Price"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:text-black"
            value={newProperty.totalSalesPrice}
            onChange={(e) => {
              const value = e.target.value;
              setPropertyData({
                ...newProperty,
                totalSalesPrice: value < 0 ? 0 : value, // block negatives
              });
            }}
          />
        </div>
        <div className="w-full">
          <label
            className={`${
              newProperty.totalOfferPrice
                ? "text-green-600"
                : "text-[#00000066]"
            } block text-sm leading-4 font-medium`}
          >
            Total Offer Price <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            min="0"
            required
            placeholder="Enter Offer Price"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:text-black"
            value={newProperty.totalOfferPrice}
            onChange={(e) => {
              const value = e.target.value;
              setPropertyData({
                ...newProperty,
                totalOfferPrice: value < 0 ? 0 : value, // block negatives
              });
            }}
          />
        </div>

        <div
          className={`${
            ["NewPlot", "CommercialPlot"].includes(newProperty.propertyCategory)
              ? "hidden"
              : "block"
          } w-full`}
        >
          <label
            className={`${
              newProperty.builtUpArea ? "text-green-600" : "text-[#00000066]"
            } block text-sm leading-4 font-medium`}
          >
            Built-Up Area <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            min="0"
            required
            placeholder="Enter Area in Sq.Ft."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:text-black"
            value={newProperty.builtUpArea}
            onChange={(e) => {
              const value = e.target.value;
              setPropertyData({
                ...newProperty,
                builtUpArea: value < 0 ? 0 : value, // block negatives
              });
            }}
          />
        </div>

        <div className="w-full ">
          <label
            className={`${
              newProperty.carpetArea ? "text-green-600" : "text-[#00000066]"
            } block text-sm leading-4 font-medium`}
          >
            Carpet Area <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            min="0"
            required
            placeholder="Enter Area in Sq.Ft."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:text-black"
            value={newProperty.carpetArea}
            onChange={(e) => {
              const value = e.target.value;
              setPropertyData({
                ...newProperty,
                carpetArea: value < 0 ? 0 : value, // block negatives
              });
            }}
          />
        </div>

        {/* State Select Input */}
        <div className="w-full">
          <label
            className={`${
              newProperty.state ? "text-green-600" : "text-[#00000066]"
            } block text-sm leading-4 font-medium`}
          >
            Select State <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-transparent placeholder:text-black"
            style={{ backgroundImage: "none" }}
            value={newProperty.state}
            onChange={(e) =>
              setPropertyData({ ...newProperty, state: e.target.value })
            }
          >
            <option value="">Select Your State</option>
            {states?.map((state, index) => (
              <option key={index} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        {/* City Select Input */}
        <div className="w-full">
          <label
            className={`${
              newProperty.city ? "text-green-600" : "text-[#00000066]"
            } block text-sm leading-4 font-medium`}
          >
            Select City <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-transparent placeholder:text-black"
            style={{ backgroundImage: "none" }}
            value={newProperty.city}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                city: e.target.value,
              })
            }
          >
            <option value="">Select Your City</option>
            {cities?.map((city, index) => (
              <option key={index} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StepOneForAdd;
