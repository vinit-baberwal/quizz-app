import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Context } from '../Main'
import { useNavigate } from 'react-router-dom';

function QuizResult() {
  const {quiz}= useContext(Context);
  const [result, setResult]= useState({});
    const navigator = useNavigate();

  useEffect(
    ()=>{
     const lsUserAnswer=localStorage.getItem("userAnswer");
     let mark =0, negative =0
       if(lsUserAnswer){
        JSON.parse(lsUserAnswer).map(
          (user_ans)=>{
            const found =quiz.find(q=>q.id==user_ans.qId);
            if(found){
              if(found.answer==user_ans.ans){
                  mark++;

              }else{
               negative += 0.25;
              }
            }
          }
        )
        setResult({
          mark,
          negative
        })
       }
    },[quiz]
  )

  const playAgain =()=>{
    localStorage.removeItem("current");
    localStorage.removeItem("userAnswer");
     navigator("/play-quizz")
  }
  return (
    <>
     
     <Header/>
     <div className='w-[350px] p-3 rounded-[20px] mx-auto  m-12 shadow-lg bg-slate-200 '>
                <h1 className='text-3xl  p-2 text-center text-blue-700'>Max. Marks 😇: {quiz.length*100}</h1>
                <h1 className='text-center text-xl text-red-500'>YOUR SCORE 🥳:  {result.mark*100 - result.negative*100}</h1>
               <div className='flex gap-4 items-center justify-center m-3'> 

               </div>
               <h1 className=' p-1 text-center'>Marks :{result.mark*100}</h1>
               <h1 className=' p-1  text-center' >Negative:{result.negative*100}</h1>
               <div className=' p-2 text-4xl text-center'>😇🤩🥳</div>
               <button onClick={playAgain}
               className='hover:scale-150 scale-[0.7] duration-[1s] mx-[33%] my-5  bg-gradient-to-r from-amber-400 border-[3px] border-red-800 '>Play Again 🤩</button>
            </div>

       
    </>
  )
}

export default QuizResult