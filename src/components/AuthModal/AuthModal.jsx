import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthModal.module.scss";

export const AuthModal = ({ isModalOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const { signin } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const user ={
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(user);
    signin(user);
    onClose();
  }
  return (
    <>
      <div className={`${styles.overlay} ${isModalOpen ? "" : styles.hidden}`} onClick={onClose}>
        <div className={`${styles.modal} ${isModalOpen ? "" : styles.active}`} onClick={(e) => e.stopPropagation()}>
          {isSignUp ? (
            <div className={styles.modal__wrap}>
              <h2 className={styles.modal__title}>Sign Up</h2>
              <form onSubmit={handleRegister}>
                <label htmlFor="username">
                  Username
                  <input type="text" name="username" id="username" placeholder="Username" />
                </label>
                <label htmlFor="email">
                  E-Mail
                  <input type="text" name="email" id="email" placeholder="E-Mail" />
                </label>
                <label htmlFor="password">
                  Password
                  <input type="text" name="password" id="password" placeholder="Password" />
                </label>
                <button type="submit">Sign up</button>
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
              <form>
                <label htmlFor="email">
                  E-Mail
                  <input type="text" name="email" id="email" placeholder="E-Mail" />
                </label>
                <label htmlFor="password">
                  Password
                  <input type="text" name="password" id="password" placeholder="Password" />
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
    </>
  );
};
