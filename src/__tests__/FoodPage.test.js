import React from 'react';
import { waitForDomChange, cleanup } from '@testing-library/react';

import { FoodsPage } from '../pages';

import mockedFetch from '../mocks/fetch';
import { meals } from '../../cypress/mocks/meals';
import renderWithRouterContext from '../mocks/helpers';

const clean = () => {
  cleanup();
};

describe('FoodPage', () => {
  afterEach(clean);
  jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

  test('should open whth a requisition and a message of loading', async () => {
    const { getByText } = renderWithRouterContext(<FoodsPage />);
    
    expect(getByText('Loading...')).toBeInTheDocument();

    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    expect(getByText('Comidas')).toBeInTheDocument();  
  });

  test('should render 12 Cards with image', async () => {
    const { getByTestId } = renderWithRouterContext(<FoodsPage />);

    await waitForDomChange();

    meals.slice(0, 12).forEach((food, index) => {
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
    const { getByTestId } = renderWithRouterContext(<FoodsPage />);

    await waitForDomChange();

    expect(getByTestId('error-foods-page')).toHaveTextContent('Something Went Wrong');
  });
});
