import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.scss';

interface Card {
  title: string;
  image: string;
  description: string;
}

interface CardCarouselProps {
  cards: Card[];
}

const PopularProducts: React.FC<CardCarouselProps> = ({ cards }) => {
  const settings = {
    dots:true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,

          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            infinite: true,
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
    <div className="card-carousel">
        <h1>Popular Product</h1>
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.image} alt={card.title} />
            <h3>#20.000 <span>$5.00</span></h3>
            <p>{card.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularProducts;
