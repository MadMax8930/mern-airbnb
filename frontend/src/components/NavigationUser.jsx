import { Link, useLocation } from "react-router-dom";
import { ProfileSvg, ListSvg, PlaceSvg } from "../svg";

const NavigationUser = () => {
   const { pathname } = useLocation();
   const subPage = pathname.split('/')?.[2]; // undefined || bookings || places
   const linkClasses = (type=null) => {
      let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
      if (type === subPage || (subPage === undefined && type === 'profile')) {
         classes += ' bg-primary text-white'
      } else {
         classes += ' bg-gray-200'
      }
      return classes;
   }

  return (
   <>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
         <Link className={linkClasses('profile')} to={'/account'}>
            <ProfileSvg /> My profile
         </Link>
         <Link className={linkClasses('bookings')} to={'/account/bookings'}>
            <ListSvg /> My bookings
         </Link>
         <Link className={linkClasses('places')} to={'/account/places'}>
            <PlaceSvg /> My accommodations
         </Link>
      </nav>
   </>
  )
}

export default NavigationUser;