import React, { useEffect } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
// import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
// import { Loader } from "lucide-react";

const CoursePayment = () => {
  useEffect(() => {
    document.title = "NexUSCore | Course Payment";
  }, []);

  // const { user } = UseAuth();
  // const axiosSecure = UseAxiosSecure();
  const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

  // const { data: User = {}, isLoading } = useQuery({
  //   queryKey: ["userInfo", user?.email],
  //   enabled: !!user?.email,
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/users?email=${user.email}`);
  //     return res.data;
  //   },
  // });

  // if (isLoading) return <Loader></Loader>;
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default CoursePayment;
