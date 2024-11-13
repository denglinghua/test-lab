import { useState } from 'react';

// A state variable’s value never changes within a render
// Although setNumber is called three times in the onClick event handler, but only causes one re-render
export default function Counter3() {
  const [number, setNumber] = useState(0);

  console.log("Counter3 render");

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
