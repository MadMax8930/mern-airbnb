import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import FormPage from "./pages/FormPage";
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
            <Route path="/account" element={<ProfilePage/>} />
            <Route path="/account/places" element={<PlacesPage/>} />
            <Route path="/account/places/new" element={<FormPage/>} />
            <Route path="/account/places/:id" element={<FormPage/>} />
         </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
