import React, { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import paymentLottie from "../../assets/lotties/Online Payment.json";

const PaymentForm = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const { courseId, coursePrice } = location.state || {};


  useEffect(() => {
    const price = parseFloat(coursePrice);
    if (!price || isNaN(price)) return;
    axiosSecure
      .post("/create-payment-intent", {
        email: user.email,
        price: price,
      })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [axiosSecure, user?.email, coursePrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      await axiosSecure.patch(`/usersCourses/paid/${user.email}`, {
        paid: true,
      });
      Swal.fire("Success", "Course payment successful", "success").then(() => {
        navigate("/");
      });
    }
    setLoading(false);
  };  
  return (
    <div className="min-h-screen mt-32">
      <div className="flex flex-col items-center mb-6">
        <Lottie animationData={paymentLottie} className="w-40 h-40" />
        <h2 className="text-2xl font-semibold text-center mt-4">
          Course Payment
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-6 py-11 px-7 rounded-xl shadow-md w-full max-w-md mx-auto border border-gray-600"
      >
        <CardElement className="p-2 border border-gray-600 rounded" />
        <button
          className="btn mt-4 bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white w-full"
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay & Become a Member"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
