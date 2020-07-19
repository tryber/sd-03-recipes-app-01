import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './contexts/Provider';
import {
  LoginPage,
  MainPage,
  DrinkDetailsPage,
  InProcessPage,
  ExploreMainPage,
  ExploreFoodPage,
  ExploreDrinkPage,
  ExploreFoodIngredientsPage,
  ExploreDrinkIngredientsPage,
  ExploreFoodAreaPage,
  ProfilePage,
  CookedRecipesPage,
  FavoriteRecipesPage,
  NotFoundPage,
} from './pages';
import './App.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/comidas"><MainPage type="meal" /></Route>
          <Route exact path="/bebidas"><MainPage type="drink" /></Route>
          <Route exact path="/comidas/:id"><DrinkDetailsPage type="meal" /></Route>
          <Route exact path="/bebidas/:id"><DrinkDetailsPage type="drink" /></Route>
          <Route
            exact
            path="/comidas/:id/in-progress"
            render={({ match }) => <InProcessPage id={Number(match.params.id)} type="meal" />}
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            render={({ match }) => <InProcessPage id={Number(match.params.id)} type="cocktail" />}
          />
          <Route exact path="/explorar" component={ExploreMainPage} />
          <Route exact path="/explorar/comidas" component={ExploreFoodPage} />
          <Route exact path="/explorar/bebidas" component={ExploreDrinkPage} />
          <Route exact path="/explorar/comidas/ingredientes" component={ExploreFoodIngredientsPage} />
          <Route exact path="/explorar/bebidas/ingredientes" component={ExploreDrinkIngredientsPage} />
          <Route exact path="/explorar/comidas/area" component={ExploreFoodAreaPage} />
          <Route exact path="/perfil" component={ProfilePage} />
          <Route exact path="/receitas-feitas" component={CookedRecipesPage} />
          <Route exact path="/receitas-favoritas" component={FavoriteRecipesPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
