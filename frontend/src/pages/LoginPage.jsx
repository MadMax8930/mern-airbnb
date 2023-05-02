import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const loginUser = async (e) => {
      e.preventDefault();
      try {
         await axios.post('/login', {
            email,
            password
         });
         alert('Login successful. Welcome!');
      } catch (exception) {
         alert('Login failed. Please try again later');
      }
   }

  return (
   <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
         <h1 className="text-4xl text-center mb-4">Login</h1>
         <form className="max-w-md mx-auto" onSubmit={loginUser}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
               Do not have an account yet? {" "} 
               <Link to={'/register'} className="underline text-black">
                  Register now
               </Link>
            </div>
         </form>
      </div>
   </div>
  )
}

export default LoginPage;