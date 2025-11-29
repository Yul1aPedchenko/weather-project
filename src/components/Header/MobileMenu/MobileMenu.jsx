import { useAuth } from "../../../context/AuthContext";

import { Container } from "../../Container/Container";

import styles from "./MobileMenu.module.scss";
import User from "../../../images/user.svg";
export const MobileMenu = ({ isMenuOpen, onClose, onClick }) => {
  const { user } = useAuth();
  return (
    <>
      {isMenuOpen && <div className={styles.backdrop} onClick={onClose}></div>}

      <div className={`${styles.mobile} ${isMenuOpen ? styles.open : ""}`}>
        <Container>
          <div className={styles.mobile__wrap}>
            <nav className={styles.mobile__nav}>
              <ul className={styles.mobile__list}>
                <li className={styles.mobile__item}>
                  <a href="#" className={styles.mobile__link}>
                    Who we are
                  </a>
                </li>
                <li className={styles.mobile__item}>
                  <a href="#" className={styles.mobile__link}>
                    Contacts
                  </a>
                </li>
                <li className={styles.mobile__item}>
                  <a href="#" className={styles.mobile__link}>
                    Menu
                  </a>
                </li>
              </ul>
            </nav>
            <div className={styles.mobile__actions}>
              <img className={styles.mobile__user} src={User} alt="user avatar" />
              {user ? (
                <p onClick={() => logout()}>{user.username}</p>
              ) : (
                <button className={styles.mobile__signup} onClick={onClick}>
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
