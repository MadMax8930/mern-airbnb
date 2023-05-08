import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import PublicLandingPage from "./pages/PublicLandingPage";
import AuthLoginPage from "./pages/AuthLoginPage";
import AuthRegisterPage from "./pages/AuthRegisterPage";
import PrivateAccountPage from "./pages/PrivateAccountPage";
import PrivatePlacesPage from "./pages/PrivatePlacesPage";
import PrivateFormPage from "./pages/PrivateFormPage";
import PublicPlaceIdPage from "./pages/PublicPlaceIdPage";
import { UserContextProvider } from "./context/UserContext";
import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
   <UserContextProvider>
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<PublicLandingPage/>} />   
            <Route path="/login" element={<AuthLoginPage/>} />
            <Route path="/register" element={<AuthRegisterPage/>} />
            <Route path="/account" element={<PrivateAccountPage/>} />
            <Route path="/account/places" element={<PrivatePlacesPage/>} />
            <Route path="/account/places/new" element={<PrivateFormPage/>} />
            <Route path="/account/places/:id" element={<PrivateFormPage/>} />
            <Route path="/place/:id" element={<PublicPlaceIdPage/>} />
         </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
