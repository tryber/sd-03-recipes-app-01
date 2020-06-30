export const fetchDrinksAPI = async (query = 'search.php?s=') => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${query}`);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchDetailsDrink = (id) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json().then((json) => {
      if (response.ok) return Promise.resolve(json);
      return Promise.reject(json);
    }),
  )
);

export const handleDrinksData = ({
  idDrink,
  strDrink,
  strCategory,
  strInstructions,
  strArea,
  strDrinkThumb,
  strYoutube,
  strAlcoholic,
  srtArea,
  ...drink
}) => {
  const obj = {
    id: idDrink,
    name: strDrink,
    category: strCategory,
    instructions: strInstructions,
    origin: strArea,
    srcImage: strDrinkThumb,
    video: strYoutube,
    isAlcoholic: strAlcoholic,
  };
  const ingredientBase = /^strIngredient(\d*)$/;
  obj.ingredients = Object.entries(drink).reduce((ing, [key, value]) => {
    const [, id] = key.match(ingredientBase) || [];
    if (id && value !== null && value !== '') {
      return [...ing, { ingredient: value, measure: drink[`strMeasure${id}`] || null }];
    }
    return ing;
  }, []);
  return obj;
};

