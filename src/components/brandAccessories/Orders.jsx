import React from "react";
import { parse } from "date-fns";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../store/auth";
import CustomDateRangePicker from "../CustomDateRangePicker";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import TableFilter from "./tableFilter";
import FormatPrice from "../FormatPrice";

const Orders = ({ selectedTable, setSelectedTable }) => {
  const {
    URI,
    setLoading,
    showOrder,
    setShowOrder,
    orderFilter,
    setOrderFilter,
  } = useAuth();

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState({});

  const [selectedPartner, setSelectedPartner] = useState("projectPartnerId");

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/brand-accessories/partner/orders/${selectedPartner}`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Orders.");
      const data = await response.json();
      //console.log(data);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const viewOrder = async (id) => {
    try {
      const response = await fetch(
        URI + `/admin/brand-accessories/product/order/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch order.");
      const data = await response.json();
      //console.log(data);
      setOrder(data);
      setShowOrder(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // change status record
  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure to cancel this order?"))
      return;

    try {
      const response = await fetch(
        URI + `/admin/brand-accessories/partner/order/cancel/${id}`,
        {
          method: "PUT",
          credentials: "include", //  Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      //console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      await fetchData();
    } catch (error) {
      console.error("Error cancelling Order :", error);
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

  const filteredData = orders?.filter((item) => {
    const matchesSearch =
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ordererid?.toLowerCase().includes(searchTerm.toLowerCase());

    let startDate = range[0].startDate;
    let endDate = range[0].endDate;

    if (startDate) startDate = new Date(startDate.setHours(0, 0, 0, 0));
    if (endDate) endDate = new Date(endDate.setHours(23, 59, 59, 999));

    const itemDate = parse(
      item.orderCreatedAt,
      "dd MMM yyyy | hh:mm a",
      new Date()
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
      name: "Product Image",
      cell: (row) => {
        let imageSrc =
          URI + row.productImage ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
        return (
          <div className="w-[110px] h-[62px] overflow-hidden rounded-lg border flex items-center justify-center">
            <img
              src={imageSrc}
              alt="productImage"
              onClick={() => {
                //navigate(`${URI}${row.image}`, "_blank");
              }}
              className="w-full h-[100%] object-cover cursor-pointer"
            />
          </div>
        );
      },
      width: "150px",
    },

    {
      name: "Date & Time",
      selector: (row) => row.orderCreatedAt,
      width: "200px",
    },
    {
      name: "Order Status",
      cell: (row, index) => (
        <span
          className={`min-w-6 flex items-center justify-center px-2 py-1 rounded-md cursor-pointer ${
            row.orderStatus === "New"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.orderStatus === "Completed"
              ? "bg-[#E9F2FF] text-[#0068FF]"
              : row.orderStatus === "Out For Delivery"
              ? "bg-[#fff8e3] text-[#ffbc21]"
              : row.orderStatus === "Cancelled"
              ? "bg-[#FFEAEA] text-[#ff2323]"
              : "text-[#000000]"
          }`}
        >
          {row.orderStatus}
        </span>
      ),
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
    },
    {
      name: "Order ID",
      cell: (row, index) => (
        <span
          className={`min-w-6 flex items-center justify-center px-2 py-1 rounded-md cursor-pointer ${
            row.orderStatus === "New"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.orderStatus === "Completed"
              ? "bg-[#E9F2FF] text-[#0068FF]"
              : row.orderStatus === "Out For Delivery"
              ? "bg-[#fff8e3] text-[#ffbc21]"
              : row.orderStatus === "Cancelled"
              ? "bg-[#FFEAEA] text-[#ff2323]"
              : "text-[#000000]"
          }`}
        >
          {row.orderId}
        </span>
      ),
      width: "200px",
    },
    {
      name: "Product",
      selector: (row) => row.productName,
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
    },
    {
      name: "Product Size",
      selector: (row) => row.productSize,
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
    },
    {
      name: "Quantity",
      selector: (row) => row.orderQuantity + " Units",
      sortable: true,
      minWidth: "100px",
      maxWidth: "200px",
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
          viewOrder(id);
          break;
        case "cancelOrder":
          cancelOrder(id);
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
            handleActionSelect(action, row.id);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="view">View Order</option>
          <option value="cancelOrder">Cancel Order</option>
        </select>
      </div>
    );
  };

  return (
    <div
      className={`overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div className="sales-table w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        <div className="w-full flex items-center justify-between gap-1 sm:gap-3">
          <TableFilter
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />
        </div>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] border rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
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
        <h2 className="text-[16px] font-semibold">Order List</h2>
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

      {/* View Product Details */}
      <div
        className={`${
          showOrder ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-full flex fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full overflow-scroll scrollbar-hide md:w-[550px] max-h-[80vh] bg-white py-8 pb-10 px-3 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Order Details</h2>

            <IoMdClose
              onClick={() => {
                setShowOrder(false);
                setOrder({});
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          {/* Product Image and Info */}
          <div className="w-full flex gap-4 items-center">
            <div>
              <img
                src={`${URI}${order?.productImage}`}
                alt="Product"
                className="w-[140px] h-[90px] object-cover rounded-md border"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <h2 className="ml-2 text-base font-semibold text-gray-800">
                {order?.productName || "T-shirts"}
              </h2>

              <div className="bg-[#EAFBF1] text-[#0BB501] px-2 py-[2px] text-sm font-semibold rounded">
                Order Id : {order?.orderId}
              </div>

              <span className="px-2 py-[2px] text-xs font-semibold rounded">
                {order?.orderCreatedAt}
              </span>
            </div>
          </div>
          <div className="border mt-3 mb-3"></div>
          <div className="w-full mb-1">
            <p
              className={`font-semibold text-sm px-4 py-1 rounded-xl ${
                order.orderStatus === "New"
                  ? " bg-[#EAFBF1] text-[#0BB501] border-[#C7F3D9] focus:ring-[#0BB501]"
                  : order.orderStatus === "Completed"
                  ? "bg-[#E9F2FF] text-[#0068FF] border-[#BCD8FF] focus:ring-[#0068FF]"
                  : order.orderStatus === "Out For Delivery"
                  ? "bg-[#fff8e3] text-[#ffbc21] border-[#ffecb3] focus:ring-[#ffbc21]"
                  : order.orderStatus === "Cancelled"
                  ? "bg-[#FFEAEA] text-[#ff2323] border-[#FFCCCC] focus:ring-[#ff2323]"
                  : "bg-white text-black border-[#00000033] focus:ring-green-500"
              }`}
            >
              Order Status - {order?.orderStatus}
            </p>
          </div>
          <div className="grid p-2 grid-cols-2 md:grid-cols-3 gap-4 text-sm font-semibold text-gray-900">
            <div>
              <p className="font-semibold text-xs text-gray-500">
                Product Size
              </p>
              <p className="font-semibold ">{order?.productSize}</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-gray-500">
                Order Quantity
              </p>
              <p className="font-semibold ">
                {order?.orderQuantity || 0} Units
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs text-gray-500">Bill Amount</p>
              <p className="font-semibold ">
                <FormatPrice price={parseFloat(order?.billAmount)} />
              </p>
            </div>
          </div>{" "}
          <div className="border mt-2 mb-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
