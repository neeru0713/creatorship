import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Provider } from "react-redux";
import { SideNav } from "./components/nav/SideNav";
import { Notification } from "./components/utils/Notification";
import {Spinner} from "./components/utils/Spinner"
import store from "./redux/store";

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}> 
     <div className="app-container flex">
       <Notification/>
       <Spinner/>
       <SideNav />
       <div className="main-content w-[88%] bg-[#f7f8ff] min-w-[600px]">
         <Routes>
           <Route path="/register" element={<Register />} />
           <Route path="/login" element={<Login />} />
         </Routes>
       </div>
     </div>
     </Provider>
   </BrowserRouter>
  );
}

export default App;
