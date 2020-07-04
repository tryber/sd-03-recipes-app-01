import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';


const mockedFetch = (url) => Promise.resolve({
  ok: 200,
  json: () => {
    switch (url) {
      case `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${15997}`:
        return Promise.resolve({ drinks });
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
        return Promise.resolve({ meals });
      case `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52977}`:
        return Promise.resolve({ meals });
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
        return Promise.resolve({ drinks });
      case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
        return Promise.resolve(mealCategories);
      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
        return Promise.resolve(drinkCategories);
      default: return Promise.resolve('url not valid');
    }
  }
});

export default mockedFetch;
