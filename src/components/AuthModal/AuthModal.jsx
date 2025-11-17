import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthModal.module.scss";

export const AuthModal = ({ isModalOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const { signup, login } = useAuth();

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

    const success = await login(data);

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

            <form onSubmit={handleRegister} className={styles.modal__form}>
              <label className={styles.modal__label}>
                Username
                <input className={styles.modal__input} type="text" name="username" placeholder="Username" required />
              </label>

              <label className={styles.modal__label}>
                E-Mail
                <input className={styles.modal__input} type="email" name="email" placeholder="E-Mail" required />
              </label>
              <label className={styles.modal__label}>
                Password
                <input className={styles.modal__input} type="password" name="password" placeholder="Password" required />
              </label>
              <button type="submit" className={styles.modal__submit}>
                Sign Up
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(false);
                }}
                className={styles.modal__btn}
              >
                Already have an account? <span className={styles.modal__span}>Log In</span>
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.modal__wrap}>
            <h2 className={styles.modal__title}>Log In</h2>
            <form onSubmit={handleLogin} className={styles.modal__form}>
              <label className={styles.modal__label}>
                E-Mail
                <input className={styles.modal__input} type="email" name="email" placeholder="E-Mail" required />
              </label>
              <label className={styles.modal__label}>
                Password
                <input className={styles.modal__input} type="password" name="password" placeholder="Password" required />
              </label>
              <button type="submit" className={styles.modal__submit}>
                Log In
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(true);
                }}
                className={styles.modal__btn}
              >
                Don't have an account? <span className={styles.modal__span}>Sign Up</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
