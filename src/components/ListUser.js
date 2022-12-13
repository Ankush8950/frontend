import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListUser = () => {
  const [getUserData, setUserdata] = useState('');
  // const [searchData, setSearchData] = useState(null)
  console.log(getUserData)
  const notify = () => toast("update successfull");
  const deleteNotify = () => toast("user deleted successfull");

  const fatchUserData = async () => {
    const res = await axios.get("/getUser");
    // console.log(res);


    if (res.data.user) {
      setUserdata(res.data.user);
    }
  };

  useEffect(() => {
    fatchUserData();
  },[]);

  // const sortMethod = () =>{
  //     const datas = getUserData.sort((a, b) => a.name > b.name ? 1 : -1)
  //     console.log(datas);
  // }

  const editUser = async (user) => {
    const userName = prompt("Enter user name");
    const userEmail = prompt("Enter user email");
    const userDecri = prompt("Enter user description");

    if (!(userName && userEmail)) {
      toast("Please enter name and email");
    } else {
      const res = await axios.put(`/editUser/${user._id}`, {
        name: userName,
        email: userEmail,
        description: userDecri,
      });
      console.log(res);
      notify()
    }
  };

  const deleteUser = async (userid) => {
    const res = await axios.delete(`/deleteUser/${userid}`);
    console.log(res);
    deleteNotify()
  };

  
  const searchUser = async (e) =>{
  //  e.preventDefault();
  //  console.log(key)
   try {
   const key = e.target.value
    let result = await axios.get(`/searchUser/${key}`)
    // console.log(result.data.data)
    if (result) {
      setUserdata(result.data.data)
    }
   } catch (error){
    console.log(error)
   }

  }

  
  return (
    <div className="flex justify-center itmes-center h-screen pt-10">
      <div class="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-3xl mt-5">All User List</h1>
          <input
              type="text"
              class="form-control block
        w-1/3
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
              placeholder="search user"
              name="name"
              onChange={searchUser}
            />
          {/* <button className="w-20 text-white bg-black" onClick={sortMethod}>sort</button> */}
        </div>
        
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center">
                <thead class="border-b bg-gray-800 uppercase">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-6 py-4"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-6 py-4"
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-6 py-4"
                    >
                      email
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-6 py-4 "
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-10 py-4 "
                    >
                      Edit
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-white px-10 py-4 flex items-center"
                    >
                      delete
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="red"
                          class="w-4 h-4 ml-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getUserData.length > 0 ? getUserData 
                  .sort((a, b) => a.name > b.name ? 1 : -1)
                  .map((user,index)=>{
                      return (
                        <tr class="bg-white border-b" key={user._id}>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index}
                        </td>
                        <td class="capitalize text-sm text-black font-normal px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td class="normal-case text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.description}
                        </td>
                        <td class="text-sm text-green font-normal  px-6 py-4 whitespace-nowrap">
                          <button
                            className="cursor-pointer "
                            onClick={() => editUser(user)}
                          >
                            Edit
                          </button>
                        </td>

                        <td class="text-sm text-red font-normal px-6 py-4 whitespace-nowrap">
                          <button
                            className="cursor-pointer"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      )
                    })
                    : 
                    <div className="flex items-center justify-center">
                    <h1 className="text-semibold text-3xl">user not found</h1>
                    </div>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListUser;
