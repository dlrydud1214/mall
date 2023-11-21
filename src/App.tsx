import { Route, Routes } from "react-router-dom";
import LoginTab from "./page/Login";
import Main from "./page/Home";
import SingInTab from "./page/SignIn";

function App() {
  return(
      <Routes>
        <Route path="/Home" element={<Main />} />
        <Route path="/login" element={<LoginTab />} />
        <Route path="/SignIn" element={<SingInTab />} />
      </Routes>
  )
}

export default App;

