import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthModal.module.scss";

export const AuthModal = ({ isModalOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const { signup, signin } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      username: e.target.username.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
    };

    const success = await signup(user);

    if (success) {
      onClose();
    } else {
      alert("User with this email already exists");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
    };

    const success = await signin(data);

    if (success) {
      onClose();
    } else {
      alert("Invalid email or password");
    }
  };
  
  return (
    <div className={`${styles.overlay} ${isModalOpen ? "" : styles.hidden}`} onClick={onClose}>
      <div className={`${styles.modal} ${isModalOpen ? "" : styles.active}`} onClick={(e) => e.stopPropagation()}>
        {isSignUp ? (
          <div className={styles.modal__wrap}>
            <h2 className={styles.modal__title}>Sign Up</h2>

            <form onSubmit={handleRegister}>
              <label>
                Username
                <input type="text" name="username" placeholder="Username" required />
              </label>

              <label>
                E-Mail
                <input type="email" name="email" placeholder="E-Mail" required />
              </label>

              <label>
                Password
                <input type="password" name="password" placeholder="Password" required />
              </label>

              <button type="submit">Sign Up</button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(false);
                }}
              >
                Already have an account? <span>Sign In</span>
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.modal__wrap}>
            <h2 className={styles.modal__title}>Sign In</h2>

            <form onSubmit={handleLogin}>
              <label>
                E-Mail
                <input type="email" name="email" placeholder="E-Mail" required />
              </label>

              <label>
                Password
                <input type="password" name="password" placeholder="Password" required />
              </label>

              <button type="submit">Sign In</button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(true);
                }}
              >
                Don't have an account? <span>Sign Up</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
