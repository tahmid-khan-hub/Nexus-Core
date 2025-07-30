import React from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Category</span>
          <select
            {...register("category")}
            className="w-full p-2 border rounded"
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
          <span className="text-gray-700">Rating</span>
          <select
            {...register("rating")}
            className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded h-32"
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
