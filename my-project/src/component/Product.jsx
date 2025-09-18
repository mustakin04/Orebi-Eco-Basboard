import axios from "axios";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [category, setCategoy] = useState([]);
  const [subCategory, setSubCategoy] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    color: "",
    size: "",
    discount: "",
    category: "",
    subCategory: "",
    image: null,
  });
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
      console.log(e.target.files, "file");
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = () => {
    // console.log(form, "19");
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // ✅ Debug: FormData log
    console.log("📝 FormData Content:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    const products = axios
      .post("http://localhost:3002/api/v2/product/crateProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Product created:", res.data);
      })
      .catch((err) => {
        console.error("Error creating product:", err);
      });
  };
  useEffect(() => {
    const fatchCategory = async () => {
      const response = await axios.get(
        "http://localhost:3002/api/v2/category/getCategory"
      );
      //  console.log(response.data.data,"24")
      setCategoy(response.data.data);
    };
    fatchCategory();
  }, []);
  useEffect(() => {
    const fatchSubCategory = async () => {
      const response = await axios.get(
        "http://localhost:3002/api/v2/subCategory/getSubCategory"
      );
      // console.log(response.data.data, "24");
      setSubCategoy(response.data.data);
      console.log("📦 SubCategory API Response:", response.data);
    };
    fatchSubCategory();
  }, []);
  return (
    <div>
      <h1 className="font-sans font-bold text-2xl text-center mt-8">
        Create product
      </h1>
      <div className="w-1/2 ml-12">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Product name</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={handleChange}
            name="name"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">product description</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={handleChange}
            name="description"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Product price</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={handleChange}
            name="price"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">product image</legend>
          <input
            type="file"
            className="input w-full"
            placeholder="Type here"
            name="image"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">product color</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={handleChange}
            name="color"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">product size</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={handleChange}
            name="size"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">product discount</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={handleChange}
            name="discount"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Browsers</legend>
          <select
            defaultValue="Pick a browser"
            className="select w-full"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option disabled value="">
              Pick a Category
            </option>
            {category.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Product subCategory</legend>
          <select
            defaultValue=""
            className="select w-full"
            onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
          >
            <option disabled value="">
              Pick a SubCategory
            </option>
            {subCategory.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </fieldset>
        <button
          className="btn btn-secondary w-full mt-3"
          onClick={handleSubmit}
        >
          Submit All
        </button>
      </div>
    </div>
  );
};

export default Product;
