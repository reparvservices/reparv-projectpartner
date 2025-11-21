import { useState, useEffect } from "react";
import FormatPrice from "../components/FormatPrice";
import { MdDone } from "react-icons/md";
import { useAuth } from "../store/auth";
import { FiArrowUpLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SubscriptionPlan from "../components/subscription/SubscriptionPlan";

const Subscription = () => {
  const partnerType = "Project Partner";
  const { URI, showSubscription, setShowSubscription } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(
        URI + "/admin/subscription/pricing/plans/" + partnerType,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Subscription Plans.");
      const data = await response.json();
      //console.log(data);
      setPlans(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen py-10 bg-[#F5F5F6]">
      <div className="max-w-6xl xl:max-w-[1500px]">
        <h2 className="text-xl lg:text-3xl font-bold text-center text-black mb-6 md:mb-10 my-1">
          Choose Your{" "}
          <span className="text-2xl md:text-3xl sm:px-6 sm:py-2 rounded-2xl sm:bg-[#0bb501] text-[#0bb501] sm:text-[white] mx-1">
            Subscription
          </span>{" "}
          Plan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {plans?.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-between bg-white hover:shadow-xl transition ${
                plan?.highlight === "True" ? "border-green-500" : ""
              }`}
            >
              <div>
                <h3 className="text-2xl font-semibold text-black mb-2 text-center">
                  {plan?.planName}
                </h3>
                <p className="text-sm text-gray-600 font-medium text-center mb-4">
                  {plan?.planDuration}
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-[#0bb501]">
                    <FormatPrice price={plan?.totalPrice} />
                  </span>
                  <span className="text-black text-sm font-semibold">
                    {" "}
                    / plan
                  </span>
                </div>
                <ul className="space-y-2 text-gray-600">
                  {plan?.features.split(",").map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 text-[#0bb501] font-medium">
                        <MdDone />
                      </span>
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setShowSubscription(true);
                  setSelectedPlan(plan);
                }}
                className={`mt-6 w-full py-2 rounded-lg font-medium text-white cursor-pointer ${
                  plan?.highlight === "True"
                    ? "bg-[#0bb501] hover:bg-[#19b501]"
                    : "bg-gray-800 hover:bg-black"
                }`}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <SubscriptionPlan
        showModal={showSubscription}
        setShowModal={setShowSubscription}
        plan={selectedPlan}
      />
    </div>
  );
};

export default Subscription;
