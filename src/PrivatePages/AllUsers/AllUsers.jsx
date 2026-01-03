import { useEffect } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";

const AllUsers = () => {
  useEffect(() => {
    document.title = "NexusCore | All Users";
  }, []);
  const axiosSecure = UseAxiosSecure();

  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 mt-5">All Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Us</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user, index) => (
              <tr key={index} className="border-b">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
