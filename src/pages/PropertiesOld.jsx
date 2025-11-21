import React from "react";
import { parse } from "date-fns";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";
import AddButton from "../components/AddButton";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import MultiStepForm from "../components/propertyForm/MultiStepForm";
import propertyPicture from "../assets/propertyPicture.svg";
import Loader from "../components/Loader";
import { IoMdClose } from "react-icons/io";
import DownloadCSV from "../components/DownloadCSV";
import UpdateImagesForm from "../components/propertyForm/UpdateImagesForm";

const Properties = () => {
  const {
    setShowPropertyForm,
    URI,
    setLoading,
    showUpdateImagesForm,
    setShowUpdateImagesForm,
    showAdditionalInfoForm,
    setShowAdditionalInfoForm,
    showNewPlotAdditionalInfoForm,
    setShowNewPlotAdditionalInfoForm,
    showVideoUploadForm,
    setShowVideoUploadForm,
    showPropertyLocationForm,
    setShowPropertyLocationForm,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [propertyKey, setPropertyKey] = useState("");
  const [builderData, setBuilderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Property Location Latitude & Longitude
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [file, setFile] = useState(null);
  const [newAddInfo, setNewAddInfo] = useState({
    propertyid: "",
  });

  const [newProperty, setPropertyData] = useState({
    builderid: "",
    projectBy: "",
    possessionDate: "",
    propertyCategory: "",
    propertyApprovedBy: "",
    propertyName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    location: "",
    distanceFromCityCenter: "",
    latitude: "",
    longitude: "",
    totalSalesPrice: "",
    totalOfferPrice: "",
    stampDuty: "",
    registrationFee: "",
    gst: "",
    advocateFee: "",
    msebWater: "",
    maintenance: "",
    other: "",
    tags: "",
    propertyType: "",
    builtYear: "",
    ownershipType: "",
    builtUpArea: "",
    carpetArea: "",
    parkingAvailability: "",
    totalFloors: "",
    floorNo: "",
    loanAvailability: "",
    propertyFacing: "",
    reraRegistered: "",
    furnishing: "",
    waterSupply: "",
    powerBackup: "",
    locationFeature: "",
    sizeAreaFeature: "",
    parkingFeature: "",
    terraceFeature: "",
    ageOfPropertyFeature: "",
    furnishingFeature: "",
    amenitiesFeature: "",
    propertyStatusFeature: "",
    floorNumberFeature: "",
    smartHomeFeature: "",
    securityBenefit: "",
    primeLocationBenefit: "",
    rentalIncomeBenefit: "",
    qualityBenefit: "",
    capitalAppreciationBenefit: "",
    ecofriendlyBenefit: "",
  });

  // For Update images
  const [propertyImageData, setPropertyImageData] = useState({});
  const [imageFiles, setImageFiles] = useState({
    frontView: [],
    sideView: [],
    kitchenView: [],
    hallView: [],
    bedroomView: [],
    bathroomView: [],
    balconyView: [],
    nearestLandmark: [],
    developedAmenities: [],
  });

  const additionalInfoCSVFileFormat = [
    {
      Mouza: "Nagpur",
      Khasra_No: "123/ABC",
      Wing: "A",
      Wing_Facing: "East",
      Floor_No: "3",
      Flat_No: "101",
      Flat_Facing: "East",
      BHK_Type: "2 BHK",
      Carpet_Area: 2200,
      Builtup_Area: 1800,
      Super_Builtup_Area: 1800,
      Additional_Area: 100,
      Payable_Area: 2000,
      SQFT_Price: 10000,
      Basic_Cost: "=M2*N2",
      Stamp_Duty: 10000,
      Registration: 30000,
      GST: 500000,
      GOV_Water_Charge: 10000,
      Maintenance: 50000,
      Advocate_Fee: 20000,
      Other_Charges: 50000,
      Total_Cost: "=O2+P2+Q2+R2+S2+T2+U2+V2",
    },
  ];

  const additionalInfoNewPlotCSVFileFormat = [
    {
      Mouza: "Nagpur",
      Khasra_No: "123/ABC",
      Plot_No: "3",
      Facing: "East",
      Plot_Size: "20 X 30",
      Plot_Area: 2200,
      SQFT_Price: 1000,
      Basic_Cost: 2200 * 1000,
      Stamp_Duty: 10000,
      Registration: 30000,
      GST: 500000,
      Maintenance: 50000,
      Advocate_Fee: 20000,
      Other_Charges: 50000,
      Total_Cost: 2200000 + 10000 + 30000 + 50000 + 50000 + 20000 + 50000,
    },
  ];

  // for Uploade Brochure and Video
  const [videoUpload, setVideoUpload] = useState({
    brochureFile: "",
    videoLink: "",
  });

  //Single Image Upload
  const [selectedImage, setSelectedImage] = useState(null);

  const singleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const removeSingleImage = () => {
    setSelectedImage(null);
  };

  //Single Image Upload
  const [selectedScheduledPropertyImage, setSelectedScheduledPropertyImage] =
    useState(null);

  const scheduledPropertyImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedScheduledPropertyImage(file);
    }
  };

  const removeScheduledPropertyImage = () => {
    setSelectedScheduledPropertyImage(null);
  };

  //Single Image Upload
  const [selectedSignedDocumentImage, setSelectedSignedDocumentImage] =
    useState(null);

  const signedDocumentImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedSignedDocumentImage(file);
    }
  };

  const removeSignedDocumentImage = () => {
    setSelectedSignedDocumentImage(null);
  };

  //Single Image Upload
  const [selectedSatBaraImage, setSelectedSatBaraImage] = useState(null);

  const satBaraImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedSatBaraImage(file);
    }
  };

  const removeSatBaraImage = () => {
    setSelectedSatBaraImage(null);
  };

  //Single Image Upload
  const [selectedOwnerAdharImage, setSelectedOwnerAdharImage] = useState(null);

  const ownerAdharImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedOwnerAdharImage(file);
    }
  };

  const removeOwnerAdharImage = () => {
    setSelectedOwnerAdharImage(null);
  };

  //Single Image Upload
  const [selectedOwnerPanImage, setSelectedOwnerPanImage] = useState(null);

  const ownerPanImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedOwnerPanImage(file);
    }
  };

  const removeOwnerPanImage = () => {
    setSelectedOwnerPanImage(null);
  };

  //Single Image Upload
  const [selectedEBillImage, setSelectedEBillImage] = useState(null);

  const eBillImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedEBillImage(file);
    }
  };

  const removeEBillImage = () => {
    setSelectedEBillImage(null);
  };

  // **Fetch Authorities from API**
  const fetchAuthorities = async () => {
    try {
      const response = await fetch(URI + "/admin/authorities", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Authorities.");
      const data = await response.json();
      setAuthorities(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // **Fetch States from API**
  const fetchStates = async () => {
    try {
      const response = await fetch(URI + "/admin/states", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch States.");
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // **Fetch States from API**
  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/cities/${newProperty?.state}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch cities.");
      const data = await response.json();
      console.log(data);
      setCities(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //Fetch Builder
  const fetchBuilder = async () => {
    try {
      const response = await fetch(URI + "/project-partner/builders/active", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch builders.");
      const data = await response.json();
      setBuilderData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  /*Fetch Property type
  const fetchPropertyType = async () => {
    try {
      const response = await fetch(URI + "/admin/propertytypes/active", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setPropertyTypeData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };
  */

  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/project-partner/properties", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/project-partner/properties/${id}`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      setPropertyData(data);
      console.log(data);

      setShowPropertyForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const fetchImages = async (id) => {
    try {
      const response = await fetch(URI + `/admin/properties/${id}`, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      setPropertyImageData(data);
      //console.log(data);
      setShowUpdateImagesForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const fetchPropertyLocation = async (id) => {
    try {
      const response = await fetch(
        URI + `/admin/properties/location/get/${id}`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch property location.");
      const data = await response.json();
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setShowPropertyLocationForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // Update Property Loaction Latitude and Longitude
  const updatePropertyLocation = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/properties/location/edit/${propertyKey}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude,
            longitude,
          }),
        }
      );
      const data = await response.json();
      //console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      setShowPropertyLocationForm(false);
      setLatitude("");
      setLongitude("");
      await fetchData();
    } catch (error) {
      console.error("Error adding property Location:", error);
    } finally {
      setLoading(false);
    }
  };

  //fetch Brochure and Video Data From Property
  const showBrochure = async (id) => {
    try {
      const response = await fetch(URI + `/admin/properties/${id}`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      //console.log(data);
      setVideoUpload({
        ...videoUpload,
        brochureFile: data.brochureFile,
        videoLink: data.videoLink,
      });
      setShowVideoUploadForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const uploadVideo = async (e) => {
    e.preventDefault();

    // === Validation ===
    if (!selectedImage && !videoUpload?.videoLink) {
      alert(
        "Please select a brochure image/PDF or enter a YouTube video link."
      );
      return;
    }

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    const maxFileSize = 300 * 1024 * 1024; // 300 MB

    // Validate brochure file
    if (selectedImage) {
      if (!allowedImageTypes.includes(selectedImage.type)) {
        alert("Only JPG, PNG, WEBP, or PDF files are allowed for brochure.");
        return;
      }
      if (selectedImage.size > maxFileSize) {
        alert("Brochure file size must be less than 300MB.");
        return;
      }
    }

    // Validate YouTube link (optional but ensures correctness)
    if (videoUpload?.videoLink) {
      const isYouTubeURL =
        videoUpload.videoLink.includes("youtube.com") ||
        videoUpload.videoLink.includes("youtu.be");
      if (!isYouTubeURL) {
        alert("Please enter a valid YouTube video link.");
        return;
      }
    }

    const formData = new FormData();

    if (selectedImage) formData.append("brochureFile", selectedImage);
    if (videoUpload?.videoLink)
      formData.append("videoLink", videoUpload.videoLink);

    try {
      setLoading(true);

      const response = await fetch(
        `${URI}/admin/properties/brochure/upload/${propertyKey}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }

      // Reset states
      setShowVideoUploadForm(false);
      setSelectedImage(null);
      setVideoUpload({ videoLink: "" });
      await fetchData();
    } catch (error) {
      console.error("Error uploading brochure or video link:", error);
      alert("Something went wrong while uploading. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add Additional Info as a CSV File For Flat
  const addCsv = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("csv", file);
    formData.append("propertyid", propertyKey);

    try {
      const response = await fetch(
        `${URI}/admin/properties/additionalinfo/flat/csv/add`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Server responded with an error:", data);
        alert(data.message || "CSV upload failed due to a server error.");
        return;
      }

      alert(data.message || "CSV uploaded successfully.");
      setShowAdditionalInfoForm(false);
      setFile(null); // Clear selected file
    } catch (error) {
      console.error("Upload error:", error);
      alert("An unexpected error occurred while uploading the CSV file.");
    }
  };

  // Add Additional Info as a CSV File for Plot
  const addCsvForNewPlot = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("propertyid", propertyKey);
    formData.append("csv", file);

    try {
      const response = await fetch(
        `${URI}/admin/properties/additionalinfo/plot/csv/add/${propertyKey}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Server responded with an error:", data);
        alert(data.message || "CSV upload failed due to a server error.");
        return;
      }

      alert(data.message || "CSV uploaded successfully.");
      setShowNewPlotAdditionalInfoForm(false);
      setFile(null); // Clear selected file
    } catch (error) {
      console.error("Upload error:", error);
      alert("An unexpected error occurred while uploading the CSV file.");
    }
  };

  useEffect(() => {
    fetchData();
    fetchStates();
    fetchBuilder();
    fetchAuthorities();
  }, []);

  useEffect(() => {
    if (newProperty.state != "") {
      fetchCities();
    }
  }, [newProperty.state]);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const filteredData = datas.filter((item) => {
    // Text search filter
    const matchesSearch =
      item.propertyName?.toLowerCase().includes(searchTerm) ||
      item.company_name?.toLowerCase().includes(searchTerm) ||
      item.propertyCategory?.toLowerCase().includes(searchTerm) ||
      item.state?.toLowerCase().includes(searchTerm) ||
      item.city?.toLowerCase().includes(searchTerm) ||
      item.approve?.toLowerCase().includes(searchTerm) ||
      item.status?.toLowerCase().includes(searchTerm);

    // Date range filter
    let startDate = range[0].startDate;
    let endDate = range[0].endDate;

    if (startDate) startDate = new Date(startDate.setHours(0, 0, 0, 0));
    if (endDate) endDate = new Date(endDate.setHours(23, 59, 59, 999));

    // Parse item.created_at (format: "26 Apr 2025 | 06:28 PM")
    const itemDate = parse(
      item.created_at,
      "dd MMM yyyy | hh:mm a",
      new Date()
    );

    const matchesDate =
      (!startDate && !endDate) || // no filter
      (startDate && endDate && itemDate >= startDate && itemDate <= endDate);

    // Final return
    return matchesSearch && matchesDate;
  });

  const customStyles = {
    rows: {
      style: {
        padding: "5px 0px",
        fontSize: "14px",
        fontWeight: 500,
        color: "#111827",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "600",
        backgroundColor: "#F9FAFB",
        backgroundColor: "#00000007",
        color: "#374151",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#1F2937",
      },
    },
  };

  const columns = [
    {
      name: "SN",
      cell: (row, index) => (
        <div className="relative group flex items-center w-full">
          {/* Serial Number Box */}
          <span
            className={`min-w-6 flex items-center justify-center px-2 py-1 rounded-md cursor-pointer ${
              row.status === "Active"
                ? "bg-[#EAFBF1] text-[#0BB501]"
                : "bg-[#FFEAEA] text-[#ff2323]"
            }`}
          >
            {index + 1}
          </span>

          {/* Tooltip */}
          <div className="absolute w-[65px] text-center -top-12 left-[30px] -translate-x-1/2 px-2 py-2 rounded bg-black text-white text-xs hidden group-hover:block transition">
            {row.status === "Active" ? "Active" : "Inactive"}
          </div>
        </div>
      ),
      width: "70px",
    },
    {
      name: "Image",
      cell: (row) => {
        let imageSrc = propertyPicture;

        try {
          const parsed = JSON.parse(row.frontView);
          if (Array.isArray(parsed) && parsed[0]) {
            imageSrc = `${URI}${parsed[0]}`;
          }
        } catch (e) {
          console.warn("Invalid or null frontView:", row.frontView);
        }

        return (
          <div className="w-[130px] h-14 overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt="Property"
              onClick={() => {
                window.open(
                  "https://www.reparv.in/property-info/" + row.seoSlug,
                  "_blank"
                );
              }}
              className="w-full h-[100%] object-cover cursor-pointer"
            />
          </div>
        );
      },
      width: "130px",
    },
    {
      name: "Property Name",
      selector: (row) => row.propertyName,
      sortable: true,
      width: "150px",
    },
    {
      name: "Builder",
      selector: (row) => row.company_name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Category",
      selector: (row) => row.propertyCategory,
      sortable: true,
      width: "150px",
    },
    { name: "Address", selector: (row) => row.address, minWidth: "200px" },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      width: "150px",
    },
    { name: "Pin Code", selector: (row) => row.pincode, width: "100px" },
    { name: "Location", selector: (row) => row.location, width: "150px" },
    { name: "Area", selector: (row) => row.builtUpArea },
    {
      name: "Total Price",
      selector: (row) => row.totalOfferPrice,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Approve",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.approve === "Approved"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.approve === "Rejected"
              ? "bg-[#FBE9E9] text-[#FF0000]"
              : "bg-[#E9F2FF] text-[#0068FF]"
          }`}
        >
          {row.approve}
        </span>
      ),
      minWidth: "150px",
    },
    {
      name: "Reject Reason",
      selector: (row) => row.rejectreason || "-- No Reason --",
      minWidth: "150px",
    },
    {
      name: "Action",
      cell: (row) => <ActionDropdown row={row} />,
      width: "120px",
    },
  ];

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, propertyid, seoSlug) => {
      switch (action) {
        case "view":
          window.open(
            "https://www.reparv.in/property-info/" + seoSlug,
            "_blank"
          );
          break;
        case "update":
          edit(propertyid);
          break;
        case "updateLocation":
          setPropertyKey(propertyid);
          fetchPropertyLocation(propertyid);
          break;
        case "updateImages":
          setPropertyKey(propertyid);
          fetchImages(propertyid);
          break;
        case "videoUpload":
          setPropertyKey(propertyid);
          showBrochure(propertyid);
          break;
        case "additionalinfo":
          setPropertyKey(propertyid);
          setShowAdditionalInfoForm(true);
          break;
        case "additionalinfoforplot":
          setPropertyKey(propertyid);
          setShowNewPlotAdditionalInfoForm(true);
          break;
        default:
          console.log("Invalid action");
      }
    };

    return (
      <div className="relative inline-block w-[120px]">
        <div className="flex items-center justify-between p-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span className=" text-[12px]">{selectedAction || "Action"}</span>
          <FiMoreVertical className="text-gray-500" />
        </div>
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          value={selectedAction}
          onChange={(e) => {
            const action = e.target.value;
            handleActionSelect(action, row.propertyid, row.seoSlug);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="view">View</option>
          <option value="update">Update</option>
          <option value="updateImages">Update Images</option>
          {row.propertyCategory === "NewFlat" ||
          row.propertyCategory === "CommercialFlat" ? (
            <option value="additionalinfo">Additional Info</option>
          ) : (
            <></>
          )}
          {row.propertyCategory === "NewPlot" ||
          row.propertyCategory === "CommercialPlot" ? (
            <option value="additionalinfoforplot">Additional Info</option>
          ) : (
            <></>
          )}
          <option value="videoUpload">Brochure & Video</option>
          <option value="updateLocation">Latitude & Longitude</option>
        </select>
      </div>
    );
  };

  return (
    <div className="properties overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="properties-table w-full h-[578px] flex flex-col p-4 md:p-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        <div className="w-full flex items-center justify-between md:justify-end gap-1 sm:gap-3">
          <p className="block md:hidden text-lg font-semibold">Properties</p>
          <div className="flex xl:hidden flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
            <AddButton label={"Add"} func={setShowPropertyForm} />
          </div>
        </div>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Property"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <div className="block">
                <CustomDateRangePicker range={range} setRange={setRange} />
              </div>
            </div>
            <div className="hidden xl:flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
              <AddButton label={"Add"} func={setShowPropertyForm} />
            </div>
          </div>
        </div>

        <h2 className="text-[16px] font-semibold">Properties List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="scrollbar-hide"
            customStyles={customStyles}
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={15}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              selectAllRowsItem: true,
              selectAllRowsItemText: "All",
            }}
          />
        </div>
      </div>

      {/* Add Property Multi Step Form */}
      <MultiStepForm
        fetchData={fetchData}
        newProperty={newProperty}
        setPropertyData={setPropertyData}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        builderData={builderData}
        authorities={authorities}
        states={states}
        cities={cities}
      />

      {/* Upload Images Form */}
      <UpdateImagesForm
        fetchImages={fetchImages}
        fetchData={fetchData}
        propertyId={propertyKey}
        setPropertyId={setPropertyKey}
        newProperty={propertyImageData}
        setPropertyData={setPropertyImageData}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
      />

      {/* ADD Property Location Latitude & Longitude Form */}
      <div
        className={` ${
          !showPropertyLocationForm && "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full flex fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] max-h-[80vh] bg-white py-8 pb-16 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Update Latitude & Longitude
            </h2>
            <IoMdClose
              onClick={() => {
                setShowPropertyLocationForm(false);
                setLatitude(null);
                setLongitude(null);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={updatePropertyLocation}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-1">
              <input
                type="hidden"
                value={propertyKey || ""}
                onChange={(e) => setPropertyKey(e.target.value)}
              />
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium ">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="Enter Latitude"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={latitude ?? ""}
                  onChange={(e) =>
                    setLatitude(
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                />
              </div>

              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium ">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="Enter Longitude"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={longitude ?? ""}
                  onChange={(e) =>
                    setLongitude(
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                />
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowPropertyLocationForm(false);
                  setLatitude("");
                  setLongitude("");
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Update
              </button>
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>

      {/* ADD Brochure and Video Upload Form */}
      <div
        className={` ${
          !showVideoUploadForm && "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full flex fixed bottom-0 md:bottom-auto`}
      >
        <div className="w-full overflow-scroll scrollbar-hide md:w-[450px] max-h-[80vh] bg-white py-8 pb-16 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Brochure & Video</h2>
            <IoMdClose
              onClick={() => {
                setShowVideoUploadForm(false);
                setSelectedImage(null);
                setVideoUpload({ videoLink: null });
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <form onSubmit={uploadVideo}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1">
              <input
                type="hidden"
                value={propertyKey || ""}
                onChange={(e) => setPropertyKey(e.target.value)}
              />

              {/* Brochure Upload */}
              <div className="w-full">
                {videoUpload?.brochureFile && (
                  <div className="relative mb-3">
                    <img
                      onClick={() => {
                        window.open(URI + videoUpload?.brochureFile, "_blank");
                      }}
                      src={URI + videoUpload?.brochureFile}
                      alt="Old Image"
                      className="w-full max-w-[100px] object-cover rounded-lg border border-gray-300 cursor-pointer"
                    />
                  </div>
                )}

                <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                  Brochure Image / PDF
                </label>
                <div className="w-full mt-2">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const allowedTypes = [
                          "image/jpeg",
                          "image/png",
                          "image/webp",
                          "application/pdf",
                        ];
                        const maxSize = 300 * 1024 * 1024;

                        if (!allowedTypes.includes(file.type)) {
                          alert(
                            "Only JPG, PNG, WEBP, or PDF files are allowed."
                          );
                          e.target.value = "";
                          return;
                        }

                        if (file.size > maxSize) {
                          alert("File size must be less than 300MB.");
                          e.target.value = "";
                          return;
                        }

                        setSelectedImage(file);
                      }
                    }}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                  >
                    <span className="m-3 p-2 text-[16px] font-medium text-[#00000066]">
                      Upload Image / PDF
                    </span>
                    <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                      Browse
                    </div>
                  </label>
                </div>

                {/* Preview Section */}
                {selectedImage && (
                  <div className="relative mt-2">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Uploaded preview"
                      className="w-full max-w-[400px] object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeSingleImage}
                      className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* YouTube Video Link */}
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#0000007b] font-medium">
                  Video Link
                </label>
                <input
                  type="url"
                  placeholder="Enter YouTube video URL"
                  className="w-full mt-[8px] text-[16px] font-medium p-3 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#076300]"
                  onChange={(e) => {
                    const url = e.target.value.trim();

                    setVideoUpload({
                      ...videoUpload,
                      videoLink: url,
                    });
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowVideoUploadForm(false);
                  setSelectedImage(null);
                  setVideoUpload({ videoLink: null });
                }}
                className="px-4 py-2 leading-4 text-white bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Upload
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>

      {/* Aditional information Form */}
      <div
        className={`${
          showAdditionalInfoForm ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full flex fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] max-h-[80vh] bg-white py-8 pb-16 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Additional Information
            </h2>
            <IoMdClose
              onClick={() => {
                setShowAdditionalInfoForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addCsv}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1">
              <input
                type="hidden"
                value={newAddInfo.propertyid || ""}
                onChange={(e) =>
                  setNewAddInfo({
                    ...newAddInfo,
                    propertyid: e.target.value,
                  })
                }
              />

              <div className="w-full mt-2">
                <input
                  type="file"
                  required
                  accept=".csv"
                  multiple
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="csvFile"
                />
                <label
                  htmlFor="csvFile"
                  className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                >
                  <span className="m-3 p-2 overflow-hidden text-[16px] font-medium text-[#00000066]">
                    {file ? file.name : "Upload File"}
                  </span>
                  <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                    Browse
                  </div>
                </label>
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-center gap-6">
              <DownloadCSV
                data={additionalInfoCSVFileFormat}
                filename={"Additional_Info_File_Format.csv"}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white font-semibold bg-[#076300] rounded active:scale-[0.98]"
              >
                Add CSV File
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>

      {/* This is For New Plot Additional Info */}
      <div
        className={`${
          showNewPlotAdditionalInfoForm ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full flex fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] max-h-[80vh] bg-white py-8 pb-16 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Additional Information
            </h2>
            <IoMdClose
              onClick={() => {
                setShowNewPlotAdditionalInfoForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addCsvForNewPlot}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1">
              <input
                type="hidden"
                value={newAddInfo.propertyid || ""}
                onChange={(e) =>
                  setNewAddInfo({
                    ...newAddInfo,
                    propertyid: e.target.value,
                  })
                }
              />

              <div className="w-full mt-2">
                <input
                  type="file"
                  accept=".csv"
                  multiple
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="csvFile"
                />
                <label
                  htmlFor="csvFile"
                  className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                >
                  <span className="m-3 p-2 overflow-hidden text-[16px] font-medium text-[#00000066]">
                    {file ? file.name : "Upload File"}
                  </span>
                  <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                    Browse
                  </div>
                </label>
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-center gap-6">
              <DownloadCSV
                data={additionalInfoNewPlotCSVFileFormat}
                filename={"Plot_Additional_Info_File_Format.csv"}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white font-semibold bg-[#076300] rounded active:scale-[0.98]"
              >
                ADD CSV File
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Properties;
