import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import Animation from "../../Hooks/Animation";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Settings = () => {
  const { user, updateUserProfile, updateUserPassword, refreshUser } =
    UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user, reset]);

  const { data: dbUser = {}, refetch } = useQuery({
    queryKey: ["dbUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for updating profile info
  const { mutate: updateProfile } = useMutation({
    mutationFn: async (data) => {
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });
      await refreshUser();
      await axiosSecure.put(`/users/update/${user.email}`, {
        name: data.name,
        photoURL: data.photoURL,
      });
    },
    onSuccess: async () => {
      await refetch();
      Swal.fire("Success", "Profile updated successfully!", "success").then(
        () => {
          navigate("/");
        }
      );
    },
    onError: () => {
      Swal.fire("Error", "Failed to update profile.", "error");
    },
  });

  // Mutation for changing password
  const { mutate: changePassword } = useMutation({
    mutationFn: async (data) => {
      await updateUserPassword(data.password);
    },
  });

  const onSubmit = (data) => {
    if (user?.email) {
      updateProfile({ ...data, email: user.email });
      if (data.password) {
        changePassword(data);
      }
    }
  };

  return (
    <Animation>
      <div className=" p-6 space-y-8">
        <h2 className="text-3xl font-semibold mt-5 text-center">Settings</h2>

        {/* Account Info Section */}
        <div data-aos="fade-up" className="bg-base-200 rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-4">Account Information</h3>
          <p className="text-sm text-gray-500 mb-4">
            {dbUser?.createdAt ? (
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold">Account Created:</span>{" "}
                {new Date(dbUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : (
              <p className="text-sm text-red-500">Created date not available</p>
            )}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="font-semibold">Email</label>
              <input
                disabled
                value={user?.email || ""}
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Display Name</label>
              <input
                {...register("name", { required: true })}
                placeholder="Your name"
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Photo URL</label>
              <input
                {...register("photoURL", { required: true })}
                placeholder="https://your-photo.com"
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">New Password </label>
              <input
                type="password"
                {...register("password", {
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
                  },
                })}
                placeholder="Change password"
                className="input input-bordered w-full mt-1"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
            >
              Save Chnages
            </button>
          </form>
        </div>
      </div>
    </Animation>
  );
};

export default Settings;
