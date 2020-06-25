import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Provider from './contexts/Provider';
import {
  LoginPage,
  FoodsPage,
  DrinksPage,
  FoodDetailsPage,
  DrinkDetailsPage,
  FoodProcessPage,
  DrinkProcessPage,
  ExploreMainPage,
  ExploreFoodPage,
  ExploreDrinkPage,
  ExploreFoodIngredientsPage,
  ExploreDrinkIngredientsPage,
  ExploreFoodAreaPage,
  ProfilePage,
  CookedRecipesPage,
  FavoriteRecipesPage,
} from './pages';
import './App.css';

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/comidas" component={FoodsPage} />
          <Route exact path="/bebidas" component={DrinksPage} />
          <Route
            exact
            path="/comidas/:id"
            render={({ match }) => <FoodDetailsPage id={Number(match.params.id)} />}
          />
          <Route exact path="/bebidas/:id" component={DrinkDetailsPage} />
          <Route exact path="/comidas/:id/in-progess" component={FoodProcessPage} />
          <Route exact path="/bebidas/:id/in-progress" component={DrinkProcessPage} />
          <Route exact path="/explorar" component={ExploreMainPage} />
          <Route exact path="/explorar/comidas" component={ExploreFoodPage} />
          <Route exact path="/explorar/bebidas" component={ExploreDrinkPage} />
          <Route exact path="/explorar/comidas/ingredientes" component={ExploreFoodIngredientsPage} />
          <Route exact path="/explorar/bebidas/ingredientes" component={ExploreDrinkIngredientsPage} />
          <Route exact path="/explorar/comidas/area" component={ExploreFoodAreaPage} />
          <Route exact path="/perfil" component={ProfilePage} />
          <Route exact path="/receitas-feitas" component={CookedRecipesPage} />
          <Route exact path="/receitas-favoritas" component={FavoriteRecipesPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
