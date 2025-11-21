import React, { useState, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../store/auth";
import { MdDone } from "react-icons/md";
import { handlePayment } from "../../utils/payment.js";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SubscriptionPlan = ({ plan }) => {
  const [amount, setAmount] = useState(plan?.totalPrice);
  //console.log(amount);
  const { URI, user, showSubscription, setShowSubscription, setSuccessScreen } =
    useAuth();
  const user_id = user?.id + user?.contact.slice(8);
  const [coupon, setCoupon] = useState("");
  const [isUsedCoupon, setIsUsedCoupon] = useState(false);
  const [error, setError] = useState("");

  const images = [plan?.firstImage, plan?.secondImage, plan?.thirdImage].filter(
    Boolean
  );

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayNow = async () => {
    alert(`Coupon Applied: ${coupon || "No coupon"}. Proceeding to payment...`);
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Failed to load Razorpay. Please check your internet.");
      return;
    }
    try {
      await handlePayment(
        user_id,
        plan?.planName,
        plan?.id,
        plan?.planDuration,
        coupon,
        isUsedCoupon,
        "projectpartnerid",
        amount,
        user?.email,
        user?.id,
        "projectpartner",
        "id",
        setSuccessScreen
      );
    } catch (paymentError) {
      console.error("Payment Error:", paymentError.message);
      alert("Payment failed. Please contact support.");
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await fetch(`${URI}/api/redeem/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coupon,
          planId: plan.id,
          partnerType: "Project Partner",
          user_id: user_id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        //alert(`Coupon applied! Discount: ${data.discount}`);
        setError("Coupon applied Successfully");
        setIsUsedCoupon(true);
        //console.log(subscriptionPrice - data.discount);
        setAmount((prev) => parseInt(prev) - parseInt(data.discount));
        // You can update price here based on discount logic
      } else {
        setError(data.message);
        //alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    setAmount(plan?.totalPrice);
  },[plan?.totalPrice]);

  return (
    <div
      className={`${
        showSubscription ? "flex" : "hidden"
      } z-[61] overflow-scroll scrollbar-hide w-full h-screen fixed bottom-0 items-end md:items-start md:top-0 md:bottom-auto md:py-20`}
    >
      <div className="w-full md:w-[500px] max-h-[75vh] overflow-scroll scrollbar-hide bg-white py-8 pb-16 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-xl shadow-lg relative">
        {/* Close Button */}
        <IoMdClose
          onClick={() => {
            setShowSubscription(false);
            setCoupon("");
            setError("");
          }}
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Subscription Plan
        </h1>

        {/* Image Slider */}
        <div className="mb-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-lg"
          >
            {images?.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={URI + url}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Plan Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {plan.planName}
          </h2>

          <ul className="space-y-1 text-gray-600">
            {plan.features?.split(",").map((feature, i) => (
              <li key={i} className="flex text-sm items-center">
                <span className="mr-2 text-[#0bb501] font-medium">
                  <MdDone />
                </span>
                {feature.trim()}
              </li>
            ))}
          </ul>
          <p className="text-gray-800 mt-2 font-bold text-lg">
            Price: {plan.totalPrice}
          </p>
        </div>

        {/* Coupon Field */}
        <div className="mb-6">
          <label
            className={`${error && coupon ? "text-red-500" : "text-gray-500"} ${
              error === "Coupon applied Successfully" && "!text-[#0bb501]"
            } block text-sm font-medium mb-2`}
          >
            {error && coupon ? error : "Apply Coupon"}
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setError("");
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0bb501]"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-[#00b501] text-white px-4 py-2 font-semibold rounded-lg hover:opacity-90"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Pay Now & Cancel Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              setShowSubscription(false);
              setCoupon("");
              setError("");
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded active:scale-[0.98] hover:opacity-90"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePayNow}
            className="px-4 py-2 bg-[#00b501] text-white rounded font-semibold active:scale-[0.98] hover:opacity-90"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
