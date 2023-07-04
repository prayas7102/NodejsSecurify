import { useState } from "react";
import CkeEditor from "./assets/CkeEditor/CkEditor";
import EmailLists from "./assets/EmailLists/EmailLists";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CkeEditor />
      <EmailLists />
    </div>
  );
}

export default App;
