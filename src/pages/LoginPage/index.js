import React, { useContext, } from 'react';
import { FoodsContext } from '../../contexts/FoodsContext';

function LoginPage() {
  const context = useContext(FoodsContext,);
  const { state } = context;
  return (<div>{state}</div>);
}

export default LoginPage;
