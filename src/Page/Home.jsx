import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { Link } from "react-router-dom";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBack2Line } from "react-icons/ri";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [isPrority, SetIsPrority] = useState("");
  const [agreement, setAgreement] = useState(false);

  // Fetch all Task 
  const { data: AllData = [], refetch } = useQuery({
    queryKey: ["taskData"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      return res.data;
    },
  });

  // Create task and store Database 
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const des = form.des.value;

    const taskData = {
      title,
      des,
      isPrority,
      isCompleted: "Pending",
    };
    axios.post("http://localhost:5000/tasks", taskData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        setModal(false);
        refetch();
        toast.success("Task added successfully ");
      }
    });
  };


// Filter task by Priority 
  const [priorityFilter, setPriorityFilter] = useState("All");
  const filteredData = AllData.filter((item) => {
    if (priorityFilter === "All") {
      return true; 
    } else {
      return item.isPrority === priorityFilter;
    }
  });

  
// Delete task 
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/task/${id}`);
    if (res.data.deletedCount > 0) {
      refetch();
      toast.success("Deleted Successfully");
    }
    console.log(res.data);
  };


  // Mark as Completed 
  const checkData = { agreement };
  const handleCheck = (id) => {
    axios
      .patch(`http://localhost:5000/isCompleted/${id}`, checkData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl text-center font-bold py-10">
          To Do List Application{" "}
        </h1>
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => setModal(true)}
              className="button border font-semibold px-4  py-2 hover:bg-base-300 rounded-md   "
            >
              Add Task{" "}
            </button>
          </div>
          <div className=" flex items-center gap-2 mb-6">
            <label className="text-black  font-semibold">
              Filter by Priority:
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-black  rounded-lg px-2 py-2"
            >
              <option value="All" className=" text-black font-bold">
                All
              </option>
              <option className=" text-black font-bold" value="High">
                {" "}
                High
              </option>
              <option className=" text-black font-bold" value="Medium">
                {" "}
                Medium
              </option>

              <option className="font-bold text-black " value="Low">
                Low
              </option>
            </select>
          </div>
        </div>
        <div className="border-4 rounded-md border-purple-600 px-4 py-4 mt-4">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-lg font-bold text-black">
                <th className="text-center ">Mark </th>
                <th className="text-center ">Status</th>
                <th className="text-center ">Title </th>
                <th className="text-center ">Description</th>
                <th className="text-center ">Priority</th>
                <th className="text-center ">Action </th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item) => (
                <tr className="" key={item._id}>
                  <td className="text-center ">
                    <input
                      className={`${
                        item.isCompleted === "Completed" ? "hidden" : ""
                      }`}
                      onChange={() => {
                        handleCheck(item._id);
                      }}
                      type="checkbox"
                    />
                  </td>
                  <td className={` text-center `}>
                    <p
                      className={`${
                        item.isCompleted === "Completed"
                          ? "bg-green-500 rounded-md  "
                          : ""
                      } ${
                        item.isCompleted === "Pending"
                          ? "bg-yellow-500 rounded-md  "
                          : ""
                      }`}
                    >
                      {item.isCompleted}
                    </p>
                  </td>
                  <td className=" text-center"> {item.title}</td>
                  <td className=" text-center"> {item.des}</td>
                  <td className=" text-center">{item.isPrority}</td>
                  <td className="flex gap-5 justify-center ">
                    <Link
                      to={`/taskEdit/${item._id}`}
                      className="btn btn-sm bg-blue-600 text-white"
                    >
                      <LuFileEdit size={20}></LuFileEdit>
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      <RiDeleteBack2Line size={20}></RiDeleteBack2Line>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="">
        <PureModal
          width="50%"
          isOpen={modal}
          //   closeButton="close"
          //   closeButtonPosition="bottom"
          onClose={() => {
            setModal(false);
            return true;
          }}
        >
          <h1 className="text-center text-lg font-bold pt-4 pb-7">Add Task</h1>
          <div>
            <form onSubmit={handleSubmit} className="px-16 space-y-4 py-4">
              <div className="">
                <label className="font-bold">Title :</label>
                <input
                  className="w-full border py-2 px-3 rounded-md "
                  type="text "
                  name="title"
                  required
                  placeholder="Pedro Duarte"
                />
              </div>
              <div className=" ">
                <label className="font-bold">Description :</label>
                <input
                  className="w-full border py-2 px-3 rounded-md "
                  type="text "
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
        </PureModal>
        ;
      </div>
    </div>
  );
};

export default Home;
