import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function BusinessDetails() {
  const { userid } = useParams();
  const navigate = useNavigate();
  const { URI, setLoading } = useAuth();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [userData, setUserData] = useState({
    whatsappNumber: "",
    businessHeading: "",
    businessDescription: "",
    businessAddress: "",
    businessState: "",
    businessCity: "",
    businessPincode: "",
  });

  //Single Image Upload
  const [selectedImage, setSelectedImage] = useState(null);

  const imageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
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
        `${URI}/admin/cities/${userData?.businessState}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Cities.");
      const data = await response.json();
      //console.log(data);
      setCities(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const showDetails = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/projectpartner/get/${userid}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Project Partner!");
      const data = await response.json();
      setUserData(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // === Validation ===
    if (!selectedImage && !userData.businessLogo) {
      alert("Please select a Business Logo Image.");
      return;
    }

    const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxFileSize = 1 * 1024 * 1024; // 1 MB

    // Validate file
    if (selectedImage) {
      if (!allowedImageTypes.includes(selectedImage.type)) {
        alert("Only JPG, PNG, WEBP image are allowed for Business Logo.");
        return;
      }
      if (selectedImage.size > maxFileSize) {
        alert("Logo Image size must be less than 1MB.");
        return;
      }
    }

    const formData = new FormData();

    // Append user data
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    if (selectedImage) formData.append("businessLogo", selectedImage);

    try {
      setLoading(true);
      const response = await fetch(
        `${URI}/admin/projectpartner/business-details/edit/${userData.id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Business Details Add SuccessFully!");
        setSelectedImage(null);
        showDetails();
      } else {
        throw new Error(
          `Failed to save Business Details. Status: ${response.status}`
        );
      }
    } catch (err) {
      console.error("Error saving Business Detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showDetails();
    fetchStates();
  }, []);

  useEffect(() => {
    if (userData.businessState != "") {
      fetchCities();
    }
  }, [userData.businessState]);

  return (
    <div className="w-full h-screen bg-white py-8 px-4 sm:px-8 border border-[#cfcfcf33] rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">
          Enter Your Business Details
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full p-1 pb-10 max-h-[85vh] overflow-scroll scrollbar-hide"
      >
        <h2 className="text-[15px] font-semibold mb-2">
          Step: 1 Business Details
        </h2>
        <div className="w-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
          <input
            type="hidden"
            value={userData.id || ""}
            onChange={(e) => setUserData({ ...userData, id: e.target.value })}
          />
          <div className="w-full">
            <label
              className={`${
                userData.whatsappNumber ? "text-green-600" : "text-[#00000066]"
              } block text-sm leading-4 font-medium`}
            >
              WhatsApp Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter WhatsApp Number"
              value={userData.whatsappNumber}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,10}$/.test(input)) {
                  // Allows only up to 10 digits
                  setUserData({
                    ...userData,
                    whatsappNumber: e.target.value,
                  });
                }
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501] placeholder:text-black"
            />
          </div>
          <div className="w-full col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-3">
            <label
              className={`${
                userData.businessHeading ? "text-green-600" : "text-[#00000066]"
              } block text-sm leading-4 font-medium`}
            >
              Business Heading <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter About You Heading"
              value={userData.businessHeading}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  businessHeading: e.target.value,
                });
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501] placeholder:text-black"
            />
          </div>
          <div className="w-full col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <label
              className={`${
                userData.businessDescription
                  ? "text-green-600"
                  : "text-[#00000066]"
              } block text-sm leading-4 font-medium`}
            >
              Business Description <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter About You Description"
              value={userData.businessDescription}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  businessDescription: e.target.value,
                });
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501] placeholder:text-black"
            />
          </div>
        </div>
        <h2 className="text-[15px] font-semibold mb-2">
          Step: 2 Address Details
        </h2>
        <div className="w-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
          <div className="w-full">
            <label
              className={`${
                userData.businessAddress ? "text-green-600" : "text-[#00000066]"
              } block text-sm leading-4 font-medium`}
            >
              Address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Address"
              value={userData.businessAddress}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  businessAddress: e.target.value,
                });
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501] placeholder:text-black"
            />
          </div>

          {/* State Select Input */}
          <div className="w-full">
            <label
              className={`${
                userData.businessState ? "text-green-600" : "text-[#00000066]"
              } block text-sm leading-4 font-medium`}
            >
              Select State <span className="text-red-600">*</span>
            </label>
            <select
              required
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501] appearance-none bg-transparent placeholder:text-black"
              style={{ backgroundImage: "none" }}
              value={userData.businessState}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  businessState: e.target.value,
                })
              }
            >
              <option value="">Select Your State</option>
              {states.map((state, index) => (
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
                userData.businessCity ? "text-green-600" : "text-[#00000066]"
              } block text-sm leading-4 font-medium`}
            >
              Select City <span className="text-red-600">*</span>
            </label>
            <select
              required
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501] appearance-none bg-transparent placeholder:text-black"
              style={{ backgroundImage: "none" }}
              value={userData.businessCity}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  businessCity: e.target.value,
                })
              }
            >
              <option value="">Select Your City</option>
              {cities.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label
              className={`${
                userData.businessPincode ? "text-green-600" : "text-[#00000066]"
              } block text-sm leading-4 font-medium`}
            >
              Pin-Code <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              required
              placeholder="Enter Pin-Code"
              value={userData.businessPincode}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,6}$/.test(input)) {
                  setUserData({ ...userData, businessPincode: input });
                }
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501] placeholder:text-black"
            />
          </div>
        </div>

        <h2 className="flex flex-wrap items-center gap-2 text-[15px] font-semibold pb-4">
          <span>Step: 3 Other Details & Business Logo Image</span>{" "}
          <span className="sm:ml-2 text-red-600 text-xs">
            ( Max Image size 1MB )
          </span>
        </h2>
        <div className="w-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
          {/* Business Logo Image Upload */}
          <div className="w-full">
            {userData?.businessLogo && (
              <div className="relative mb-3">
                <img
                  onClick={() => {
                    window.open(URI + userData?.businessLogo, "_blank");
                  }}
                  src={URI + userData?.businessLogo}
                  alt="Old Image"
                  className="w-full max-w-[150px] max-h-[60px] object-cover rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>
            )}
            <label
              className={`${
                selectedImage || userData?.businessLogo
                  ? "text-green-600"
                  : "text-[#00000066]"
              } block text-sm leading-4 font-medium`}
            >
              Upload Business Logo
            </label>

            <div className="w-full mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const allowedTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                    ];
                    const maxSize = 1 * 1024 * 1024;

                    if (!allowedTypes.includes(file.type)) {
                      alert("Only JPG, PNG, or WEBP files are allowed.");
                      e.target.value = "";
                      return;
                    }

                    if (file.size > maxSize) {
                      alert("File size must be less than 1MB.");
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
                  Upload Image
                </span>
                <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                  Browse
                </div>
              </label>
            </div>

            {/* Preview Section */}
            {selectedImage && (
              <div className="grid grid-cols-1 mt-3">
                <div className="relative flex items-end justify-end">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Logo Preview"
                    className="w-full max-w-[300px] max-h-[120px] object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex mt-8 md:mt-8 justify-end gap-6">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="px-6 py-3 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-white bg-[#076300] rounded active:scale-[0.98]"
          >
            Save
          </button>
          <Loader />
        </div>
      </form>
    </div>
  );
}
