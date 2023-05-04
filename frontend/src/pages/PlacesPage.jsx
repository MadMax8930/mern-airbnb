import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../components/Perks";
import axios from "axios";

const PlacesPage = () => {
   const { action } = useParams();
   const [title, setTitle] = useState('');
   const [address, setAddress] = useState('');
   const [addedPhotos, setAddedPhotos] = useState([]);
   const [photoLink, setPhotoLink] = useState('');
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
   const addPhotoByLink = async (e) => {
      e.preventDefault();
      const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
      setAddedPhotos(prevArr => [...prevArr, filename]);
      setPhotoLink('');
   }

   const uploadPhoto = (e) => {
      console.log(e)
   }

  return (
   <div>
      {action !== 'new' && (
         <div className="text-center">
           <Link to={'/account/places/new'} className="inline-flex bg-primary text-white px-6 py-2 rounded-full gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add new place
           </Link>
        </div>
      )}
      {action === 'new' && (
         <div>
            <form action="">
               {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
               <input type="text" placeholder="title, for example: My lovely apartment" 
                      value={title} onChange={e => setTitle(e.target.value)} />
               {preInput('Address', 'Address to this place')}
               <input type="text" placeholder="address" 
                      value={address} onChange={e => setAddress(e.target.value)} />
               {preInput('Photos', 'More is better')}
               <div className="flex gap-2">
                  <input type="text" placeholder="Add using a link ...jpg" 
                         value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
                  <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
               </div>
               <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
                  {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                     <div key={index}>
                        <img src={'http://localhost:4000/uploads/' + link} className="rounded-2xl" alt="Place picture" />
                     </div>
                  ))}
                  <label className="flex justify-center items-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-500 cursor-pointer">
                     <input type="file" onChange={uploadPhoto} className="hidden" />
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                     </svg> Upload
                  </label>
               </div>
               {preInput('Description', 'Description of the place')}
               <textarea value={description} onChange={e => setDescription(e.target.value)} />
               {preInput('Perks', 'Select all the perks of your place')}
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
                 <Perks selected={perks} onChange={e => setPerks(e.target.value)} />
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
      )}
   </div>
  )
}

export default PlacesPage;