import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Properties from "./pages/Properties.jsx";
import PropertiesFlatAndPlotInfo from "./pages/PropertiesFlatAndPlotInfo.jsx";
import Builders from "./pages/Builders.jsx";
import Map from "./pages/Map.jsx";
import Calender from "./pages/Calender.jsx";
import Customers from "./pages/Customers.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import KYC from "./pages/KYC.jsx";
import BusinessDetails from "./pages/BusinessDetails.jsx";
import MarketingContent from "./pages/MarketingContent.jsx";
//import BrandAccessories from "./pages/BrandAccessories.jsx";
import SalesPerson from "./pages/SalesPerson.jsx";
import TerritoryPartner from "./pages/TerritoryPartner.jsx";
import Enquirers from "./pages/Enquirers.jsx";
import Employee from "./pages/Employee.jsx";
import Role from "./pages/Role.jsx";
import Department from "./pages/Department.jsx";
import Slider from "./pages/Slider.jsx";


const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/kyc/:userid" element={<KYC />} />
        <Route path="/business-details/:userid" element={<BusinessDetails />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/properties" element={<Properties />} />
          <Route
            path="/property/additional-info/:propertyid"
            element={<PropertiesFlatAndPlotInfo />}
          />
          <Route path="/enquirers" element={<Enquirers />} />
          <Route path="/map" element={<Map />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/salespersons" element={<SalesPerson />} />
          <Route path="/territorypartner" element={<TerritoryPartner />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/role" element={<Role />} />
          <Route path="/department" element={<Department />} />
          <Route path="/slider" element={<Slider />} />
           {/*<Route path="/brand-accessories" element={<BrandAccessories />} />*/}
          <Route path="/marketing-content" element={<MarketingContent />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
