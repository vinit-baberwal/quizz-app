import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../Main';

const Header = () => {

const {user , logout}=useContext(Context);

    return (
        <div className='shadow-xl p-2'>
            <nav>
                <ul className='flex justify-center gap-6  '>
                    <li>
                        <NavLink to="/">
                            {({ isActive }) => {
                                return isActive ? (
                                    <span className="menu">💁HOME</span>
                                ) : (
                                    <span className="demo"> 💁HOME</span>
                                );
                            }}
                        </NavLink>



        
                    </li>
                    {/* <li><NavLink to={"/play-quizz"}>
                        Play </NavLink></li> */}
                    <li>
                        <NavLink to={"/admin"}>
                            Admin
                        </NavLink>
                    </li>
                    <li>
                        {
                            user ? <span className='cursor-pointer' onClick={()=>{logout()}}> Logout</span> :
                            <NavLink to={"/login"}>
                            Login
                          </NavLink>
                        }
                       
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default Header;
