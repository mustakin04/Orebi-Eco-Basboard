import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UpdateCard = ({ id, setShow }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  // Fetch existing category data
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3002/api/v2/category/getCategory/${id}`)
        .then((res) => {
        console.log(res,"15")
          setName(res.data.name);
           // previous name
          setDescription(res.data.description); // previous description
        })
        .catch((err) => console.error(err));
    }
  }, [id]);
  const handleClick = async () => {
    try {
      await axios.patch(`http://localhost:3002/api/v2/category/updateCategory/${id}`, {
        name,
        description,
      });
      toast.success("Category updated successfully!");
      setShow(true); // modal close
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category!");
    }
  };

  return (
    <div className="absolute top-60 right-96 w-[600px] h-[500px] border bg-amber-300 rounded-lg shadow-sm">
      <h1 className="font-sans font-bold text-2xl text-center mt-10 my-3">
        Update Category
      </h1>

      {/* Close Button */}
      <div
        className="absolute top-7 right-12 font-serif font-semibold text-2xl text-red-600 cursor-pointer"
        onClick={() => setShow(false)}
      >
        XX
      </div>

      <div className="mx-12 mt-10 w-[500px]">
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
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </fieldset>

        <button className="btn btn-info w-full my-3" onClick={handleClick}>
          Update Category
        </button>
      </div>

      <Toaster />
    </div>
  );
};

export default UpdateCard;
