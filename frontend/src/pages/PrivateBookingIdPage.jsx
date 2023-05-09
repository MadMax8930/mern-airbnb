import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoonSvg, PinSvg, RightArrowSvg, TimeDateSvg } from "../svg";
import { format, differenceInCalendarDays } from "date-fns";
import ImageGallery from "../components/ImageGallery";
import axios from "axios";

const PrivateBookingIdPage = () => {
   const { id } = useParams();
   const [booking, setBooking] = useState(null);
   useEffect(() => {
      if (id) {
         axios.get('/bookings').then(resp => {
            const foundBooking = resp.data.find(one => one._id === id);
            if (foundBooking) {
               setBooking(foundBooking);
            }
         });
      }
   }, [id]);

   if (!booking) return 'No booking found';

  return (
   <div className="my-8">
      <div className="bg-gray-200 py-3 px-6 mb-3 text-md rounded-2xl">
         <div className="flex items-center justify-between text-xl">
            <div className="mb-1">
               <a target="_blank" rel="noreferrer" href={'https://maps.google.com/?q=' + booking.place.address} className="flex font-semibold no-underline cursor-pointer my-3 gap-1">
                  <h2 className="flex items-center gap-1">
                     <PinSvg /> Your booking information for <span className="text-gray-500 truncate pr-1">{booking.place.title}</span>
                  </h2>
               </a>
            </div>
            <span className="text-xs text-gray-500">Number of guests: {booking.numOfGuests}</span>
         </div>
         <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-300 text-gray-500 gap-2">
            <div className="flex gap-1 items-center">
               <MoonSvg /> {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights &nbsp;&nbsp;
               <TimeDateSvg /> {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
               <RightArrowSvg />
               <TimeDateSvg /> {format(new Date(booking.checkOut), 'yyyy-MM-dd')} 
            </div>
            <div className="flex bg-primary text-white px-3 py-1 mb-1 rounded-2xl">
               <div>Total price: <span className="font-semibold">${booking.price}</span></div>
            </div>
         </div>
      </div>
      <ImageGallery place={booking.place} />
   </div>
  )
}

export default PrivateBookingIdPage;