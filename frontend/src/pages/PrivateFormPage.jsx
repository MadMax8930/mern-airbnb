import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import PhotoUploader from "../components/PhotoUploader";
import CheckboxPerks from "../components/CheckboxPerks";
import NavigationUser from "../components/NavigationUser";
import axios from "axios";

const PrivateFormPage = () => {
   const { id } = useParams();
   const [title, setTitle] = useState('');
   const [address, setAddress] = useState('');
   const [description, setDescription] = useState('');
   const [addedPhotos, setAddedPhotos] = useState([]);
   const [perks, setPerks] = useState([]);
   const [extraInfo, setExtraInfo] = useState('');
   const [checkIn, setCheckIn] = useState('');
   const [checkOut, setCheckOut] = useState('');
   const [maxGuests, setMaxGuests] = useState(1);
   const [price, setPrice] = useState(100);
   const [redirect, setRedirect] = useState(false);

   useEffect(() => {
      if (!id) return;
      axios.get('/public-places/' + id).then(response => {
         const { data } = response;
         setTitle(data.title);
         setAddress(data.address);
         setDescription(data.description);
         setAddedPhotos(data.photos);
         setPerks(data.perks);
         setExtraInfo(data.extraInfo);
         setCheckIn(data.checkIn);
         setCheckOut(data.checkOut);
         setMaxGuests(data.maxGuests);
         setPrice(data.price);
      });
   }, [id]);

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

   const savePlace = async (e) => {
      e.preventDefault();
      const placeData = { title, address, description, addedPhotos, perks, extraInfo, checkIn, checkOut, maxGuests, price }
      if (id) {
         // update existing place
         await axios.put('/user-places', { id, ...placeData });
         setRedirect(true);
      } else {
         // add the new place in db
         await axios.post('/user-places', placeData);
         setRedirect(true);
      }
   }

   if (redirect) return <Navigate to={'/account/places'} />

  return (
   <div>
      <NavigationUser />
      <form onSubmit={savePlace}>
         {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
         <input type="text" placeholder="title, for example: My lovely apartment" 
                  value={title} onChange={e => setTitle(e.target.value)} />

         {preInput('Address', 'Address to this place')}
         <input type="text" placeholder="address" 
                  value={address} onChange={e => setAddress(e.target.value)} />

         {preInput('Photos', 'More is better')}
         <PhotoUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

         {preInput('Description', 'Description of the place')}
         <textarea value={description} onChange={e => setDescription(e.target.value)} />

         {preInput('Perks', 'Select all the perks of your place')}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
            <CheckboxPerks perks={perks} setPerks={setPerks} />
         </div>

         {preInput('Extra info', 'House rules, etc')}
         <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

         {preInput('Check in & check out times', 'Add check in & out times, remember to have some time window for cleaning the room between guests')}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
            <div>
               <h3 className="mt-2 -mb-1">Price per night</h3>
               <input type="number" placeholder="100"
                      value={price} onChange={e => setPrice(e.target.value)} />
            </div>
         </div>

         <button className="primary  my-4">Save</button>
      </form>
   </div>
  )
}

export default PrivateFormPage;