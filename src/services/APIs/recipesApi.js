const toApiName = (type) => {
  if (type === 'drink') return 'cocktail';
  return type;
};

export const translateType = (type) => {
  switch (type) {
    case 'drink': case 'cocktail': return 'bebida';
    case 'meal': return 'bebida';
    default: return `Type ${type} not valid`;
  }
}

export async function fetchApis(type, query = 'search.php?s=') {
  const response = await fetch(`https://www.the${toApiName(type)}db.com/api/json/v1/1/${query}`);
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
  obj.ingredientBase = reorganizeIngredients(drink);
  return obj;
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
  const obj = {
    id: idMeal,
    name: strMeal,
    category: strCategory,
    instructions: strInstructions,
    origin: strArea,
    srcImage: strMealThumb,
    video: strYoutube,
    tags: strTags,
  };
  obj.ingredients = reorganizeIngredients(food);
  return obj;
};

export const handleData = (type, json) => {
  const data = json[type + 's'];
  if (type === 'meal') {
    return Array.isArray(data) ? data.map(handleFoodsData) : handleFoodsData(data);
  } else if (type === 'drink') {
    return Array.isArray(data) ? data.map(handleDrinksData) : handleDrinksData(data);
  }
};

export const handleCategs = (type, json) => json[type + 's'].map(({ strCategory: cat }) => cat);
