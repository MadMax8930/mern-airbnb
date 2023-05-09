import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { LogoSvg, SearchSvg, UserSvg } from "../svg"

const GlobalHeader = () => {
   const { user } = useContext(UserContext); 

  return (
   <header className="flex justify-between">
      <Link to={'/'} className="flex items-center gap-1">
         <LogoSvg />
      </Link>
      <div className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-300">
         <div>Anywhere</div>
         <div className="border-l border-gray-300"></div>
         <div>Any week</div>
         <div className="border-l border-gray-300"></div>
         <div>Add guests</div>
         <button className="bg-primary text-white p-1 rounded-full"><SearchSvg /></button>
      </div>
      <Link to={user ? '/account' : '/login'} className="flex items-center border border-gray-300 rounded-full py-2 px-4 gap-2">
         <UserSvg />
         {!!user && (<div>{user.name}</div>)}
      </Link>
   </header>
  )
}

export default GlobalHeader;