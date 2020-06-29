import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img src={drinkIcon} alt="drink-icon" data-testid="drinks-bottom-btn"/>
      </Link>
      <Link to="/explorar">
        <img src={exploreIcon} alt="drink-icon" data-testid="explore-bottom-btn"/>
      </Link>
      <Link to="/comidas">
        <img src={mealIcon} alt="drink-icon" data-testid="food-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
