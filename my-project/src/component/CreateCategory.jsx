import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleClick = () => {
    if (!name || !description) {
      toast.error("name&descrition not required");
    }
    try {
      const data = axios.post(
        "http://localhost:3002/api/v2/category/createCategory",
        { name, description }
      );

      setName("");
      setDescription("");
      toast.success("Successfully submite!");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to create category!");
    }
  };
  return (
    <div>
      <h1 className="font-sans font-bold text-2xl text-center my-3">
        Create Category
      </h1>
      <div className="ml-20 mt-10 w-[500px]">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            What is your category name?
          </legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Category description</legend>
          <textarea
            className="textarea h-24 w-full"
            placeholder="Bio"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </fieldset>
        <button className="btn btn-info w-full my-3" onClick={handleClick}>
          Category Submit
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateCategory;
