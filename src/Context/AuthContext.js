import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/shared/Loading";
import useAdmin from "../hooks/useAdmin";
import useToken from "../hooks/useToken";
// import useToken from "../hooks/useToken";
import auth from "../Utils/firebase.init";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, password, username) {
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }

  // login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  const [token] = useToken(currentUser);
  //reset password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // logout function
  function logout() {
    localStorage.removeItem("accessToken");
    return signOut(auth);
  }

  const value = {
    loading,
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    token,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
