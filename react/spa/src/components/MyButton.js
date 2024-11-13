import { useState } from "react";

function MyButton({label}) {
  // the count is reactive, meaning when it changes, the component will re-render
  // Hooks are more restrictive than other functions. 
  // You can only call Hooks at the top of your components (or other Hooks). 
  // If you want to use useState in a condition or a loop, extract a new component and put it there.
  // it is similar to composables in Vue 3 which be called in the setup function
  const [count, setCount] = useState(0);

  // Under restrict mode, the render function will be called twice
  console.log("MyButton render");

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{label} : Clicked {count} times</button>;
}

export default MyButton;
