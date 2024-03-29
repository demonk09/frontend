import React, { useContext, useEffect, useState } from 'react'
import Gc from './Gc'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../Styles/Examstrt.css'
function Examst() {
  let obj=useContext(Gc)
  let [data,setData]=useState({})
  useEffect(()=>{
    axios.get(`http://localhost:5000/getatt/${obj.data._id}`).then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div className="exam-container">
    {data.count == 0 && 
        <div>
            <h1>PLEASE READ INSTRUCTIONS AND START THE EXAM 📝</h1>
            <button><Link to="/exam">START THE TEST</Link></button>
        </div>
    }
    {data.count != 0 && 
        <div>
            <h1>YOUR OLD ATTEMPTS <span> {data.count} </span> 💯</h1>
            <h2>Your best score is <span> {data.score} </span> </h2>
            <p>Are you interested in improving your score? Start the exam.</p>
            <button><Link to="/exam">Start</Link></button>
        </div>
    }
</div>
  )
}

export default Examst