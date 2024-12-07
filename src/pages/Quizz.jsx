import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Main';

const Quzz = () => {
    const [current, setCurrent] = useState(0);
    const { user, quiz } = useContext(Context);
    const [userAnswer, setUserAnswer] = useState([]);
    const navigator = useNavigate();
    const overlay =useRef()


    useEffect(
        ()=>{
        const lsCurrent =localStorage.getItem("current");
        const lsUserAnswer =localStorage.getItem("userAnswer")
        if(lsCurrent){
            setCurrent(parseInt(lsCurrent))
        }
        if(lsUserAnswer){
            setUserAnswer(JSON.parse(lsUserAnswer))
        }
        },[]
    )
    useEffect(
        () => {
            const lsUser = localStorage.getItem("user")
            if (lsUser == null) {
                navigator("/login")
            }
        },
        [user]
    )
    useEffect(
        ()=>{
         if(userAnswer !=0){
            localStorage.setItem("userAnswer",JSON.stringify(userAnswer));
         }
        },[userAnswer]
    )
    useEffect(
        ()=>{
        localStorage.setItem( "current",parseInt(current));
        },[current]
    )

    const nextHandler = () => {
        setCurrent(current + 1);
    }

    const prevHandler = () => {
        setCurrent(current - 1);
    }

    const userAnswerHandler = (ans, qId) => {
        const answer = [...userAnswer]
        const found = answer.find(a => a.qId == qId);
        if (found) {
            found.ans = ans;
            setUserAnswer(answer);
            // console.log("if" ,answer);
        } else {
            setUserAnswer([
                ...userAnswer,
                {
                    ans, qId
                }
            ])
            console.log([
                ...userAnswer,
                {
                    ans, qId
                }
            ])
        }

    }


    const sumbitHandler =()=>{
        overlay.current.style.display ="flex"
    }
    const yesHandler=()=>{
      navigator("/quiz-result");
    }
    const noHandler=()=>{
        overlay.current.style.display =""
   }
    return (
        <>
        <div ref={overlay} className='overlay hidden items-center justify-center'>
            <div className='w-[300px] h-56 bg-slate-50 p-3 rounded-[20px] '>
                <h1 className='text-2xl text-center text-blue-700'>{userAnswer.length} Ans. Selected out of {quiz.length}</h1>
                <h1 className='text-center text-xl'>Are you sure to Sumbit?</h1>
               <div className='flex gap-4 items-center justify-center m-3'>
                <button onClick={yesHandler} className='bg-green-600 p-2 px-4 border border-red-600 rounded-[10px]'>YES</button>
                <button onClick={noHandler} className='bg-red-600 p-2 px-4 border border-green-600 rounded-[10px]'>NO</button>

               </div>
               <div className=' p-2 text-4xl text-center'>😇🤩🥳</div>
            </div>

        </div>
            <Header />
            <div className='flex justify-center items-center h-[80vh]'>
                <div className='shadow-lg p-3 w-[600px]'>
                    <h1 className='text-xl text-center p-3'>({userAnswer.length}/{quiz.length})</h1>
                    <Card selectedAnswer={
                        userAnswer.find(ans => ans.qId == quiz[current]?.id)
                    }
                        key={quiz[current]?.id} data={quiz[current]} current={current} userAnswerHandler={userAnswerHandler} />
                    <div className='flex justify-between mt-2'>
                        <button className='bg-red-500 p-3 text-white' onClick={prevHandler}
                            style={
                                {
                                    visibility: current == 0 ? "hidden" : 'visible'
                                }
                            }>Prev</button>
                        <button className='bg-blue-500 p-3 text-white' onClick={nextHandler}
                            style={
                                {
                                    visibility: current == quiz.length - 1 ? "hidden" : 'visible'
                                }
                            }>Next</button>
                            
                            
                    </div>
                    <button onClick={sumbitHandler} className='p-3 mx-auto block w-full m-2 text-white text-xl  bg-green-500 '>
                                SUMBIT
                              </button>

                </div>
            </div>
        </>
    );
}





const Card = ({ data, current, userAnswerHandler, selectedAnswer }) => {
    const [answer, setAnswer] = useState(null);

    useEffect(
        () => {
            if (selectedAnswer) {
                setAnswer(selectedAnswer.ans);
            } else {
                setAnswer(null);
            }

        },
        [current]
    )
    useEffect(
        () => {
            if (answer != null)
                userAnswerHandler(answer, data.id);

        }, [answer]
    )
    return (
        <>
            <h1>{data?.question} </h1>
            <hr className='my-4' />
            <div className={`${answer == 'a' ? "bg-blue-400 " : ""}border p-3 cursor-pointer`} onClick={() => setAnswer("a")} >A ) {data?.option_a} </div>
            <div className={`${answer == 'b' ? "bg-blue-500 " : ""}border p-3 cursor-pointer`} onClick={() => setAnswer("b")}>B ) {data?.option_b} </div>
            <div className={`${answer == 'c' ? "bg-blue-600 " : ""}border p-3 cursor-pointer`} onClick={() => setAnswer("c")}>C ) {data?.option_c} </div>
            <div className={`${answer == 'd' ? "bg-blue-700 " : ""}border p-3 cursor-pointer`} onClick={() => setAnswer("d")}>D ) {data?.option_d} </div>

        </>

    )
}

export default Quzz;
