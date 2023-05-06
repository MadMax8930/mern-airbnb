import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import Navigation from "../components/Navigation";
import axios from "axios";

const ProfilePage = () => {
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
      <Navigation />
      {subPage === undefined && (
         <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email}) <br/>
            <button onClick={logoutUser} className="primary max-w-sm mt-2">Logout</button>
         </div>
      )}
      {subPage === 'places' && (<PlacesPage />)}
   </div>
  )
}

export default ProfilePage;