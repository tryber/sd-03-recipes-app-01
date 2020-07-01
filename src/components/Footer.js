import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas" >
        <img src={drinkIcon} data-testid="drinks-bottom-btn" alt="drink-icon" width="75px" />
      </Link>
      <Link to="/explorar">
        <img src={exploreIcon} data-testid="explore-bottom-btn" alt="drink-icon" width="75px" />
      </Link>
      <Link to="/comidas">
        <img src={mealIcon} data-testid="food-bottom-btn" alt="drink-icon" width="75px" />
      </Link>
    </div>
  );
}

export default Footer;
