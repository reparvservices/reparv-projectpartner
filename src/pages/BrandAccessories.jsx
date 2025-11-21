import { useState, useEffect } from "react";
import Products from "../components/brandAccessories/Products";
import Orders from "../components/brandAccessories/Orders";

const BrandAccessories = () => {
  const [selectedTable, setSelectedTable] = useState("Products");

  return (
    <div>
      {selectedTable === "Products" && (
        <Products selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
      )}
      {selectedTable === "Orders" && (
        <Orders selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
      )}
    </div>
  );
};

export default BrandAccessories;
