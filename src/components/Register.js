import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Register.css'
const Register = () => {
    let [data,setData]=useState({})
  
    let navigate=useNavigate()
    let  [err,setErr]=useState("")
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let reg=async()=>{
     let res=await  axios.post("http://localhost:5000/adduser",data)
     if(res.data=="YOU ARE REGISTER AS USER BABY 👤")
     {
        navigate("/")
     }
     else{
        setErr(res.data)
     }
    }
  return (
    <div>
 <div className='reg'>
    <h3>{err}</h3>
            <input type='text' name="_id" placeholder='enter email' onChange={fun}/>
            <input type='text' name="name" placeholder='enter name' onChange={fun}/>
            <input type='password' name="password" placeholder='enter password' onChange={fun}/>
            <button onClick={reg}>Register</button>
        </div>

    </div>
  )
}

export default Register