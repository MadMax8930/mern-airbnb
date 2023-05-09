import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PinSvg } from '../svg';
import ImageGallery from "../components/ImageGallery";
import BookingWidget from "../components/BookingWidget";
import axios from "axios";

const PublicPlaceIdPage = () => {
   const { id } = useParams();
   const [place, setPlace] = useState([]);
   useEffect(() => {
      if (!id) return;
      axios.get('/public-places/' + id).then(resp => {
         setPlace(resp.data)
      })
   }, [id]);

   if (!place) return 'No place founded';

  return (
   <div className="bg-gray-100 mt-4 pt-8 -mx-8 px-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a target="_blank" rel="noreferrer" href={'https://maps.google.com/?q=' + place.address} className="flex font-semibold underline cursor-pointer my-3 gap-1">
         <PinSvg /> {place.address}
      </a>
      <ImageGallery place={place} />
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-7 mb-7 gap-7">
         <div>
            <div className="my-4">
               <h2 className="font-semibold text-2xl">Description</h2>
               {place.description}
            </div>
            Check-in: {place.checkIn} <br />
            Check-out: {place.checkOut} <br />
            Max number of guests: {place.maxGuests}
         </div>
         <div>
            <BookingWidget place={place} />
         </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
         <div><h2 className="font-semibold text-2xl">Extra info</h2></div>
         <div className="text-gray-700 text-sm leading-5 mb-4 mt-2">{place.extraInfo}</div>
      </div>
   </div>
  )
}

export default PublicPlaceIdPage;