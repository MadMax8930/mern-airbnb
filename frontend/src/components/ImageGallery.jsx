import { useState } from "react";
import { XcrossSvg, PictureSvg } from "../svg";

const ImageGallery = ({ place }) => {
   const [showAllPhotos, setShowAllPhotos] = useState(false);

   if (showAllPhotos) return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
         <div className="grid gap-4 p-8 bg-black">
            <div>
               <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
               <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow bg-white text-black">
                  <XcrossSvg /> Close photos
               </button>
            </div>
            {place?.photos?.length > 0 && place.photos.map(photo => (
               <div key={photo}>
                  <img src={`http://localhost:4000/uploads/${photo}`} alt="Photo"/>
               </div>
            ))}
         </div>
      </div>
   )

  return (
   <>
      <div className="relative">
         <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden">
            <div>
               {place.photos?.[0] && (
                  <img src={`http://localhost:4000/uploads/${place.photos[0]}`} onClick={() => setShowAllPhotos(true)} 
                        className="aspect-square object-cover cursor-pointer" alt="Picture 1" />)}
            </div>
            <div>
               {place.photos?.[1] && (
                  <img src={`http://localhost:4000/uploads/${place.photos[1]}`} onClick={() => setShowAllPhotos(true)} 
                        className="aspect-square object-cover cursor-pointer" alt="Picture 2" />)}
               {place.photos?.[2] && (
               <div className="overflow-hidden">
                  <img src={`http://localhost:4000/uploads/${place.photos[2]}`} onClick={() => setShowAllPhotos(true)} 
                        className="aspect-square object-cover cursor-pointer relative top-2" alt="Picture 3" />
               </div>)}
            </div>
         </div>
         <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 flex gap-1">
            <PictureSvg /> Show more photos
         </button>
      </div>
   </>
  )
}

export default ImageGallery;