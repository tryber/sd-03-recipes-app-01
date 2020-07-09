export const getFavStorage = () => JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

export const translateType = (type) => {
  switch (type) {
    case 'comida':
    case 'bebida':
    case 'comidas':
    case 'babidas':
      return type;
    case 'meal': return 'comida';
    case 'cocktail': return 'bebida';
    default: return `Type ${type} is not valid`;
  }
};

export const sendToFavoriteStorage = ({
  id,
  origin,
  category,
  isAlcoholic,
  name,
  srcImage: image,
}, type) => {
  const thisFood = {
    id,
    type: translateType(type),
    area: origin || '',
    category,
    alcoholicOrNot: isAlcoholic || '',
    name,
    image,
  };
  const favoriteList = getFavStorage();
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteList, thisFood]));
};

export const rmFromFavoriteStorage = (id) => {
  const favorite = getFavStorage();
  const oficialFavoriteList = favorite.filter((fav) => Number(fav.id) !== Number(id));
  localStorage.setItem('favoriteRecipes', JSON.stringify(oficialFavoriteList));
};

export const getInProgress = (type) => {
  const inProggress = (
    JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, cocktails: {} }
  );
  switch (type) {
    case 'meals':
    case 'food':
      return inProggress.meals;
    case 'cocktails':
    case 'drink':
      return inProggress.cocktails;
    default: return inProggress;
  }
};

export const synonym = (type) => {
  switch (type) {
    case 'meals':
      return 'meal';
    case 'cocktails':
      return 'cocktail';
    default: return `Type ${type} not valid to synonym`;
  }
};

export const setInProgress = (type, id, value) => {
  const current = getInProgress();
  const key = synonym(type);
  const newInProgress = { ...current, [key]: { ...current[key], [id]: value } };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
};

export const rmInProgress = (type, id) => {
  const current = getInProgress();
  delete current[synonym(type)][id];
  localStorage.setItem('inProgressRecipes', JSON.stringify(current));
};

export const doneRecipes = (id) => {
  const stored = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  if (id || id === 0) return stored.find((doneRecipe) => doneRecipe.id === Number(id));
  return stored;
};

export const setDoneRecipeStorage = (
  { id, origin, category, isAlcoholic, name, tags, srcImage: image }, type,
) => {
  const thisFood = {
    id,
    type: translateType(type),
    area: origin || '',
    category,
    alcoholicOrNot: isAlcoholic || '',
    name,
    image,
    doneDate: new Date().toLocaleDateString(),
    tags: typeof tags === 'string' ? tags.split(',') : [],
  };
  localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes(), thisFood]));
};
