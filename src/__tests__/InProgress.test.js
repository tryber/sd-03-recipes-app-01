import React from 'react';
import { fireEvent } from '@testing-library/react';

import { FoodProcessPage, DrinkProcessPage } from '../pages';

import { LocalStorage, renderWithContextAndRouter } from '../mocks';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import { FoodsContext } from '../contexts/FoodsContext';
import { DrinksContext } from '../contexts/DrinksContext';
import { handleFoodsData } from '../services/APIs/FOODS_API';
import { handleDrinksData } from '../services/APIs/DRINKS_API';

localStorage = new LocalStorage();

const corba = handleFoodsData(meals[0]);

const FProv = ({ children, value }) => (
  <FoodsContext.Provider value={value}>
    {children}
  </FoodsContext.Provider>
);
FProv.defaultProps = {
  value: [{ foodInProgress: corba }],
};
describe('FoodProcessPage', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: { 52977: [] }, cocktails: {} }),
    );
  });

  test('should display the image, name, category and instructions', () => {
    const { getByTestId } = renderWithContextAndRouter(<FProv><FoodProcessPage id={52977} /></FProv>);
    const title = getByTestId('recipe-title');
    const image = getByTestId('recipe-photo');
    const category = getByTestId('recipe-category');
    getByTestId('instructions');

    expect(title).toHaveTextContent(corba.name);
    expect(image).toHaveAttribute('src', corba.srcImage);
    expect(category).toHaveTextContent(corba.category);
  });

  test('Checkbox should start empty ', () => {
    const {
      getByTestId,
      getByLabelText,
    } = renderWithContextAndRouter(<FProv><FoodProcessPage id={52977} /></FProv>);
    corba.ingredients.forEach(({ ingredient }, index) => {
      expect(getByTestId(`${index}-item-step`)).toEqual(getByLabelText(ingredient));
    });
  });

  test('should be able to check some ingredients setting the local storage', () => {
    const {
      getByTestId,
    } = renderWithContextAndRouter(<FProv><FoodProcessPage id={52977} /></FProv>);

    const firstIngre = getByTestId('0-item-step');
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([]);
    fireEvent.click(firstIngre);
    expect(firstIngre).toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([0]);
    fireEvent.click(firstIngre);
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[52977]).toEqual([]);
  });
  test('should start with some ingredients checkeds', () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52977: [0, 1, 3] } }));
    const {
      getByTestId,
    } = renderWithContextAndRouter(<FProv><FoodProcessPage id={52977} /></FProv>);

    expect(getByTestId('0-item-step')).toBeChecked();
    expect(getByTestId('1-item-step')).toBeChecked();
    expect(getByTestId('2-item-step')).not.toBeChecked();
    expect(getByTestId('3-item-step')).toBeChecked();
    expect(getByTestId('12-item-step')).not.toBeChecked();
  });
});

const GG = handleDrinksData(drinks[0]);

const DProv = ({ children, value }) => (
  <DrinksContext.Provider value={value}>
    {children}
  </DrinksContext.Provider>
);
DProv.defaultProps = {
  value: [{ drinkInProgress: GG }],
};

describe('DrinkProcessPage', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: { 15997: [] }, meals: {} }),
    );
  });

  test('should display the image, name, category and instructions', () => {
    const { getByTestId } = renderWithContextAndRouter(<DProv><DrinkProcessPage id={52977} /></DProv>);
    const title = getByTestId('recipe-title');
    const image = getByTestId('recipe-photo');
    const category = getByTestId('recipe-category');
    getByTestId('instructions');

    expect(title).toHaveTextContent(GG.name);
    expect(image).toHaveAttribute('src', GG.srcImage);
    expect(category).toHaveTextContent(GG.isAlcoholic);
  });

  test('Checkbox should start empty ', () => {
    const {
      getByTestId,
      getByLabelText,
    } = renderWithContextAndRouter(<DProv><DrinkProcessPage id={15997} /></DProv>);
    GG.ingredients.forEach(({ ingredient }, index) => {
      expect(getByTestId(`${index}-item-step`)).toEqual(getByLabelText(ingredient));
    });
  });

  test('should be able to check some ingredients setting the local storage', () => {
    const {
      getByTestId,
    } = renderWithContextAndRouter(<DProv><DrinkProcessPage id={15997} /></DProv>);

    const firstIngre = getByTestId('0-item-step');
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([]);
    fireEvent.click(firstIngre);
    expect(firstIngre).toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([0]);
    fireEvent.click(firstIngre);
    expect(firstIngre).not.toBeChecked();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[15997]).toEqual([]);
  });
  test('should start with some ingredients checkeds', () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { 15997: [0, 1] } }));
    const {
      getByTestId,
    } = renderWithContextAndRouter(<DProv><DrinkProcessPage id={15997} /></DProv>);

    expect(getByTestId('0-item-step')).toBeChecked();
    expect(getByTestId('1-item-step')).toBeChecked();
    expect(getByTestId('2-item-step')).not.toBeChecked();
  });
});
