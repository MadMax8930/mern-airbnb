import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusSvg } from "../svg";
import NavigationUser from "../components/NavigationUser";
import ImageMain from "../components/MainPicture";
import axios from "axios";

const PrivatePlacesPage = () => {
   const [places, setPlaces] = useState([]);
   useEffect(() => {
      axios.get('/user-places').then(({data}) => {
         setPlaces(data);
      });
   }, []);

  return (
   <div>
      <NavigationUser />
      <div className="text-center">
         <Link to={'/account/places/new'} className="inline-flex bg-primary text-white px-6 py-2 rounded-full gap-1">
            <PlusSvg /> Add new place
         </Link>
      </div>
      <div className="mt-4">
         {places.length > 0 && places.map(place => (
            <Link to={'/account/places/' + place._id} className="flex bg-gray-100 p-4 rounded-2xl gap-4 mb-2 cursor-pointer" key={place.id}>
               <div className="flex w-40 h-32 grow shrink-0 bg-gray-300">
                  <ImageMain place={place} />
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

export default PrivatePlacesPage;