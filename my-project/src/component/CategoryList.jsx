import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateCard from "./UpdateCard";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [show,setShow]=useState(false)
  const [select,setSelect]=useState(null)
  useEffect(() => {
    const fatchCategorys = async () => {
      const responese = await axios.get(
        "http://localhost:3002/api/v2/category/getCategory"
      );
    //   console.log(responese.data.data);
      setData(responese.data.data);
    };
    fatchCategorys();
  }, []);
  const handleClick=(id)=>{
     console.log(id,"17")
     setSelect(id)
     setShow(true)
  }
  return (
    <div className="mt-9 mx-9">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
              
            </tr>
          </thead>
          {data.map((data, index) => (
            <tbody>
              {/* row 1 */}
              <tr>
                <th>{index + 1}.</th>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>
                  {/* td এর ভিতরে div রেখে flex করলাম */}
                  <div className="flex gap-2">
                    <button className="border py-1 px-3 bg-fuchsia-500 rounded-lg">
                      Delete
                    </button>
                    <button className="border py-1 px-3 bg-blue-500 rounded-lg"
                    onClick={()=>handleClick(data._id)}>
                      Edit 
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {
        show&&(<UpdateCard id={select} setShow={setShow}></UpdateCard>)
      }
    </div>
  );
};

export default CategoryList;
