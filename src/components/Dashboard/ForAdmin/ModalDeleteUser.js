import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../Context/AuthContext";
import ReactDom from "react-dom";

const ModalDeleteUser = ({ deleteUser, refetch, setDeleteUser }) => {
  const { _id, name } = deleteUser;

  const removeAdmin = () => {
    fetch(`http://localhost:5000/user/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Only admin can remove a user");
          setDeleteUser(null);
        }
        return res.json();
      })
      .then((data) => {
        toast.success(`${name} is removed.`);
        setDeleteUser(null);
        refetch();
      });
  };
  return ReactDom.createPortal(
    <div>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-400">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete the user?
          </h3>
          <div className="modal-action">
            <button
              onClick={removeAdmin}
              className="btn btn-warning btn-sm w-20"
            >
              Yes
            </button>
            <label htmlFor="my-modal-6" className="btn btn-sm w-20">
              No
            </label>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ModalDeleteUser;
