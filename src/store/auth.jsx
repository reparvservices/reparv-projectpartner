import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  let isLoggedIn = !!accessToken;

  const storeTokenInCookie = (token) => {
    Cookies.set("accessToken", token);
    setAccessToken(Cookies.get("accessToken"));
  };
  const delTokenInCookie = () => {
    setAccessToken();
    Cookies.remove("accessToken");
  };
  //const URI = "http://localhost:3000";
  const URI = "https://api.reparv.in";

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("projectPartnerUser"))
  );
  const [loading, setLoading] = useState(false);
  const [successScreen, setSuccessScreen] = useState({
    show: false,
    label: "Thank You For Registering!",
    description: "Our Representative will call you shortly",
  });
  const [showSubscription, setShowSubscription] = useState(false);

  const [dashboardFilter, setDashboardFilter] = useState("Booked");
  const [showProfile, setShowProfile] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [showEplDetailsForm, setShowEplDetailsForm] = useState(false);
  const [showBuilderForm, setShowBuilderForm] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showUpdateImagesForm, setShowUpdateImagesForm] = useState(false);
  const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
  const [showNewPlotAdditionalInfoForm, setShowNewPlotAdditionalInfoForm] =
    useState(false);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const [showSeoForm, setShowSeoForm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showTicketInfo, setShowTicketInfo] = useState(true);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showCustomerPaymentForm, setShowCustomerPaymentForm] = useState(false);
  const [showPaymentIdForm, setShowPaymentIdForm] = useState(false);
  const [showFollowUpList, setShowFollowUpList] = useState(false);
  const [action, setAction] = useState("Save Details");
  const [isActive, setIsActive] = useState("Builders");
  const [giveAccess, setGiveAccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState("New");
  const [enquiryFilter, setEnquiryFilter] = useState("New");
  const [propertyFilter, setPropertyFilter] = useState("Approved");
  const [showAssignSalesForm, setShowAssignSalesForm] = useState(false);
  const [showEnquiryStatusForm, setShowEnquiryStatusForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showCSVEnquiryForm, setShowCSVEnquiryForm] = useState(false);
  const [showEnquiryUpdateForm, setShowEnquiryUpdateForm] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showEnquirerPropertyForm, setShowEnquirerPropertyForm] =
    useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showVideoUploadForm, setShowVideoUploadForm] = useState(false);
  const [showRejectReasonForm, setShowRejectReasonForm] = useState(false);
  const [showCommissionForm, setShowCommissionForm] = useState(false);
  const [showPropertyLocationForm, setShowPropertyLocationForm] =
    useState(false);

  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showSalesPerson, setShowSalesPerson] = useState(false);
  const [showPartner, setShowPartner] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [partnerPaymentStatus, setPartnerPaymentStatus] = useState("Unpaid");
  const [showAssignTaskForm, setShowAssignTaskForm] = useState(false);
  const [showNotePopup, setShowNotePopup] = useState(false);

  const [showSliderForm, setShowSliderForm] = useState(false);
  const [showAddMobileImage, setShowAddMobileImage] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        URI,
        user,
        setUser,
        loading,
        setLoading,
        isLoggedIn,
        successScreen,
        setSuccessScreen,
        showSubscription,
        setShowSubscription,
        storeTokenInCookie,
        delTokenInCookie,
        accessToken,
        setAccessToken,
        action,
        setAction,
        showProfile,
        setShowProfile,
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
        showUpdateImagesForm,
        setShowUpdateImagesForm,
        showAdditionalInfoForm,
        setShowAdditionalInfoForm,
        showNewPlotAdditionalInfoForm,
        setShowNewPlotAdditionalInfoForm,
        showPropertyInfo,
        setShowPropertyInfo,
        showTicketInfo,
        setShowTicketInfo,
        showTicketForm,
        setShowTicketForm,
        showTicket,
        setShowTicket,
        showCustomer,
        setShowCustomer,
        showCustomerPaymentForm,
        setShowCustomerPaymentForm,
        showResponseForm,
        setShowResponseForm,
        isActive,
        setIsActive,
        giveAccess,
        setGiveAccess,
        filterStatus,
        setFilterStatus,
        enquiryFilter,
        setEnquiryFilter,
        propertyFilter,
        setPropertyFilter,
        showSeoForm,
        setShowSeoForm,
        showAssignSalesForm,
        setShowAssignSalesForm,
        showEnquiryStatusForm,
        setShowEnquiryStatusForm,
        showEnquiryForm,
        setShowEnquiryForm,
        showCSVEnquiryForm,
        setShowCSVEnquiryForm,
        showEnquiryUpdateForm,
        setShowEnquiryUpdateForm,
        showEnquiry,
        setShowEnquiry,
        showEnquirerPropertyForm,
        setShowEnquirerPropertyForm,
        showPaymentIdForm,
        setShowPaymentIdForm,
        showFollowUpList,
        setShowFollowUpList,
        showCart,
        setShowCart,
        showOrder,
        setShowOrder,
        showProductForm,
        setShowProductForm,
        showOrderForm,
        setShowOrderForm,
        showVideoUploadForm,
        setShowVideoUploadForm,
        showPropertyLocationForm,
        setShowPropertyLocationForm,
        showRejectReasonForm,
        setShowRejectReasonForm,
        showCommissionForm,
        setShowCommissionForm,
        dashboardFilter,
        setDashboardFilter,
        showSalesForm,
        setShowSalesForm,
        showSalesPerson,
        setShowSalesPerson,
        partnerPaymentStatus,
        setPartnerPaymentStatus,
        showPartner,
        setShowPartner,
        showPartnerForm,
        setShowPartnerForm,
        showAssignTaskForm,
        setShowAssignTaskForm,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
