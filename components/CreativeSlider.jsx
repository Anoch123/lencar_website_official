"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../app/css/creative-slider.css";

const AUTOPLAY_DELAY = 6500;

const slides = [
  {
    background: "/images/img2.png",
    video: "",
    dark: true,
    heading: "LENCAR ERC.80",
    description:
      "Silent on the street, silent on emissions. The ERC.80 clears a full shift of city roads on a single charge, with zero tailpipe output and cabin noise below a passing conversation.",
    ctaPrimary: { label: "Learn More", href: "/lencar-bikes/erc-80" },
  },
  {
    background: "/images/img2.png",
    video: "",
    dark: true,
    heading: "LENCAR ZIVI",
    description:
      "Silent on the street, silent on emissions. The ERC.80 clears a full shift of city roads on a single charge, with zero tailpipe output and cabin noise below a passing conversation.",
    ctaPrimary: { label: "Learn More", href: "/lencar-bikes/zivi" },
  },
];

export default function CreativeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="creative-showcase--slider">

      <Swiper
        modules={[Autoplay, Navigation, Pagination, Parallax]}
        className="swiper-container-h"
        speed={1600}
        loop
        effect="slide"
        parallax={{ enabled: true }}
        grabCursor
        autoplay={{
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".slider-pagination",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`slide-bg ${
                slide.dark ? "overlay-dark" : "overlay-light"
              }`}
              style={
                !slide.video
                  ? { backgroundImage: `url(${slide.background})` }
                  : undefined
              }
            >
              {slide.video && (
                <video
                  className="slide-video-bg"
                  src={slide.video}
                  poster={slide.background}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}

              <div className="slide-container">
                <div className="slide-row">
                  <div className="slider-content">
                    <span
                      className="badge-clean"
                      data-swiper-parallax="-400"
                    >
                      <span className="badge-clean-dot" />
                      Zero Emissions
                    </span>

                    <div
                      className="slide-eyebrow"
                      data-swiper-parallax="-500"
                    >
                    </div>

                    <h1
                      className="slide-heading"
                      data-swiper-parallax="-700"
                    >
                      <span className="heading-sweep">{slide.heading}</span>
                    </h1>

                    <p
                      className="slide-description"
                      data-swiper-parallax="-500"
                    >
                      {slide.description}
                    </p>

                    <div
                      className="slide-buttons"
                      data-swiper-parallax="-400"
                    >
                      <button
                        className="slide-btn"
                        onClick={() => {
                          window.location.href = slide.ctaPrimary.href;
                        }}
                      >
                        {slide.ctaPrimary.label}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-footer">
          <div className="slider-counter">
            <span className="counter-current">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="counter-divider" />
            <span className="counter-total">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="slider-pagination" />

          <div className="slider-nav hidden md:flex">
            <span className="charge-track hidden md:flex">
              <span className="charge-bar hidden md:flex" key={activeIndex} />
            </span>
          </div>
        </div>
      </Swiper>
    </section>
  );
}