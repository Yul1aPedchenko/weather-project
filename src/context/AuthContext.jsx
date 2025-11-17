import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_MOKAPI;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [localRecents, setLocalRecents] = useState(() => {
    try {
      const saved = localStorage.getItem("recents");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  useEffect(() => {
    if (!user) {
      localStorage.setItem("recents", JSON.stringify(localRecents));
    }
  }, [localRecents, user]);
  const login = async ({ email, password }) => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      const allUsers = res.data;

      const foundUser = allUsers.find((u) => u.email === email && u.password === password);

      if (!foundUser) throw new Error("Invalid password or email");

      setUser(foundUser);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signup = async ({ username, email, password }) => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      const allUsers = res.data;

      const exists = allUsers.some((u) => u.email === email);
      if (exists) throw new Error("User already exists");

      const newUser = {
        username,
        email,
        password,
        recents: [],
        favourites: [],
      };

      const createRes = await axios.post(`${API_URL}/users`, newUser);
      setUser(createRes.data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  const updateUser = (updatedUser) => setUser(updatedUser);
  return <AuthContext.Provider value={{ user, login, signup, updateUser, localRecents, setLocalRecents }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
