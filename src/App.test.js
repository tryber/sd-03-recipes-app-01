import React from 'react';

import App from './App';
import { renderWithContext, mockedFetch } from './__tests__/tests_services';
import { waitForDomChange } from '@testing-library/react';

jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

describe('App', () => {
  describe('should Render Explore', () => {
    test('Main', () => {
      const { getByText } = renderWithContext(<App />, '/explorar');
      expect(getByText('Explorar')).toBeInTheDocument();
    });
    test('Comidas', () => {
      const { getByText } = renderWithContext(<App />, '/explorar/comidas');
      expect(getByText('Explorar Comidas')).toBeInTheDocument();
    });
    test('Bebidas', () => {
      const { getByText } = renderWithContext(<App />, '/explorar/bebidas');
      expect(getByText('Explorar Bebidas')).toBeInTheDocument();
    });
    test('Comidas Ingredientes', async () => {
      const { getByText } = renderWithContext(<App />, '/explorar/comidas/ingredientes');
      await waitForDomChange();
      expect(getByText('Explorar Ingredientes')).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    });
    test('Bebidas Ingredientes', async () => {
      const { getByText } = renderWithContext(<App />, '/explorar/bebidas/ingredientes');
      await waitForDomChange();
      expect(getByText('Explorar Ingredientes')).toBeInTheDocument();
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    });
    test('Bebidas Ingredientes', async () => {
      const { getByText } = renderWithContext(<App />, '/explorar/comidas/area');
      await waitForDomChange();
      expect(getByText('Explorar Origem')).toBeInTheDocument();
    });
  });
  describe('should Render Receitas', () => {
    test('Feitas', () => {
      const { getByText } = renderWithContext(<App />, '/explorar');
      expect(getByText('Explorar')).toBeInTheDocument();
    });
    test('Favoritas', () => {
      const { getByText } = renderWithContext(<App />, '/explorar/comidas');
      expect(getByText('Explorar Comidas')).toBeInTheDocument();
    });
  });
  describe('should Render Receitas', () => {
    test('Favoritas', () => {
      const { getByText } = renderWithContext(<App />, '/receitas-favoritas');
      expect(getByText('Receitas Favoritas')).toBeInTheDocument();
    });
    test('Feitas', () => {
      const { getByText } = renderWithContext(<App />, '/receitas-feitas');
      expect(getByText('Receitas Feitas')).toBeInTheDocument();
    });
  });
  describe('Perfil', () => {
    test('should be rendered', () => {
      const { getByText } = renderWithContext(<App />, '/perfil');
      expect(getByText('Perfil')).toBeInTheDocument();
    });
  });
  describe('Login', () => {
    test('should be rendered', () => {
      const { getByText } = renderWithContext(<App />, '/');
      expect(getByText('Login')).toBeInTheDocument();
    });
  });
  describe('Mains', () => {
    test('Comidas', async () => {
      const { getByText } = renderWithContext(<App />, '/comidas');
      await waitForDomChange();
      expect(getByText('Comidas')).toBeInTheDocument();
    });
    test('Bebidas', async () => {
      const { getByText } = renderWithContext(<App />, '/bebidas');
      await waitForDomChange();
      expect(getByText('Bebidas')).toBeInTheDocument();
    });
  });
  describe('Detalhes', () => {
    test('Comidas', async () => {
      const { getByText } = renderWithContext(<App />, '/comidas/52977');
      await waitForDomChange();
      expect(getByText('Corba')).toBeInTheDocument();
    });
    test('Bebidas', async () => {
      const { getByText } = renderWithContext(<App />, '/bebidas/15997');
      await waitForDomChange();
      expect(getByText('GG')).toBeInTheDocument();
    });
  });
  describe('In Progress', () => {
    test('Comidas', async () => {
      const { getByText } = renderWithContext(<App />, '/comidas/52977/in-progress');
      await waitForDomChange();
      expect(getByText('Corba')).toBeInTheDocument();
    });
    test('Bebidas', async () => {
      const { getByText } = renderWithContext(<App />, '/bebidas/15997/in-progress');
      await waitForDomChange();
      expect(getByText('GG')).toBeInTheDocument();
    });
  });
});