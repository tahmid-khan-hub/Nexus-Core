import React, { useEffect } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const AllFeedback = () => {
  useEffect(() => {
    document.title = "NexusCore | All Feedback";
  }, []);
  const axiosSecure = UseAxiosSecure();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["all-feedback"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to recover this feedback!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/feedback/${id}`).then(() => {
          Swal.fire("Deleted!", "Feedback has been removed.", "success");
          queryClient.invalidateQueries(["all-feedback"]);
        });
      }
    });
  };

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 mt-5">All Feedback</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.category}</td>
                <td className="flex">{item.rating} <FaStar className="mt-0.5 ml-1 text-yellow-500" size={16} /></td>
                <td className="max-w-xs truncate" title={item.message}>
                  {item.message}
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(item._id)}
                  >
                    <RiDeleteBin5Fill className="ml-3" size={17}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFeedback;
