import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src={drinkIcon} alt="drink-icon" width="75px"  />
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" src={drinkIcon} alt="drink-icon" />
      </Link>
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" src={exploreIcon} alt="drink-icon" />
      </Link>
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" src={mealIcon} alt="drink-icon" />
      </Link>
    </div>
  );
}

export default Footer;
