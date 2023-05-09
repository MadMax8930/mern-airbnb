import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TimeDateSvg, RightArrowSvg, MoonSvg, MoneySvg, PointerSvg } from "../svg";
import { format, differenceInCalendarDays } from "date-fns";
import NavigationUser from "../components/NavigationUser";
import ImageMain from "../components/MainPicture";
import axios from "axios";

const PrivateBookingsPage = () => {
   const [bookings, setBookings] = useState([]);
   useEffect(() => {
      axios.get('/bookings').then(resp => {
         setBookings(resp.data)
      });
   }, []);
  return (
   <div>
      <NavigationUser />
      <div className="flex flex-col gap-4">
         {bookings?.length > 0 && bookings.map(booking => (
            <Link to={`/account/bookings/${booking._id}`} key={booking}
                  className="flex gap-6 bg-gray-200 rounded-2xl overflow-hidden">
               <div className="w-48">
                  <ImageMain place={booking.place} />
               </div>
               <div className="py-3 pr-3 grow">
                  <div className="flex items-center justify-between">
                     <h2 className="text-xl">{booking.place.title}</h2>
                     <PointerSvg />
                  </div>
                  <div className="flex gap-1 items-center border-t border-gray-300 mt-2 pt-2 text-gray-500">
                     <TimeDateSvg /> {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &nbsp;
                     <RightArrowSvg /> &nbsp;
                     <TimeDateSvg /> {format(new Date(booking.checkOut), 'yyyy-MM-dd')} 
                  </div>
                  <div className="flex gap-1 items-center text-md text-gray-500 mt-1">
                     <MoonSvg /> {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights &nbsp;
                     <MoneySvg /> <span className="font-semibold">Total price: ${booking.price}</span>
                  </div>
               </div>
            </Link>
         ))}
      </div>
   </div>
  )
}

export default PrivateBookingsPage;