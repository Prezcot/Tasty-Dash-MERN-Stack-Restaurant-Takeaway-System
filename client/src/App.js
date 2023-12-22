import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";
import {Routes, Route} from 'react-router-dom';
import DenyDirectAccessRoutes from "./DenyDirectAccessRoutes";
function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="*"
          element={
            <DenyDirectAccessRoutes />
          }
        />
      </Routes>
    </>
  );
}

export default App;
