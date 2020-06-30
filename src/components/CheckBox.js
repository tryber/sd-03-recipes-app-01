import React, { useContext } from 'react';
import { FoodsContext } from '../contexts/FoodsContext';
import Card from '../components/Card';
/* import { getIngredients } from '../services/APIs/APIlocalStorage'; */

function ListaIng() {
  const [{ foodInproggress }] = useContext(FoodsContext);
  /* const getIngre = getIngredients()[id]; */

  const {
    id,
    name,
    srcImage,
    ingredients,
  } = foodInproggress;

  return (
    <div>
      <Card
        key={id}
        name={name}
        index={-100}
        srcImage={srcImage}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ul>{ingredients.map((el, index) => (
        <label htmlFor={el.ingredient} key={el.ingredient}>
          <input data-testid={`${index}-ingredient-step`} type="checkbox" id={el.ingredient} />
          {el.ingredient}
        </label>
      ))}
      </ul>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default ListaIng;
