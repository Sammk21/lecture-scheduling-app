"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const searchParams = useSearchParams();
  const courseId = useParams();
  const router = useRouter();

  const queryParams = searchParams.get("course");
  console.log(queryParams);

  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInstructorName(event.target.value);
  };

  const displayError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };
  const [instructorName, setInstructorName] = useState("");

  const fetchInstructors = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/courses/getInstructors`
      );
      if (Array.isArray(response.data.instructors)) {
        setInstructors(response.data.instructors);
        setInstructorName(response.data.instructors[0]?.name);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(date);
    try {
      const response = await axios.post(
        `http://localhost:9000/courses/${courseId.id}/lectures`,
        {
          instructorName,
          date, // Using only the date part
        }
      );
      alert("Lecture added successfully:", response.data);
      router.push(`/instructor`);

      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("Error adding lecture:", error.message);

      // Display error message to the user
      if (error.response && error.response.status === 400) {
        displayError(error.response.data.message);
      } else {
        displayError("Failed to add lecture. Please try again later.");
      }
    }
  };

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  console.log(instructorName);

  return (
    <div>
      <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-500">
                Add New Lecture{" "}
                <span className=" text-xl text-white "> {queryParams}</span>
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 ">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 "
                  >
                    Select Instructor
                  </label>
                  <div className="mt-2  border rounded-lg">
                    <select
                      onChange={handleChange}
                      id="name"
                      name="name"
                      autoComplete="names"
                      className="text-sm rounded-lg block w-full ps-10 p-2.5
                  dark:placeholder-gray-400 bg-black text-white px-10
                  border-gray"
                    >
                      {instructors &&
                        instructors.map((instructor) => (
                          <option key={instructor._id} value={instructor.name}>
                            {instructor.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="w-full col-span-2">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6"
                  >
                    Select Date{" "}
                    <span className="text-gray-400 text-xs">
                      (click spacebar to open calender )
                    </span>
                  </label>
                  <div className="w-full border rounded-lg">
                    <input
                      required
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="text-sm rounded-lg block w-full ps-10 p-2.5 dark:placeholder-gray-400 bg-black text-white px-10 border-gray"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {error && <div className="mt-4 text-red-600">{error}</div>}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="text-sm font-semibold leading-6 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-gray-500 bg-white text-black px-4 py-2 rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default page;
