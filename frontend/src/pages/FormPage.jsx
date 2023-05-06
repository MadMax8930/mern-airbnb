import { useState } from "react";
import Uploader from "../components/Uploader";
import Perks from "../components/Perks";
import axios from "axios";
import Navigation from "../components/Navigation";

const FormPage = () => {
   const [title, setTitle] = useState('');
   const [address, setAddress] = useState('');
   const [description, setDescription] = useState('');
   const [perks, setPerks] = useState([]);
   const [extraInfo, setExtraInfo] = useState('');
   const [checkIn, setCheckIn] = useState('');
   const [checkOut, setCheckOut] = useState('');
   const [maxGuests, setMaxGuests] = useState(1);

   const inputHeader = (text) => {
      return <h2 className="text-2xl mt-4">{text}</h2>
   }
   const inputParagraph = (text) => {
      return <p className="text-sm text-gray-500">{text}</p>
   }
   const preInput = (header, description) => {
      return (
         <>
           {inputHeader(header)}
           {inputParagraph(description)}
         </>
      )
   }

   const addNewPlace = async (e) => {
      e.preventDefault();
      await axios.post('/places', { title, address, description, perks, extraInfo, checkIn, checkOut, maxGuests });
   }

  return (
   <div>
      <Navigation />
      <form onSubmit={addNewPlace}>
         {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
         <input type="text" placeholder="title, for example: My lovely apartment" 
                  value={title} onChange={e => setTitle(e.target.value)} />

         {preInput('Address', 'Address to this place')}
         <input type="text" placeholder="address" 
                  value={address} onChange={e => setAddress(e.target.value)} />

         {preInput('Photos', 'More is better')}
         <Uploader /> {/* Photo Uploader by link and from device */}

         {preInput('Description', 'Description of the place')}
         <textarea value={description} onChange={e => setDescription(e.target.value)} />

         {preInput('Perks', 'Select all the perks of your place')}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
            <Perks selectedArr={perks} onCheckMutateArr={setPerks} />
         </div>

         {preInput('Extra info', 'House rules, etc')}
         <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

         {preInput('Check in & check out times', 'Add check in & out times, remember to have some time window for cleaning the room between guests')}
         <div className="grid sm:grid-cols-3 gap-2">
            <div>
               <h3 className="mt-2 -mb-1">Check in time</h3>
               <input type="text" placeholder="14:00" 
                        value={checkIn} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div>
               <h3 className="mt-2 -mb-1">Check out time</h3>
               <input type="text" placeholder="11:00"
                        value={checkOut} onChange={e => setCheckOut(e.target.value)} />
            </div>
            <div>
               <h3 className="mt-2 -mb-1">Max number of guests</h3>
               <input type="number" placeholder="1"
                        value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
            </div>
         </div>

         <button className="primary  my-4">Save</button>
      </form>
   </div>
  )
}

export default FormPage;