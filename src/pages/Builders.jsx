import { parse } from "date-fns";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import FilterData from "../components/FilterData";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import Loader from "../components/Loader";
import TagsInput from "../components/builder/TagsInput";

const Builders = () => {
  const {
    showBuilderForm,
    setShowBuilderForm,
    action,
    giveAccess,
    setGiveAccess,
    setShowBuilder,
    showBuilder,
    URI,
    user,
    loading,
    setLoading,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [builder, setBuilder] = useState({});
  const [selectedBuilderId, setSelectedBuilderId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBuilder, setNewBuilder] = useState({
    // Basic Info
    company_name: "",
    contact_person: "",
    contact: "",
    email: "",
    office_address: "",
    website: "",
    experience: "",

    // Registration
    registration_no: "",
    dor: "",

    // Extra Profile Details (will go inside notes JSON)
    about: "",
    vision: "",
    mission: "",
    quality: "",
    expertise: "",
    why_choose: "",
  });
  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/project-partner/builders", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch builders.");
      const data = await response.json();

      setDatas(data);
    } catch (err) {
      console.error("Error fetching builders:", err);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    const endpoint = newBuilder.builderid
      ? `edit/${newBuilder.builderid}`
      : "add";

    try {
      setLoading(true);
      const response = await fetch(
        `${URI}/project-partner/builders/${endpoint}`,
        {
          method: newBuilder.builderid ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBuilder),
        },
      );

      if (response.status === 409) {
        alert("Builder already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save builder. Status: ${response.status}`);
      } else {
        alert(
          newBuilder.builderid
            ? "Builder updated successfully!"
            : "Builder added successfully!",
        );
      }

      // Clear form only after successful fetch
      setNewBuilder({
        // Basic Info
        company_name: "",
        contact_person: "",
        contact: "",
        email: "",
        office_address: "",
        website: "",
        experience: "",

        // Registration
        registration_no: "",
        dor: "",

        // Extra Profile Details (will go inside notes JSON)
        about: "",
        vision: "",
        mission: "",
        quality: "",
        expertise: "",
        why_choose: "",
      });

      setShowBuilderForm(false);

      await fetchData(); // Ensure latest data is fetched
    } catch (err) {
      console.error("Error saving builder:", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch data on form
  const edit = async (builderid) => {
    try {
      const response = await fetch(
        URI + `/project-partner/builders/${builderid}`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch builders.");
      const data = await response.json();
      setNewBuilder(data);
      setShowBuilderForm(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  //fetch data on form
  const viewBuilder = async (builderid) => {
    try {
      const response = await fetch(
        URI + `/project-partner/builders/${builderid}`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch builders.");
      const data = await response.json();
      setBuilder(data);
      setShowBuilder(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  //Delete record
  const del = async (builderid) => {
    if (!window.confirm("Are you sure you want to delete this builder?"))
      return;
    try {
      const response = await fetch(
        URI + `/project-partner/builders/delete/${builderid}`,
        {
          method: "DELETE",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        alert("Builder deleted successfully!");
        // Refresh Builder list
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting Builder:", error);
    } finally {
      setLoading(false);
    }
  };

  // change status record
  const status = async (builderid) => {
    if (!window.confirm("Are you sure you want to change this builder status?"))
      return;

    try {
      const response = await fetch(
        URI + `/project-partner/builders/status/${builderid}`,
        {
          method: "PUT",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const filteredData = datas.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.company_name?.toLowerCase().includes(search) ||
      item.contact_person?.toLowerCase().includes(search) ||
      item.contact?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.registration_no?.toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search);

    // Date range logic
    let startDate = range[0].startDate;
    let endDate = range[0].endDate;

    if (startDate) startDate = new Date(startDate.setHours(0, 0, 0, 0));
    if (endDate) endDate = new Date(endDate.setHours(23, 59, 59, 999));

    const itemDate = parse(
      item.created_at,
      "dd MMM yyyy | hh:mm a",
      new Date(),
    );

    const matchesDate =
      (!startDate && !endDate) ||
      (startDate && endDate && itemDate >= startDate && itemDate <= endDate);

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
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Contact Person",
      selector: (row) => row.contact_person,
      minWidth: "150px",
    },
    { name: "Contact", selector: (row) => row.contact, minWidth: "150px" },
    { name: "Email", selector: (row) => row.email, minWidth: "150px" },
    {
      name: "Registration No",
      selector: (row) => row.registration_no,
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

    const handleActionSelect = (action, id) => {
      switch (action) {
        case "view":
          viewBuilder(id);
          break;
        case "status":
          status(id);
          break;
        case "update":
          edit(id);
          break;
        case "delete":
          del(id);
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
            handleActionSelect(action, row.builderid);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="view">View</option>
          <option value="status">Status</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>
    );
  };

  return (
    <div
      className={`builders overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      {!showBuilderForm ? (
        <>
          <div className="builder-table overflow-scroll scrollbar-hide w-full h-[80vh] flex flex-col p-4 md:p-6 py-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
            <div className="w-full flex items-center justify-between md:justify-end gap-1 sm:gap-3">
              <p className="block md:hidden text-lg font-semibold">Builders</p>
              <div className="flex xl:hidden flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
                <AddButton label={"Add"} func={setShowBuilderForm} />
              </div>
            </div>
            <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
              <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
                <CiSearch />
                <input
                  type="text"
                  placeholder="Search Builder"
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
                  <AddButton label={"Add"} func={setShowBuilderForm} />
                </div>
              </div>
            </div>
            <h2 className="text-[16px] font-semibold">Builders List</h2>
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
        </>
      ) : (
        <div
          className={` ${
            !showBuilderForm && "hidden"
          } z-[61] builder-form overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] flex fixed`}
        >
          <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold">Builders</h2>
              <IoMdClose
                onClick={() => {
                  setShowBuilderForm(false);
                  setNewBuilder({
                    // Basic Info
                    company_name: "",
                    contact_person: "",
                    contact: "",
                    email: "",
                    office_address: "",
                    website: "",
                    experience: "",

                    // Registration
                    registration_no: "",
                    dor: "",

                    // Extra Profile Details (will go inside notes JSON)
                    about: "",
                    vision: "",
                    mission: "",
                    quality: "",
                    expertise: "",
                    why_choose: "",
                  });
                }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <form onSubmit={add}>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <input type="hidden" value={newBuilder.builderid || ""} />

                {/* Company Name */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.company_name
                        ? "text-green-600"
                        : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Company Name"
                    className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.company_name || ""}
                    onChange={(e) =>
                      setNewBuilder({
                        ...newBuilder,
                        company_name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Contact Person */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.contact_person
                        ? "text-green-600"
                        : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Contact Person <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Contact"
                    className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.contact_person || ""}
                    onChange={(e) =>
                      setNewBuilder({
                        ...newBuilder,
                        contact_person: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Contact */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.contact ? "text-green-600" : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Contact Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength="10"
                    placeholder="Enter Contact Number"
                    className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.contact || ""}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d{0,10}$/.test(input)) {
                        setNewBuilder({ ...newBuilder, contact: input });
                      }
                    }}
                  />
                </div>

                {/* Email */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.email ? "text-green-600" : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter Email"
                    className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.email || ""}
                    onChange={(e) =>
                      setNewBuilder({ ...newBuilder, email: e.target.value })
                    }
                  />
                </div>

                {/* Registration No */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.registration_no
                        ? "text-green-600"
                        : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Registration No. <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Registration No."
                    className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.registration_no || ""}
                    onChange={(e) =>
                      setNewBuilder({
                        ...newBuilder,
                        registration_no: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Date of Registration */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.dor ? "text-green-600" : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Date Of Registration{" "}
                    <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.dor ? newBuilder.dor.split("T")[0] : ""}
                    onChange={(e) =>
                      setNewBuilder({ ...newBuilder, dor: e.target.value })
                    }
                  />
                </div>

                {/* Office Address */}
                <div className="w-full col-span-1 lg:col-span-2">
                  <label
                    className={`${
                      newBuilder.office_address
                        ? "text-green-600"
                        : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Office Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Office Address"
                    className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.office_address || ""}
                    onChange={(e) =>
                      setNewBuilder({
                        ...newBuilder,
                        office_address: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Website */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.website ? "text-green-600" : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Website
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Website URL"
                    className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.website || ""}
                    onChange={(e) =>
                      setNewBuilder({ ...newBuilder, website: e.target.value })
                    }
                  />
                </div>

                {/* Experience (Years) */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.experience
                        ? "text-green-600"
                        : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter Experience in Years"
                    className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.experience || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setNewBuilder({ ...newBuilder, experience: value });
                      }
                    }}
                  />
                </div>

                {/* About */}
                <div className="w-full col-span-1 lg:col-span-2">
                  <label
                    className={`${
                      newBuilder.about ? "text-green-600" : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    About Builder
                  </label>
                  <textarea
                    rows="4"
                    className="w-full mt-2 p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.about || ""}
                    onChange={(e) =>
                      setNewBuilder({ ...newBuilder, about: e.target.value })
                    }
                  />
                </div>

                {/* Expertise */}
                <div className="w-full col-span-1 lg:col-span-2">
                  <TagsInput
                    label="Expertise"
                    name="expertise"
                    value={newBuilder?.expertise}
                    setField={setNewBuilder}
                  />
                </div>

                {/* Why Choose Us */}
                <div className="w-full col-span-1 lg:col-span-2">
                  <TagsInput
                    label="Why Choose Us"
                    name="why_choose"
                    value={newBuilder?.why_choose}
                    setField={setNewBuilder}
                  />
                </div>

                {/* Quality */}
                <div className="w-full col-span-1 lg:col-span-2">
                  <TagsInput
                    label="Quality & Construction"
                    name="quality"
                    value={newBuilder?.quality}
                    setField={setNewBuilder}
                  />
                </div>

                {/* Vision */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.vision ? "text-green-600" : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Vision
                  </label>
                  <textarea
                    rows="4"
                    className="w-full mt-2 p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.vision || ""}
                    onChange={(e) =>
                      setNewBuilder({ ...newBuilder, vision: e.target.value })
                    }
                  />
                </div>

                {/* Mission */}
                <div className="w-full">
                  <label
                    className={`${
                      newBuilder.mission ? "text-green-600" : "text-[#00000066]"
                    } block text-sm leading-4 font-medium`}
                  >
                    Mission
                  </label>
                  <textarea
                    rows="4"
                    className="w-full mt-2 p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={newBuilder.mission || ""}
                    onChange={(e) =>
                      setNewBuilder({ ...newBuilder, mission: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex mt-8 md:mt-6 justify-end gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowBuilderForm(false);
                    setNewBuilder({
                      // Basic Info
                      company_name: "",
                      contact_person: "",
                      contact: "",
                      email: "",
                      office_address: "",
                      website: "",
                      experience: "",

                      // Registration
                      registration_no: "",
                      dor: "",

                      // Extra Profile Details (will go inside notes JSON)
                      about: "",
                      vision: "",
                      mission: "",
                      quality: "",
                      expertise: "",
                      why_choose: "",
                    });
                  }}
                  className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#076300] rounded"
                >
                  Save
                </button>

                <Loader />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Show Builder Info */}
      <div
        className={`${
          showBuilder ? "flex" : "hidden"
        } z-[61] property-form overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Builder Details</h2>
            <IoMdClose
              onClick={() => {
                setShowBuilder(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Company Name
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={builder.company_name}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Contact Person
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={builder.contact_person}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Contact Number
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={builder.contact}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Email
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={builder.email}
                readOnly
              />
            </div>

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Resgistration Date
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={builder.dor?.split("T")[0]}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Resgistration No.
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={builder.registration_no}
                readOnly
              />
            </div>

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Status
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={builder.status}
                readOnly
              />
            </div>
            {/* Office Address */}
            <div className="w-full col-span-1 lg:col-span-2">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Office Address
              </label>
              <input
                type="text"
                disabled
                readOnly
                value={builder.office_address}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none"
              />
            </div>

            {/* Website */}
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Website
              </label>
              <input
                type="text"
                disabled
                readOnly
                value={builder.website}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none"
              />
            </div>

            {/* Experience */}
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Experience
              </label>
              <input
                type="text"
                disabled
                readOnly
                value={builder.experience}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none"
              />
            </div>

            {/* About */}
            <div className="w-full col-span-1 lg:col-span-2">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                About
              </label>
              <textarea
                disabled
                readOnly
                value={builder.about}
                rows={4}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none resize-none"
              />
            </div>

            {/* Vision */}
            <div className="w-full col-span-1 lg:col-span-2">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Vision
              </label>
              <textarea
                disabled
                readOnly
                value={builder.vision}
                rows={3}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none resize-none"
              />
            </div>

            {/* Mission */}
            <div className="w-full col-span-1 lg:col-span-2">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Mission
              </label>
              <textarea
                disabled
                readOnly
                value={builder.mission}
                rows={3}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none resize-none"
              />
            </div>

            {/* Quality */}
            <div className="w-full col-span-1 lg:col-span-2">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Quality
              </label>
              <textarea
                disabled
                readOnly
                value={builder.quality}
                rows={3}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none resize-none"
              />
            </div>

            {/* Expertise */}
            <div className="w-full col-span-1 lg:col-span-2">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Expertise
              </label>
              <textarea
                disabled
                readOnly
                value={builder.expertise}
                rows={3}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none resize-none"
              />
            </div>

            {/* Why Choose */}
            <div className="w-full col-span-1 lg:col-span-2">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Why Choose Us
              </label>
              <textarea
                disabled
                readOnly
                value={builder.why_choose}
                rows={3}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none resize-none"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Builders;
