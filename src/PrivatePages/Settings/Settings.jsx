import React, { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";

const Settings = () => {
  const { user, updateUserProfile, updateUserPassword } = UseAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const axiosSecure = UseAxiosSecure();

  const { data: dbUser = {} } = useQuery({
    queryKey: ["dbUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  // Mutation for updating profile info
  const { mutate: updateProfile, isPending: updatingProfile } = useMutation({
    mutationFn: async (data) => {
      await updateUserProfile(data.name, data.photoURL);

      await axiosSecure.patch(`/users/update/${user.email}`, {
        name: data.name,
        photoURL: data.photoURL,
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "Profile updated successfully!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update profile.", "error");
    },
  });

  // Mutation for changing password
  const { mutate: changePassword, isPending: changingPass } = useMutation({
    mutationFn: async (data) => {
      await updateUserPassword(data.password);
    },
    onSuccess: () => {
      Swal.fire("Success", "Password changed successfully!", "success");
    },
    onError: (error) => {
      Swal.fire("Error", error.message || "Password update failed.", "error");
    },
  });

  const onSubmit = (data) => {
    updateProfile(data);
    if (data.password) {
      changePassword(data);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-semibold text-center">Settings</h2>

      {/* Account Info Section */}
      <div className="bg-base-200 rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Account Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Account created on:{" "}
          {dbUser?.createdAt
            ? new Date(dbUser.createdAt).toLocaleDateString()
            : "N/A"}
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
            <label className="font-semibold">New Password (optional)</label>
            <input
              type="password"
              {...register("password", {
                minLength: { value: 6, message: "Min 6 characters" },
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
            disabled={updatingProfile || changingPass}
            className="btn btn-primary w-full"
          >
            {updatingProfile || changingPass ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Theme Toggle Section */}
      <div className="bg-base-200 rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Theme Preferences</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Current Theme: {theme}</span>
          <button onClick={toggleTheme} className="btn btn-outline btn-sm">
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
