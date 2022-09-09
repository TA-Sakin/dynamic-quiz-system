import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
// import DeleteUser from "./DeleteUser";
import { useAuth } from "../../../Context/AuthContext";
import Loading from "../../shared/Loading";
import ModalDeleteUser from "../Modal/ModalDeleteUser";
import useToken from "../../../hooks/useToken";

const AllUsers = () => {
  //   const [users, setUsers] = useState([]);
  const { currentUser, token } = useAuth();

  const navigate = useNavigate();
  const [deleteUser, setDeleteUser] = useState(null);
  // let accessToken = "";
  // if (!token) {
  //   accessToken = localStorage.getItem("accessToken");
  // }
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token || localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      return res.json();
    })
  );
  if (currentUser) {
    refetch();
  }
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-xl my-3">There are now {users?.length} users.</h3>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Remove User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => {
              return (
                <UserTable
                  key={user._id}
                  user={user}
                  i={i}
                  refetch={refetch}
                  setDeleteUser={setDeleteUser}
                ></UserTable>
              );
            })}
          </tbody>
        </table>
      </div>
      {deleteUser && (
        <ModalDeleteUser
          setDeleteUser={setDeleteUser}
          deleteUser={deleteUser}
          refetch={refetch}
        ></ModalDeleteUser>
      )}
    </div>
  );
};

export default AllUsers;
