import { useState } from "react";
import { TrashBinSvg, StarFilledSvg, StarUnfilledSvg, UploadSvg } from "../svg";
import axios from "axios";

const PhotoUploader = ({ addedPhotos, setAddedPhotos }) => {
   const [photoLink, setPhotoLink] = useState('');

   const addPhotoByLink = async (e) => {
      e.preventDefault();
      const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
      setAddedPhotos(prevArr => [...prevArr, filename]);
      setPhotoLink('');
   }

   const uploadPhoto = async (e) => {
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
         data.append('photos', files[i]);
      }
      const { data: filenames } = await axios.post('/upload-by-device', data, { headers: {'Content-type':'multipart/form-data'} });
      setAddedPhotos(prevArr => [...prevArr, ...filenames]);
   }

   const removePhoto = (e, filename) => {
      e.preventDefault();
      setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
   }

   const selectMainPhoto = (e, filename) => {
      e.preventDefault();
      setAddedPhotos([filename, ...addedPhotos.filter(photo => photo !== filename)]);
   }

  return (
   <>
      <div className="flex gap-2">
         <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using a link ...jpg" />
         <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
         {addedPhotos.length > 0 && addedPhotos.map(link => (
            <div className='flex h-32 relative' key={link}> 
               <img src={'http://localhost:4000/uploads/' + link} className="rounded-2xl w-full object-cover" alt="Place picture" />
               <button onClick={(e) => removePhoto(e, link)} className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl p-1 cursor-pointer">
                  <TrashBinSvg />
               </button>
               <button onClick={(e) => selectMainPhoto(e, link)} className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl p-1 cursor-pointer">
                 {link === addedPhotos[0] && <StarFilledSvg />}
                  {link !== addedPhotos[0] && <StarUnfilledSvg />}
               </button>
            </div>
         ))}
         <label className="h-32 flex justify-center items-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-500 cursor-pointer">
            <input type="file" multiple onChange={uploadPhoto} className="hidden" />
            <UploadSvg />
         </label>
      </div>
   </>
  )
}

export default PhotoUploader;