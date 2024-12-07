import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { BiSolidShow } from "react-icons/bi";
import { Context } from '../Main';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(Context);
  const navigator = useNavigate();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleSubmit = (e) => {

    // Handle signup logic here
    const auth = getAuth();
    if (showLogin == true) {
      //   login
      const email = e.target.email.value;
      const password = e.target.password.value;
      if (email != "" && password != "") {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            login(user);
            navigator("/play-quizz");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg(errorMessage);

          });
      }

    } else {
      // create a account
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;
      if (email != "" && password != "" && confirmPassword != "") {
        if (password == confirmPassword) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              login(user);
              navigator("/play-quizz")
              console.log(user);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMsg(errorMessage);
              // ..
            });
        } else {
          setErrorMsg("password not match")
        }
      } else {
        setErrorMsg("please fill details")
      }

    }
    e.preventDefault();

  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full space-y-8">

          <h2 className="text-center text-3xl font-extrabold text-gray-900">{showLogin ? 'Login' : 'Signup'}</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {showLogin ? (
              <LoginForm toggleForm={toggleForm} showLogin={showLogin} showPassword={showPassword} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
            ) : (
              <SignupForm toggleForm={toggleForm} showLogin={showLogin} errorMsg={errorMsg} setErrorMsg={setErrorMsg} showPassword={showPassword} />

            )}
            <span><BiSolidShow onClick={() => setShowPassword(!showPassword)} /></span>
          </form>

          <button onClick={() => setShowPassword(!showPassword)} >{showPassword == true ? "hide password" : "show password"}</button>
          <div className='texr-center text-xl text-red-400'>{errorMsg}</div>

        </div>

      </div>
    </>
  );
};






const LoginForm = ({ toggleForm, showPassword }) => {
  return (
    <>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={`${showPassword == true ? 'text' : 'password'}`}
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <p>
            Don't have an account?{' '}
            <span
              onClick={toggleForm}
              className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
            >
              Signup
            </span>
          </p>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {/* <!-- Heroicon name: solid/lock-closed --> */}
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4 7a4 4 0 118 0v5H4V7zm8-3a1 1 0 00-1-1H9a1 1 0 00-1 1v1h4V4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Login
        </button>
      </div>
    </>
  );
};


const SignupForm = ({ toggleForm, showPassword }) => {
  ;

  return (
    <>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={`${showPassword == true ? 'text' : 'password'}`}
            autoComplete="new-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"

          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={`${showPassword == true ? 'text' : 'password'}`}
            autoComplete="new-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="confrim-password"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <p>
            Already have an account?{' '}
            <span
              onClick={toggleForm}
              className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </span>

          </p>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {/* <!-- Heroicon name: solid/lock-closed --> */}
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4 7a4 4 0 118 0v5H4V7zm8-3a1 1 0 00-1-1H9a1 1 0 00-1 1v1h4V4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Signup
        </button>
      </div>
    </>
  );
};

export default Login;
