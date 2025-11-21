import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { Container } from "../Container/Container";
import styles from "./Slider.module.scss";

export const Slider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await axios.get("https://pixabay.com/api/", {
          params: {
            key: import.meta.env.VITE_PIXABAY_KEY,
            q: "minimalist nature",
            image_type: "photo",
            per_page: 50,
          },
        });

        setImages(
          r.data.hits.map((img) => ({
            full: img.webformatURL,
            preview: img.previewURL,
          }))
        );
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <ThreeDots height="80" width="80" color="#444" />
      </div>
    );
  }

  return (
    <section>
      <Container>
        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 160,
              modifier: 2.5,
              slideShadows: false,
            }}
            className={styles.swiper}
          >
            {images.map((src, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <img src={src.full} alt="" loading="lazy" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};
