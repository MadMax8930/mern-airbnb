import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import axios from "axios";

const PlacesPage = () => {
   const [places, setPlaces] = useState([]);
   useEffect(() => {
      axios.get('/places').then(({data}) => {
         setPlaces(data);
      });
   }, []);

  return (
   <div>
      <Navigation />
      <div className="text-center">
         <Link to={'/account/places/new'} className="inline-flex bg-primary text-white px-6 py-2 rounded-full gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
         </Link>
      </div>
      <div className="mt-4">
         {places.length > 0 && places.map(place => (
            <Link to={'/account/places/' + place._id} className="flex bg-gray-100 p-4 rounded-2xl gap-4 mb-2 cursor-pointer" key={place.id}>
               <div className="flex w-40 h-32 grow shrink-0 bg-gray-300">
                  {place.photos.length > 0 && (
                     <img src={'http://localhost:4000/uploads/' + place.photos[0]} className="object-cover" alt="Apartment picture" />
                  )}
               </div>
               <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
               </div>
            </Link>
         ))}
      </div>
   </div>
  )
}

export default PlacesPage;