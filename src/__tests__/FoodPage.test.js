import React from 'react';
import { render, waitForDomChange, cleanup } from '@testing-library/react';

import { FoodsPage } from '../pages';
import Provider from '../contexts/Provider';

import meals from '../mocks/meals';

const renderWithFoodContext = (children) => render(<Provider>{children}</Provider>);

const mockedFetch = (url) => Promise.resolve({
  ok: 200,
  json: () => {
    switch (url) {
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
        return Promise.resolve(meals);
      default: return Promise.reject('test, wrong'); 
    }
  },
});



const clean = () => {
  cleanup();
};

describe('FoodPage', () => {
  afterEach(clean);
  jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

  test('should open whth a requisition and a message of loading', async () => {
    const { getByText } = renderWithFoodContext(<FoodsPage />);
    
    expect(getByText('Loading...')).toBeInTheDocument();

    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledTimes(1)

    expect(getByText('Comidas')).toBeInTheDocument();  
  });

  test('should render 12 Cards with image', async () => {
    const { getByTestId } = renderWithFoodContext(<FoodsPage />);

    await waitForDomChange();

    meals.meals.slice(0, 12).forEach((food, index) => {
      const card = getByTestId(`${index}-recipe-card`);
      expect(card).toBeInTheDocument();
      const cardName = getByTestId(`${index}-card-name`);
      expect(cardName).toHaveTextContent(food.strMeal);
      const cardImage = getByTestId(`${index}-card-img`);
      expect(cardImage).toHaveAttribute('src', food.strMealThumb);
    });
  });

  test('should handle error', async () => {
    global.fetch.mockReturnValueOnce(
      Promise.resolve({ ok: 0, json: () => Promise.resolve('Opss') }),
    );
    const { getByTestId } = renderWithFoodContext(<FoodsPage />);

    await waitForDomChange();

    expect(getByTestId('error-foods-page')).toHaveTextContent('Something Went Wrong');
  });
});
