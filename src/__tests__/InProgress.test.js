import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { FoodProcessPage, DrinkProcessPage } from '../pages';

import { LocalStorage, renderWithContextAndRouter } from '../mocks';
import { handleFoodsData } from '../services/APIs/FOODS_API';
import { meals } from '../../cypress/mocks/meals';
import { FoodsContext } from '../contexts/FoodsContext';

window.localStorage = new LocalStorage();

const corba = handleFoodsData(meals[0]);

const Prov = ({ children, value }) => (
  <FoodsContext.Provider value={value}>
    {children}
  </FoodsContext.Provider>
);
Prov.defaultProps = {
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

  test('Checkbox should start empty ', () => {
    const {
      getByTestId,
      getByLabelText,
    } = renderWithContextAndRouter(<Prov><FoodProcessPage id={52977} /></Prov>);
    corba.ingredients.forEach(({ ingredient }, index) => {
      expect(getByTestId(`${index}-item-step`)).toEqual(getByLabelText(ingredient));
    });
  });

  test('should be able to check some ingredients setting the local storage', () => {
    const {
      getByTestId,
    } = renderWithContextAndRouter(<Prov><FoodProcessPage id={52977} /></Prov>);

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
    } = renderWithContextAndRouter(<Prov><FoodProcessPage id={52977} /></Prov>);

    expect(getByTestId('0-item-step')).toBeChecked();
    expect(getByTestId('1-item-step')).toBeChecked();
    expect(getByTestId('2-item-step')).not.toBeChecked();
    expect(getByTestId('3-item-step')).toBeChecked();
    expect(getByTestId('12-item-step')).not.toBeChecked();
  });
});
