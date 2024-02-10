import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import '../Styles/Assessnment.css'
import Gc from './Gc'
import {Link} from 'react-router-dom'


function Assesnment() {
  let [ans,setAns]=useState({})
  let [qns,setQns]=useState([])
  let [f,setF]=useState(true)
  let [score,setScore]=useState()
  let [prev,setPrev]=useState("")
  let obj=useContext(Gc)


  useEffect(()=>{
    axios.get("http://localhost:5000/getqns").then((res)=>{
      setQns(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  let fun=(e)=>{
    setAns({...ans,[e.target.name]:e.target.value})
  }

  let store=()=>{
    let sc=0
    for (let i=0;i<10;i++)
    {
        if(ans[qns[i]._id]==qns[i].ans)
        {
         sc=sc+1
        }
    }
    sectScore(sc)
   console.log(sc);
    SetF(false)
    // axios.get(`http://localhost:5000/upres/${sc}/${obj.data._id}`).then((res)=>{
    //   if (res.data.msg!='fa') {
    //    setPrev(res.data.msg) 
    //   } else {
    //     setPrev("")
    //   }
    // })

    axios.get(`http://localhost:5000/upres/${sc}/${obj.data._id}`)
  .then((res) => {
    if (res.data.msg == 'fa') {
      setPrev(""); // Set prev state to res.data.msg if it's not 'fa'
    } else {
      setPrev(res.data.msg); // Clear prev state if res.data.msg is 'fa'
    }
  })
  .catch((err) => {
    console.error(err); // Handle any errors that occur during the request
    // Optionally, setPrev to an error message to inform the user
    setPrev('Error updating score. Please try again later.');
  });
  console.log(prev);



  }
  
  return (
    <div className='exam-questions-container'>
      {f&&

      <div>

        <h1 className='heading'>📝 ANSWER ALL THE QUESTIONS 📝</h1>
        {
          qns.map((item,i)=>{

            return(
              <div>
                <h1>{i+1} . {item.q} </h1>
                
                <div><input type="radio" name={item._id} value="op1" onChange={fun}/>{item.op1}</div>
                <div><input type="radio" name={item._id} value="op2" onChange={fun}/>{item.op2}</div>
               {item.op3!=undefined && <div><input type="radio" name={item._id} value="op3" onChange={fun}/>{item.op3}</div>}
               {item.op4!=undefined && <div><input type="radio" name={item._id} value="op4" onChange={fun}/>{item.op4}</div>}
               {item.op5!=undefined && <div><input type="radio" name={item._id} value="op5" onChange={fun}/>{item.op5}</div>}
  
              </div>
            )
          })
        }
        <button onClick={store}>SUBMIT THE TEST </button>
      </div>
      }

      {!f&& <div>
        <h1>YOUR SCORE IS :-{score}🚖🚨 </h1>
        {prev!="" &&<h1>YOUR PREVIOUS MAX SCORE WAS ${prev} 🚖🚨</h1>}
        {
          qns.map((item,i)=>{
            return(
              <div>
                <h1>{i+1} ) {item.q}</h1>
                {ans[item._id]=='op1' ? <div className={ans[item._id]==qns[i].ans ? "green" : "red"}> <input type="radio" name={item._id} value="op1" onChange={fun} readOnly disabled />{item.op1} </div> : <div className={item.ans=='op1' && 'green'}> <input type="radio" name={item._id} value="op1" readOnly onChange={fun} disabled/> {item.op1} </div> }
                {ans[item._id]=='op2' ? <div className={ans[item._id]==qns[i].ans ? "green" : "red"}> <input type="radio" name={item._id} value="op2" onChange={fun} readOnly disabled/>{item.op2} </div> : <div className={item.ans=='op2' && 'green'}> <input type="radio" name={item._id} value="op2" readOnly onChange={fun} disabled/> {item.op2} </div> }
                {item.op3!=undefined && <div>  {ans[item._id]=='op3' ? <div className={ans[item._id]==qns[i].ans ? "green" : "red"}> <input type="radio" name={item._id} value="op3" onChange={fun} readOnly disabled/>{item.op3} </div> : <div className={item.ans=='op3' && 'green'}> <input type="radio" name={item._id} value="op3" readOnly onChange={fun} disabled/> {item.op3} </div> }</div> }
                {item.op4!=undefined && <div>  {ans[item._id]=='op4' ? <div className={ans[item._id]==qns[i].ans ? "green" : "red"}> <input type="radio" name={item._id} value="op4" onChange={fun} readOnly disabled/>{item.op4} </div> : <div className={item.ans=='op4' && 'green'}> <input type="radio" name={item._id} value="op4" readOnly onChange={fun} disabled/> {item.op4} </div> } </div> }
                {item.op5!=undefined && <div>  {ans[item._id]=='op5' ? <div className={ans[item._id]==qns[i].ans ? "green" : "red"}> <input type="radio" name={item._id} value="op5" onChange={fun} readOnly disabled/>{item.op5} </div> : <div className={item.ans=='op5' && 'green'}> <input type="radio" name={item._id} value="op5" readOnly onChange={fun} disabled/> {item.op5} </div> } </div> }
              </div>
            )
          })
        }
      </div>}
      
        
    </div>
  )
}

export default Assesnment