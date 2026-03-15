// import React, { useContext, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import axios from 'axios'
// import toast from 'react-hot-toast'

// const Login = () => {
//     const {showUserLogin,navigate,setShowUserLogin,axios,fetchUser} = useContext(ShopContext)
//     const [state,setState] = useState('login')
//     const [name,setName] = useState("")
//     const [email,setEmail] = useState("")
//     const [password,setPassword] = useState("")

//     const onsubmitHandler = async(event) =>{
//         try{
//             const {data} = await axios.post(`/api/user/${state}`, {name,email,password})
//             toast.success(`${state === "login" ? "Login sucessfully":"Account Created"}`)
//             navigate("/")
//             await fetchUser()
//             setShowUserLogin(false)
//         }catch(error){
//             toast.error(error.message)
//         }
//     }

//   return (
//     <div onClick={()=>setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center text-sm text-gray-600 bg-black/50'>
//         <form onSubmit={onsubmitHandler} onClick={(e)=>e.stopPropagation()} className='flex flex-col gap-4 m-auto ltems-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white'>
//             <h3 className='bold-28 mx-auto mb-3'>
//                 <span className='text-secondary'>User</span>
//                 <span className='ml-2'>{state === "login" ? "Login":"Register"}</span>
//             </h3>
//             {
//                 state === "Register" && (
//                     <div className='w-full'>
//                         <p className='medium-14'>Name</p>
//                         <input 
//                             type='text'
//                             onChange={(e)=> setName(e.target.value)}
//                             value={name}
//                             placeholder='type here'
//                             className='border border-gray-200 rounded w-full p-2 mt-1 oulien-black/80'
//                             required
//                         />
//                     </div>
//                 )
//             }
//                   <div className='w-full'>
//                         <p className='medium-14'>Email</p>
//                         <input 
//                             type='email'
//                             onChange={(e)=> setEmail(e.target.value)}
//                             value={email}
//                             placeholder='type here'
//                             className='border border-gray-200 rounded w-full p-2 mt-1 oulien-black/80'
//                             required
//                         />
//                     </div>
//                     <div className='w-full'>
//                         <p className='medium-14'>password</p>
//                         <input 
//                             type='text'
//                             onChange={(e)=> setPassword(e.target.value)}
//                             value={password}
//                             placeholder='type here'
//                             className='border border-gray-200 rounded w-full p-2 mt-1 oulien-black/80'
//                             required
//                         />
//                     </div>
//                     {state === "register" ? (
//                         <p>
//                             Already have account?
//                             <span
//                             onClick={()=>setState("login")}
//                             className='text-secondary cursor-pointer'
//                             >
//                                 {""}
//                                 Click Here
//                             </span>
//                         </p>
//                     ):(
//                         <p>
//                            Create an Account
//                          <span
//                             onClick={()=>setState("login")}
//                             className='text-secondary cursor-pointer'
//                             >
//                             {""}
//                             Click Here
//                         </span>
//                         </p>
//                     )}
//                     <button type='submit' className='btn-secondary w-full rounded !py-2.5'>
//                         {state === "register" ? "Create Account" : "Login"}
//                     </button>
//         </form>
//     </div>
//   )
// }

// export default Login

import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast'

const Login = () => {

  const { navigate, setShowUserLogin, axios, fetchUser } = useContext(ShopContext)

  const [state,setState] = useState("login")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const onsubmitHandler = async(event) =>{
      event.preventDefault() 
      try{
        const {data} = await axios.post(`/api/user/${state}`,{name,email,password})
        if(data.success){
            toast.success(`${state === "login" ? "Login Sucessfully" : "Account Created"}`)
            navigate("/")
            await fetchUser()
            setShowUserLogin(false)
        }else{
            toast.error(data.message)
        }
      }catch(error){
          toast.error(error.message)
      }
  }

  return (
    <div onClick={()=>setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center text-sm text-gray-600 bg-black/50'>
      
      <form onSubmit={onsubmitHandler} onClick={(e)=>e.stopPropagation()} className='flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white'>
        
        <h3 className='bold-28 mx-auto mb-3'>
          <span className='text-secondary'>User</span>
          <span className='ml-2'>{state === "login" ? "Login":"Register"}</span>
        </h3>

        {state === "register" && (
          <div className='w-full'>
            <p className='medium-14'>Name</p>
            <input
              type='text'
              onChange={(e)=> setName(e.target.value)}
              value={name}
              placeholder='type here'
              className='border border-gray-200 rounded w-full p-2 mt-1 outline-black/80'
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p className='medium-14'>Email</p>
          <input
            type='email'
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            placeholder='type here'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-black/80'
            required
          />
        </div>

        <div className='w-full'>
          <p className='medium-14'>Password</p>
          <input
            type='password'
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            placeholder='type here'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-black/80'
            required
          />
        </div>

        {state === "register" ? (
          <p>
            Already have account?
            <span
              onClick={()=>setState("login")}
              className='text-secondary cursor-pointer ml-1'
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Create an Account
            <span
              onClick={()=>setState("register")}
              className='text-secondary cursor-pointer ml-1'
            >
              Click Here
            </span>
          </p>
        )}

        <button type='submit' className='btn-secondary w-full rounded !py-2.5'>
          {state === "register" ? "Create Account" : "Login"}
        </button>

      </form>
    </div>
  )
}

export default Login