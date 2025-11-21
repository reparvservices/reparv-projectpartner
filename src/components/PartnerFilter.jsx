import React from "react";
import { useAuth } from "../store/auth";

const PartnerFilter = ({ counts = {} }) => {
  const { partnerPaymentStatus, setPartnerPaymentStatus } = useAuth();

  const filterOptions = [
    {
      label: "Unpaid",
      bg: "bg-red-100",
      text: "text-red-600",
      count: counts?.Unpaid || 0,
    },
    {
      label: "Follow Up",
      bg: "bg-blue-100",
      text: "text-blue-600",
      count: counts?.FollowUp || 0,
    },
    {
      label: "Paid",
      bg: "bg-green-100",
      text: "text-green-600",
      count: counts?.Paid || 0,
    },
    {
      label: "Free",
      bg: "bg-yellow-100",
      text: "text-yellow-500",
      count: counts?.Free || 0,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center z-10">
      {filterOptions.map((option) => {
        const isActive = partnerPaymentStatus === option.label;
        return (
          <button
            key={option.label}
            onClick={() => setPartnerPaymentStatus(option.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border font-medium transition-all duration-200
              ${
                isActive
                  ? `${option.bg} ${option.text}`
                  : "bg-white text-black text-sm"
              }
              hover:opacity-90`}
          >
            <span>{option.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold
                ${
                  isActive
                    ? `${option.text} bg-white`
                    : "text-gray-500 bg-gray-200"
                }
              `}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PartnerFilter;
