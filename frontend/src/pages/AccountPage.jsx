import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
   const [redirect, setRedirect] = useState(null);
   const { ready, user, setUser } = useContext(UserContext);
   const { subPage } = useParams();

   if (!ready) return 'Loading...';
   if (ready && !user && !redirect) return <Navigate to={'/login'} />
   if (redirect) return <Navigate to={redirect} />

   const linkClasses = (type=null) => {
      let classes = 'py-2 px-6';
      if (type === subPage || (subPage === undefined && type === 'profile')) {
         classes += ' bg-primary text-white rounded-full'
      }
      return classes;
   }

   const logoutUser = async () => {
      await axios.post('/logout');
      setRedirect('/');
      setUser(null);
   }

  return (
   <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
         <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
         <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
         <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
      </nav>
      {subPage === undefined && (
         <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email}) <br/>
            <button onClick={logoutUser} className="primary max-w-sm mt-2">Logout</button>
         </div>
      )}
   </div>
  )
}

export default AccountPage;