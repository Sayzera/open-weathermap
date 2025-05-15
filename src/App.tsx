import React from "react";
import CustomUseEffectExample1 from "./components/useeffect/example-1";
import Example2 from "./components/useeffect/example-2";
import Example3 from "./components/useeffect/example-3";
import TodoList from "./components/todo-list";

type Props = {};

function App({}: Props) {
  // return <CustomUseEffectExample1 />;
  // return <Example2 />
  // return <Example3 />

  return <TodoList />
}

export default App;
