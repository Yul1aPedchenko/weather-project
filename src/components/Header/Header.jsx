import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { Container } from "../Container/Container";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { AuthModal } from "../AuthModal/AuthModal";

import styles from "./Header.module.scss";
import Logo from "../../images/logo.svg";
import User from "../../images/user.svg";
import { IoIosArrowDown } from "react-icons/io";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <>
      <header className={`${styles.header} ${isMenuOpen ? styles.open : ""}`}>
        <Container>
          <div className={styles.header__wrap}>
            <img className={styles.header__logo} src={Logo} alt="logo" />
            <nav className={styles.header__nav}>
              <ul className={styles.header__list}>
                <li className={styles.header__item}>
                  <a href="#" className={styles.header__link}>
                    Who we are
                  </a>
                </li>
                <li className={styles.header__item}>
                  <a href="#" className={styles.header__link}>
                    Contacts
                  </a>
                </li>
                <li className={styles.header__item}>
                  <a href="#" className={styles.header__link}>
                    Menu
                  </a>
                </li>
              </ul>
            </nav>
            <div className={styles.header__actions}>
              {user ? (
                <p onClick={() => logout()}>{user.username}</p>
              ) : (
                <button className={styles.header__signup} onClick={() => setIsModalOpen(!isModalOpen)}>
                  Sign Up
                </button>
              )}
              <img className={styles.header__user} src={User} alt="user avatar" />
            </div>
            <div className={styles.header__mobile}>
              <button className={`${styles.header__btn} ${isMenuOpen ? styles.open : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                Menu
                <IoIosArrowDown />
              </button>
            </div>
          </div>
        </Container>
      </header>
      <MobileMenu isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onClick={() => setIsModalOpen(!isModalOpen)} />
      <AuthModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
