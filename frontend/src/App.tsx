import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>CountUp!</button>
    </>
  );
}

export default App;
