import React, { useRef, useState, useEffect, useCallback } from "react";
import "../styles/ComicsSlider.scss";

const ComicsSlider = ({ comics }) => {
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const getReleaseYear = (comic) => {
    const onsaleDate = comic.dates.find((date) => date.type === "focDate");
    return onsaleDate
      ? new Date(onsaleDate.date).getFullYear()
      : "Year not available";
  };

  const updateScroll = () => {
    if (sliderRef.current) {
      setScrollPosition(sliderRef.current.scrollLeft);
      setMaxScroll(
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    updateScroll();
    window.addEventListener("resize", updateScroll);
    return () => window.removeEventListener("resize", updateScroll);
  }, []);

  const handleThumbDrag = useCallback(
    (e) => {
      if (isDragging && sliderRef.current) {
        const track = sliderRef.current;
        const thumb = thumbRef.current;
        const trackRect = track.getBoundingClientRect();
        const thumbWidth = thumb.offsetWidth;

        let newLeft = e.clientX - trackRect.left - thumbWidth / 2;

        newLeft = Math.max(0, Math.min(newLeft, trackRect.width - thumbWidth));

        const scrollPercent = newLeft / (trackRect.width - thumbWidth);
        const newScroll = scrollPercent * maxScroll;

        sliderRef.current.scrollLeft = newScroll;
        setScrollPosition(newScroll);
      }
    },
    [isDragging, maxScroll]
  );

  const startThumbDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const stopThumbDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => handleThumbDrag(e);
    const handleMouseUp = () => stopThumbDrag();

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleThumbDrag]);

  return (
    <div className="comics_slider_container">
      <div className="comics_slider" ref={sliderRef} onScroll={updateScroll}>
        {comics.map((comic) => (
          <div key={comic.id} className="comic_card">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <h3>{comic.title}</h3>
            <p>{getReleaseYear(comic)}</p>
          </div>
        ))}
      </div>
      <div className="slider_track">
        <div
          className="slider_thumb"
          ref={thumbRef}
          style={{
            width: `${
              (sliderRef.current?.clientWidth /
                sliderRef.current?.scrollWidth) *
              100
            }%`,
            left: `${(scrollPosition / maxScroll) * 100}%`,
          }}
          onMouseDown={startThumbDrag}
        ></div>
      </div>
    </div>
  );
};

export default ComicsSlider;
