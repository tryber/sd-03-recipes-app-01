import React from 'react';
import { waitForDomChange, cleanup } from '@testing-library/react';

import { DrinksPage } from '../pages';

import drinks from '../../cypress/mocks/drinks';
import mockedFetch from '../mocks/fetch';
import renderWithRouterContext from '../mocks/helpers';

const clean = () => {
  cleanup();
};

describe('DrinksPage', () => {
  afterEach(clean);
  const fetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);
  jest.spyOn(global, 'alert').mockImplementation(() => null);

  test('should open whth a requisition and a message of loading', async () => {
    const { getByText } = renderWithRouterContext(<DrinksPage />);
    
    expect(getByText('Loading...')).toBeInTheDocument(); // not essencial for cy

    await waitForDomChange();
    expect(fetch).toHaveBeenCalledTimes(2);

    expect(getByText('Bebidas')).toBeInTheDocument();  
  });

  test('should render 12 Cards with image', async () => {
    const { getByTestId } = renderWithRouterContext(<DrinksPage />);

    await waitForDomChange();

    drinks.drinks.slice(0, 12).forEach((drink, index) => {
      const card = getByTestId(`${index}-recipe-card`);
      expect(card).toBeInTheDocument();
      const cardName = getByTestId(`${index}-card-name`);
      expect(cardName).toHaveTextContent(drink.strDrink)
      const cardImage = getByTestId(`${index}-card-img`, drink.strDrinkThumb);
      expect(cardImage).toHaveAttribute('src');
    });
  });

  test('should handle error', async () => {
    global.fetch.mockReturnValueOnce(
      Promise.resolve({ ok: 0, json: () => Promise.resolve('Deu erradamente certo em Drink') }),
    );
    const { getByTestId } =renderWithRouterContext(<DrinksPage />);

    await waitForDomChange();

    expect(getByTestId('error-drinks-page')).toHaveTextContent('Something Went Wrong');
  });
});
