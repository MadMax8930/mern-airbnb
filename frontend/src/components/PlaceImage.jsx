const PlaceImage = ({ place, index=0 }) => {
   if (!place.photos?.length) return 'No photos found';

  return (
   <>
      <img src={'http://localhost:4000/uploads/' + place.photos[index]} 
            className='object-cover'
            alt="Main place picture"
      />
   </>
  )
}

export default PlaceImage;