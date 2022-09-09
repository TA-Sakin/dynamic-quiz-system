import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
// import useToken from "./useToken";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`http://localhost:5000/admin/${email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${
            localStorage.getItem("accessToken") || token
          }`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
          setAdminLoading(false);
        });
    }
  }, [user, token]);

  return [admin, adminLoading];
};
export default useAdmin;
