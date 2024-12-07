import React from 'react';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <>
        <Header/>
        <div className='bg-gradient-to-r  from-indigo-500'>
        <div className='flex justify-center items-center gap-6 text-center h-[100vh] '>
            <button className='px-5 hover:shadow-xl text-white hover:opacity-100 opacity-80 bg-center bg-cover hover:scale-110 btn bg-teal-50 border-emerald-800 border p-3 text-xl'style={
                {
                    backgroundImage: 'url("/image/paly-btn.jpg")'

                }
            }>
                
               <NavLink to={"/play-quizz"}>
                        Play </NavLink>
            </button>
            <button className='px-5 shadow text-white hover:opacity-100 opacity-80 bg-center bg-cover hover:scale-110 btn bg-teal-50 border-emerald-800 border p-5 text-xl'style={
                {
                    backgroundImage: 'url("/image/paly-btn.jpg")'

                }
            }>Login</button>
            <button className='px-5 text-white hover:opacity-100 opacity-80 bg-center bg-cover hover:scale-110 btn bg-teal-50 border-emerald-800 border p-3 text-xl'style={
                {
                    backgroundImage: 'url("/image/paly-btn.jpg")'

                }
            }>Admin</button>
        </div>

        </div>
        </>
    );
}

export default Home;
