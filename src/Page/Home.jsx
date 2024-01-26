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
  //   const [isCompleted, setIsCompleted] = useState('');
  const { data, refetch } = useQuery({
    queryKey: ["taskData"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      return res.data;
    },
  });

  let isCompleted;
  if (agreement) {
    isCompleted = true;
  } else {
    isCompleted = false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const des = form.des.value;

    const taskData = {
      title,
      des,
      isPrority,
      isCompleted,
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
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/task/${id}`);
    if (res.data.deletedCount > 0) {
      refetch();
      toast.success("Deleted Successfully");
    }
    console.log(res.data);
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl text-center font-bold py-10">
          To Do List Application{" "}
        </h1>
        <div className="flex justify-between items-center">
          <button
            onClick={() => setModal(true)}
            className="button border font-semibold px-4  py-2 hover:bg-base-300 rounded-md   "
          >
            Add Task{" "}
          </button>
          <p className="font-bold ">Total Task : {data?.length}</p>
        </div>
        <div className="border-2 px-4 py-4 mt-4">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-lg font-bold text-black">
                {/* <th>No.</th> */}
                <th className="text-center ">Mark/unMark </th>
                <th className="text-center ">Status</th>
                <th className="text-center ">Title </th>
                <th className="text-center ">Description</th>
                <th className="text-center ">Priority</th>
                <th className="text-center ">Action </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data?.map((item, index) => (
                <tr className="" key={item._id}>
                  <td className="text-center ">
                    <input
                      onChange={(e) => {
                        setAgreement(e.target.checked);
                      }}
                      type="checkbox"
                    />
                  </td>
                  <td className=" text-center">
                   
                  </td>
                  <td className=" text-center"> {item.title}</td>
                  <td className=" text-center"> {item.des}</td>
                  <td className=" text-center"> {item.isPrority}</td>
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
