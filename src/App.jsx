import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quizz from "./pages/Quizz";
import Admin from "./pages/Admin";
import QuizResult from "./pages/QuizResult";


function App() {

  const routes = createBrowserRouter(
    [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
         element:<Login/>
      },
      {
        path:"/play-quizz",
        element:<Quizz/>
      },
      {
        path:"/admin",
        element:<Admin/>
      },
      {
        path:"/quiz-result",
        element:<QuizResult/>
      }
    ]
  )
  return (
    <RouterProvider router={routes}/>
  );
}
 

export default App;
