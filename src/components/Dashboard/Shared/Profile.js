import React from "react";
import { useAuth } from "../../../Context/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div className="font-semibold">
      <p>{currentUser?.displayName}</p>
      <p>{currentUser?.email}</p>
    </div>
  );
};

export default Profile;
