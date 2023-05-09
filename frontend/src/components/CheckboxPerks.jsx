import { WifiSvg, ParkingSvg, TvSvg, RadioSvg, PetsSvg, PrivateEntranceSvg } from "../svg";

const CheckboxPerks = ({ perks, setPerks }) => {

   const handleCheckbox = (e) => {
      const { checked, name } = e.target;
      if (checked) {
        setPerks([...perks, name]);
      } else {
        setPerks([...perks.filter(selectedName => selectedName !== name)]);
      }
   }

  return (
   <>
      <label className="flex items-center rounded-2xl gap-2 border p-4 cursor-pointer">
         <input type="checkbox" name="wifi" checked={perks.includes('wifi')} onChange={handleCheckbox} />
         <WifiSvg />
      </label>
      <label className="flex items-center rounded-2xl gap-2 border p-4 cursor-pointer">
         <input type="checkbox" name="parking" checked={perks.includes('parking')} onChange={handleCheckbox} />
         <ParkingSvg />
      </label>
      <label className="flex items-center rounded-2xl gap-2 border p-4 cursor-pointer">
         <input type="checkbox" name="tv" checked={perks.includes('tv')} onChange={handleCheckbox} />
         <TvSvg />
      </label>
      <label className="flex items-center rounded-2xl gap-2 border p-4 cursor-pointer">
         <input type="checkbox" name="radio" checked={perks.includes('radio')} onChange={handleCheckbox} />
         <RadioSvg />
      </label>
      <label className="flex items-center rounded-2xl gap-2 border p-4 cursor-pointer">
         <input type="checkbox" name="pets" checked={perks.includes('pets')} onChange={handleCheckbox} />
         <PetsSvg />
      </label>
      <label className="flex items-center rounded-2xl gap-2 border p-4 cursor-pointer">
         <input type="checkbox" name="entrance" checked={perks.includes('entrance')} onChange={handleCheckbox} />
         <PrivateEntranceSvg />
      </label>
   </>
  )
}

export default CheckboxPerks;