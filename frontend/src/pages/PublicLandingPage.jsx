import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PublicLandingPage = () => {
   const [places, setPlaces] = useState([])
   useEffect(() => {
      axios.get('/public-places').then(resp => {
         setPlaces(resp.data)
      });
   }, []);

  return (
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mt-8">
      {places.length > 0 && places.map(place => (
         <Link to={'/place/' + place._id} key={place}>
            <div className="bg-gray-500 flex rounded-2xl mb-2">
               {place.photos?.[0] && (
                  <img src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="Place picture" 
                       className="aspect-square object-cover rounded-2xl"/>
               )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
            <div className="mt-1">
               <span className="font-bold">${place.price}</span> per night
            </div>
         </Link>
      ))}
   </div>
  )
}

export default PublicLandingPage;