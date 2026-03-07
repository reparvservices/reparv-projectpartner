import { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";
import { IoArrowRedo } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import DashboardFilter from "../components/dashboard/DashboardFilter";
import { parse } from "date-fns";
import {
  FaEye,
  FaHeart,
  FaPhoneAlt,
  FaWhatsapp,
  FaShareAlt,
} from "react-icons/fa";
import { formatNumber } from "../utils/formatNumber";

function Dashboard() {
  const { URI, dashboardFilter } = useAuth();
  const navigate = useNavigate();
  const [overviewData, setOverviewData] = useState([]);
  const [overviewCountData, setOverviewCountData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const getPropertyCounts = (data) => {
    return data.reduce(
      (acc, item) => {
        if (item.enquiryStatus === "Enquired") {
          acc.Enquired++;
        } else if (item.enquiryStatus === "Booked") {
          acc.Booked++;
        }
        return acc;
      },
      { Enquired: 0, Booked: 0 },
    );
  };

  const propertyCounts = getPropertyCounts(overviewData);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const filteredData = overviewData?.filter((item) => {
    // Text search filter
    const matchesSearch =
      item.propertyName?.toLowerCase().includes(searchTerm) ||
      item.company_name?.toLowerCase().includes(searchTerm) ||
      item.propertyCategory?.toLowerCase().includes(searchTerm) ||
      item.city?.toLowerCase().includes(searchTerm);

    // Date range filter
    let startDate = range[0].startDate;
    let endDate = range[0].endDate;

    if (startDate) startDate = new Date(startDate.setHours(0, 0, 0, 0));
    if (endDate) endDate = new Date(endDate.setHours(23, 59, 59, 999));

    // Parse item.created_at (format: "26 Apr 2025 | 06:28 PM")
    const itemDate = parse(
      item.created_at,
      "dd MMM yyyy | hh:mm a",
      new Date(),
    );

    const matchesDate =
      (!startDate && !endDate) || // no filter
      (startDate && endDate && itemDate >= startDate && itemDate <= endDate);

    // Enquiry filter logic: New, Alloted, Assign
    const getProperty = () => {
      if (item.enquiryStatus === "Booked") return "Booked";
      if (item.enquiryStatus === "Enquired") return "Enquired";
      return "";
    };

    const matchesProperty =
      !dashboardFilter || getProperty() === dashboardFilter;

    // Final return
    return matchesSearch && matchesDate && matchesProperty;
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
                ? "bg-[#E3FFDF] text-[#0BB501]"
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
        let imageSrc = "default.jpg";

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
                  "_blank",
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
      name: "Name",
      selector: (row) => row.propertyName,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Builder",
      selector: (row) => row.company_name,
      sortable: true,
      minWidth: "130px",
    },
    { name: "Type", selector: (row) => row.propertyCategory, sortable: true },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      width: "120px",
    },
    { name: "Pin Code", selector: (row) => row.pincode, width: "120px" },
    {
      name: "Total Price",
      selector: (row) => row.totalOfferPrice,
      sortable: true,
    },
  ];

  const fetchCountData = async () => {
    try {
      const response = await fetch(`${URI}/project-partner/dashboard/count`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Count.");
      const data = await response.json();
      //console.log(data);
      setOverviewCountData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(
        URI + "/project-partner/dashboard/properties",
        {
          method: "GET",
          credentials: "include", //  Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setOverviewData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchCountData();
    fetchData();
  }, []);

  return (
    <div className="overview overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="overview-card-container px-4 md:px-0 gap-2 sm:gap-4 w-full grid place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5">
        {[
          {
            label: "Deal Amount",
            value: overviewCountData?.totalDealAmount
              ? (Number(overviewCountData.totalDealAmount) / 10000000).toFixed(
                  2,
                ) + " Cr"
              : "0",
            icon: <FaRupeeSign className="text-[#29bc1e]" />,
          },

          {
            label: "No. of Deal Done",
            value: overviewCountData?.totalCustomer ?? "0",
            icon: <FaThumbsUp className="text-[#29bc1e]" />,
          },

          {
            label: "Self Earning",
            value: overviewCountData?.selfEarning
              ? (Number(overviewCountData.selfEarning) / 100000).toFixed(2) +
                " L"
              : "0",
            icon: <FaRupeeSign className="text-[#29bc1e]" />,
          },

          {
            label: "Deal in Sq. Ft.",
            value: overviewCountData?.totalDealInSquareFeet ?? "0",
            icon: <FaChartArea className="text-[#29bc1e]" />,
          },

          {
            label: "Enquirers",
            value: overviewCountData?.totalEnquirer ?? "0",
            icon: <IoArrowRedo className="text-[#29bc1e]" />,
            to: "/enquirers",
            analytics: {
              calls: overviewCountData?.call_enquirers || 0,
              whatsapp: overviewCountData?.whatsapp_enquirers || 0,
            },
          },

          {
            label: "Properties",
            value: overviewCountData?.totalProperty ?? "0",
            icon: <IoArrowRedo className="text-[#29bc1e]" />,
            to: "/properties",
            analytics: {
              views: overviewCountData?.propertyViews || 0,
              likes: overviewCountData?.propertyLikes || 0,
              shares: overviewCountData?.propertyShares || 0,
            },
          },

          {
            label: "Customers",
            value: overviewCountData?.totalCustomer ?? "0",
            icon: <IoArrowRedo className="text-[#29bc1e]" />,
            to: "/customers",
          },

          {
            label: "Builders",
            value: overviewCountData?.totalBuilder ?? "0",
            icon: <IoArrowRedo className="text-[#29bc1e]" />,
            to: "/builders",
          },

          {
            label: "Employees",
            value: overviewCountData?.totalEmployee ?? "0",
            icon: <IoArrowRedo className="text-[#29bc1e]" />,
            to: "/employees",
          },

          {
            label: "Sales Partners",
            value: overviewCountData?.totalSalesPartner ?? "0",
            icon: <IoArrowRedo className="text-[#29bc1e]" />,
            to: "/salespersons",
          },

          {
            label: "Territory Partners",
            value: overviewCountData?.totalTerritoryPartner ?? "0",
            icon: <IoArrowRedo className="text-[#29bc1e]" />,
            to: "/territorypartner",
          },

          {
            label: "Total Tickets",
            value: overviewCountData?.totalTicket ?? "0",
            icon: <IoArrowRedo className="text-[#29bc1e]" />,
            to: "/tickets",
          },
        ].map((card, index) => (
          <div
            key={index}
            onClick={() => card.to && navigate(card.to)}
            className={`overview-card w-full max-w-[190px] sm:max-w-[290px] flex flex-col items-center justify-center gap-1 rounded-lg sm:rounded-[16px] border-2 hover:border-[#0BB501] bg-white cursor-pointer transition
                       ${card.analytics ? "py-[10px]" : "py-4 sm:py-6"} px-4 sm:px-6`}
          >
            {/* Title + Value */}

            <div className="w-full flex items-center justify-between font-semibold">
              <p>{card.label}</p>

              <p className="flex items-center text-xl">
                {card.label === "Total Deal Amount" ||
                card.label === "Self Earning" ? (
                  <FaRupeeSign className="mr-1 text-[#29bc1e]" />
                ) : null}

                {card.value}
              </p>
            </div>

            {/* Analytics */}

            {card.analytics && (
              <div className="flex items-center justify-between w-full text-sm text-gray-600 font-medium border-t pt-1">
                {card.analytics.views !== undefined && (
                  <div className="flex items-center gap-1">
                    <FaEye className="text-blue-500" />
                    {formatNumber(card.analytics.views)}
                  </div>
                )}

                {card.analytics.likes !== undefined && (
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-red-500" />
                    {formatNumber(card.analytics.likes)}
                  </div>
                )}

                {card.analytics.shares !== undefined && (
                  <div className="flex items-center gap-1">
                    <FaShareAlt className="text-green-500" />
                    {formatNumber(card.analytics.shares)}
                  </div>
                )}

                {card.analytics.calls !== undefined && (
                  <div className="flex items-center gap-1">
                    <FaPhoneAlt className="text-blue-500" />
                    {formatNumber(card.analytics.calls)}
                  </div>
                )}

                {card.analytics.whatsapp !== undefined && (
                  <div className="flex items-center gap-1">
                    <FaWhatsapp className="text-green-600" />
                    {formatNumber(card.analytics.whatsapp)}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="properties-table w-full h-[60vh] flex flex-col p-4 md:p-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        <div className="w-full flex items-center justify-between md:justify-end gap-1 sm:gap-3">
          <p className="block md:hidden text-lg font-semibold">Dashboard</p>
        </div>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A] border">
            <CiSearch />
            <input
              type="text"
              placeholder="Search"
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
          </div>
        </div>
        <div className="filterContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <DashboardFilter counts={propertyCounts} />
        </div>

        <h2 className="text-[16px] ml-1 font-semibold">Property List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="scrollbar-hide"
            customStyles={customStyles}
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={10}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              selectAllRowsItem: true,
              selectAllRowsItemText: "All",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
