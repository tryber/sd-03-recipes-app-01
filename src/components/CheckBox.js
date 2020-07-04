import React, { useContext } from 'react';
import { FoodsContext } from '../contexts/FoodsContext';
import Card from '../components/Card';

function CheckBox() {
  const [{ foodInproggress }] = useContext(FoodsContext);

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
        srcImage={srcImage}
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

export default CheckBox;
