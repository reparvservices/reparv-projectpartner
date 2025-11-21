import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import reparvMainLogo from "../../assets/layout/reparvMainLogo.svg";
import calenderIcon from "../../assets/layout/calenderIcon.svg";
import customersIcon from "../../assets/layout/customersIcon.svg";
import enquirersIcon from "../../assets/layout/enquirersIcon.svg";
import mapIcon from "../../assets/layout/mapIcon.svg";
import materialIcon from "../../assets/layout/materialIcon.svg";
import overviewIcon from "../../assets/layout/overviewIcon.svg";
import partnerIcon from "../../assets/layout/partnerIcon.svg";
import employeeIcon from "../../assets/layout/employeeIcon.svg";
import ticketingIcon from "../../assets/layout/ticketingIcon.svg";
import marketingIcon from "../../assets/layout/marketingIcon.svg";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Profile from "../Profile";
import { useAuth } from "../../store/auth";
import LogoutButton from "../LogoutButton";
import { FaUserCircle } from "react-icons/fa";
import Agreement from "../Agreement";
import SuccessScreen from "../SuccessScreen";
import { IoDiamondOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShortBar, setIsShortbar] = useState(false);
  const [heading, setHeading] = useState(localStorage.getItem("head"));
  const {
    URI,
    user,
    showProfile,
    setShowProfile,
    successScreen,
    showSubscription,
    setShowSubscription,
    giveAccess,
    setGiveAccess,
    showRoleForm,
    setShowRoleForm,
    showDepartmentForm,
    setShowDepartmentForm,
    showEmployee,
    setShowEmployee,
    showEplDetailsForm,
    setShowEplDetailsForm,
    showBuilder,
    setShowBuilder,
    showBuilderForm,
    setShowBuilderForm,
    showPropertyForm,
    setShowPropertyForm,
    showPartner,
    setShowPartner,
    showPartnerForm,
    setShowPartnerForm,
    showPaymentIdForm,
    setShowPaymentIdForm,
    showFollowUpList,
    setShowFollowUpList,
    showUpdateImagesForm,
    setShowUpdateImagesForm,
    showAdditionalInfoForm,
    setShowAdditionalInfoForm,
    showNewPlotAdditionalInfoForm,
    setShowNewPlotAdditionalInfoForm,
    showEnquiry,
    setShowEnquiry,
    showAssignSalesForm,
    setShowAssignSalesForm,
    showEnquiryForm,
    setShowEnquiryForm,
    showCSVEnquiryForm,
    setShowCSVEnquiryForm,
    showEnquiryUpdateForm,
    setShowEnquiryUpdateForm,
    showEnquiryStatusForm,
    setShowEnquiryStatusForm,
    showEnquirerPropertyForm,
    setShowEnquirerPropertyForm,
    showPropertyInfo,
    setShowPropertyInfo,
    showTicketForm,
    setShowTicketForm,
    showResponseForm,
    setShowResponseForm,
    showTicket,
    setShowTicket,
    showCustomer,
    setShowCustomer,
    showCart,
    setShowCart,
    showOrder,
    setShowOrder,
    showOrderForm,
    setShowOrderForm,
    showProductForm,
    setShowProductForm,
    showCustomerPaymentForm,
    setShowCustomerPaymentForm,
    showVideoUploadForm,
    setShowVideoUploadForm,
    showPropertyLocationForm,
    setShowPropertyLocationForm,
    showSalesForm,
    setShowSalesForm,
    showSalesPerson,
    setShowSalesPerson,
    showAssignTaskForm,
    setShowAssignTaskForm,
    showSeoForm,
    setShowSeoForm,
    showRejectReasonForm,
    setShowRejectReasonForm,
    showCommissionForm,
    setShowCommissionForm,
    showInfo,
    setShowInfo,
    showInfoForm,
    setShowInfoForm,
    showNotePopup,
    setShowNotePopup,
    showSliderForm,
    setShowSliderForm,
    showAddMobileImage,
    setShowAddMobileImage,
    isLoggedIn,
  } = useAuth();

  const overlays = [
    { state: giveAccess, setter: setGiveAccess },
    { state: showRoleForm, setter: setShowRoleForm },
    { state: showDepartmentForm, setter: setShowDepartmentForm },
    { state: showEmployee, setter: setShowEmployee },
    { state: showEplDetailsForm, setter: setShowEplDetailsForm },
    { state: showBuilder, setter: setShowBuilder },
    { state: showBuilderForm, setter: setShowBuilderForm },
    { state: showPropertyForm, setter: setShowPropertyForm },
    { state: showUpdateImagesForm, setter: setShowUpdateImagesForm },
    { state: showAdditionalInfoForm, setter: setShowAdditionalInfoForm },
    {
      state: showNewPlotAdditionalInfoForm,
      setter: setShowNewPlotAdditionalInfoForm,
    },
    { state: showPropertyInfo, setter: setShowPropertyInfo },
    { state: showTicketForm, setter: setShowTicketForm },
    { state: showResponseForm, setter: setShowResponseForm },
    { state: showTicket, setter: setShowTicket },
    { state: showCustomer, setter: setShowCustomer },
    { state: showCustomerPaymentForm, setter: setShowCustomerPaymentForm },
    { state: showCart, setter: setShowCart },
    { state: showOrder, setter: setShowOrder },
    { state: showOrderForm, setter: setShowOrderForm },
    { state: showProductForm, setter: setShowProductForm },
    { state: showVideoUploadForm, setter: setShowVideoUploadForm },
    { state: showPropertyLocationForm, setter: setShowPropertyLocationForm },
    { state: showSubscription, setter: setShowSubscription },
    { state: showSalesForm, setter: setShowSalesForm },
    { state: showSalesPerson, setter: setShowSalesPerson },
    { state: showPartner, setter: setShowPartner },
    { state: showPartnerForm, setter: setShowPartnerForm },
    { state: showPaymentIdForm, setter: setShowPaymentIdForm },
    { state: showFollowUpList, setter: setShowFollowUpList },

    { state: showAssignSalesForm, setter: setShowAssignSalesForm },
    { state: showEnquiryForm, setter: setShowEnquiryForm },
    { state: showCSVEnquiryForm, setter: setShowCSVEnquiryForm },
    { state: showEnquiryUpdateForm, setter: setShowEnquiryUpdateForm },
    { state: showEnquiryStatusForm, setter: setShowEnquiryStatusForm },
    { state: showEnquirerPropertyForm, setter: setShowEnquirerPropertyForm },
    { state: showEnquiry, setter: setShowEnquiry },
    { state: showAssignTaskForm, setter: setShowAssignTaskForm },
    { state: showSeoForm, setter: setShowSeoForm },
    { state: showRejectReasonForm, setter: setShowRejectReasonForm },
    { state: showCommissionForm, setter: setShowCommissionForm },
    { state: showInfo, setter: setShowInfo },
    { state: showInfoForm, setter: setShowInfoForm },
    { state: showNotePopup, setter: setShowNotePopup },
    { state: showSliderForm, setter: setShowSliderForm },
    { state: showAddMobileImage, setter: setShowAddMobileImage },
  ];

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "font-semibold bg-[#E3FFDF] shadow-[0px_1px_0px_0px_rgba(0,_0,_0,_0.1)]"
      : "";
  };

  const getHeading = (label) => {
    setHeading(label);
    localStorage.setItem("head", label);
  };

  const [agreementData, setAgreementData] = useState("");
  // Fetch Agreement Status
  const fetchAgreement = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/projectpartner/get/${user?.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Agreement.");
      const data = await response.json();
      //console.log(data);
      setAgreementData(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchAgreement();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F5F6]">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-white shadow-sm">
        <img src={reparvMainLogo} alt="Reparv Logo" className="h-10" />
        <div className="ButtonContainer flex gap-4 items-center justify-center">
          <FaUserCircle
            onClick={() => {
              setShowProfile("true");
            }}
            className="w-8 h-8 text-[#076300]"
          />
          <LogoutButton />
          <button
            className="p-2 rounded-md bg-gray-100 text-black hover:text-[#076300] active:scale-95"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen === false ? (
              <IoMenu size={24} />
            ) : (
              <IoMdClose size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Navbar */}
      <div className="navbar hidden w-full h-[80px] md:flex items-center justify-center border-b-2">
        <div className="navLogo w-[300px] h-[80px] flex items-center justify-center">
          <img
            src={reparvMainLogo}
            alt="Reparv Logo"
            className="w-[100px] mb-2"
          />
        </div>

        <div className="navHeading w-full h-16 flex items-center justify-between text-lg font-semibold">
          <div className="left-heading h-8 flex gap-4 items-center justify-between text-[20px] leading-[19.36px] text-black">
            <IoMenu
              onClick={() => {
                setIsShortbar(!isShortBar);
              }}
              className="w-8 h-8 cursor-pointer active:scale-95"
            />{" "}
            <p>{heading}</p>
          </div>
          <div className="right-heading w-[170px] h-[40px] flex items-center justify-between mr-8">
            <IoDiamondOutline
              onClick={() => {
                getHeading("Subscription");
                navigate("/subscription");
              }}
              className="w-7 h-7 text-[#FF4646] cursor-pointer"
            />
            <FaUserCircle
              onClick={() => {
                setShowProfile("true");
              }}
              className="w-8 h-8 text-[#076300]"
            />
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex overflow-y-scroll scrollbar-hide">
        <div
          className={`w-64 ${
            isShortBar ? "md:w-[95px]" : "md:w-60"
          } h-full fixed overflow-y-scroll scrollbar-hide bg-white shadow-md md:shadow-none md:static top-0 left-0 z-20 md:bg-[#F5F5F6] transition-transform duration-300 transform ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2 p-4 md:gap-2">
            <img
              src={reparvMainLogo}
              alt="Reparv Logo"
              className="md:hidden block"
            />
            {/* Navigation Links */}
            {[
              { to: "/dashboard", icon: overviewIcon, label: "Dashboard" },
              { to: "/customers", icon: customersIcon, label: "Customers" },
              { to: "/enquirers", icon: enquirersIcon, label: "Enquirers" },
              { to: "/properties", icon: enquirersIcon, label: "Properties" },
              { to: "/map", icon: mapIcon, label: "Map" },
              { to: "/calender", icon: calenderIcon, label: "Calendar" },
              { to: "/builders", icon: partnerIcon, label: "Builders" },
              { to: "/employees", icon: employeeIcon, label: "Employees" },
              {
                to: "/salespersons",
                icon: partnerIcon,
                label: "Sales Partner",
              },
              {
                to: "/territorypartner",
                icon: partnerIcon,
                label: "Territory Partners",
              },
              { to: "/tickets", icon: ticketingIcon, label: "Tickets" },
              { to: "/role", icon: employeeIcon, label: "Roles" },
              { to: "/department", icon: employeeIcon, label: "Departments" },
              { to: "/slider", icon: marketingIcon, label: "Slider" },
              {
                to: "/marketing-content",
                icon: marketingIcon,
                label: "Marketing Content",
              },
            ].map(({ to, icon, label }) => (
              <NavLink
                onClick={() => {
                  setIsSidebarOpen(false);
                  getHeading(label);
                }}
                key={to}
                to={isLoggedIn === true ? to : "/"}
                className={`flex items-center gap-3 w-full p-3 rounded-[20px] transition-all duration-300 text-black ${getNavLinkClass(
                  to
                )}`}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-[12px] bg-white">
                  <img
                    src={icon}
                    alt={`${label} Icon`}
                    className="md:h-6 md:w-6 w-5 h-5"
                  />
                </div>
                <span
                  className={`text-sm md:text-base ${
                    isShortBar ? "md:hidden" : "block"
                  }`}
                >
                  {label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 md:p-4 md:pl-0 md:pt-0 overflow-scroll scrollbar-hide"
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          <Outlet />
        </div>
      </div>
      {showProfile && <Profile />}

      {overlays.map(({ state, setter }, index) =>
        state ? (
          <div
            key={index}
            className="w-full h-screen z-[60] fixed bg-[#767676a0]"
            onClick={() => setter(false)}
          ></div>
        ) : null
      )}

      {/* Show Agreement Form Screen */}
      <Agreement
        fetchAgreement={fetchAgreement}
        agreementData={agreementData}
        setAgreementData={setAgreementData}
      />

      {/* Show Success Screen */}
      {successScreen?.show && <PaymentSuccessScreen />}
    </div>
  );
}

export default Layout;
