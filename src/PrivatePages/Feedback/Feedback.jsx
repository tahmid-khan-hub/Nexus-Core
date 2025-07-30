import React from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Animation from "../../Hooks/Animation";

const Feedback = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const feedbackData = {
        ...data,
        name: user?.displayName || "Anonymous",
        photo: user?.photoURL || null,
        userId: user?.uid || user?.email,
        createdAt: new Date().toISOString(),
        rating: parseInt(data.rating),
      };

      const res = await axiosSecure.post("/feedback", feedbackData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Thank you!", "Your feedback has been submitted.", "success");
      reset();
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <Animation><div className="mx-3 p-4">
      <h2 className="text-3xl text-center font-semibold mb-9 mt-5">Submit Feedback</h2>
      <form data-aos="fade-up" onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-base-200 p-5 rounded-xl">
        <label className="block">
          <span className="text-black font-semibold">Category</span>
          <select
            {...register("category")}
            className="w-full p-2 border-2 border-gray-300 bg-white rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
            <option value="General Feedback">General Feedback</option>
            <option value="UI/UX Suggestion">UI/UX Suggestion</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="block">
          <span className="text-black font-semibold">Rating</span>
          <select
            {...register("rating")}
            className="w-full p-2 border-2 border-gray-300 bg-white rounded"
            required
          >
            <option value="">Rate your experience (1–5)</option>
            <option value="1">1 - Very Bad</option>
            <option value="2">2 - Bad</option>
            <option value="3">3 - Okay</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </label>

        <textarea
          {...register("message")}
          placeholder="Write your feedback here..."
          className="w-full p-2 border-2 border-gray-300 bg-white rounded h-32"
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div></Animation>
  );
};

export default Feedback;
