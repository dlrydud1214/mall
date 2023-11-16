import { Route, Routes } from "react-router-dom";
import LoginTab from "./page/Login";
import Main from "./page/Home";

function App() {
  return(
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginTab />} />
      </Routes>
  )
}

export default App;

