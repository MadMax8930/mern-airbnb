import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const PlacesPage = () => {
  return (
   <div>
      <Navigation />
      <div className="text-center">
         list of all added places <br/>
         <Link to={'/account/places/new'} className="inline-flex bg-primary text-white px-6 py-2 rounded-full gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
         </Link>
      </div>
   </div>
  )
}

export default PlacesPage;