import NavBar from "./components/NavBar";
import SignIn from "./components/User/SignIn";
import SendData from "./components/SendData";
import Menu from "./components/Menu/Menu";
import UserNavBar from "./components/User/UserNavBar";
import AdminMenu from "./components/Admin/AdminMenu";
import Basket from "./components/Order/Basket";
import LiveOrders from "./components/Order/LiveOrders";


function App() {
  return (
    <>
      <SignIn />
      {/* <Basket/> */}
      {/* {<Menu></Menu>} */}
      {/* <SendData /> */}
      {/* <Dashboard></Dashboard> */}
    </>
  );
}

export default App;
