import React, { useState } from "react";

interface Props {
  background: string;
  text: string;
  active: boolean;
}

const Slide = ({ background, text, active }: Props) => {
  let slideStyle = { backgroundImage: `url( ${background})` };
  return (
    <div className="slider__slide" data-active={active} style={slideStyle}>
      
    </div>
  );
};

let slides = [
  {
    background: "https://res.cloudinary.com/mye-soporte/image/upload/v1634322377/SOPORTE_unyuqz.png",
    text: "Road",
  },
  {
    background: "https://unsplash.it/800/500?image=580",
    text: "America",
  },
  {
    background: "https://unsplash.it/800/500?image=824",
    text: "Pieapple",
  },
];

const SliderImg = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  // setTimeout(() => {
  //   nextSlide();
  // }, 3000);
  const nextSlide = () => {
    let slide = activeSlide + 1 < slides.length ? activeSlide + 1 : 0;
    setActiveSlide(slide);
  };

  const prevSlide = () => {
    let slide = activeSlide - 1 < 0 ? slides.length - 1 : activeSlide - 1;
    setActiveSlide(slide);
  };
  return (
    <div
      className="flex mt-10 mr-80"
    >
      {slides.map((slide, index) => {
        return (
          <Slide
            key={index}
            background={slide.background}
            text={slide.text}
            active={index === activeSlide}
          />
        );
      })}
      <div className="rightArrow" onClick={nextSlide}>
        {/* <FontAwesomeIcon icon={faChevronCircleRight} /> */}
      </div>
      <div className="leftArrow" onClick={prevSlide}>
        {/* <FontAwesomeIcon icon={faChevronCircleLeft} /> */}
      </div>
    </div>
  );
};

export default SliderImg;
