const toApiName = (type) => {
  if (type === 'drink') return 'cocktail';
  if (type === 'meal') return 'meal';
  return type;
};

export const translateType = (type) => {
  switch (type) {
    case 'drink': case 'cocktail': return 'bebida';
    case 'meal': return 'comida';
    default: return `Type ${type} not valid`;
  }
}

export const createURL = (type, query = 'search.php?s=') => (
  `https://www.the${toApiName(type)}db.com/api/json/v1/1/${query}`
);

export async function fetchApis(type, query = 'search.php?s=') {
  const response = await fetch(createURL(type, query));
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

const reorganizeIngredients = (obj) => (
  Object.entries(obj).reduce((ing, [key, value]) => {
    const [, id] = key.match(/^strIngredient(\d*)$/) || [];
    if (id && value) {
      return [...ing, { name: value, measure: obj[`strMeasure${id}`] || null }];
    }
    return ing;
  }, [])
);

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
  return {
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
    ingredients: reorganizeIngredients(drink),
  };
};

export const handleFoodsData = ({
  idMeal,
  strMeal,
  strCategory,
  strInstructions,
  strArea,
  strMealThumb,
  strYoutube,
  srtArea,
  strTags,
  ...food
}) => {
  return {
    id: idMeal,
    name: strMeal,
    category: strCategory,
    instructions: strInstructions,
    origin: strArea,
    srcImage: strMealThumb,
    video: strYoutube,
    tags: strTags,
    ingredients: reorganizeIngredients(food),
  };
};

export const handleData = (type, json) => () => {
  const data = json[type + 's'];
  if (type === 'meal') {
    return Array.isArray(data) ? data.map(handleFoodsData) : handleFoodsData(data);
  } else if (type === 'drink') {
    return Array.isArray(data) ? data.map(handleDrinksData) : handleDrinksData(data);
  }
};

export const handleCategs = (type, json) => json[type + 's'].map(({ strCategory: cat }) => cat);
