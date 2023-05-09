import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Layout from "./Layout";
import PublicLandingPage from "./pages/PublicLandingPage";
import PublicPlaceIdPage from "./pages/PublicPlaceIdPage";
import AuthLoginPage from "./pages/AuthLoginPage";
import AuthRegisterPage from "./pages/AuthRegisterPage";
import PrivateAccountPage from "./pages/PrivateAccountPage";
import PrivatePlacesPage from "./pages/PrivatePlacesPage";
import PrivateFormPage from "./pages/PrivateFormPage";
import PrivateBookingsPage from "./pages/PrivateBookingsPage";
import PrivateBookingIdPage from "./pages/PrivateBookingIdPage";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {

  return (
   <UserContextProvider>
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<PublicLandingPage/>} />  
            <Route path="/place/:id" element={<PublicPlaceIdPage/>} /> 

            <Route path="/login" element={<AuthLoginPage/>} />
            <Route path="/register" element={<AuthRegisterPage/>} />

            <Route path="/account" element={<PrivateAccountPage/>} />
            <Route path="/account/places" element={<PrivatePlacesPage/>} />
            <Route path="/account/places/new" element={<PrivateFormPage/>} />
            <Route path="/account/places/:id" element={<PrivateFormPage/>} />

            <Route path="/account/bookings" element={<PrivateBookingsPage/>} />
            <Route path="/account/bookings/:id" element={<PrivateBookingIdPage/>} />
         </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App;
