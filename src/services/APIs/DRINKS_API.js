export const fetchDrinkApi = (query = 'search.php?s=') => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/${query}`).then(
    (response) => response.json().then((json) => {
      if (response.ok) return Promise.resolve(json);
      return Promise.reject(json);
    }),
  )
);

// missing strDrinkAlternate, dateModified
export const handleDrinksData = ({
  idDrink,
  strDrink,
  strCategory,
  strInstructions,
  strArea,
  strDrinkThumb,
  strYoutube,
  strSource,
  strAlcoholic,
  strTags,
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
    source: strSource,
    isAlcoholic: strAlcoholic,
    tags: strTags,
  };

  const ingredientBase = /^strIngredient(\d*)$/;
  obj.ingredients = Object.entries(drink).reduce((ing, [key, value]) => {
    const [, id] = key.match(ingredientBase) || [];
    if (id && value) {
      return [...ing, { ingredient: value, measure: drink[`strMeasure${id}`] || null }];
    }
    return ing;
  }, []);
  return obj;
};
