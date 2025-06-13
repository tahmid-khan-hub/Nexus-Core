import React from "react";
import Lottie from "lottie-react";
import addCourseLotties from "../../assets/lotties/addCourse.json";
import axios from "axios";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import Animation from "../../Hooks/Animation";

const AddCourse = () => {
  const { user } = UseAuth();

  const handleNewCourses = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const NewCourseData = Object.fromEntries(formData.entries());

    NewCourseData.UserEmail = user.email;
    NewCourseData.userName = user.displayName;
    NewCourseData.enrolled = "0";
    NewCourseData.createdAt = new Date().toISOString();

    console.log(NewCourseData);

    axios.post("http://localhost:3000/courses", NewCourseData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course has been added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <Animation>
      <div data-aos="fade-up" className="card bg-base-100 w-11/12 max-w-2xl mx-auto shrink-0 shadow-xl shadow-gray-500 mt-16 mb-24 border-1 border-blue-600">
      <div className="card-body text-blue-900">
        {/* Lottie Animation */}
        <div className="flex justify-center ">
          <Lottie
            animationData={addCourseLotties}
            loop={true}
            className="w-[200px] h-[200px]"
          />
        </div>

        <h1 className="text-3xl font-bold text-center">Add Course</h1>
        <p className="text-center mt-3 mb-9">
          Fill in the course details to add a new learning opportunity. Include
          a title, description, category, and other key info to help learners
          find and enroll in your course easily.
        </p>

        <form
          onSubmit={handleNewCourses}
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
            />
          </div>

          <div>
            <label className="label block font-bold mb-1">Categories:</label>
            <select className="select w-full" name="categories" required>
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
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="label block font-bold mb-1">Description:</label>
            <textarea
              className="textarea w-full h-36"
              name="description"
              placeholder="About the course"
              required
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
                />
                <span className="label-text ml-2">Yes</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="certificateIncluded"
                  value="No"
                  className="checkbox"
                />
                <span className="label-text ml-2">No</span>
              </label>
            </div>
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
            />
          </div>

          <div>
            <label className="label block font-bold mb-1">
              Course Language:
            </label>
            <select className="select w-full" name="language" required>
              <option value="Bangla">Bangla</option>
              <option value="English">English</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="label block font-bold mb-1">
              Enrolled Student:
            </label>
            <input className="input w-full" type="number" value="0" readOnly />
          </div>
          <div>
            <label className="label block font-bold mb-1">Seat Limit:</label>
            <input
              placeholder="Enter Seat Limit"
              className="input w-full"
              type="number"
              name="seatLimit"
              required
            />
          </div>

          <div className="mt-8 col-span-1 md:col-span-2 flex justify-center">
            <button
              className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              type="submit"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
    </Animation>
  );
};

export default AddCourse;
