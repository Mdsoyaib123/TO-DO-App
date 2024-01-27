import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const TaskEdit = () => {
  const loader = useLoaderData();
    const navigate = useNavigate()
  const [isPrority, SetIsPrority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const des = form.des.value;

    const taskData = {
      title,
      des,
      isPrority,
    };
    console.log(taskData);
    axios
      .patch(`http://localhost:5000/taskEdit/${loader._id}`, taskData)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            navigate('/')
          toast.success("Task updated successfully ");
        }
      });
  };
  return (
    <div className="mt-10">
      <h1 className="text-center py-5 text-3xl font-bold">Update task </h1>
      <form
        onSubmit={handleSubmit}
        className="px-16 space-y-4 py-4 w-2/3 mx-auto"
      >
        <div className="">
          <label className="font-bold">Title :</label>
          <input
            className="w-full border py-2 px-3 rounded-md "
            type="text "
            required
            value={loader.title}
            name="title"
            
            placeholder="Pedro Duarte"
          />
        </div>
        <div className=" ">
          <label className="font-bold">Description :</label>
          <input
            className="w-full border py-2 px-3 rounded-md "
            type="text "
            defaultValue={loader.des}
            name="des"
            required
            placeholder="@peduarte"
          />
        </div>
        <div>
          <label className="font-bold "> Priority : </label>
          <select
            onChange={(e) => SetIsPrority(e.target.value)}
            name=""
            defaultValue={loader.isPrority}
            id=""
            required
            className=" w-full border px-3 py-2"
          >
            <option value="Select a priority " disabled selected>
              {" "}
              Select a priority{" "}
            </option>
            <option value="High"> High </option>
            <option value="Medium"> Medium</option>
            <option value="Low"> Low </option>
          </select>
        </div>
        <div className="flex justify-end">
          <input
            type="submit"
            value="Save Change"
            className="btn btn-sm btn-neutral"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
