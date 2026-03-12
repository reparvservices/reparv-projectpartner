import { useState, useEffect } from "react";
import FormatPrice from "../components/FormatPrice";
import { MdDone } from "react-icons/md";
import { useAuth } from "../store/auth";
import { FiArrowUpLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SubscriptionPlan from "../components/subscription/SubscriptionPlan";

const Subscription = () => {
  const partnerType = "Project Partner";
  const { URI, user, showSubscription, setShowSubscription } = useAuth();
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        URI + "/admin/subscription/pricing/plans/" + partnerType,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await response.json();
      setPlans(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const fetchActiveSubscription = async () => {
    try {
      const response = await fetch(
        `${URI}/project-partner/subscription/user/${user?.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await response.json();
      setActiveSubscription(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchActiveSubscription();
  }, []);

  return (
    <div className="min-h-screen bg-white py-16 flex justify-center">
      <div className="max-w-7xl w-full px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#076506]">
            Choose Your Subscription
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Flexible plans designed for growth
          </p>
        </div>

        {/* ACTIVE SUBSCRIPTION */}
        {activeSubscription && (
          <div className="mx-auto max-w-4xl mb-16 bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#076506] to-[#0bb501] text-white p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Active Subscription</h3>

                <span className="bg-white text-[#076506] text-xs px-3 py-1 rounded-full font-semibold">
                  ACTIVE
                </span>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#076506]">
                {activeSubscription.planName}
              </h2>

              <p className="text-gray-500 mb-6">
                {activeSubscription.planDuration}
              </p>

              <div className="text-4xl font-bold text-[#0bb501] mb-8">
                <FormatPrice price={parseFloat(activeSubscription?.amount)} />
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm text-gray-600 mb-8">
                <div>
                  <p className="text-gray-400">Start Date</p>
                  <p className="font-medium">{activeSubscription.start_date}</p>
                </div>

                <div>
                  <p className="text-gray-400">Expiry Date</p>
                  <p className="font-medium">{activeSubscription.end_date}</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full flex items-center justify-center gap-2 bg-[#076506] text-white py-3 rounded-xl hover:bg-[#065104] transition"
              >
                <FiArrowUpLeft />
                Go to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* PLAN GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 items-start">
          {plans?.map((plan, index) => {
            const features = plan?.features?.split(",") || [];
            const visible = expandedCards[index]
              ? features
              : features.slice(0, 4);

            return (
              <div
                key={index}
                className={`relative rounded-3xl border bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${
                  plan?.highlight === "True"
                    ? "border-[#0bb501] ring-2 ring-[#0bb501]/20"
                    : "border-gray-200"
                }`}
              >
                {plan?.highlight === "True" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0bb501] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Popular
                  </div>
                )}

                {/* CARD HEADER */}

                <div className="p-6 text-center border-b">
                  <h3 className="text-xl font-bold text-[#076506]">
                    {plan?.planName}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {plan?.planDuration}
                  </p>
                </div>

                {/* PRICE */}

                <div className="text-center py-6">
                  <span className="text-4xl font-bold text-[#0bb501]">
                    <FormatPrice price={plan?.totalPrice} />
                  </span>

                  <p className="text-gray-500 text-sm mt-1">per plan</p>
                </div>

                {/* FEATURES */}

                <div className="px-6">
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {visible.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <MdDone className="text-[#0bb501] mt-[3px]" />
                        {feature.trim()}
                      </li>
                    ))}
                  </ul>

                  {features.length > 4 && (
                    <button
                      onClick={() => toggleCard(index)}
                      className="mt-4 text-sm font-medium text-[#076506] hover:underline"
                    >
                      {expandedCards[index] ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>

                {/* BUTTON */}

                <div className="p-6">
                  <button
                    onClick={() => {
                      setShowSubscription(true);
                      setSelectedPlan(plan);
                    }}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                      plan?.highlight === "True"
                        ? "bg-[#0bb501] hover:bg-[#099f01]"
                        : "bg-[#076506] hover:bg-[#065104]"
                    }`}
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            );
          })}
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
