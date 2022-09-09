import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../Context/AuthContext";

const UserTable = ({ user, i, refetch, setDeleteUser }) => {
  const { email, role } = user;
  // const { token } = useAuth();
  // let accessToken = "";
  // if (!token) {
  //   accessToken = localStorage.getItem("accessToken");
  // }
  const makeAdmin = () => {
    fetch(`http://localhost:5000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 400) {
          toast.error(`Maximum admin limit reached`);
        } else if (res.status === 403) {
          toast.error("Failed to make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          return toast.success(`${user?.name} is now admin.`);
        }
      });
  };
  const onClickDelete = () => {
    setDeleteUser(user);
  };
  return (
    <tr>
      <th>
        <label>{i + 1}</label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={`https://api.lorem.space/image/face?hash=${
                  Math.floor(Math.random() * 10000) + 1
                }`}
                alt="user"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm opacity-50">Bangladesh</div>
          </div>
        </div>
      </td>
      <td>
        {user.email}
        <br />
      </td>
      <td>
        {role !== "admin" ? (
          <button onClick={makeAdmin} className="btn btn-xs">
            Make Admin
          </button>
        ) : (
          <button className="btn btn-xs btn-primary no-animation cursor-text">
            Admin
          </button>
        )}
      </td>
      <th>
        <label
          htmlFor="my-modal-6"
          className="btn btn-error btn-xs"
          onClick={onClickDelete}
        >
          Remove User
        </label>
      </th>
    </tr>
  );
};

export default UserTable;
