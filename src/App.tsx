import './App.css'
import { ExpenseForm } from './components/ExpenseForm';
import Home from './components/Home';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';


function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <div>Page Not Found</div>
  },
  {
   path: '/add-expense',
   element: <ExpenseForm/> 
  },
  {
    path: '/expenses',
    element: <div>Expenses List</div>
  }
])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
