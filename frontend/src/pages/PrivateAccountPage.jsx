import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import PrivatePlacesPage from "./PrivatePlacesPage";
import NavigationUser from "../components/NavigationUser";
import axios from "axios";

const PrivateAccountPage = () => {
   const [redirect, setRedirect] = useState(null);
   const { ready, user, setUser } = useContext(UserContext);
   const { subPage } = useParams();

   const logoutUser = async () => {
      await axios.post('/logout');
      setRedirect('/');
      setUser(null);
   }

   if (!ready) return 'Loading...';
   if (ready && !user && !redirect) return <Navigate to={'/login'} />
   if (redirect) return <Navigate to={redirect} />

  return (
   <div>
      <NavigationUser />
      {subPage === undefined && (
         <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email}) <br/>
            <button onClick={logoutUser} className="primary max-w-sm mt-2">Logout</button>
         </div>
      )}
      {subPage === 'places' && (<PrivatePlacesPage />)}
   </div>
  )
}

export default PrivateAccountPage;