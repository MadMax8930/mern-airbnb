import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";

const BookingWidget = ({ place }) => {
   const [checkIn, setCheckIn] = useState('');
   const [checkOut, setCheckOut] = useState('');
   const [numOfGuests, setNumOfGuests] = useState(1);
   const [name, setName] = useState('');
   const [phone, setPhone] = useState('');
   const [redirect, setRedirect] = useState('');

   const { user } = useContext(UserContext);
   useEffect(() => {
      if (user) {
         setName(user.name);
      }
   }, [user]);

   let numOfNights = 0;
   if (checkIn && checkOut) numOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

   const bookThisPlace = async () => {
      if (!user) return setRedirect('/login');
      const response = await axios.post('/bookings', { 
         checkIn, checkOut, numOfGuests, name, phone, place: place._id, price: numOfNights * place.price 
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
   }

   if (redirect) return <Navigate to={redirect} />

  return (
   <>
      <div className="bg-white shadow p-4 rounded-2xl">
         <div className="text-2xl text-center">Price: <b>${place.price} / per night</b></div>
         <div className="border rounded-2xl mt-2">
            <div className="flex">
               <div className="py-3 px-4">
                  <label>Check in:</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
               </div>
               <div className="py-3 px-4 border-l">
                  <label>Check out:</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
               </div>
            </div>
            <div className="py-3 px-4 border-t">
               <label>Number of guests:</label>
               <input type="number" value={numOfGuests} onChange={e => setNumOfGuests(e.target.value)} />
            </div>
            {numOfNights > 0 && (
               <div className="py-3 px-4 border-t">
                  <label>Your full name:</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} />
                  <label>Phone number:</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            )}
         </div>
         <button onClick={bookThisPlace} className="primary mt-4">
            Book this place {numOfNights > 0 && <span>${numOfNights * place.price}</span>}
         </button>
      </div>
   </>
  )
}

export default BookingWidget;