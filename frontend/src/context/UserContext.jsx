import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
      if (!user) {
         axios.get('/profile').then((resp) => {
            setUser(resp.data);
            setReady(true);
         });
      }
    }, []);

   return (
      <UserContext.Provider value={{ ready, user, setUser }}>
         {children}
      </UserContext.Provider>
   )
};