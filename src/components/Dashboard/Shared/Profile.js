import React from "react";
import { useAuth } from "../../../Context/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div className="font-semibold mt-10">
      <p>Name: {currentUser?.displayName}</p>
      <p>Email: {currentUser?.email}</p>
    </div>
  );
};

export default Profile;
