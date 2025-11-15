import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [localRecents, setLocalRecents] = useState(() => {
    const saved = localStorage.getItem('recents');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("recents", JSON.stringify(localRecents));
  }, [localRecents])
  const signin = (userData) => {
    setUser(userData);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  }

  return <AuthContext.Provider value={{ user, signin, updateUser, localRecents, setLocalRecents }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);