import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import { UserContextProvider } from "./context/UserContext";
import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
   <UserContextProvider>
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage/>} />   
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/account/:subPage?" element={<AccountPage/>} />
         </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
