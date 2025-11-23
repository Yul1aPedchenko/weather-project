import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import styles from "./News.module.scss";
import { Container } from "../Container/Container";

const API_URL = import.meta.env.VITE_MOKAPI;

export const News = () => {
  const [news, setNews] = useState([]);
  const [visible, setVisible] = useState(4);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tablet = window.matchMedia("(min-width: 830px)");

    const handleChange = () => {
      setVisible(tablet.matches ? 4 : 2);
    };

    handleChange();
    tablet.addEventListener("change", handleChange);

    return () => tablet.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const r = await axios.get(`${API_URL}/news`);
        setNews(r.data);
      } catch (error) {
        console.error("Error loading news", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const loadMore = () => {
    setVisible((prev) => prev + 4);
  };

  return (
    <section className={styles.news}>
      <Container>
        <div className={styles.news__wrap}>
          <h2 className={styles.news__title}>Interacting with our pets</h2>

          {loading && (
            <div>
              <ThreeDots height="80" width="80" color="#444" />
            </div>
          )}

          <div className={styles.news__list}>
            {news.slice(0, visible).map((item, i) => (
              <div className={styles.news__item} key={i}>
                <img
                  className={styles.news__img}
                  src={item.urlToImage}
                  alt={item.title}
                />
                <h3 className={styles.news__description}>{item.title}</h3>
              </div>
            ))}
          </div>

          {visible < news.length && (
            <button className={styles.news__btn} onClick={loadMore}>
              See more
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};