import React, { useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Lottie from "lottie-react";
import updateCourseLottie from "../../assets/lotties/updateCourse.json";
import Swal from "sweetalert2";
import UseApplicationApi from "../../Hooks/UseApplicationApi";
import UseAuth from "../../Hooks/UseAuth";
import Animation from "../../Hooks/Animation";

const UpdateCourse = () => {

  useEffect(()=>{document.title = "NexusCore | EditCourse"},[])

  const data = useLoaderData();
  const { id } = useParams();
  const { user } = UseAuth();
  const{ updateCoursePromise } = UseApplicationApi();
  const email = user.email;

  const EditCourse = data.find((c) => c._id.toString() === id);

  const {
    photoURL,
    categories,
    certificateIncluded,
    date,
    description,
    duration,
    language,
    title,
    _id,
    seatLimit,
  } = EditCourse;

  const navigate = useNavigate();

  const handleUpateCourse = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const courseData = Object.fromEntries(formData.entries());

    console.log(courseData);

    updateCoursePromise(_id, email, courseData)
      .then((response) => {
        console.log(response);
        if (response.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your selected course has been updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/manageCourses");
        }
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      });
  };

  return (
    <Animation><div data-aos="fade-up" className="card bg-base-100 w-11/12 max-w-[1300px] mx-auto shrink-0 shadow-xl shadow-gray-500 mt-16 mb-24 border-1 border-blue-600">
      <div className="card-body text-blue-900">
        {/* Lottie Animation */}
        <div className="flex justify-center ">
          <Lottie
            animationData={updateCourseLottie}
            loop={true}
            className="w-[200px] h-[200px]"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mt-8 text-black">Edit Course</h1>
        <p className="text-center mt-3 mb-11 text-gray-600">
          Make changes to the course details below. You can update the title,
          description, category, and other important information to keep your
          course accurate and up to date for learners.
        </p>

        <form
          onSubmit={handleUpateCourse}
          className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6 md:gap-y-5"
        >
          <div>
            <label className="label block font-bold mb-1">PhotoURL:</label>
            <input
              className="input w-full"
              type="text"
              name="photoURL"
              placeholder="Enter PhotoURL"
              required
              defaultValue={photoURL}
            />
          </div>

          <div>
            <label className="label block font-bold mb-1">Title:</label>
            <input
              className="input w-full"
              type="text"
              name="title"
              placeholder="Enter Title"
              required
              defaultValue={title}
            />
          </div>

          <div>
            <label className="label block font-bold mb-1">Categories:</label>
            <select
              className="select w-full"
              name="categories"
              required
              defaultValue={categories}
            >
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
              <option value="UiUxDesign">UI/UX Design</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Photography">Photography</option>
              <option value="Communication">Communication</option>
              <option value="CareerDevelopment">Career Development</option>
            </select>
          </div>

          <div>
            <label className="label block font-bold mb-1">Date & Time:</label>
            <input
              className="input w-full"
              type="datetime-local"
              name="date"
              required
              defaultValue={date}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="label block font-bold mb-1">Description:</label>
            <textarea
              className="textarea w-full h-36"
              name="description"
              placeholder="About the course"
              required
              defaultValue={description}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="label block font-bold mb-2">
              Certificate Included:
            </label>
            <div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-3">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="certificateIncluded"
                  value="Yes"
                  className="checkbox"
                  required
                  defaultChecked={certificateIncluded === "Yes"}
                />
                <span className="label-text ml-2">Yes</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="certificateIncluded"
                  value="No"
                  className="checkbox"
                  required
                  defaultChecked={certificateIncluded === "No"}
                />
                <span className="label-text ml-2">No</span>
              </label>
            </div>
          </div>

          <div>
            <label className="label block font-bold mb-1">
              Seat Limit
            </label>
            <input
              className="input w-full"
              type="number"
              name="seatLimit"
              placeholder="Enter Seat Limit"
              required
              defaultValue={seatLimit}
            />
          </div>

          <div>
            <label className="label block font-bold mb-1">
              Duration: (weeks)
            </label>
            <input
              className="input w-full"
              type="number"
              name="duration"
              placeholder="Enter Course Duration (in weeks)"
              required
              defaultValue={duration}
            />
          </div>

          <div>
            <label className="label block font-bold mb-1">
              Course Language:
            </label>
            <select
              className="select w-full"
              name="language"
              required
              defaultValue={language}
            >
              <option value="Bangla">Bangla</option>
              <option value="English">English</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mt-8 col-span-1 md:col-span-2 flex justify-center">
            <button
              className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              type="submit"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div></Animation>
  );
};

export default UpdateCourse;
