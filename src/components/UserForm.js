import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = () => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userDescri, setUserDescri] = useState();
  const Navigate = useNavigate();

  const submitData = async () => {
    const data = {
      name: userName,
      email: userEmail,
      description: userDescri,
    };
    if(!(userName && userEmail)){
      toast("All fileds required 😄")
    }else{
    const res = await axios.post("/createUser", data);
    console.log(res);
    toast("User created successfull ✋");
    }
  };

  const onHandleData = (e) => {
    e.preventDefault();
    submitData();
    setUserName("");
    setUserEmail("");
    setUserDescri("");
  };

  const goToUserList = () => {
    Navigate("/ListUser");
  };

  return (
    <div className="flex flex-col items-center justify-center">
    <div>
      <h1 className="capitalize mt-5 font-semibold text-3xl">
        Create user Form
      </h1>
      </div>
      <div className="w-full h-1 bg-black mt-7"></div>
      <div class="mt-5 block p-6 rounded-lg shadow-lg bg-white max-w-md w-1/2">
        <form onSubmit={onHandleData}>
          <div class="form-group mb-6">
            <input
              type="text"
              class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Name"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div class="form-group mb-6">
            <input
              type="text"
              class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="Email address"
              name="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div class="form-group mb-6">
            <textarea
              class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlTextarea13"
              rows="3"
              placeholder="Message"
              name="description"
              value={userDescri}
              onChange={(e) => setUserDescri(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>

      <button
        onClick={goToUserList}
        className="mt-20 rounded drop-shadow-md bg-indigo-500 text-white p-3 uppercase scroll-smooth"
        to="ListUser"
      >
        Go to User List page
      </button>
      <ToastContainer />
    </div>
  );
};

export default UserForm;



