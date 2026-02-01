import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import reparvMainLogo from "../../assets/layout/reparvMainLogo.svg";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Profile from "../Profile";
import { useAuth } from "../../store/auth";
import LogoutButton from "../LogoutButton";
import { FaUserCircle } from "react-icons/fa";
import Agreement from "../Agreement";
import SuccessScreen from "../SuccessScreen";
import { CgWebsite } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { PiArrowElbowDownRightBold } from "react-icons/pi";

import { MdDashboard } from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import { PiBuildingsFill } from "react-icons/pi";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { BiCalendar, BiSolidDiamond } from "react-icons/bi";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { FaClipboardUser } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { FaTicket } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { MdFeedback } from "react-icons/md";
import { GrDocumentVideo } from "react-icons/gr";
import { FaPhotoVideo } from "react-icons/fa";

const menuItems = [
  {
    label: "Dashboard",
    icon: <MdDashboard size={21} />,
    to: "/dashboard",
  },
  {
    to: "/tickets",
    icon: <FaTicket size={21} />,
    label: "Tickets",
  },

  // Leads Dropdown
  {
    label: "Leads",
    icon: <IoIosListBox size={21} />,
    dropdown: [{ label: "Enquirers", to: "/enquirers" }],
  },

  // Customers
  {
    label: "Visitors",
    icon: <HiUsers size={21} />,
    dropdown: [{ label: "Customers", to: "/customers" }],
  },

  // Project Dropdown
  {
    label: "Projects",
    icon: <PiBuildingsFill size={21} />,
    dropdown: [
      { label: "Properties", to: "/properties" },
      { label: "Builders", to: "/builders" },
      { label: "Map", to: "/map" },
    ],
  },

  // Employee Dropdown
  {
    label: "Employees",
    icon: <FaUserTie size={21} />,
    dropdown: [
      { label: "Employees", to: "/employees" },
      { label: "Departments", to: "/department" },
      { label: "Roles", to: "/role" },
    ],
  },

  // Partners Dropdown
  {
    label: "Partners",
    icon: <FaHandshake size={21} />,
    dropdown: [
      { label: "Sales Partner", to: "/salespersons" },
      { label: "Territory Partner", to: "/territorypartner" },
      { label: "Messages", to: "/messages" },
      { label: "Calendar", to: "/calender" },
    ],
  },

  // Manage Landing Page Dopdown
  {
    label: "Manage Page",
    icon: <FaPhotoVideo size={21} />,
    dropdown: [
      { label: "Slider", to: "/slider" },
      { label: "Marketing Content", to: "/marketing-content" },
    ],
  },

  {
    to: "/subscription",
    icon: <BiSolidDiamond size={21} />,
    label: "Subscription",
  },
];

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
    iActiveSubacription,
    setIsActiveSubacription,
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
    showPropertyAddForm,
    setShowPropertyAddForm,
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
    { state: showPropertyAddForm, setter: setShowPropertyAddForm },
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

  const [openLeads, setOpenLeads] = useState(false);
  const [openVisitors, setOpenVisitors] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openEmployees, setOpenEmployees] = useState(false);
  const [openPartners, setOpenPartners] = useState(false);
  const [openManagePage, setOpenManagePage] = useState(false);

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

  // Fetch Subscription Status
  const fetchSubscription = async () => {
    try {
      const response = await fetch(
        `${URI}/project-partner/subscription/user/${user?.id}`,
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
      console.log(data);
      setIsActiveSubacription(data.active);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchAgreement();
    fetchSubscription();
  }, []);

  useEffect(() => {
    if (user && !user?.adharId) {
      const goToKyc = window.confirm(
        "Your KYC is incomplete. Do you want to complete it now?"
      );

      if (goToKyc) {
        navigate(`/kyc/${user?.id}`);
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F5F6]">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-white shadow-sm">
        <img src={reparvMainLogo} alt="Reparv Logo" className="h-10" />
        <div className="ButtonContainer flex gap-4 items-center justify-center">
          <CgWebsite
            onClick={() => {
              if (user?.contact) {
                window.open(
                  `https://www.reparv.in/project-partner/${user?.contact}`,
                  "_blank"
                );
              } else {
                alert("Please Login Again!");
              }
            }}
            className="w-7 h-7 text-[#5E23DC] cursor-pointer"
          />
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
            <CgWebsite
              onClick={() => {
                if (user?.contact) {
                  window.open(
                    `https://www.reparv.in/project-partner/${user?.contact}`,
                    "_blank"
                  );
                } else {
                  alert("Please Login Again!");
                }
              }}
              className="w-7 h-7 text-[#5E23DC] cursor-pointer"
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
            isShortBar ? "md:w-[16px]" : "md:w-60"
          } h-full fixed overflow-y-scroll scrollbar-hide bg-white shadow-md md:shadow-none md:static top-0 left-0 !z-[55] md:bg-[#F5F5F6] transition-transform duration-300 transform ${
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
            {menuItems.map((item, index) => (
              <div key={index} className="w-full">
                {/* Parent menu button */}
                <NavLink
                  to={!item?.dropdown && item.to}
                  onClick={() => {
                    if (item.dropdown) {
                      if (item.label === "Leads") setOpenLeads(!openLeads);
                      if (item.label === "Visitors")
                        setOpenVisitors(!openVisitors);
                      if (item.label === "Projects")
                        setOpenProjects(!openProjects);
                      if (item.label === "Employees")
                        setOpenEmployees(!openEmployees);
                      if (item.label === "Partners")
                        setOpenPartners(!openPartners);
                      if (item.label === "Manage Page")
                        setOpenManagePage(!openManagePage);
                    }
                    if (!item.dropdown) setIsSidebarOpen(false);
                    if (!item.dropdown) getHeading(item.label);
                  }}
                  className={`group flex items-center gap-3 w-full p-3 rounded-[20px] cursor-pointer transition-all duration-300 text-black ${getNavLinkClass(
                    item.to
                  )}`}
                >
                  <div className="min-w-8 min-h-8 md:min-w-10 md:min-h-10 flex items-center justify-center rounded-[12px] bg-white">
                    {item.icon}
                  </div>

                  <span
                    className={`text-sm max-w-[80px] md:text-base ${
                      isShortBar ? "md:hidden" : "block"
                    }`}
                  >
                    {item.label}
                  </span>

                  {item.dropdown && (
                    <span className="w-full flex items-end justify-end text-xs">
                      {(item.label === "Leads" && openLeads) ||
                      (item.label === "Visitors" && openVisitors) ||
                      (item.label === "Projects" && openProjects) ||
                      (item.label === "Employees" && openEmployees) ||
                      (item.label === "Partners" && openPartners) ||
                      (item.label === "Manage Page" && openManagePage) ? (
                        <RiArrowDropUpLine
                          size={25}
                          className="min-w-[30px] text-right"
                        />
                      ) : (
                        <RiArrowDropDownLine
                          size={25}
                          className="min-w-[30px]"
                        />
                      )}
                    </span>
                  )}
                </NavLink>

                {/* Dropdown items */}
                {item.dropdown && (
                  <div
                    className={`flex ${
                      (item.label === "Leads" && openLeads) ||
                      (item.label === "Visitors" && openVisitors) ||
                      (item.label === "Projects" && openProjects) ||
                      (item.label === "Employees" && openEmployees) ||
                      (item.label === "Partners" && openPartners) ||
                      (item.label === "Manage Page" && openManagePage)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="w-14 flex items-start justify-end">
                      <PiArrowElbowDownRightBold
                        size={20}
                        className="mr-2 mt-1"
                      />
                    </div>
                    <div className={`flex flex-col gap-1 transition-all`}>
                      {item.dropdown.map((sub, i) => (
                        <NavLink
                          key={i}
                          to={sub.to}
                          onClick={() => {
                            getHeading(sub.label);
                            setIsSidebarOpen(false);
                          }}
                          className={`text-sm py-2 px-4 rounded-xl hover:bg-[#E3FFDF] ${getNavLinkClass(
                            sub.to
                          )}`}
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
