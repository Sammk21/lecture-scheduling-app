"use client";

import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data object to send in the POST request
    const instructorData = {
      name,
      age,
      email,
    };
    try {
      // Send POST request using Axios
      const response = await axios.post(
        "http://localhost:9000/courses/addInstructor",
        instructorData
      );
      console.log("Response:", response.data);

      setMessage(response.data.message);

      // Reset form fields
      setName("");
      setAge("");
      setEmail("");
    } catch (error) {
      console.error("Error adding instructor:", error);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-500">
                Add Instructor{" "}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 ">
                <div className="col-span-2">
                  <label
                    htmlFor="instructorName"
                    className="block text-sm font-medium leading-6"
                  >
                    Instructor name
                  </label>
                  <div className="mt-2  border rounded-lg">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="text-sm rounded-lg block w-full ps-10 p-2.5
                  dark:placeholder-gray-400 bg-black text-white px-10
                  border-gray"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="instructorName"
                    className="block text-sm font-medium leading-6"
                  >
                    Age:
                  </label>
                  <div className="mt-2  border rounded-lg">
                    <input
                      type="number"
                      id="specialization"
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      className="text-sm rounded-lg block w-full ps-10 p-2.5
                  dark:placeholder-gray-400 bg-black text-white px-10
                  border-gray"
                    />
                  </div>
                </div>
                <div className="w-full col-span-2">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6"
                  >
                    Email:
                  </label>
                  <div className="w-full border rounded-lg">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="text-sm rounded-lg block w-full ps-10 p-2.5
                  dark:placeholder-gray-400 bg-black text-white px-10
                  border-gray"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
        {message && <span className="text-white">{message}</span>}
      </main>
    </>
  );
};

export default page;
