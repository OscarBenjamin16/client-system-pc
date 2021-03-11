import React from "react";
import Slider from "react-slick";

const MarksSlider = () => {
  const settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 12500,
    cssEase: "linear",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
    ]
  };
  return (
    <div className="w-screen shadow h-96 mb-10 p-5">
      <h2 className="bg-blue-500 p-2 w-36 text-white font-semibold mb-2">Nuestras Marcas</h2>
      <Slider {...settings}>
        <div>
          <img
            src="https://logos-marcas.com/wp-content/uploads/2020/11/HP-Logo.png"
            alt="none"
            width={125}
            height={125}
          />
        </div>
        <div>
          <img
            src="https://logos-marcas.com/wp-content/uploads/2020/08/Dell-Logo.png"
            alt="none"
            width={125}
            height={125}
          />
        </div>
        <div>
        <img
            src="https://logos-marcas.com/wp-content/uploads/2020/04/Samsung-Logo.png"
            alt="none"
            width={125}
            height={125}
          />
        </div>
        <div>
        <img
            src="https://logos-marcas.com/wp-content/uploads/2020/07/Asus-Logo.png"
            alt="none"
            width={125}
            height={125}
          />
        </div>
        <div>
        <img
            src="https://logos-marcas.com/wp-content/uploads/2020/11/Kingston-Technology-Logo.png"
            alt="none"
            width={125}
            height={125}
          />
        </div>
        <div>
        <img
            src="https://logos-marcas.com/wp-content/uploads/2020/07/Asus-Logo.png"
            alt="none"
            width={125}
            height={125}
          />
        </div>
      </Slider>
    </div>
  );
};

export default MarksSlider;
