import React, { useEffect } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const CoursePayment = () => {
  useEffect(() => {
    document.title = "NexUSCore | Course Payment";
    window.scrollTo(0,0);
  }, []);
  const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default CoursePayment;
